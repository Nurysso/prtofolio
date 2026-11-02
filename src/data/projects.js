// One entry per project. Each entry renders a card on the home page and a page at /projects/<slug>/.
// Optional fields: site, seo, install, installNote, sections.

export const projects = [
  {
    slug: 'eulix',
    title: 'Eulix',
    stack: ['Rust', 'Go', 'Python', 'MCP', 'LSP'],
    year: '2026',
    status: 'beta',
    summary:
      'Local-first code intelligence. Indexes symbols, call graphs and embeddings on your machine, then routes each question to the cheapest path that can answer it.',
    description:
      'Eulix parses your repository into a queryable index and answers from exact lookup, BM25, vector search and call-graph expansion. An LLM is optional and used only where reasoning is needed. Parsed the 37.3M-line Linux kernel in 57 s with 0 failures.',
    repo: 'https://github.com/Nurysso/eulix',
    stats: [
      { value: '37.3M', label: 'lines parsed' },
      { value: '57 s', label: 'Linux kernel, 12 threads' },
      { value: '0', label: 'parse failures' },
      { value: '9', label: 'languages' },
    ],
    usage: {
      title: 'Three commands',
      steps: [
        { label: 'Set up', code: 'cd your-project\neulix init      # creates eulix.toml\neulix analyze   # parse and build the index' },
        { label: 'Ask', code: 'eulix chat                      # interactive\neulix query "Who calls foo?"    # one-shot' },
        { label: 'Give your agent the index', code: 'eulix mcp --repo /path/to/repo   # stdio MCP server' },
      ],
    },
    faq: [
      { q: 'Does my code leave my machine?', a: 'Parsing, indexing, retrieval and embedding run on-device. With a local LLM such as Ollama, nothing leaves. If you configure a remote provider, the retrieved code context for each query is sent to it.' },
      { q: 'Do I need an LLM?', a: 'No. Symbol lookups, callers and callees, and project metrics are answered straight from the index. Only open-ended "why" questions go to a model.' },
      { q: 'Is it a compiler?', a: 'No. PRISM is an approximate resolver that trades formal soundness for repository-scale speed. Dynamic dispatch, reflection and generated code are best-effort.' },
      { q: 'What does it run on?', a: 'Linux and Windows. macOS binaries are untested. C and C++ parsing is limited by macro expansion, and JSX and TSX are not parsed.' },
    ],
    install: [
      {
        label: 'Linux',
        cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/Nurysso/eulix/main/install.sh)',
      },
      {
        label: 'Windows · PowerShell',
        cmd: 'irm https://raw.githubusercontent.com/Nurysso/eulix/main/install.ps1 | iex',
      },
    ],
    installNote: 'macOS binaries are untested. Open an issue if you hit a problem.',
    sections: [
      {
        label: 'Benchmarks',
        title: 'At scale',
        items: [
          {
            title: 'Linux kernel parse',
            desc: '37.3M lines across 64,460 files in 57 s on 12 threads, with 0 failures. 773K graph nodes and 1.51M edges.',
          },
          {
            title: 'Memory',
            desc: 'Spill-to-disk serialization cut peak memory from ~8 GB to ~3.3 GiB.',
          },
          {
            title: 'Embeddings',
            desc: '837,531 chunks embedded locally at ~528 chunks/s on a single consumer GPU (RX 6700 XT).',
          },
          {
            title: 'Agent retrieval',
            desc: 'One MCP call returned 30 ranked chunks from 27 files in ~5.4K tokens, replacing an estimated 4–8 grep/read calls.',
          },
        ],
      },
      {
        label: 'Pipeline',
        title: 'How it works',
        items: [
          {
            title: 'Index',
            desc: 'libeulix (Rust, Tree-sitter) extracts symbols, imports and call graphs. PRISM, an approximate scope-aware resolver, links the calls. A Python service creates SQ8-quantized embeddings in a memory-mapped vector store.',
          },
          {
            title: 'Route',
            desc: 'A deterministic classifier sends each query to the cheapest path: exact lookup, BM25, vector search or call-graph expansion, with MMR re-ranking for diversity.',
          },
          {
            title: 'Answer',
            desc: 'Most questions are answered straight from the index. Only open-ended "why" questions go to your LLM, with retrieved code as grounded context.',
          },
        ],
      },
      {
        label: 'Ecosystem',
        title: 'What ships',
        items: [
          { title: 'eulix (Go CLI)', desc: 'Orchestration, query routing, context building and the optional LLM layer.' },
          { title: 'libeulix (Rust)', desc: 'The analysis engine as a standalone crate. Supports C, C++, Go, Java, JavaScript, PHP, Python, Rust and TypeScript.' },
          { title: 'eulix mcp (beta)', desc: 'Stdio MCP server built into the CLI so coding agents can query your repo.' },
          { title: 'eulix-lsp (beta)', desc: 'Language server serving symbol and call-graph analysis to editors.' },
          { title: 'vizEulize', desc: 'Browser call-graph explorer with search, filters and neighborhood focus, tested on a 411 MB graph.' },
        ],
      },
      {
        label: 'Why',
        title: 'Why Eulix',
        items: [
          {
            title: 'Private by default',
            desc: 'Parsing, indexing, retrieval and embedding run on your machine. With a local LLM such as Ollama, nothing leaves it.',
          },
          {
            title: 'Any LLM, or none',
            desc: 'Use Ollama, OpenAI, Anthropic, Gemini, DeepSeek or an OpenAI-compatible endpoint. Most queries need no model.',
          },
          {
            title: 'Honest scope',
            desc: 'PRISM trades formal soundness for repository-scale speed. Eulix is a navigation and retrieval layer, not a compiler.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tyr',
    title: 'Tyr',
    stack: ['Rust', 'Ratatui', 'Rayon', 'ML'],
    year: '2025',
    status: 'live',
    summary: 'A Rust file organizer that sorts a messy folder by extension, by filename, or by what the files are about.',
    description:
      'Tyr cleans a folder in one command. Pick an engine: extension rules, filename similarity, or K-Means clustering over file content. It runs offline with no telemetry, shows a dry run before it moves anything, and renames on conflict so nothing is overwritten.',
    repo: 'https://github.com/Nurysso/tyr',
    stats: [
      { value: '3', label: 'organizing engines' },
      { value: '100%', label: 'local, no telemetry' },
      { value: '3', label: 'platforms' },
    ],
    usage: {
      title: 'Before and after',
      steps: [
        { label: 'Messy folder', prompt: false, code: 'Downloads/\n├── invoice_2026.pdf\n├── project_mockup.png\n├── main.rs\n├── track01.flac\n└── dataset.csv' },
        { label: 'tyr -c ~/Downloads', prompt: false, code: 'Downloads/\n├── Documents/    invoice_2026.pdf\n├── Images/       project_mockup.png\n├── Code/         main.rs\n├── Music/        track01.flac\n└── Spreadsheets/ dataset.csv' },
        { label: 'tyr -f: same name, different extension', prompt: false, code: 'Report/\n├── report_v1.pdf\n├── report_v2.pdf\n├── report_final.docx\n└── report_signed_scan.jpg' },
      ],
    },
    faq: [
      { q: 'Will it overwrite my files?', a: 'No. A name clash is renamed to name_1, name_2 and so on, up to 999 variants.' },
      { q: 'Can I preview first?', a: 'Yes. Press d for a dry run that lists every planned move without touching a file.' },
      { q: 'Can I undo a run?', a: 'Not yet. Rollback history is on the roadmap, so use the dry run for now.' },
      { q: 'Can I run it from a script?', a: 'Yes. Add -nui to run any mode headless, for scripts, CI or cron.' },
    ],
    seo: {
      title: 'Tyr · Rust file organizer with ML clustering · Nurysso',
      description:
        'Tyr organizes files by extension, filename similarity or content topic using TF-IDF and K-Means++. A Rust TUI and CLI that runs offline.',
    },
    install: [
      { label: 'Linux · macOS', cmd: 'curl -fsSL https://raw.githubusercontent.com/Nurysso/tyr/main/install.sh | bash' },
      {
        label: 'Windows · PowerShell',
        cmd: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Nurysso/tyr/main/install.ps1" -OutFile "install.ps1"; .\\install.ps1',
      },
      { label: 'From source', cmd: 'git clone https://github.com/Nurysso/tyr.git && cd tyr && make install' },
    ],
    installNote: 'Then run tyr -c ~/Downloads, or tyr -i on a folder of notes.',
    sections: [
      {
        label: 'Modes',
        title: 'Three engines',
        items: [
          {
            title: 'Category (-c)',
            desc: 'Moves files into Images, Documents, Code, Videos and so on, using extension mappings you can edit. Good for Downloads and desktop cleanups.',
          },
          {
            title: 'Filename similarity (-f)',
            desc: 'Combines Levenshtein distance with Jaccard token overlap, so contract_v1.pdf, contract_final.pdf and contract_scan.jpg land together whatever their extensions.',
          },
          {
            title: 'Intelligent (-i)',
            desc: 'Builds TF-IDF vectors from text content plus character n-grams from filenames, then clusters with K-Means++. Groups notes, papers and repos by topic.',
          },
        ],
      },
      {
        label: 'Safety',
        title: 'Built to be undoable',
        items: [
          { title: 'Dry run first', desc: 'Press d to preview every planned move before a file is touched.' },
          {
            title: 'No overwrites',
            desc: 'A name clash becomes name_1, name_2, up to 999 variations, so nothing is lost.',
          },
          { title: 'Local only', desc: 'Runs offline. No telemetry and no cloud calls.' },
        ],
      },
      {
        label: 'Details',
        title: 'Under the hood',
        items: [
          { title: 'Parallel', desc: 'Rayon spreads scanning, feature extraction and clustering across all CPU cores.' },
          { title: 'Terminal UI', desc: 'Ratatui interface with live progress, a category bar chart and scrollable previews.' },
          { title: 'Scriptable', desc: 'Add -nui to run headless from scripts, CI or cron.' },
          { title: 'Configurable', desc: 'One TOML file at ~/.config/tyr/tyr.toml.' },
        ],
      },
      {
        label: 'Roadmap',
        title: 'Coming next',
        items: [
          { title: 'Duplicate detection', desc: 'Fast Blake3 or SHA-256 hashing to find exact duplicates.' },
          { title: 'Date partitioning', desc: 'Organize by EXIF creation date or file timestamps into YYYY/MM folders.' },
          { title: 'Undo and rollback', desc: 'A journal of past runs with one-key rollback.' },
          { title: 'Watch mode', desc: 'A background daemon that organizes Downloads as files arrive.' },
        ],
      },
    ],
  },
  {
    slug: 'vanish',
    title: 'Vanish',
    stack: ['Go', 'Bubble Tea', 'TUI', 'CLI'],
    year: '2025',
    status: 'live',
    summary: 'A safer rm. Deleted files go to a recoverable cache, with a TUI to browse, restore and undo.',
    description:
      'Vanish (vx) replaces rm with a cache you can pull files back from. Delete as usual, then restore by wildcard, check cache stats, or purge anything older than 30 days.',
    repo: 'https://github.com/Nurysso/vanish',
    stats: [
      { value: '8', label: 'themes' },
      { value: '13', label: 'command flags' },
      { value: 'TOML', label: 'config' },
    ],
    usage: {
      title: 'Delete, then change your mind',
      steps: [
        { label: 'Delete', code: 'vx file.txt folder/ *.log' },
        { label: 'Restore by pattern', code: 'vx --restore "*.txt"\nvx --restore "backup-*"\nvx --restore "*.log" "config.*" "test-*"' },
        { label: 'Look after the cache', code: 'vx --list\nvx --stats\nvx --purge 30    # drop anything older than 30 days' },
      ],
    },
    faq: [
      { q: 'Where do deleted files go?', a: 'To a cache directory. vx --path prints its location.' },
      { q: 'Does restoring keep permissions?', a: 'Yes. Original permissions, ACLs and extended attributes are preserved. Symlinks are kept but not followed.' },
      { q: 'Can I move the cache?', a: 'Change the location in the config file, run vx --clear to empty the old one, then restart.' },
      { q: 'How do I skip the prompts?', a: 'Add --noconfirm. Use it with care.' },
    ],
    seo: {
      title: 'Vanish · Safe file deletion with recovery · Nurysso',
      description:
        'Vanish (vx) is a safer rm with recovery and a TUI. Pattern-based restore, 8 themes, TOML config. Built with Go and Bubble Tea.',
    },
    install: [
      { label: 'curl', cmd: 'curl -LsSf https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh' },
      { label: 'wget', cmd: 'wget -qO- https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh' },
    ],
    installNote: 'Then run vx file.txt to delete, vx --list to see the cache, vx --restore "*.txt" to bring files back.',
    sections: [
      {
        label: 'Commands',
        title: 'The whole workflow',
        items: [
          { title: 'vx file.txt folder/ *.log', desc: 'Delete files and directories. They move to the cache instead of disappearing.' },
          { title: 'vx --restore "project-*"', desc: 'Restore by wildcard and flexible matching.' },
          { title: 'vx --list · --info · --stats', desc: 'See what is cached, inspect one file, and track usage.' },
          { title: 'vx --purge 30', desc: 'Remove cached files older than 30 days.' },
        ],
      },
      {
        label: 'Features',
        title: 'What you get',
        items: [
          { title: 'Recoverable by default', desc: 'Nothing is permanently removed until you purge or clear the cache.' },
          { title: 'TUI with 8 themes', desc: 'Browse and restore in a terminal interface you can restyle.' },
          { title: 'Audit trail', desc: 'Every operation is logged.' },
          { title: 'Retention policies', desc: 'Set how long the cache keeps files and when it cleans up.' },
          { title: 'TOML config', desc: 'Behavior, themes and retention in one file.' },
          { title: 'Scriptable', desc: 'Add --noconfirm to skip prompts when you know what you are doing.' },
        ],
      },
    ],
  },
  {
    slug: 'hecate',
    title: 'Hecate',
    stack: ['Hyprland', 'Quickshell', 'QML', 'Lua', 'Rust'],
    year: '2025',
    status: 'live',
    summary: 'Hyprland dotfiles with three ways to customize: answer the installer, click a settings app, or edit one TOML file.',
    description:
      'Most dotfiles hand you someone else\'s setup and a pile of config files. Hecate asks what you use when you install, gives you a settings app for the rest, and keeps the fine detail in a single hecate.toml. Colors can follow your wallpaper.',
    repo: 'https://github.com/Nurysso/hecate',
    stats: [
      { value: '19', label: 'bar widgets' },
      { value: '9', label: 'panels' },
      { value: '6', label: 'desktop cards' },
      { value: '4', label: 'terminals supported' },
    ],
    usage: {
      title: 'One file, live reload',
      steps: [
        { label: '~/.config/hecate/hecate.toml', prompt: false, code: '[theme]\nrounding = 16        # corner radius, 0 for square\nopacity = 0.78       # how solid the glass is\nblur = true\n\n[bar]\nposition = "top"     # or "bottom"\nstyle = "islands"    # "islands", "floating" or "full"\nleft   = ["launcher", "workspaces", "windows"]\ncenter = ["clock"]\nright  = ["media", "tray", "status", "notifications", "power"]' },
        { label: 'The hecate command', code: 'hecate check     # look for updates\nhecate update    # update the dotfiles\nhecate theme     # switch dynamic or static colors\nhecate lock      # pick a lock screen layout' },
      ],
    },
    faq: [
      { q: 'Which distros work?', a: 'Arch and Arch-based systems: Manjaro, EndeavourOS and CachyOS. The Fedora installer is out of date, so use the manual install guide there.' },
      { q: 'Will it overwrite my config?', a: 'The installer backs up your existing configs to ~/.cache/hecate-backup first. Settings changes go to a separate overrides file that loads after yours.' },
      { q: 'The bar is missing. What now?', a: 'Run qs log to see errors with the file and line. Restart with pkill -x quickshell; quickshell & disown.' },
      { q: 'Can I install only the configs?', a: 'Yes. ./install.sh --no-deps skips packages and installs the configs, Hecate Settings and wallpapers.' },
    ],
    seo: {
      title: 'Hecate · Hyprland dotfiles with a settings app · Nurysso',
      description:
        'Hyprland dotfiles for Arch with a Quickshell frosted-glass bar, a native settings app and one TOML file. Colors from your wallpaper. Kitty, Alacritty, Foot or Ghostty.',
    },
    install: [
      { label: 'Install', cmd: 'bash <(curl -fsSL https://raw.githubusercontent.com/Nurysso/Hecate/main/install.sh)' },
      { label: 'Check only', cmd: 'git clone https://github.com/Nurysso/Hecate.git ~/Hecate && cd ~/Hecate && ./install.sh --check' },
    ],
    installNote: 'Supports Arch and Arch-based systems (Manjaro, EndeavourOS, CachyOS). Other distributions are not supported yet.',
    sections: [
      {
        label: 'Depth',
        title: 'Three ways to make it yours',
        items: [
          {
            title: 'Asked once',
            desc: 'The installer asks for your terminal, shell, browser, profile and colors, then installs and wires up exactly that. Existing configs are backed up to ~/.cache/hecate-backup first.',
          },
          {
            title: 'Clicked',
            desc: 'Hecate Settings covers gaps, blur, animations, keybinds, monitors, Wi-Fi, audio and widget placement. Changes preview live.',
          },
          {
            title: 'Written',
            desc: 'hecate.toml holds the finer points: shell corners, glass, bar shape and every widget. Save it and the desktop updates at once.',
          },
        ],
      },
      {
        label: 'Inside',
        title: "What's inside",
        items: [
          {
            title: 'Quickshell shell',
            desc: 'A frosted-glass bar, a control center, an app launcher, notifications, clipboard history, an emoji picker and desktop cards for clock, weather and system stats.',
          },
          {
            title: 'Colors from your wallpaper',
            desc: 'Optional matugen theming reaches the shell, GTK and Qt apps, and the prompt.',
          },
          {
            title: 'Your choice of tools',
            desc: 'Kitty, Alacritty, Foot or Ghostty. Zsh, Bash or Fish. Firefox, Brave, Chromium or Chrome.',
          },
          {
            title: 'Four profiles',
            desc: 'Minimal, developer, gamer, or both together. Each installs the extra software for that use.',
          },
        ],
      },
      {
        label: 'Safety',
        title: 'It will not break your setup',
        items: [
          {
            title: 'Settings never rewrite your config',
            desc: 'Changes apply live but are saved only when you press Apply, to a separate overrides file. Revert puts everything back.',
          },
          {
            title: 'Typos fall back',
            desc: 'A value it cannot use reverts to its default and names the problem in the log, so a bad edit does not take down the desktop.',
          },
        ],
      },
    ],
  },
  {
    slug: 'binrex',
    title: 'BinRex',
    stack: ['Shell', 'Go', 'Rust', 'TypeScript', 'Python'],
    year: '2025',
    status: 'live',
    summary: 'A git-based package manager for my own tools, so every new VM gets them with one command.',
    description:
      'I got tired of retyping setup commands in every fresh VM, and Hecate is too much to install on one. BinRex builds my small tools from source on any OS that has git and the dependencies listed in each tool\'s manifest.json. It also keeps old experiments from rotting in forgotten repos.',
    repo: 'https://github.com/Nurysso/Binrex',
    stats: [
      { value: '9', label: 'tools' },
      { value: 'Any OS', label: 'with git' },
    ],
    faq: [
      { q: 'What do I need?', a: 'git, plus whatever dependencies the tool needs. Each tool lists them in its manifest.json.' },
      { q: 'Which systems does it run on?', a: 'Any OS where git and those dependencies are available.' },
      { q: 'How does it install a tool?', a: 'It is git-based and builds each tool from source.' },
    ],
    sections: [
      {
        label: 'Tools',
        title: "What's in the box",
        items: [
          { title: 'vanish', desc: 'A safer rm with a recoverable cache and a TUI.' },
          { title: 'tyr', desc: 'File organizer with ML clustering, written in Rust.' },
          { title: 'websii', desc: 'A web server that shows your files in the browser and hot-reloads on change.' },
          { title: 'konvert', desc: 'A shell wrapper around ffmpeg for converting files.' },
          { title: 'xtrat', desc: 'Extracts compressed archives of any type.' },
          { title: 'sUpd', desc: 'Updates your system on any distro.' },
          { title: 'gls', desc: 'git ls-files with a tree view and a normal ls mode.' },
          { title: 'poto', desc: 'A fast, simple gallery app for Linux.' },
          { title: 'ggg', desc: 'A collection of animations.' },
        ],
      },
    ],
  },
  {
    slug: 'athena',
    title: 'Athena',
    stack: ['C', 'Kernel'],
    year: '2025',
    status: 'research',
    summary: 'Custom Linux kernel build for learning and experimentation.',
    description:
      'A custom Linux kernel configuration and patch set built to understand low-level systems internals: scheduler behavior, memory management and driver development.',
    repo: 'https://github.com/Nurysso/Athena',
  },
];
