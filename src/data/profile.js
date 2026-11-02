// Strings in `bullets` support two inline marks (see lib/format.js):
//   **text**  → highlighted metric
//   PR #123   → link to that pull request (when the entry has a `repo`)

export const hero = {
  words: ['terminal', 'developers', 'power users'],
  status: 'Open for freelance & full-time',
  bio: 'I build backend systems and developer tools in Rust and Go. My flagship project, Eulix, parses the 37-million-line Linux kernel in 57 seconds and runs entirely on your machine.',
  spec: [
    ['Role', 'Systems & backend engineer'],
    ['Stack', 'Rust · Go · TypeScript · Python'],
    ['Focus', 'Code intelligence, CLIs, MCP/LSP'],
    ['Based', 'Hyderabad, India'],
  ],
  stats: [
    { value: '200k+', label: 'Transactions / mo', note: 'payments platform' },
    { value: '37M', label: 'Lines in 57 s', note: 'Linux kernel · Eulix' },
    { value: '3', label: 'Upstream PRs', note: 'Canonical Pebble · Gin' },
  ],
};

export const about = [
  "I studied AI and ML, then went into systems work. In two years I've shipped a payments product that handles 200k+ transactions a month, built Rust and Go services for a startup's microservice stack, and written a code-intelligence platform of my own.",
  "Eulix is the project I'm proudest of: a Rust parser and library, a Go CLI, a Python embedding service, MCP and LSP servers, and a browser call-graph explorer. All of it runs locally.",
  'I also send fixes upstream, to Gin and to Canonical\'s Pebble. I care about correctness, latency, and code the next person can read.',
];

export const skills = ['Rust', 'Go', 'TypeScript', 'Python', 'C', 'Docker', 'CI/CD', 'Linux', 'Redis', 'MariaDB'];

export const experience = [
  {
    role: 'Software Development Engineer (Contract)',
    company: 'Confidential Startup',
    note: 'NDA',
    period: 'Feb 2026 – Present',
    location: 'Remote',
    bullets: [
      'Architected modular error-handling and utility packages in Rust and Go, standardizing error propagation and logging across distributed internal microservices.',
      'Audited application security and core architecture; identified, patched, and refactored critical vulnerabilities in authentication and account-management pipelines.',
      'Led code reviews across internal repositories, catching logic regressions and invalid AI-generated contributions to protect codebase integrity.',
    ],
    tags: ['Rust', 'Go', 'Microservices', 'Security'],
  },
  {
    role: 'Frontend Engineer',
    company: 'Xunoia',
    period: 'Sep 2024 – Sep 2025',
    location: 'Hyderabad, India',
    bullets: [
      'Built a payment-integrated task manager (TypeScript, React, Next.js) handling **200k+ monthly transactions**, owned end-to-end from API design to deployment.',
      'Shipped runtime schema validation at the API boundary of a frontend and backend built in parallel against shifting requirements, cutting breaking-change crashes by **90%**.',
      'Authored architectural decision records and onboarding docs, reducing new-engineer ramp time and recurring failures.',
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
    period: '2025 – 2026',
    bullets: [
      'Fixed multipart response-stream error handling in the pull command (PR #754), refactoring processing into a shared processResponsePart() helper.',
      'Resolved documentation-pipeline build failures from Sphinx redirect warnings (PR #749).',
    ],
  },
  {
    org: 'Gin-Gonic / Gin',
    repo: 'https://github.com/gin-gonic/gin',
    lang: 'Go',
    period: '2025 – 2026',
    bullets: [
      'Patched a ClientIP parsing vulnerability for spoofed X-Forwarded-For headers (PR #4472) and proposed RFC-compliant HTTP QUERY routing.',
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
