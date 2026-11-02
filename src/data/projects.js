// One entry per project. Each entry renders a card on the home page and a page at /projects/<slug>/.
// Optional fields: site, seo, install, installNote, sections.

export const projects = [
  {
    slug: 'eulix',
    title: 'Eulix',
    stack: ['Rust', 'Go', 'Python', 'LLM'],
    year: '2026',
    status: 'beta',
    summary:
      'Turns your codebase into a searchable book. Ask questions about your code, get accurate answers using local or cloud LLMs.',
    description:
      'Offline-first codebase intelligence — indexes your project with AST parsing, stores context in Redis, and answers questions via a local LLM. No data leaves your machine.',
    repo: 'https://github.com/Nurysso/eulix',
    install: [
      {
        label: 'Linux',
        cmd: 'curl -fsSL https://raw.githubusercontent.com/nurysso/eulix/main/install.sh | bash',
      },
      {
        label: 'Windows · PowerShell',
        cmd: 'Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nurysso/eulix/main/install.ps1" -OutFile "$env:TEMP\\install.ps1"; powershell -ExecutionPolicy Bypass -File "$env:TEMP\\install.ps1"',
      },
    ],
    installNote: 'macOS: no binaries yet — compile from source.',
    sections: [
      {
        label: 'Pipeline',
        title: 'How it works',
        items: [
          {
            title: 'Index',
            desc: 'Rust parser walks your repo, extracting symbols, call graphs, and control-flow — plus deep per-language signals like generics, trait impls, and goroutines. Python embedder generates 768-dim semantic vectors on GPU.',
          },
          {
            title: 'Retrieve',
            desc: 'Four-stage pipeline: exact symbol match → BM25 keyword (with proximity scoring) → semantic vector → call-graph expansion, with subsystem-aware boosting to filter out test and vendor noise. MMR re-ranking for diversity.',
          },
          {
            title: 'Answer',
            desc: 'Budget-allocated, re-ranked context is passed to your LLM with a structured chain-of-thought prompt. Grounded in your actual code.',
          },
        ],
      },
      {
        label: 'Why',
        title: 'Why Eulix',
        items: [
          {
            title: 'Private by default',
            desc: 'Parse, embed, and reason entirely on your machine. Nothing leaves unless you configure a cloud LLM.',
          },
          {
            title: 'Any LLM',
            desc: 'OpenAI, Anthropic, Gemini, Ollama, LM Studio, or any OpenAI-compatible endpoint.',
          },
          {
            title: 'Small model, big results',
            desc: 'Subsystem-aware retrieval and noise filtering keep context tight, so even a local 7B model rivals hosted alternatives.',
          },
          {
            title: 'Scales to monorepos',
            desc: 'Streaming, mmap-backed loaders keep memory flat past 20M LOC and 300K+ chunks — proven on OpenStack-scale monorepos.',
          },
        ],
      },
      {
        label: 'Use cases',
        title: 'Where it helps',
        items: [
          { title: 'Onboarding', desc: 'Understand what a module does without reading every file.' },
          { title: 'Debugging', desc: 'Trace execution flow and caller/callee chains through unfamiliar code.' },
          { title: 'Refactoring', desc: 'See the blast radius of a change before you make it.' },
          { title: 'Security', desc: 'Find every caller of a sensitive function.' },
          { title: 'Architecture', desc: 'Map how components actually interact at the call graph level.' },
        ],
      },
    ],
  },
  {
    slug: 'tyr',
    title: 'Tyr',
    stack: ['Rust', 'CLI', 'ML'],
    year: '2025',
    status: 'live',
    summary:
      'File organizer that uses ML to understand relationships between files and group them intelligently — not just by extension.',
    repo: 'https://github.com/Nurysso/tyr',
  },
  {
    slug: 'vanish',
    title: 'Vanish',
    stack: ['Go', 'TUI', 'CLI'],
    year: '2025',
    status: 'live',
    summary: 'Modern safe alternative to rm. Beautiful TUI, pattern restore, themes, and full undo functionality.',
    description:
      'Never lose files again. Vanish wraps deletion in a recoverable cache with a full TUI for browsing, restoring, and managing deleted files.',
    repo: 'https://github.com/Nurysso/vanish',
    seo: {
      title: 'Vanish · Safe file deletion with recovery · Nurysso',
      description:
        'Vanish (vx) is a modern, safe file deletion tool with recovery and a TUI. Pattern-based restoration, 8 themes, TOML config. Built with Go and Bubble Tea.',
    },
    install: [
      { label: 'curl', cmd: 'curl -LsSf https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh' },
      { label: 'wget', cmd: 'wget -qO- https://raw.githubusercontent.com/Nurysso/vanish/main/install.sh | sh' },
    ],
    sections: [
      {
        label: 'Features',
        title: 'What you get',
        items: [
          { title: 'Safe deletion', desc: 'Files moved to cache, not permanently deleted.' },
          { title: 'Pattern recovery', desc: 'Restore files using flexible pattern matching.' },
          { title: 'Rich statistics', desc: 'Detailed insights into cache usage and metrics.' },
          { title: 'TUI', desc: 'Modern interface with 8 built-in themes.' },
          { title: 'Fast operations', desc: 'Optimized for large directories and files.' },
          { title: 'Configurable', desc: 'Extensive customization via TOML config.' },
          { title: 'Audit trails', desc: 'Comprehensive logging of all operations.' },
          { title: 'Auto cleanup', desc: 'Configurable retention and purging policies.' },
        ],
      },
    ],
  },
  {
    slug: 'hecate',
    title: 'Hecate',
    stack: ['Shell', 'QML', 'Lua'],
    year: '2025',
    status: 'live',
    summary: 'Hyprland dotfiles with auto-theming and a clean UI layer built on Quickshell.',
    description:
      'A full Linux desktop environment configuration for Hyprland with automated theming, custom widgets, and a cohesive visual system built from scratch.',
    repo: 'https://github.com/Nurysso/hecate',
    seo: {
      title: 'Hecate · Hyprland dotfiles with automatic theming · Nurysso',
      description:
        'Hyprland dotfiles with dynamic theming extracted from your wallpaper. Supports Alacritty, Kitty, Foot and Ghostty; Bash, Zsh and Fish.',
    },
    install: [
      { label: 'Install', cmd: 'curl -fsSL https://raw.githubusercontent.com/Nurysso/Hecate/main/install.sh | bash' },
    ],
    installNote: 'Requires git and gum.',
    sections: [
      {
        label: 'Features',
        title: "What's inside",
        items: [
          {
            title: 'Dynamic theming',
            desc: 'Automatically extracts colors from your wallpaper and applies them across your entire system in real-time.',
          },
          {
            title: 'Smart installation',
            desc: 'Interactive setup that asks for your preferences upfront - less manual config editing needed.',
          },
          { title: 'Multi-shell support', desc: 'Choose your preferred shell during installation: Bash, Zsh, or Fish.' },
          { title: 'Multiple terminals', desc: 'Support for Alacritty, Kitty, Foot, and Ghostty terminal emulators.' },
          {
            title: 'Safe backups',
            desc: 'Automatically backs up your existing configurations before making any changes.',
          },
          {
            title: 'All-in-one setup',
            desc: 'Single command installation with intelligent package management detection.',
          },
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
      'A custom Linux kernel configuration and patch set built to understand low-level systems internals — scheduler behavior, memory management, and driver development.',
    repo: 'https://github.com/Nurysso/Athena',
  },
  {
    slug: 'binrex',
    title: 'BinRex',
    stack: ['TypeScript', 'GoLang', 'Python', 'Rust', 'Shell'],
    year: '2025',
    status: 'live',
    summary: 'A collection of binaries i build for fun/Learn new languages and do some experimentation',
    description:
      'just a bunch of random stuff i built to learn coding and honestly just mess around. made this package manager thing because typing the same commands over and over in every new VM was getting annoying',
    repo: 'https://github.com/Nurysso/Binrex',
  },
];
