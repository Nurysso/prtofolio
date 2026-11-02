---
title: Post template
description: Copy this file to start a new post. Drafts are visible in dev and excluded from production builds.
date: 2026-10-27
tags: [meta]
draft: true
---

Every `.md` file in `src/content/writing/` becomes a page at `/writing/<file-name>/`.

## Frontmatter

| Field         | Required | Notes                                  |
| ------------- | -------- | -------------------------------------- |
| `title`       | yes      | Page title and list entry              |
| `description` | yes      | Shown in lists and in meta tags        |
| `date`        | yes      | `YYYY-MM-DD`, newest posts list first  |
| `tags`        | no       | List of strings                        |
| `draft`       | no       | `true` hides the post in production    |

## Code

Code blocks are highlighted in grayscale to match the site:

```rust
fn main() {
    // comments render in the subtle gray
    let greeting = "hello, world";
    println!("{greeting}");
}
```

> Blockquotes, lists, and inline `code` are styled too.

- one
- two
- three
