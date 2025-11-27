# Claude Context File

This file provides context for AI assistants working on this project.

## Project Overview

**Owner:** Corey Henderson
**GitHub:** CoreyH
**Repository:** [CoreyH/coreyh-cli-version](https://github.com/CoreyH/coreyh-cli-version)

### Origin Story

This project was forked from [bentossell/bentossell](https://github.com/bentossell/bentossell), an open-source MIT-licensed personal website created by Ben Tossell. Corey forked it to create his own CLI-styled personal website.

The original repo is set as `upstream` remote, allowing us to pull in any improvements Ben makes to the original.

## Tech Stack

- **Framework:** None - vanilla HTML, CSS, and JavaScript
- **Build process:** None required - static site
- **Local dev:** `npm run serve` (runs Python's simple HTTP server on port 8000)
- **Blog:** Markdown-based, use `npm run new-post` to create posts

This is intentionally simple and dependency-free.

## Project Structure

```
├── index.html          # Main entry point - the terminal UI
├── assets/
│   ├── css/styles.css  # All styling including themes
│   ├── js/terminal.js  # Terminal logic and commands
│   └── images/         # Favicon, og:image, etc.
├── blog/               # Blog posts (markdown)
├── create-post.js      # Script to generate new blog posts
├── README.md           # Public readme
├── CLAUDE.md           # This file - AI context
└── package.json        # Project metadata
```

## Current State (v1 Complete)

### Completed
- [x] Forked from bentossell/bentossell
- [x] Created Copenhagen Winter theme (cool, muted Nordic blues)
- [x] Updated all commands for Corey's content
- [x] Changed default theme to copenhagen
- [x] Updated status bar to Copenhagen time (CPH HH:MM)
- [x] Updated title bar, meta tags, shortcut buttons
- [x] Added all contact links (LinkedIn, X, GitHub)
- [x] Updated ASCII art header to "COREYH"
- [x] Updated tagline to "partner/cto at kring. also recordsetter. copenhagen."

### Available Commands
- `help` - Show available commands
- `whoami` - Who is Corey
- `now` - Current focus (late 2025)
- `ventures` - KRING portfolio companies
- `cosmica` - Internal AI/ops stack at KRING
- `recordsetter` - World records platform
- `projects` - Things built
- `agents` - AI agents in use
- `stack` - Dev stack & infrastructure
- `tools` - Daily tools
- `speaking` - Talks & workshops
- `writing` - Essays & digital garden
- `dk` - Life in Denmark
- `contact` - How to reach Corey
- `theme` - Change color theme
- `clear` - Clear terminal
- `music` - Toggle music player

### Easter Eggs
- `sudo` - "you're not the boss of me"
- `hierarches` - "nice try"
- `neofetch` - System info for corey@henderson
- Various unix commands (ls, cat, pwd, cd, etc.)

## Available Themes

1. **copenhagen** (default) - Cool Nordic winter blues
2. **midnight** - Factory Design System warm dark
3. **phosphor** - Classic green CRT
4. **amber** - Warm retro orange
5. **matrix** - Green digital rain
6. **contrast** - High contrast black/white

## Git Remotes

- `origin` → `https://github.com/CoreyH/coreyh-cli-version` (Corey's fork)
- `upstream` → `https://github.com/bentossell/bentossell` (original)

## Content That May Need Updates

These items have placeholder text that Corey needs to fill in:

### Ventures Command
Some portfolio company descriptions are pending:
- Spectia - [description pending]
- Ryma - [description pending]
- Aescolab - [description pending]
- Triba - [description pending]
- Carelog - [description pending]

### Assets
- `assets/images/favicon.png` - Still Ben's favicon, needs Corey's
- `assets/images/card.jpg` - OG image for social sharing
- `assets/images/apple-touch-icon.png` - iOS icon

## Notes for Future Sessions

1. This is Corey's personal site - all content should reflect him, not Ben
2. Keep the CLI aesthetic - that's the whole point
3. No frameworks needed - vanilla JS is intentional and preferred
4. The music player is a fun feature - keep it
5. Test locally with `npm run serve` before pushing changes

## Corey's Info Quick Reference

- **Role:** Partner & CTO at KRING (Copenhagen venture studio)
- **Also:** Co-founder of RecordSetter (since 2008)
- **Location:** Copenhagen, Denmark (American expat since 2020)
- **LinkedIn:** https://www.linkedin.com/in/Coreyh/
- **X/Twitter:** https://x.com/coreyh
- **GitHub:** https://github.com/CoreyH
