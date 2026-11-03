// Splits one line of shell into styled pieces for the terminal windows. Build time only.
// Kinds: cmd (first word), flag (-x, --long), str ("quoted"), arg, space, comment (# ...).
// Whitespace is kept as written, so the aligned comments in the project data stay aligned.

export function highlight(line) {
  const at = line.search(/\s#(\s|$)/);
  const code = at === -1 ? line : line.slice(0, at);
  const comment = at === -1 ? '' : line.slice(at);

  const parts = [];
  let first = true;
  for (const [text] of code.matchAll(/"[^"]*"|\s+|\S+/g)) {
    if (/^\s+$/.test(text)) parts.push({ kind: 'space', text });
    else if (first) {
      parts.push({ kind: 'cmd', text });
      first = false;
    } else if (text.startsWith('"')) parts.push({ kind: 'str', text });
    else if (text.startsWith('-')) parts.push({ kind: 'flag', text });
    else parts.push({ kind: 'arg', text });
  }
  if (comment) parts.push({ kind: 'comment', text: comment });
  return parts;
}
