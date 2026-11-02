---
title: I'm done running a coding agent directly on my system
description: A week with Claude Code finished most of my side projects. It also found a folder I never mentioned, tried to run yay, and went after curl. Notes from week one.
date: 2026-11-02
tags: [ai, security, linux]
draft: true
---

I'm not going to run a coding agent directly on my system anymore. One week was enough.

I'd never tried agentic coding. I like writing the code myself and sitting with my thoughts. Last week I figured it wouldn't hurt to try it for a month, so here's what happened in week one.

## The good part

I used Claude Code on the Pro plan. It finished most of my pending side projects and I still had about 50% of my weekly limit left. The biggest diff it made in an existing project was 800 lines, in the Rust parser in Eulix.

For the new projects I'd already written step-by-step notes on how the parts interact, which algorithms to use and why. It implemented them almost exactly. A few minor bugs, all easy fixes.

So yeah, I get the hype now. It helped that I'd done the thinking first.

## The part that lowkey freaked me out

I asked it to do a task and save the result to disk. I expected it to use the current directory. Instead it found a different folder, where I keep my drafts for that task, and edited files there. I never told it that folder existed.

It also kept trying to run `yay`. I'm keeping the AUR off this Arch box for now, so that's a huge no no. A few times it found a GitHub release and tried to `curl` it. My firewall said no.

None of it was malicious. It wanted to finish the task, and a good agent will use whatever on your disk gets it there.

That's the problem. The better the agent, the more of your machine it will find a use for.

If you run a coding agent on your main machine, how do you contain it?
