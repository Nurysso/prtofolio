export const site = {
  url: 'https://nurysso.github.io',
  name: 'Dawood Khan',
  handle: 'Nurysso',
  title: 'Dawood Khan (Nurysso) · Systems & Backend Engineer',
  description:
    'Software engineer building backend systems and developer tools in Rust and Go. Creator of Eulix, a local-first code-intelligence platform that parses the Linux kernel in under a minute; contributor to Canonical Pebble and Gin.',
  email: 'contact.dawood@proton.me',
  version: '2.0.0',
  // Home page palette: 'forge' (warm, ember accent) or 'mono' (black and white). Palettes live in styles/home.css.
  palette: 'mono',
};

// The Eulix landing page lives in its own repo. /eulix/ redirects here (astro.config.mjs) and the Eulix project
// page links here. The old in-site version is kept in not_used/.
export const EULIX_SITE = 'https://nurysso.github.io/eulix-landing/';

export const nav = [
  { id: 'about', label: 'about', href: '/#about' },
  { id: 'work', label: 'work', href: '/#work' },
  { id: 'writing', label: 'writing', href: '/writing/' },
  { id: 'contact', label: 'contact', href: '/#contact' },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/Nurysso' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nurysso/' },
  { label: 'X', href: 'https://x.com/Nurysso' },
];

export const mastodon = 'https://mastodon.social/@d4ud';
