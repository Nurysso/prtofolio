// Logic for the 404 terminal. Pure functions with no DOM access, so it runs (and can be tested) anywhere.
//
// `fs` maps absolute paths to nodes and mirrors the site's URLs:
//   dir:  { type: 'dir',  url, children: [names], meta: [[key, value]], size, year }
//   page: { type: 'page', url, text: [lines],     meta: [[key, value]], size, year }
//
// `cd` takes you to the page for real, so the shell never moves: the working directory is
// the closest existing parent of the URL that 404ed. A relative path is looked up from there
// first and then from the site root, so `cd about` works from anywhere.
//
// A line of output is a string, or an array of strings and { text, href?, cls? } segments.

const USER = 'visitor';
const OWNER = 'nurysso';

const LISTED = ['cat', 'cd', 'clear', 'echo', 'exit', 'help', 'history', 'ls', 'open', 'pwd', 'stat', 'tree', 'whoami'];
const PATH_COMMANDS = new Set(['cat', 'cd', 'ls', 'open', 'stat', 'tree']);

const HELP = [
  'ls [path]      list what is in a directory',
  'cd <path>      go to that page',
  'cat <path>     print a short summary of a page',
  'stat <path>    show details about a page',
  'tree [path]    draw the site map',
  'pwd            print where you started',
  'history        show the commands you have run',
  'clear          clear the screen',
  'exit           back to the home page',
  '',
  'Tab completes names, and the up and down arrows recall commands.',
  'Paths work like the site URLs, for example: cd /projects/eulix',
];

const link = (text, href, cls) => ({ text, href, cls });
const text = (...lines) => ({ lines });

// Splits a command line into words, honouring single and double quotes
export function tokenize(line) {
  const words = [];
  let word = '';
  let quote = null;
  let started = false;
  for (const ch of line) {
    if (quote) {
      if (ch === quote) quote = null;
      else word += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      started = true;
    } else if (/\s/.test(ch)) {
      if (word || started) words.push(word);
      word = '';
      started = false;
    } else {
      word += ch;
    }
  }
  if (word || started) words.push(word);
  return words;
}

// Turns a typed path into an absolute one. `~` and `/` are both the site root.
export function normalize(path, cwd = '/') {
  let p = path;
  if (p[0] === '~') p = `/${p.slice(1)}`;
  const stack = p.startsWith('/') ? [] : cwd.split('/').filter(Boolean);
  for (const part of p.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part.toLowerCase());
  }
  return `/${stack.join('/')}`;
}

// Edit distance where swapping two neighbouring letters counts as one edit
function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

// The known path closest to `abs`, or null when nothing is close enough to be a typo
function closest(fs, abs) {
  const limit = Math.max(1, Math.floor(abs.length / 4));
  let best = null;
  for (const path of Object.keys(fs)) {
    if (path === '/') continue;
    const d = distance(abs, path);
    if (d <= limit && (!best || d < best.d || (d === best.d && path.length < best.path.length))) best = { path, d };
  }
  return best?.path ?? null;
}

const decode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

// For the 404 page itself: where the visitor probably meant to go
export function suggestPath(fs, pathname) {
  const abs = normalize(decode(pathname));
  return closest(fs, abs);
}

// The deepest existing directory above a URL that does not exist
export function nearestDir(fs, pathname) {
  let abs = normalize(decode(pathname));
  while (abs !== '/' && fs[abs]?.type !== 'dir') abs = abs.slice(0, abs.lastIndexOf('/')) || '/';
  return fs[abs]?.type === 'dir' ? abs : '/';
}

