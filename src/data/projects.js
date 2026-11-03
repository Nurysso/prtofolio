import { EULIX_SITE } from './site.js';

// One entry per project. Each entry renders a card on the home page and a page at /projects/<slug>/.
// Optional fields: site, seo, install, installNote, sections, limits, part.
// `part` names a larger project this one belongs to; the home page shows it as a tag on the card.
// `summary` is written in first person. `limits` lists known rough edges; the first one shows on the card.

export const projects = [
  {
    slug: 'eulix',
    title: 'Eulix',
    stack: ['Rust', 'Go', 'Python', 'MCP', 'LSP'],
    year: '2026',
    status: 'beta',
    summary:
      'I wrote Eulix to index a repository on your machine, then answer each question from the cheapest path that can: exact lookup, BM25, vectors or the call graph. A model is optional.',
    limits: [
      'Call resolution is approximate. Dynamic dispatch, reflection and generated code are best-effort.',
      'C and C++ parsing is limited by macro expansion, and JSX and TSX are not parsed.',
      'The MCP and LSP servers are beta, and macOS binaries are untested.',
    ],
    description:
      'Eulix parses your repository into a queryable index and answers from exact lookup, BM25, vector search and call-graph expansion. An LLM is optional and used only where reasoning is needed. Parsed the 37.3M-line Linux kernel in 57 s with 0 failures.',
    repo: 'https://github.com/Nurysso/eulix',
    site: EULIX_SITE,
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
    slug: 'libeulix',
    title: 'libeulix',
    part: 'Eulix',
    stack: ['Rust', 'Tree-sitter', 'PRISM'],
    year: '2026',
    status: 'live',
    summary:
      "I pulled Eulix's analysis engine out into a Rust crate, so anything that needs the symbols and call graph of a repository can use it without the rest of the toolchain.",
    limits: [
      'Call resolution is approximate. Dynamic dispatch, reflection and generated code are best-effort, so treat the call graph as navigation evidence, not proof.',
      'C and C++ parsing is limited by macro expansion, and JSX and TSX are not parsed.',
      'It needs a C compiler to build, because the tree-sitter grammar crates compile C.',
    ],
    description:
      'libeulix turns source text into structured data: files, symbols, call graphs, project metrics, entry points and dependencies. Tree-sitter parses nine languages, and PRISM resolves the relationships between them into one serializable knowledge base. It is built for large mixed-language repositories, where parsing from scratch for every query is too slow. It has no global state and no required runtime, so it embeds in other programs.',
    repo: 'https://github.com/Nurysso/eulix/tree/main/libeulix',
    site: 'https://crates.io/crates/libeulix',
    stats: [
      { value: '37.3M', label: 'lines parsed, Linux kernel' },
      { value: '9', label: 'languages' },
      { value: '2', label: 'PRISM engines' },
    ],
    usage: {
      title: 'From one file to a call graph',
      steps: [
        { label: 'Add it', code: 'cargo add libeulix' },
        {
          label: 'Parse one file',
          prompt: false,
          code: `use libeulix::grammar_files;
use std::path::Path;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let path = Path::new("src/main.rs");
    let src = std::fs::read_to_string(path)?;

    let (_rel_path, fd) = grammar_files::parse_source(path, &src)?;

    println!("{}: {} functions, {} classes", path.display(), fd.functions.len(), fd.classes.len());

    for f in &fd.functions {
        println!("  fn {} (line {})", f.name, f.line_start);
        for call in &f.calls {
            println!("    → {} at line {}", call.callee, call.line);
        }
    }
    Ok(())
}`,
        },
        {
          label: 'Parse many files and build a call graph',
          prompt: false,
          code: `use libeulix::analyze::call_graph::prism_v2;
use libeulix::grammar_files;
use libeulix::struc::kb_struct::FileData;
use std::collections::BTreeMap;
use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let files: Vec<PathBuf> = vec!["src/lib.rs".into(), "src/main.rs".into()];

    let mut structure: BTreeMap<String, FileData> = BTreeMap::new();
    for path in &files {
        let src = std::fs::read_to_string(path)?;
        let (rel, fd) = grammar_files::parse_source(path, &src)?;
        structure.insert(rel, fd);
    }

    let opts = prism_v2::CallGraphOptions::default();
    let cg = prism_v2::build_with(&structure, &opts);

    println!("{} nodes, {} edges", cg.nodes.len(), cg.edges.len());
    Ok(())
}`,
        },
      ],
    },
    faq: [
      {
        q: 'Do I need the Eulix CLI?',
        a: 'No. libeulix is a library with no global state, no required runtime and no required tokio, so you can embed it in your own program.',
      },
      {
        q: 'Which languages does it parse?',
        a: 'C, C++, Go, Java, JavaScript, PHP, Python, Rust and TypeScript. JSX and TSX are not parsed.',
      },
      {
        q: 'Is the call graph exact?',
        a: 'No. PRISM is approximate, tuned for navigating large repositories rather than proving whole-program behaviour. Dynamic dispatch, reflection and generated code are best-effort.',
      },
      {
        q: 'What do I need to build it?',
        a: 'Rust stable and a C compiler, because the tree-sitter grammar crates compile C at build time.',
      },
      {
        q: 'How do I use more than one core?',
        a: 'Parallelism is opt-in. Run libeulix inside your own rayon pool.',
      },
    ],
    seo: {
      title: 'libeulix · Rust library for multi-language call graphs · Nurysso',
      description:
        'libeulix parses C, C++, Go, Java, JavaScript, PHP, Python, Rust and TypeScript with Tree-sitter and resolves a project-wide call graph with PRISM. A standalone Rust crate.',
    },
    install: [{ label: 'Cargo', cmd: 'cargo add libeulix' }],
    installNote: 'Needs Rust stable and a C compiler for the tree-sitter grammars. The API docs are on docs.rs.',
    sections: [
      {
        label: 'Pipeline',
        title: 'Parse once, navigate many times',
        items: [
          {
            title: 'Parse',
            desc: 'Tree-sitter extracts functions, methods, classes, structs, traits, imports, docstrings, parameters and line ranges into one FileData per file.',
          },
          {
            title: 'Relate',
            desc: 'PRISM merges the files into a KnowledgeBase with a resolved and a reverse call graph, inheritance and type relationships, entry points, indices, patterns and metrics.',
          },
          {
            title: 'Use',
            desc: 'The KnowledgeBase serializes to JSON. Query it directly, or hand it to a retrieval layer without reparsing the repository.',
          },
        ],
      },
      {
        label: 'PRISM',
        title: 'Two relationship engines',
        items: [
          {
            title: 'PRISM v1',
            desc: 'The simpler, high-throughput path. Name-based resolution with broad call-graph coverage at low cost.',
          },
          {
            title: 'PRISM v2',
            desc: 'The scope-aware path. It keeps modules, classes, methods, inheritance, shadowing and receiver context, so common ambiguous calls resolve better than a global name lookup.',
          },
          {
            title: 'Evidence, not proof',
            desc: 'PRISM stands for Polyglot Resolution via Inverted Symbol Map. It is approximate by design: edges are labelled call or inheritance, carry a call-site line and a conditional flag, and are navigation evidence rather than proof of runtime behaviour.',
          },
        ],
      },
      {
        label: 'API',
        title: 'Free functions, no engine',
        items: [
          {
            title: 'grammar_files::parse_source',
            desc: 'Parse one in-memory source file into a FileData. parse_file reads it from disk first.',
          },
          {
            title: 'prism_v2::build_with',
            desc: 'Build a scope-aware call graph from a BTreeMap of FileData. CallGraphOptions sets max_ambiguous (default 8) and strict_imports (default on).',
          },
          {
            title: 'pipeline::analyze_and_build',
            desc: 'Run every analysis pass over a KnowledgeBase, so its call graph, entry points, patterns and external dependencies are filled in.',
          },
          {
            title: 'analyze::*',
            desc: 'Lookup indices, project summary, complexity metrics, entry points, external dependencies and architectural patterns, each available as its own pass.',
          },
        ],
      },
      {
        label: 'Goals',
        title: 'What it is built for',
        items: [
          {
            title: 'Large repositories',
            desc: 'A 30M+ line repository should be something it can process on consumer hardware, not a figure that only holds on a workstation.',
          },
          {
            title: 'Useful output',
            desc: 'Other tools consume it, so stable identifiers and useful source relationships matter as much as raw parse speed.',
          },
          {
            title: 'Cheap approximations',
            desc: 'Not every task needs compiler-grade reasoning. For code navigation, a fast and useful relationship beats an expensive attempt at a perfect one.',
          },
          {
            title: 'Embeddable',
            desc: 'No global state, no required runtime, no required tokio. Every public function takes its input by reference and returns owned data.',
          },
        ],
      },
    ],
  },
  {
    slug: 'eulix-lsp',
    title: 'eulix-lsp',
    part: 'Eulix',
    stack: ['Rust', 'LSP', 'tower-lsp', 'libeulix'],
    year: '2026',
    status: 'beta',
    summary:
      "I wrote eulix-lsp to serve libeulix's knowledge base over the Language Server Protocol, so one server gives an editor outline, go-to-definition, references and call hierarchy for nine languages.",
    limits: [
      'Beta. It only offers what the parse result can back up, so there are no code actions, formatting, signature help or type hover.',
      'Rename only edits open buffers, and go-to-definition returns one target.',
      'JSX and TSX are not supported, and syntax diagnostics are per line, not per error.',
    ],
    description:
      "eulix-lsp is a language server built on libeulix. It supports C, C++, Go, Java, JavaScript, PHP, Python, Rust and TypeScript, and serves symbols, go-to-definition, references, hover, completion, call hierarchy, semantic tokens and workspace diagnostics from libeulix's knowledge base. It leaves out what it cannot back up instead of guessing.",
    repo: 'https://github.com/Nurysso/eulix/tree/main/eulix-lsp',
    stats: [
      { value: '13', label: 'editor features' },
      { value: '9', label: 'languages' },
    ],
    usage: {
      title: 'Build it, point your editor at it',
      steps: [
        { label: 'Build', code: 'cargo build --release' },
        { label: 'Run', code: "./target/release/eulixlsp    # point your editor's LSP client at this binary" },
      ],
    },
    faq: [
      {
        q: 'Which editors work?',
        a: "Any editor with an LSP client. Point it at the built binary.",
      },
      {
        q: 'Why are there no code actions or formatting?',
        a: 'The parse result does not carry what they need, and inventing it would be guesswork.',
      },
      {
        q: 'Does rename change files I have not opened?',
        a: 'No. Rename only edits open buffers. The reverse index gives the file and line of each call site, but a precise edit needs the file text, so closed files are left alone.',
      },
      {
        q: 'Why does go-to-definition give one result?',
        a: 'When a name has several definitions, the server picks the closest: same file, then same directory, then shortest path, then lexicographic. Find references lists them all.',
      },
      {
        q: 'Does it work with JSX and TSX?',
        a: 'No. libeulix detects them but has no parser for either, so the server leaves them out instead of offering features it cannot back up.',
      },
    ],
    seo: {
      title: 'eulix-lsp · Multi-language language server in Rust · Nurysso',
      description:
        'eulix-lsp is a beta language server built on libeulix: outline, hover, go-to-definition, references, completion, call hierarchy and diagnostics for nine languages.',
    },
    install: [
      {
        label: 'From source',
        cmd: 'git clone https://github.com/Nurysso/eulix.git && cd eulix/eulix-lsp && cargo build --release',
      },
    ],
    installNote:
      "Needs Rust stable and a C compiler. It is not on crates.io, so build it from source, then point your editor's LSP client at the binary.",
    sections: [
      {
        label: 'Features',
        title: 'What it does',
        items: [
          {
            title: 'Navigate',
            desc: 'Document outline, go to definition across files, workspace-wide references, same-file highlights, workspace symbols and folding ranges.',
          },
          {
            title: 'Read',
            desc: 'Hover shows the signature, docstring and complexity. Semantic tokens are symbol-level and delta-encoded.',
          },
          {
            title: 'Write',
            desc: 'Prefix-filtered completion ranked by proximity. Rename refuses when the name is ambiguous in the workspace.',
          },
          {
            title: 'Call hierarchy',
            desc: "Incoming and outgoing calls, taken from libeulix's call graph.",
          },
          {
            title: 'Diagnostics',
            desc: 'Syntax errors, duplicate definitions, TODOs and security notes across the workspace, with a file watcher that picks up changes on disk.',
          },
        ],
      },
      {
        label: 'Scope',
        title: 'Left out on purpose',
        items: [
          {
            title: 'No code actions or formatting',
            desc: 'There is no signature help either. The parse result does not carry what they need, and inventing it would be guesswork.',
          },
          {
            title: 'No type hover',
            desc: 'Hover shows what the parser extracted. It does not resolve types through assignments or calls.',
          },
          {
            title: 'One definition target',
            desc: 'When a name has several definitions, the closest wins. Find references lists them all.',
          },
          {
            title: 'Rename edits open buffers',
            desc: 'Closed files are left alone, because a precise edit needs the file text and a guessed whole-line edit would be worse than skipping it.',
          },
          {
            title: 'Prefix completion only',
            desc: 'There is no fuzzy matching and no ranking beyond proximity and sort order.',
          },
          {
            title: 'Symbol-level tokens',
            desc: "Every name the parser extracted gets a token. The rest of the file keeps the editor's own highlighting.",
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
    summary: 'I wrote Tyr, a Rust file organizer, to sort a messy folder by extension, by filename, or by what the files are about.',
    limits: ['There is no undo yet. Rollback is on the roadmap, so use the dry run before a real one.'],
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
    summary: 'I wrote Vanish as a safer rm. Deleted files go to a recoverable cache, with a TUI to browse, restore and undo.',
    limits: ['Moving the cache means emptying the old one with vx --clear and restarting.'],
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
    summary: 'My Hyprland dotfiles, built so you can change them three ways: answer the installer, click a settings app, or edit one TOML file.',
    limits: ['Arch and Arch-based systems only. The Fedora installer is out of date.'],
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
    limits: ['Every tool is built from source, so its dependencies have to be installed first.'],
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
    slug: 'terence',
    title: 'Terence',
    stack: ['Goose', 'IEEE 754', 'C shim'],
    year: '2026',
    status: 'research',
    summary:
      "I wrote Terence, a math library for the Goose language, to have a reason to learn it. It ports the parts of Go's math package I could follow.",
    limits: [
      'Early and unfinished. exp, log, pow, trig, gamma and the rest are still empty files.',
      'fma is not a real fused multiply-add. It computes a*b + c with two roundings.',
      'sqrt calls a small C shim for the hardware instruction, so building needs a C compiler and libm.',
      "Results are not guaranteed to match Go's bit for bit, or to match across platforms.",
    ],
    description:
      "A hobby math library for the Goose programming language, named after Terence Tao. It ports the parts of Go's math package I could get my head around: constants, float bit tricks, rounding, binary ops, decomposition, and sqrt, cbrt and hypot. It aims for Go's behaviour on NaN, ±Inf, signed zero and subnormals, takes plain f64 in and returns plain f64, and is heavily commented. It has not been benchmarked and is not battle-tested.",
    repo: 'https://github.com/Nurysso/terence',
    stats: [
      { value: '34', label: 'functions ported' },
      { value: '21', label: 'test functions' },
      { value: '6', label: 'areas not started' },
    ],
    usage: {
      title: 'Import the directory, call a function',
      steps: [
        { label: 'Get it', code: 'git clone https://github.com/Nurysso/terence.git' },
        {
          label: 'Use it',
          prompt: false,
          code: `import terence from "path/to/terence";   // the directory, not a file

fn main() {
    print("sqrt(9)     = ", sqrt(9.0));
    print("cbrt(27)    = ", cbrt(27.0));
    print("hypot(3, 4) = ", hypot(3.0, 4.0));

    let whole, frac = modf(3.75);
    print("modf(3.75)  = ", whole, " + ", frac);
}`,
        },
        {
          label: 'Run the tests',
          code: 'goose run tests/basic_test.goose\ngoose run tests/bits_test.goose\ngoose run tests/float_binary_ops_test.goose\ngoose run tests/float_decomposition_test.goose',
        },
      ],
    },
    faq: [
      {
        q: 'Why Goose?',
        a: 'I like Go, I like Goose, and math is a well-specified chunk of code to port while working out how a new language feels. That is the whole pitch.',
      },
      {
        q: 'Why the name?',
        a: 'It is named after Terence Tao, because I like the name.',
      },
      {
        q: 'Can I use it for real work?',
        a: 'Not yet. It is early and unfinished, it has not been benchmarked, and it is not battle-tested.',
      },
      {
        q: 'Where does the code come from?',
        a: "A lot of the logic, tests and comments are ported from Go's math package (BSD-3-Clause, Copyright 2009 The Go Authors), and some of that goes back to FreeBSD's msun and Sun's fdlibm. Terence itself is Apache-2.0, and the original licence texts are in the NOTICE file.",
      },
    ],
    seo: {
      title: 'Terence · A math library for the Goose language · Nurysso',
      description:
        "Terence is a hobby math library for the Goose programming language: constants, float bits, rounding, decomposition and roots, ported from Go's math package.",
    },
    install: [{ label: 'Clone', cmd: 'git clone https://github.com/Nurysso/terence.git' }],
    installNote:
      'Needs Goose (I use goose-v2026.3) and a C compiler plus libm for the sqrt shim. Import the terence directory, not a file.',
    sections: [
      {
        label: 'Inside',
        title: "What's here",
        items: [
          {
            title: 'Constants',
            desc: 'E, Pi, Phi, Sqrt2, SqrtE, SqrtPi, SqrtPhi, Ln2, Ln10, Log2E and Log10E, plus the float and int limits such as MaxFloat64 and MaxInt. Works and is tested.',
          },
          {
            title: 'Float bits and basics',
            desc: 'float64_bits, float64_frombits, float32_bits, float32_frombits, nan, inf, is_nan, is_inf, signbit, abs, copysign, normalize and exact_pow2. Works and is tested.',
          },
          {
            title: 'Rounding',
            desc: 'floor, ceil, round, trunc, round_to_even and modf. Works and is tested.',
          },
          {
            title: 'Binary ops',
            desc: 'max, min, dim, mod, remainder and fma. Works and is tested, but fma is not a real fused multiply-add.',
          },
          {
            title: 'Decomposition',
            desc: 'frexp, ldexp, ilogb, logb, next_after and next_after32. Works and is tested.',
          },
          {
            title: 'Roots',
            desc: 'sqrt, cbrt and hypot. They work on the inputs I tried and have no tests yet.',
          },
        ],
      },
      {
        label: 'Goals',
        title: 'What it aims for',
        items: [
          {
            title: "Go's edge cases",
            desc: 'The same behaviour as the Go math package for NaN, ±Inf, signed zero and subnormals, since Go is the reference.',
          },
          {
            title: 'No heap allocation',
            desc: 'Everything is plain f64 in, f64 out. I have not checked with a tool, but nothing in it needs an allocation.',
          },
          {
            title: 'Lots of comments',
            desc: 'I write down why the code does what it does, mostly so future me can follow along.',
          },
        ],
      },
      {
        label: 'Honesty',
        title: 'What it does not claim',
        items: [
          {
            title: 'Not high-performance',
            desc: 'cbrt is a loop of Newton iterations. It is correct-ish, not fast.',
          },
          {
            title: 'Not pure Goose',
            desc: 'sqrt calls a tiny C shim to use the hardware square-root instruction, so building needs a C compiler and libm.',
          },
          {
            title: 'Not bit-identical',
            desc: "Results are not guaranteed to match Go's, or to match across platforms.",
          },
        ],
      },
      {
        label: 'Roadmap',
        title: 'On a free weekend',
        items: [
          { title: 'Tests for the roots', desc: 'Tests for sqrt, cbrt and hypot.' },
          { title: 'exp and log', desc: 'exp, exp2, expm1, log, log2, log10 and log1p.' },
          { title: 'pow', desc: 'pow and pow10.' },
          { title: 'Trig and hyperbolic', desc: 'sin, cos, tan, asin, acos, atan, atan2, sinh, cosh, tanh and friends.' },
          { title: 'The fancy stuff', desc: 'gamma, lgamma, the erf family and Bessel functions.' },
          { title: 'A real fma', desc: 'And maybe getting rid of the C shim.' },
        ],
      },
    ],
  },
];
