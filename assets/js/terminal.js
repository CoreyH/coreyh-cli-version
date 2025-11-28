// Terminal state
const state = {
  history: [],
  historyIndex: -1,
  theme: localStorage.getItem("terminal-theme") || "copenhagen",
  commandCount: 0,
};

// Fun vibes that rotate
const vibes = [
  "building things",
  "shipping fast",
  "caffeinated",
  "in the zone",
  "thinking...",
  "exploring ideas",
  "debugging life",
  "ctrl+c ctrl+v",
  "tabs not spaces",
  "git push -f",
  "rm -rf doubts",
  "npm install coffee",
  "iterating",
  "deep work",
  "async mode",
  "biking to work",
  "surviving winter",
  "training agents",
  "prompt engineering",
  "one more commit...",
];

// Available themes
const themes = ["copenhagen", "midnight", "matrix", "contrast", "ubuntu", "retro-crt", "retro-green", "retro-pc"];

// Commands registry
const commands = {
  help: {
    desc: "show available commands",
    fn: () => {
      const lines = [
        "",
        '  <span class="bold white">Available Commands</span>',
        "",
        '  <span class="cmd">help</span>          show this help message',
        '  <span class="cmd">whoami</span>        who is corey',
        '  <span class="cmd">now</span>           what i\'m focused on right now',
        '  <span class="cmd">ventures</span>      KRING portfolio companies',
        '  <span class="cmd">cosmica</span>       internal AI/ops stack at KRING',
        '  <span class="cmd">recordsetter</span>  my other company',
        '  <span class="cmd">projects</span>      things i\'ve built',
        '  <span class="cmd">agents</span>        AI agents running my life',
        '  <span class="cmd">stack</span>         dev stack & infrastructure',
        '  <span class="cmd">tools</span>         tools i use daily',
        '  <span class="cmd">speaking</span>      talks & workshops',
        '  <span class="cmd">writing</span>       essays & digital garden',
        '  <span class="cmd">dk</span>            life in denmark',
        '  <span class="cmd">contact</span>       how to reach me',
        '  <span class="cmd">theme</span>         list available themes',
        '  <span class="cmd">theme [name]</span>  switch theme',
        '  <span class="cmd">clear</span>         clear the terminal',
        '  <span class="cmd">music</span>         toggle music player',
        "",
        '  <span class="muted">tip: shift+tab to cycle themes</span>',
        "",
      ];
      return lines.join("\n");
    },
  },
  whoami: {
    desc: "who is corey",
    fn: () => {
      return `
  <span class="bold white">Corey Henderson</span>

  I'm Corey Henderson — Partner & CTO at KRING, a venture studio in Copenhagen
  that builds startups in health tech and green tech.

  I split my time between shipping our own zero-to-one products, supporting
  portfolio companies, early-stage investing, and writing code to glue it all
  together. 

  I also run RecordSetter — a world records platform I co-founded in 2008 that
  gets about 500k visitors a month. It was my full-time job for nearly a decade;
  now I run it solo on Saturdays with a lot of AI help.

  American. Copenhagen. It makes more sense than it sounds.

  type <span class="cmd">now</span> to see what i'm currently up to.
`;
    },
  },
  about: {
    desc: "alias for whoami",
    fn: () => commands.whoami.fn(),
  },
  now: {
    desc: "current focus",
    fn: () => {
      return `
  <span class="bold white">What I'm focused on (late 2025):</span>

  • Building AI-first products at KRING — shipping v1s before term sheets
  • Cosmica: our internal ops stack for dashboards, agents, and portfolio data
  • Reinventing RecordSetter for 2025/2026 — certificates, creator tools, AI triage
  • Giving talks on moving from "vibe coding" to actual systems thinking
  • Training a small army of AI agents to run my life so I can bike more
`;
    },
  },
  ventures: {
    desc: "KRING portfolio",
    fn: () => {
      return `
  <span class="bold white">KRING Ventures</span>

  KRING is a Copenhagen-based venture studio + fund. We build impact startups
  in health and green tech.

  Current portfolio companies I work with:

  • <span class="accent">Conceivio</span> — fertility platform for clinics, AI-powered workflows
  • <span class="accent">Spectia</span> — [description pending]
  • <span class="accent">Ryma</span> — [description pending]
  • <span class="accent">Orklys</span> — energy community SaaS for local energy sharing
  • <span class="accent">Aescolab</span> — [description pending]
  • <span class="accent">Triba</span> — [description pending]
  • <span class="accent">Carelog</span> — [description pending]

  My job: make sure we can go from thesis to live product with small,
  AI-augmented teams. I'm hands-on across all of them.

  → <a href="https://kring.com" target="_blank" rel="noopener">kring.com</a>
`;
    },
  },
  cosmica: {
    desc: "KRING internal ops",
    fn: () => {
      return `
  <span class="bold white">Cosmica</span>

  Cosmica is the internal operating system we're building at KRING.

  Yes, the grandiose name is tongue-in-cheek.

  Pieces currently in motion:

  • <span class="accent">CoSteer</span> — fund + studio dashboards, SFDR impact metrics, portfolio KPIs
  • <span class="accent">Launch scaffolding</span> — domain, repo, basic app, analytics, legal templates
  • <span class="accent">AI Chief-of-Staff</span> — agents that summarize meetings, chase actions, nudge founders
  • <span class="accent">Translation pipelines</span> — Strapi + DeepL + LLM review for localized content
  • <span class="accent">Data spine</span> — Postgres + event pipelines feeding everything above

  Philosophy: small human team, heavy AI tooling, simple infrastructure.
`;
    },
  },
  recordsetter: {
    desc: "world records platform",
    fn: () => {
      return `
  <span class="bold white">RecordSetter</span>

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

  → <a href="https://recordsetter.com" target="_blank" rel="noopener">recordsetter.com</a>
`;
    },
  },
  projects: {
    desc: "things i've built",
    fn: () => {
      return `
  <span class="bold white">Projects</span>

  Things I build, maintain, or tinker with:

  • <span class="accent">T.A.B.S.</span> — an AI-powered system that watches my computer activity + calendar
    and writes time entries automatically. Mostly works.

  • <span class="accent">Image Sifter</span> — GPU pipeline for sorting thousands of photos using
    vision models. Dormant but interesting.

  • <span class="accent">Various agentic dev experiments</span> — MCP setups, Claude Code workflows,
    container-based agents for testing and shipping features.

  • <span class="accent">RecordSetter certificate engine</span> — Node/FFmpeg stack for generating
    shareable, brandable record certificates.
`;
    },
  },
  agents: {
    desc: "AI agents running my life",
    fn: () => {
      return `
  <span class="bold white">AI Agents</span>

  AI agents currently doing work for me:

  • <span class="accent">Run Coach</span> — pulls Strava data, nags me about easy miles and recovery
  • <span class="accent">Email Triage</span> — surfaces what matters, drafts responses, archives noise
  • <span class="accent">Voicemail Transcriber</span> — turns voice messages into readable text + summaries
  • <span class="accent">T.A.B.S.</span> — watches system activity and logs time to projects

  Watch this space.
`;
    },
  },
  stack: {
    desc: "dev stack",
    fn: () => {
      return `
  <span class="bold white">Tech Stack</span>

  My current defaults for new projects:

  <span class="muted">Frontend:</span>  Next.js, TypeScript, App Router, Tailwind, Shadcn/UI
  <span class="muted">Backend:</span>   Node LTS + tRPC, Postgres or Supabase
  <span class="muted">Infra:</span>     Render, Cloudflare, Azure or GCP depending on the venture
  <span class="muted">AI:</span>        Anthropic + OpenAI in the cloud, local runs on a 4060 Ti when needed
  <span class="muted">Glue:</span>      n8n, GitHub Actions, devcontainers

  <span class="muted">Development:</span> Cursor + Claude as primary coding partners, WSL2 on Windows,
  occasionally macOS or Linux on a Framework laptop.

  Philosophy: keep infrastructure simple so we can focus on the product and PMF.
`;
    },
  },
  tools: {
    desc: "tools i use",
    fn: () => {
      return `
  <span class="bold white">Tools</span>

  Things I have open constantly:

  • <a href="https://chatgpt.com" target="_blank" rel="noopener">ChatGPT</a> — Daily driver AI
  • <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a> — Used for when I want the most "human" responses and opinions
  • <a href="https://cursor.sh" target="_blank" rel="noopener">Cursor</a> — AI-native editor, where most of my code happens now
  • <a href="https://n8n.io" target="_blank" rel="noopener">n8n</a> — glue for everything, using both self-hosted and cloud
  • <a href="https://strava.com" target="_blank" rel="noopener">Strava</a> — accountability for running (results vary)
  

  <span class="muted">Hardware:</span> Windows + WSL2 as main machine, Framework laptop for travel,
  an Unraid server in the closet running too many containers.
`;
    },
  },
  speaking: {
    desc: "talks & workshops",
    fn: () => {
      return `
  <span class="bold white">Speaking</span>

  I occasionally give talks on various topics. Lately, that's been AI-first development and venture building.

  Most recent:

  <span class="accent">"From Vibe Coding to Systems Thinking: Agentic Dev for Real Products"</span>
  Copenhagen Cursor Meetup, November 2025

  The pitch: how to move from ad-hoc prompting to agents in containers,
  with MCP and automated testing loops. Lessons from building real products.

  If you're organizing something and this sounds relevant, reach out.
`;
    },
  },
  writing: {
    desc: "essays & digital garden",
    fn: () => {
      return `
  <span class="bold white">Writing</span>

  I'm slowly building a digital garden — essays and notes that I tend
  over time rather than publish-and-forget.

  Topics I write about:
  • AI-first development workflows
  • Venture studio operations
  • Running a company solo with AI help
  • What 30 years of building software has taught me (still learning)

  [Coming soon — migrating old blog posts and adding new pieces]

  For now, I mostly post shorter thoughts on X/Twitter.
`;
    },
  },
  dk: {
    desc: "life in denmark",
    fn: () => {
      return `
  <span class="bold white">Life in Denmark</span>

  American in Copenhagen since 2020.

  I moved here with my family from the US via Belgrade, Serbia during the height of the pandemic.
  Five years later we are all still loving it here. The kids bike to school, their Danish is 
  excellent, mine, not so much. My wife Emily is thriving in her career as a photographer
  — <a href="https://emilywilsonphotography.com" target="_blank" rel="noopener">emilywilsonphotography.com</a>

  We live near the harbor. I bike everywhere — it's one of my favorite things
  about living here. The coffee is excellent, the food is great,
  the bureaucracy is efficient, and I still can't pronounce anything properly.

  If you're thinking about relocating to Copenhagen for work, happy to chat
  about the realities.
`;
    },
  },
  contact: {
    desc: "how to reach me",
    fn: () => {
      return `
  <span class="bold white">Contact</span>

  Best ways to reach me:

  • <a href="https://www.linkedin.com/in/Coreyh/" target="_blank" rel="noopener">LinkedIn</a>
  • <a href="https://x.com/coreyh" target="_blank" rel="noopener">X/Twitter</a>
  • <a href="https://github.com/CoreyH" target="_blank" rel="noopener">GitHub</a>

  If you're a founder building health tech or green tech and want to talk 
  product, AI workflows, or what working with KRING looks like, reach out.
`;
    },
  },
  theme: {
    desc: "change theme",
    fn: (args) => {
      if (!args || args.length === 0) {
        let output = '\n  <span class="bold white">Available Themes</span>\n\n';
        themes.forEach((t) => {
          const current =
            t === state.theme ? ' <span class="muted">(current)</span>' : "";
          output += `  • <span class="cmd">${t}</span>${current}\n`;
        });
        output +=
          '\n  usage: <span class="cmd">theme [name]</span> or shift+tab to cycle\n';
        return output;
      }
      const themeName = args[0].toLowerCase();
      if (themes.includes(themeName)) {
        setTheme(themeName);
        return `\n  theme changed to <span class="accent">${themeName}</span>\n`;
      }
      return `\n  <span class="error">unknown theme: ${themeName}</span>\n  type <span class="cmd">theme</span> to see available themes.\n`;
    },
  },
  clear: {
    desc: "clear terminal",
    fn: () => {
      setTimeout(() => {
        document.getElementById("output").innerHTML = "";
      }, 10);
      return "";
    },
  },
  music: {
    desc: "toggle music player",
    fn: () => {
      const player = document.getElementById("music-player");
      if (player) {
        player.classList.toggle("visible");
        return player.classList.contains("visible")
          ? "\n  music player shown. click play to start.\n"
          : "\n  music player hidden.\n";
      }
      return '\n  <span class="error">music player not available</span>\n';
    },
  },
  helicopter: {
    desc: "easter egg",
    fn: () => {
      return `
  <span class="bold white">The Helicopter Photo</span>

  <img src="assets/images/helicopter.jpg" alt="Young Corey with helicopter" style="max-width: 100%; height: auto; border-radius: 4px; margin: 8px 0;" />

  Pasadena, around 1980. That's all I know.

`;
    },
  },
  credits: {
    desc: "site credits",
    fn: () => {
      return `
  <span class="bold white">Credits</span>

  This site is forked from <a href="https://www.bentossell.com/" target="_blank" rel="noopener">Ben Tossell's</a> open source CLI website.
  Ben made the original — I just customized it for myself.

  Thanks Ben!

  → <a href="https://github.com/bentossell/bentossell" target="_blank" rel="noopener">Original repo</a>
  → <a href="https://github.com/CoreyH/coreyh-cli-version" target="_blank" rel="noopener">This fork</a>
`;
    },
  },
  // Fun easter eggs
  sudo: {
    desc: "nice try",
    fn: () =>
      '\n  <span class="error">you\'re not the boss of me.</span>\n',
  },
  hierarches: {
    desc: "nice try",
    fn: () =>
      '\n  <span class="muted">nice try.</span>\n',
  },
  rm: {
    desc: "nice try",
    fn: (args) => {
      if (args && args.join(" ").includes("-rf")) {
        return '\n  <span class="error">NICE TRY! this terminal is protected.</span>\n';
      }
      return '\n  <span class="error">rm: command not available in this terminal</span>\n';
    },
  },
  exit: {
    desc: "exit terminal",
    fn: () =>
      '\n  <span class="muted">there is no escape. you\'re stuck here with me.</span>\n',
  },
  vim: {
    desc: "editor wars",
    fn: () =>
      '\n  <span class="accent">vim is not for everyone.</span> this isn\'t that kind of terminal.\n',
  },
  emacs: {
    desc: "editor wars",
    fn: () => '\n  <span class="muted">emacs users... i see you.</span>\n',
  },
  ls: {
    desc: "list files",
    fn: () =>
      '\n  README.md  ventures.md  tools.md  agents.md\n\n  <span class="muted">try: whoami, now, ventures, recordsetter</span>\n',
  },
  cat: {
    desc: "cat file",
    fn: (args) => {
      if (!args || args.length === 0) {
        return '\n  <span class="error">cat: missing file argument</span>\n';
      }
      const file = args[0].toLowerCase();
      if (file.includes("readme")) {
        return commands.whoami.fn();
      }
      if (file.includes("venture")) {
        return commands.ventures.fn();
      }
      if (file.includes("tool")) {
        return commands.tools.fn();
      }
      if (file.includes("agent")) {
        return commands.agents.fn();
      }
      return `\n  <span class="error">cat: ${args[0]}: no such file</span>\n`;
    },
  },
  cd: {
    desc: "change directory",
    fn: () => '\n  <span class="muted">you\'re already home.</span>\n',
  },
  pwd: {
    desc: "print working directory",
    fn: () => "\n  /home/corey\n",
  },
  echo: {
    desc: "echo text",
    fn: (args) => (args ? "\n  " + args.join(" ") + "\n" : "\n"),
  },
  date: {
    desc: "show date",
    fn: () => "\n  " + new Date().toString() + "\n",
  },
  neofetch: {
    desc: "system info",
    fn: () => `
  <span class="accent">       _</span>          corey@henderson
  <span class="accent">      (_)</span>         ---------------
  <span class="accent">   ___ _  ___</span>     OS: Human 1.0
  <span class="accent">  / __| |/ _ \\</span>    Host: Copenhagen
  <span class="accent">  \\__ \\ |  __/</span>    Kernel: My own
  <span class="accent">  |___/_|\\___|</span>    Uptime: Since 1975
                    Shell: bash
                    Terminal: coreyh-cli
`,
  },
};

