# PRD: Corey Henderson Personal CLI Website

## Overview

A terminal-style personal website for Corey Henderson (coreyh.com) that answers three questions quickly:
1. Who is Corey and what does he actually do?
2. What kinds of products/ventures does he build and invest in?
3. How does he think about AI-first engineering?

**Reference implementation:** [Ben Tossell's CLI site](https://bentossell.com) (open source fork as starting point)

**Target URL:** coreyh.com

**Tone:** Casual, self-aware, occasionally funny. The voice of a senior technical person who doesn't take himself too seriously but has genuinely done a lot. Avoid LinkedIn-speak and corporate jargon.

---

## Technical Requirements

### Base
- Fork of Ben Tossell's open-source CLI website
- Should work as a static site or simple deployment (Vercel, Netlify, Cloudflare Pages)
- Mobile-responsive (terminal aesthetic should still work on phones)

### Theme
- **Do NOT use the default amber/orange theme from Ben's site**
- Choose a different default from the included themes, or create a new one
- Suggested directions (pick one):
  - Cool minimal: green-on-black classic terminal, or soft blue/cyan accents
  - Modern dark: purple/magenta accents on dark background
  - Something that feels "Copenhagen winter" — cool, clean, slightly muted
- Keep theme-switching functionality (Ben's site has 5 themes + shift+tab to cycle)

### Status Bar
- Bottom right: Show Copenhagen time (not UK like Ben's)
- Can include a subtle AI model reference if it fits the aesthetic
- Format suggestion: `CPH 16:27` or `Copenhagen • 16:27`

---

## Commands Specification

### help
Shows available commands. Update the list to match Corey's commands below.

```
Available Commands

help          show this help message
whoami        who is corey
now           what i'm focused on right now
ventures      KRING portfolio companies
cosmica       internal AI/ops stack at KRING
recordsetter  my other company
projects      things i've built
agents        AI agents running my life
stack         dev stack & infrastructure  
tools         tools i use daily
speaking      talks & workshops
writing       essays & digital garden
dk            life in denmark
contact       how to reach me
theme         list available themes
theme [name]  switch theme
clear         clear the terminal
```

Optional fun commands (implement if time allows):
- `hierarches` — prints "nice try" or similar
- `sudo` — prints "you're not the boss of me" or similar
- `music` — toggle ambient music (optional, low priority)

---

### whoami

The most important command. First thing most visitors will read.

```
> whoami

I'm Corey Henderson — Partner & CTO at KRING, a venture studio in Copenhagen 
that builds startups in health tech and green tech.

Day-to-day I help founders ship real products before we invest, run tech across 
our portfolio companies, and do a lot of hands-on building myself. 30 years of 
making software, still figuring out how to do it properly.

I also run RecordSetter — a world records platform I co-founded in 2008 that 
gets about 500k visitors a month. It was my full-time job for nearly a decade; 
now I run it solo on Saturdays with a lot of AI help.

American by origin, reluctant cyclist by geography.
```

---

### now

A /now page in CLI form. This should be easy to update (ideally pulls from a simple JSON or markdown file). Content is time-bounded — currently Q4 2025.

```
> now

What I'm focused on (late 2025):

• Building AI-first products at KRING — shipping v1s before term sheets
• Cosmica: our internal ops stack for dashboards, agents, and portfolio data
• Reinventing RecordSetter for 2025/2026 — certificates, creator tools, AI triage
• Giving talks on moving from "vibe coding" to actual systems thinking
• Training a small army of AI agents to run my life so I can bike more
```

---

### ventures

KRING portfolio companies. Keep it factual, focus on Corey's role.

```
> ventures

KRING is a Copenhagen-based venture studio + fund. We build impact startups 
in health and green tech.

Current portfolio companies I work with:

• Conceivio — fertility platform for clinics, AI-powered workflows
• Spectia — [one-line description needed]
• Ryma — [one-line description needed]  
• Orklys — energy community SaaS for local energy sharing
• Aescolab — [one-line description needed]
• Triba — [one-line description needed]
• Carelog — [one-line description needed]

My job: make sure we can go from thesis to live product with tiny, 
AI-augmented teams. I'm hands-on across all of them.

→ kring.com
```

**Note to implementer:** Corey will fill in the one-line descriptions. Leave placeholders.

---

### cosmica

The "nerd candy" command for people who want to know how KRING actually operates.

```
> cosmica

Cosmica is the internal operating system we're building at KRING.

Yes, the grandiose name is intentional.

Pieces currently in motion:

• CoSteer — fund + studio dashboards, SFDR impact metrics, portfolio KPIs
• Launch scaffolding — domain, repo, basic app, analytics, legal templates
• AI Chief-of-Staff — agents that summarize meetings, chase actions, nudge founders
• Translation pipelines — Strapi + DeepL + LLM review for localized content
• Data spine — Postgres + event pipelines feeding everything above

Philosophy: small human team, heavy AI tooling, deliberately boring infrastructure.
```

---

### recordsetter

This is important — it's not a side project, it's a whole other career.

```
> recordsetter

RecordSetter is a world records platform I co-founded in 2008.

For almost a decade it was my full-time job — we raised VC, built a team, 
got millions of users, partnered with brands and TV shows. It's been through 
several reinventions.

Now I run it solo. About 500k people visit every month. I spend my Saturdays 
pushing it forward, with a growing crew of AI agents handling triage, 
verification, and operations.

Current focus: making it stupidly easy to get a verified record certificate 
and "hype kit" that creators can actually use. Treating records as proof of 
achievement that plugs into the creator economy.

It's my longest-running project and my favorite place to experiment.

→ recordsetter.com
```

---

### projects

Selected things Corey has built or is building outside of KRING ventures.

```
> projects

Things I build, maintain, or tinker with:

• T.A.B.S. — an n8n system that watches my computer activity + calendar 
  and writes time entries automatically. Mostly works.

• Image Sifter — GPU pipeline for sorting thousands of photos using 
  vision models. Dormant but real.

• Various agentic dev experiments — MCP setups, Claude Code workflows, 
  container-based agents for testing and shipping features.

• RecordSetter certificate engine — Node/FFmpeg stack for generating 
  shareable, brandable record certificates.
```

---

### agents

The AI agents actually running in Corey's life. This is differentiation.

```
> agents

AI agents currently doing work for me:

• Run Coach — pulls Strava data, nags me about easy miles and recovery
• Email Triage — surfaces what matters, drafts responses, archives noise
• Voicemail Transcriber — turns voice messages into readable text + summaries
• TimeCop (T.A.B.S.) — watches system activity and logs time to projects
• Meeting Scribe — summarizes calls, extracts action items
• [More to come — Corey will add as he documents his n8n workflows]

None of them are magic. All of them are n8n workflows and API calls held 
together with duct tape. They save me hours every week.
```

---

### stack

Corey's default technical stack.

```
> stack

My current defaults for new projects:

Frontend: Next.js, TypeScript, App Router, Tailwind
Backend: Node LTS, Express or tRPC, Postgres when data matters
Infra: Render, Cloudflare, Azure or GCP depending on the venture
AI: Anthropic + OpenAI in the cloud, local runs on a 4060 Ti when needed
Glue: n8n, GitHub Actions, devcontainers

Development: Cursor + Claude as primary coding partners, WSL2 on Windows, 
occasionally macOS or Linux on a Framework laptop.

Philosophy: keep infrastructure boring so we can make the product interesting.
```

---

### tools

Daily tools. Good signal for people evaluating Corey's working style.

```
> tools

Things I have open constantly:

• Cursor — AI-native editor, where most of my code happens now
• Claude — thinking partner, code reviewer, occasional therapist
• n8n — glue for everything, self-hosted
• Notion — company wiki, personal notes, way too many databases
• Linear — when I need real project tracking
• Strava — accountability for running (results vary)
• Terminal — still faster than clicking for most things

Hardware: Windows + WSL2 as main machine, Framework laptop for travel, 
an Unraid server in the closet running too many containers.
```

---

### speaking

Renamed from "talks" to feel less like a speaker circuit.

```
> speaking

I occasionally give talks on AI-first development and venture building.

Most recent:

"From Vibe Coding to Systems Thinking: Agentic Dev for Real Products"
Copenhagen Cursor Meetup, November 2025

The pitch: how to move from ad-hoc prompting to agents in containers, 
with MCP and automated testing loops. Lessons from building real products.

If you're organizing something and this sounds relevant, reach out.
```

---

### writing

Digital garden / essays. This can be a stub that grows over time.

```
> writing

I'm slowly building a digital garden — essays and notes that I tend 
over time rather than publish-and-forget.

Topics I write about:
• AI-first development workflows
• Venture studio operations  
• Running a company solo with AI help
• What 30 years of building software has taught me (still learning)

[Coming soon — migrating old blog posts and adding new pieces]

For now, I mostly post shorter thoughts on X/Twitter.
```

---

### dk

Life in Denmark. Personal but relevant.

```
> dk

American in Copenhagen since 2020.

I moved here with my family for what was supposed to be a year or two. 
Five years later we're still here. The kids bike to school, we've survived 
several Danish winters, and I've mostly accepted that 4pm darkness is a 
personality trait.

We live near the harbor. I bike everywhere, badly. The coffee is excellent, 
the bureaucracy is efficient, and I still say "tomato" wrong.

If you're thinking about relocating to Copenhagen for work, happy to chat 
about the realities.
```

---

### contact

Push toward async, no Calendly.

```
> contact

Best ways to reach me:

• LinkedIn: linkedin.com/in/coreyhenderson [update with actual URL]
• X/Twitter: @coreyh [update with actual handle]
• GitHub: github.com/coreyh [update with actual username]

I'm not on Calendly. Email or DM is best — I have to be dragged into meetings.

If you're a founder building health tech or green tech and want to jam on 
product, AI workflows, or what working with KRING looks like, reach out.
```

---

## Header/Banner

Replace Ben's "BEN TOSSELL" ASCII art with something for Corey.

**Options:**
1. Simple large text: `COREY HENDERSON` in similar style
2. `COREYH` (matching the domain)
3. Custom ASCII art (low priority, simple is fine)

**Tagline under the header:**
Replace Ben's "builder. investor. dad." with something like:
- `building things since the TRS-80. still at it.`
- `partner/cto at kring. also recordsetter. copenhagen.`
- `30 years of shipping software. now with AI help.`

Pick whichever feels right, or let Corey choose from options.

---

## Welcome Message

When the terminal loads, show:

```
welcome to my cli. type help to see commands.
```

Or something slightly more Corey:

```
welcome. type help or just start typing.
hint: try whoami
```

---

## Quick Command Buttons

Ben's site has buttons below the terminal for common commands (whoami, now, investments, tools).

For Corey, suggest:
`whoami` | `now` | `ventures` | `recordsetter`

---

## Future Enhancements (Out of Scope for V1)

These are ideas mentioned but not required for initial launch:

1. **Dynamic `now` command** — pulls from a JSON file or Notion so it stays current
2. **Digital garden integration** — `writing` command links to or displays essays
3. **Blog migration** — old WordPress content brought into the garden
4. **Ventures from data** — portfolio companies pulled from a JSON file for easy updates
5. **Music toggle** — ambient soundtrack (very optional)
6. **Analytics** — simple privacy-respecting analytics (Plausible, Fathom)

---

## Content Corey Needs to Provide

Before launch, fill in:

1. **Ventures one-liners** for: Spectia, Ryma, Aescolab, Triba, Carelog
2. **Contact links** — actual LinkedIn URL, X handle, GitHub username
3. **Additional agents** — review n8n instance and add any worth mentioning
4. **Writing pieces** — even 2-3 placeholder titles for the digital garden
5. **Preferred theme** — pick from Ben's 5 themes or specify a direction
6. **Header tagline** — choose from options or write your own

---

## Success Criteria

The site is done when:

1. All commands work and display correct content
2. Theme is noticeably different from Ben's default
3. Mobile works reasonably well
4. Status bar shows Copenhagen time
5. Quick command buttons are updated
6. Corey has reviewed all copy and it sounds like him

---

## Notes for the Coding AI

- This is forked from Ben Tossell's open source CLI site, so the structure should already exist
- Main work is: updating content, changing theme, adjusting commands
- Keep the architecture simple — this should be easy to update
- Corey will likely iterate on copy after first deploy, so make text easy to edit
- The tone should feel like a smart friend explaining what they do, not a resume