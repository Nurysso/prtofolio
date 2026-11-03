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
  'I studied AI and ML, then moved into systems work. I like maths, and I like knowing what is underneath: how the kernel schedules a thread, what a function call looks like by the time it reaches the CPU. That habit is most of what makes me a good programmer.',
  'Away from the keyboard I cook and bake, eat too much chocolate and pizza, and will defend The Lord of the Rings, Star Wars and One Piece as literature.',
  'If you hire me, I will cook something wonderful. I will also try not to burn the database down.',
];

// Short, checkable habits. Each one is backed by something in the work history below.
export const workingWithMe = [
  'I read the diff before the description.',
  'I write the decision down, so the next engineer does not have to guess.',
  'I think before I let a model write the code, and I check what it wrote.',
  'If I think the plan is wrong, I will say so early.',
];

export const skillTiers = [
  { label: 'Daily', items: ['Rust', 'Go', 'Linux'] },
  { label: 'Comfortable', items: ['TypeScript', 'Python', 'Docker', 'CI/CD', 'Redis', 'MariaDB'] },
  { label: 'Can read', items: ['C'] },
];

// Flat list for structured data (schema.org knowsAbout)
export const skills = skillTiers.flatMap((tier) => tier.items);

export const experience = [
  {
    role: 'Software Development Engineer (Contract)',
    company: 'Confidential Startup',
    note: 'NDA',
    redact: true,
    period: 'Feb 2026 – Present',
    location: 'Remote',
    bullets: [
      'Architected modular error-handling and utility packages in Rust and Go, standardizing error propagation and logging across distributed internal microservices.',
      'Audited application security and core architecture; identified, patched, and refactored critical vulnerabilities in authentication and account-management pipelines.',
      'Led code reviews across internal repositories, catching logic regressions and invalid AI-generated contributions to protect codebase integrity.',
    ],
    lesson: 'If every service fails in the same shape, incidents get easier to read.',
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
    lesson: 'When requirements keep moving, check the data at the boundary instead of trusting the types.',
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
    lesson: "With 15 people on one deadline, the job is making each person's next step obvious.",
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
    org: 'Hackathon mentoring',
    title: 'Hackprix S2 & S3 Mentor',
    desc: 'Mentored 20+ teams to build something meaningful, and to think before using AI to write their code.',
  },
  {
    org: 'Inter-college competition',
    title: 'Won the drawing competition',
    desc: 'Won by recreating "Ruin" by jonoDry.',
  },
  {
    org: 'State-level competition',
    title: 'Won the baking competition',
  },
];