function clearLastLine() {
  const output = document.getElementById("output");
  const lines = output.innerHTML.split("\n");
  lines.pop();
  lines.pop();
  output.innerHTML = lines.join("\n");
}

function appendOutput(text) {
  const output = document.getElementById("output");
  output.innerHTML += text;
  scrollToBottom();
}

function scrollToBottom() {
  const terminal = document.getElementById("terminal-body");
  terminal.scrollTop = terminal.scrollHeight;
}

function setTheme(themeName) {
  document.body.className = `theme-${themeName}`;
  state.theme = themeName;
  localStorage.setItem("terminal-theme", themeName);
}

function cycleTheme() {
  const currentIndex = themes.indexOf(state.theme);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
  appendOutput(
    `\n  <span class="muted">theme: ${themes[nextIndex]}</span>\n\n`,
  );
  scrollToBottom();
}

function updateCPHTime() {
  const timeEl = document.getElementById("status-time");
  if (timeEl) {
    const cphTime = new Date().toLocaleTimeString("en-DK", {
      timeZone: "Europe/Copenhagen",
      hour: "2-digit",
      minute: "2-digit",
    });
    timeEl.textContent = "CPH " + cphTime;
  }
}

function updateVibe() {
  const vibeEl = document.getElementById("status-vibe");
  if (vibeEl) {
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    vibeEl.textContent = randomVibe;
  }
}

