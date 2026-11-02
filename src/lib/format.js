const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (c) => ESCAPES[c]);

// Inline marks used in data strings: **metric** and "PR #123" (linked when `repo` is given)
export function inline(text, { repo } = {}) {
  let html = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong class="num">$1</strong>');
  if (repo) {
    html = html.replace(
      /PR #(\d+)/g,
      `<a class="pr" href="${repo}/pull/$1" target="_blank" rel="noopener noreferrer">PR #$1</a>`
    );
  }
  return html;
}

export const STATUS = {
  live: { glyph: '●', label: 'Live' },
  beta: { glyph: '◐', label: 'Beta' },
  research: { glyph: '○', label: 'Research' },
};

export const pad = (n) => String(n).padStart(2, '0');

export const formatDate = (date) => date.toISOString().slice(0, 10);
