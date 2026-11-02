// Strings in `bullets` support two inline marks (see lib/format.js):
//   **text**  → highlighted metric
//   PR #123   → link to that pull request (when the entry has a `repo`)

export const hero = {
  words: ['terminal', 'developers', 'power users'],
  status: 'Open for freelance & full-time',
  bio: 'Software engineer obsessed with performance, clean APIs, and tools that stay out of your way. I build CLI utilities, browser extensions, custom Linux environments, and AI-powered developer tooling.',
  spec: [
    ['Role', 'Systems & backend engineer'],
    ['Stack', 'Rust · Go · C · TypeScript'],
    ['Focus', 'CLIs, Linux, LLM tooling'],
    ['Based', 'Hyderabad, India'],
  ],
  stats: [
    { value: '~900/s', label: 'API calls', note: 'single Rust instance' },
    { value: '200k+', label: 'Transactions / mo', note: 'payments platform' },
    { value: '3', label: 'Upstream PRs', note: 'Canonical Pebble · Gin' },
  ],
};

export const about = [
  "I'm a recent AIML graduate who fell headfirst into systems engineering — and never looked back. I've built across systems programming, developer tooling, web, and product engineering.",
  'I care deeply about correctness, latency, and the craft of writing code that other humans can actually read.',
  'Before switching to systems I was lead frontend developer at a previous job, shipping an internal dashboard that handled thousands of daily transactions.',
];

export const skills = ['Rust', 'GoLang', 'TypeScript', 'C', 'CI/CD', 'Linux', 'Redis', 'MariaDB'];

export const experience = [
  {
    role: 'Backend Engineer',
    company: 'Confidential AI Startup',
    note: 'NDA',
    period: 'Feb 2026 – Apr 2026',
    location: 'Remote',
    bullets: [
      'Engineered a high-throughput Rust service backed by a message broker, sustaining **~900 API calls/sec** on a single instance under sustained production load.',
      'Evaluated hardware-aware transformer inference strategies; benchmarked model execution trade-offs across compute profiles to guide deployment decisions.',
    ],
    tags: ['Rust', 'Systems', 'Inference', 'Message Broker'],
  },
  {
    role: 'Frontend Engineer',
    company: 'Xunoia',
    period: 'Sep 2024 – Sep 2025',
    location: 'Hyderabad, India',
    bullets: [
      'Built a payment-integrated task manager in TypeScript/React handling **200k+ monthly transactions**, delivered on schedule across the full contract term.',
      'Diagnosed production incidents from unstable third-party APIs; implemented a schema-validation layer that reduced breaking-change crashes by **90%**.',
      'Authored incident reports, root-cause analyses, and architectural decision records that cut onboarding time and prevented recurring failures.',
    ],
    tags: ['TypeScript', 'React', 'Payments', 'API Design'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Bluestock Fintech',
    period: 'Mar 2025 – Jun 2025',
    location: 'Hyderabad, India',
    bullets: [
      'Built and maintained internal dashboard and backend systems in Go, supporting core fintech and stock-data workflows.',
      'Led a cross-functional team of **15 interns** to deliver project milestones on schedule across frontend, backend, and QA workstreams.',
    ],
    tags: ['Go', 'Fintech', 'Team Lead', 'Dashboards'],
  },
];

export const oss = [
  {
    org: 'Canonical / Pebble',
    repo: 'https://github.com/canonical/pebble',
    lang: 'Go',
    period: 'Feb 2026 – Present',
    bullets: [
      "Fixed a misleading error in the pull command when a remote file doesn't exist (PR #754) — traced root cause to unexpected multipart response ordering, refactored processing into a shared processResponsePart() helper.",
      'Resolved Sphinx redirect warnings across documentation (PR #749), preserving two intentional exceptions with clear justification in the PR description.',
    ],
  },
  {
    org: 'Gin-Gonic / Gin',
    repo: 'https://github.com/gin-gonic/gin',
    lang: 'Go',
    period: 'Dec 2025 – Present',
    bullets: [
      'Co-authored a ClientIP parsing fix for multiple X-Forwarded-For headers (PR #4472) — diagnosed the edge case, reasoned through the HTTP spec, and documented the fix clearly for maintainer review.',
    ],
  },
];

export const misc = [
  {
    org: 'Harvard Project for Asian and International Relations',
    title: 'HPAIR Delegate 2026',
    desc: 'Selected to participate in high-level workshops on international development, global governance, and conflict management alongside policymakers and academics from across the world. Demonstrated public speaking and cross-cultural collaboration skills.',
  },
  {
    org: 'Mentored students to build projects and think before using AI to write code',
    title: 'Hackprix S2 & S3 Mentor',
    desc: 'Mentored 20+ teams to build something meaningful during Hackathon',
  },
];