export function createShell(fs, { cwd = '/' } = {}) {
  const home = fs[cwd]?.type === 'dir' ? cwd : '/';
  const history = [];

  const resolve = (path) => {
    const here = normalize(path, home);
    if (fs[here] || path[0] === '/' || path[0] === '~') return here;
    const top = normalize(path, '/');
    return fs[top] ? top : here;
  };
  const child = (abs, name) => `${abs === '/' ? '' : abs}/${name}`;
  const names = (abs) => [...(fs[abs].children ?? [])].sort();

  const label = (abs) => {
    if (abs === '/') return '~';
    const base = abs.slice(abs.lastIndexOf('/') + 1);
    return fs[abs].type === 'dir' ? `${base}/` : base;
  };
  const entry = (abs) => link(label(abs), fs[abs].url, fs[abs].type === 'dir' ? 'dir' : undefined);

  // "No such file" error plus a nudge toward the closest real path
  const missing = (prefix, abs) => {
    const lines = [`${prefix}: No such file or directory`];
    const guess = closest(fs, abs);
    if (guess) lines.push(['Did you mean ', link(guess, fs[guess].url), '?']);
    return lines;
  };

  const handlers = Object.assign(Object.create(null), {
    help: () => text(...HELP),

    pwd: () => text(home),

    whoami: () => text(USER),

    history: () => text(...history.map((cmd, i) => `${String(i + 1).padStart(4)}  ${cmd}`)),

    echo: (args) => text(args.join(' ')),

    clear: () => ({ lines: [], clear: true }),

    exit: () => ({ lines: ['logout', ['→ ', link('/', '/')]], go: '/' }),

    cd(args) {
      if (args.length > 1) return text('cd: too many arguments');
      const target = args[0] ?? '~';
      const abs = resolve(target);
      const node = fs[abs];
      if (!node) return { lines: missing(`cd: ${target}`, abs) };
      return { lines: [['→ ', link(node.url, node.url)]], go: node.url };
    },

    ls(args) {
      let long = false;
      let all = false;
      const targets = [];
      for (const arg of args) {
        if (arg.startsWith('--')) return text(`ls: unrecognized option '${arg}'`, "Try 'help'.");
        if (arg.startsWith('-') && arg.length > 1) {
          for (const flag of arg.slice(1)) {
            if (flag === 'l') long = true;
            else if (flag === 'a') all = true;
            else return text(`ls: invalid option -- '${flag}'`, "Try 'help'.");
          }
        } else {
          targets.push(arg);
        }
      }
      if (!targets.length) targets.push('.');

      const lines = [];
      targets.forEach((target, i) => {
        const abs = resolve(target);
        const node = fs[abs];
        if (!node) {
          lines.push(...missing(`ls: cannot access '${target}'`, abs));
          return;
        }
        if (targets.length > 1) lines.push(...(i ? [''] : []), `${target}:`);

        const isDir = node.type === 'dir';
        const rows = [];
        if (isDir && all) {
          rows.push({ node, seg: { text: '.', cls: 'dir' } }, { node, seg: { text: '..', cls: 'dir' } });
        }
        const paths = isDir ? names(abs).map((n) => child(abs, n)) : [abs];
        for (const p of paths) rows.push({ node: fs[p], seg: entry(p) });

        if (!rows.length) {
          lines.push('(empty)');
        } else if (long) {
          for (const { node: n, seg } of rows) {
            const dir = n.type === 'dir';
            const perms = dir ? 'drwxr-xr-x' : '-rw-r--r--';
            lines.push([`${perms} ${dir ? 2 : 1} ${OWNER} ${String(n.size).padStart(5)} ${n.year} `, seg]);
          }
        } else {
          const row = [];
          rows.forEach(({ seg }, idx) => {
            if (idx) row.push('  ');
            row.push(seg);
          });
          lines.push(row);
        }
      });
      return { lines };
    },

    cat(args) {
      if (!args.length) return text('cat: missing file operand', 'Try: cat about');
      const lines = [];
      args.forEach((arg, i) => {
        const abs = resolve(arg);
        const node = fs[abs];
        if (i) lines.push('');
        if (!node) lines.push(...missing(`cat: ${arg}`, abs));
        else if (node.type === 'dir') lines.push(`cat: ${arg}: Is a directory`, `Try: ls ${arg}`);
        else lines.push(...node.text, '', ['Read more: ', link(node.url, node.url)]);
      });
      return { lines };
    },

    stat(args) {
      if (!args.length) return text('stat: missing operand', 'Try: stat about');
      const lines = [];
      args.forEach((arg, i) => {
        const abs = resolve(arg);
        const node = fs[abs];
        if (i) lines.push('');
        if (!node) {
          lines.push(...missing(`stat: cannot stat '${arg}'`, abs));
          return;
        }
        const rows = [['File', arg], ...node.meta];
        const width = Math.max('Page'.length, ...rows.map(([key]) => key.length));
        for (const [key, value] of rows) lines.push(`${key.padStart(width)}: ${value}`);
        lines.push([`${'Page'.padStart(width)}: `, link(node.url, node.url)]);
      });
      return { lines };
    },

    tree(args) {
      const target = args[0] ?? '/';
      const abs = resolve(target);
      if (!fs[abs]) return { lines: missing(`tree: ${target}`, abs) };

      const lines = [[link(abs === '/' ? '~' : abs, fs[abs].url, 'dir')]];
      let dirs = 0;
      let pages = 0;
      const walk = (parent, prefix) => {
        if (fs[parent].type !== 'dir') return;
        const kids = names(parent);
        kids.forEach((name, i) => {
          const path = child(parent, name);
          const last = i === kids.length - 1;
          lines.push([`${prefix}${last ? '└── ' : '├── '}`, entry(path)]);
          if (fs[path].type === 'dir') {
            dirs++;
            walk(path, `${prefix}${last ? '    ' : '│   '}`);
          } else {
            pages++;
          }
        });
      };
      walk(abs, '');
      lines.push('', `${dirs} ${dirs === 1 ? 'directory' : 'directories'}, ${pages} ${pages === 1 ? 'page' : 'pages'}`);
      return { lines };
    },

    // Quiet extras: not in `help`, not in tab completion
    sudo: () => text(`${USER} is not in the sudoers file. This incident will be reported.`),

    rm(args) {
      const targets = args.filter((a) => !a.startsWith('-'));
      if (!targets.length) return text('rm: missing operand');
      const recursive = args.some((a) => /^-[a-z]*r/i.test(a) || a === '--recursive');
      if (recursive && targets.includes('/') && !args.includes('--no-preserve-root')) {
        return text("rm: it is dangerous to operate recursively on '/'", 'rm: use --no-preserve-root to override this failsafe');
      }
      return text(...targets.map((t) => `rm: cannot remove '${t}': Read-only file system`));
    },

    cook: () => text('Preheating the oven...', 'Nothing burnt. The database is fine.'),
  });

  // Aliases
  handlers.cls = handlers.clear;
  handlers.quit = handlers.exit;
  handlers.logout = handlers.exit;
  handlers.open = handlers.cd;
  handlers['xdg-open'] = handlers.cd;
  for (const editor of ['vim', 'vi', 'nano', 'emacs']) {
    handlers[editor] = () => text(`${editor}: the file system is read-only, so there is nothing to edit.`);
  }

  function unknown(command) {
    const lines = [`sh: ${command}: command not found`];
    const abs = resolve(command);
    if (fs[abs]) {
      lines.push(['Try: cd ', link(command, fs[abs].url)]);
      return { lines };
    }
    const lower = command.toLowerCase();
    const near = LISTED.find((name) => distance(lower, name) <= 1);
    lines.push(near ? `Did you mean '${near}'?` : 'Type help to see what you can run.');
    return { lines };
  }

  function run(line) {
    const trimmed = line.trim();
    if (!trimmed) return { lines: [] };
    history.push(trimmed);
    const [first, ...args] = tokenize(trimmed);
    if (!first) return { lines: [] };
    const handler = handlers[first.toLowerCase()];
    return handler ? handler(args) : unknown(first);
  }

  // Tab completion. Returns the new line, plus the candidates when more than one name fits.
  function complete(line) {
    const frag = /\S*$/.exec(line)[0];
    const head = line.slice(0, line.length - frag.length);
    const lower = frag.toLowerCase();

    let base = '';
    let candidates;
    if (head.trim() === '') {
      candidates = LISTED.filter((name) => name.startsWith(lower)).map((name) => ({ name, suffix: ' ' }));
    } else {
      const command = tokenize(head)[0]?.toLowerCase();
      if (!PATH_COMMANDS.has(command)) return { line, options: [] };
      const slash = frag.lastIndexOf('/');
      base = frag.slice(0, slash + 1);
      const partial = frag.slice(slash + 1).toLowerCase();
      const parents = base ? [resolve(base)] : home === '/' ? ['/'] : [home, '/'];
      const seen = new Set();
      candidates = [];
      for (const parent of parents) {
        if (fs[parent]?.type !== 'dir') continue;
        for (const name of names(parent)) {
          if (!name.startsWith(partial) || seen.has(name)) continue;
          seen.add(name);
          candidates.push({ name, suffix: fs[child(parent, name)].type === 'dir' ? '/' : ' ' });
        }
      }
    }

    if (!candidates.length) return { line, options: [] };
    if (candidates.length === 1) {
      const [{ name, suffix }] = candidates;
      return { line: `${head}${base}${name}${suffix}`, options: [] };
    }

    let prefix = candidates[0].name;
    for (const { name } of candidates) {
      while (!name.startsWith(prefix)) prefix = prefix.slice(0, -1);
    }
    return {
      line: `${head}${base}${prefix}`,
      options: candidates.map(({ name, suffix }) => (suffix === '/' ? `${name}/` : name)),
    };
  }

  return {
    run,
    complete,
    history,
    promptPath: () => (home === '/' ? '~' : `~${home}`),
  };
}