async function executeCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return;

  state.history.push(trimmed);
  state.historyIndex = state.history.length;
  state.commandCount++;

  const parts = trimmed.split(/\s+/);
  let cmd = parts[0].toLowerCase();
  // Allow /command syntax (strip leading slash)
  if (cmd.startsWith('/')) {
    cmd = cmd.slice(1);
  }
  const args = parts.slice(1);

  // Command text in accent color
  appendOutput(
    `<span class="prompt">></span> <span class="accent">${escapeHtml(trimmed)}</span>\n`,
  );

  if (commands[cmd]) {
    const result = await commands[cmd].fn(args);
    if (result) {
      appendOutput(result + "\n");
    }
  } else {
    appendOutput(
      `\n  <span class="error">command not found: ${cmd}</span>\n  type <span class="cmd">help</span> for available commands.\n\n`,
    );
  }

  scrollToBottom();
  updateVibe();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getCompletions(partial) {
  const cmdNames = Object.keys(commands);
  return cmdNames.filter((c) => c.startsWith(partial.toLowerCase()));
}

async function boot() {
  const output = document.getElementById("output");
  const lines = [
    "initializing terminal...",
    "loading modules... done",
    "connecting to corey.henderson... connected",
    "",
  ];

  for (const line of lines) {
    output.innerHTML += `<span class="muted">${line}</span>\n`;
    await sleep(150);
    scrollToBottom();
  }

  output.innerHTML += `<span class="accent ascii-art">   ██████╗ ██████╗ ██████╗ ███████╗██╗   ██╗██╗  ██╗
  ██╔════╝██╔═══██╗██╔══██╗██╔════╝╚██╗ ██╔╝██║  ██║
  ██║     ██║   ██║██████╔╝█████╗   ╚████╔╝ ███████║
  ██║     ██║   ██║██╔══██╗██╔══╝    ╚██╔╝  ██╔══██║
  ╚██████╗╚██████╔╝██║  ██║███████╗   ██║   ██║  ██║
   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝</span>
`;
  await sleep(100);

  output.innerHTML += `
  partner/cto at kring. also recordsetter. copenhagen.
  welcome. type <span class="cmd">help</span> or just start typing.
  <span class="muted">hint: try whoami</span>

`;
  scrollToBottom();

  document.getElementById("command-input").focus();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("command-input");
  const form = document.getElementById("command-form");

  setTheme(state.theme);
  updateCPHTime();
  updateVibe();
  setInterval(updateCPHTime, 1000);
  setInterval(updateVibe, 8000);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    await executeCommand(value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || "";
      } else {
        state.historyIndex = state.history.length;
        input.value = "";
      }
    } else if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      cycleTheme();
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const value = input.value.trim();
      if (value) {
        const completions = getCompletions(value);
        if (completions.length === 1) {
          input.value = completions[0] + " ";
        } else if (completions.length > 1) {
          appendOutput(
            `<span class="prompt">></span> <span class="accent">${value}</span>\n`,
          );
          appendOutput(
            `<span class="muted">${completions.join("  ")}</span>\n\n`,
          );
          scrollToBottom();
        }
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      document.getElementById("output").innerHTML = "";
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      appendOutput(
        `<span class="prompt">></span> <span class="accent">${input.value}</span>^C\n\n`,
      );
      input.value = "";
    }
  });

  document.getElementById("terminal").addEventListener("click", (e) => {
    if (e.target.tagName !== "A" && !e.target.closest(".cmd-shortcut")) {
      input.focus();
    }
  });

  document.querySelectorAll(".cmd-shortcut").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cmd = btn.dataset.cmd;
      if (cmd) {
        await executeCommand(cmd);
        input.focus();
      }
    });
  });

  document.getElementById("credits-btn")?.addEventListener("click", async () => {
    await executeCommand("credits");
    input.focus();
  });

  boot();
});
