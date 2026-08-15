# Site Studio

[🇷🇺 Русский](README.md) · **🇬🇧 English**

**Claude Code skills that build studio-grade websites — not generic AI templates.**

![License](https://img.shields.io/badge/license-MIT-green)
![Skills](https://img.shields.io/badge/skills-4-blue)
![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)

One plugin, four connected skills, and a reference library. Each skill triggers on its own, but together they work as a single pipeline: a director runs the process and calls motion, the quality gate, and SEO at the right moment. The foundation is real, practice-tested rules against "cheap" AI output — not abstract guidelines.

The skills are **conductors, not muscle**. The actual generation of taste, components, and images is done by external tools (UI UX Pro Max, the built-in `frontend-design`, 21st.dev, GSAP, Spline). The collection's job is to hold the bar and keep order.

> **Note:** the skill instructions themselves are written in Russian. This README is the English overview.

## The skills

| Skill | Role | Owns |
|---|---|---|
| **site-director** | conductor · entry point | process from concept to deploy, the `DESIGN.md` spec, calling the others, rebuild mode |
| **site-motion** | motion | GSAP animation with restraint (2–3 focal points, easing, scroll, reduced-motion) |
| **site-quality** | quality gate | tokens, states, WCAG 2.2, forms, UX copy, Core Web Vitals, anti-cheap checks |
| **site-seo** | findability | meta, Open Graph, JSON-LD, sitemap, robots — no scripts, no APIs |

## How it works

```
                 request: "build a landing page…"
                          │
                          ▼
          ┌──────────── site-director ────────────┐
          │  1. point of view                       │
          │  2. DESIGN.md (spec before code) ───────┼─► approve in words
          │  3. taste: UI UX Pro Max / frontend-design
          │  4. real images                         │
          │  5. components → one grid               │
          │  6. motion ────────────► site-motion    │  GSAP, 2–3 points
          │  7. gate ──────────────► site-quality   │  contrast-check.js, CWV
          │  8. findability ───────► site-seo       │  OG, JSON-LD, sitemap
          │  9. mobile + deploy (Vercel)            │
          └─────────────────────────────────────────┘
```

The single source of truth is `DESIGN.md`, which `site-director` writes to the project root **before any markup**. It survives context compaction and is edited in words. The reference library (13 modules) is pulled in only when the relevant step is reached — it doesn't sit in context.

## Install

### Claude Code (plugin)

```
/plugin marketplace add Yelpin/claude-site-skills
```
```
/plugin install site-studio@yelpin-site-studio
```

Skills trigger automatically. The `contrast-check.js` script is available at `${CLAUDE_PLUGIN_ROOT}/skills/site-quality/scripts/contrast-check.js`.

### Claude.ai (upload skills)

Settings → Capabilities → Skills → **Add skill**. Upload each folder from `skills/` as a separate zip (with `SKILL.md` at the archive root).

### Manual (any Claude Code)

Copy the folders you want from `skills/` into `~/.claude/skills/`. Each skill is self-contained.

## Structure

```
claude-site-skills/
├── .claude-plugin/
│   ├── plugin.json          # plugin manifest
│   └── marketplace.json     # marketplace (for /plugin marketplace add)
├── skills/
│   ├── site-director/       # SKILL.md + references/ ×6
│   ├── site-motion/         # SKILL.md + references/gsap-recipes.md
│   ├── site-quality/        # SKILL.md + references/ ×6 + scripts/contrast-check.js
│   └── site-seo/            # SKILL.md
├── template/                # template for a new skill
├── LICENSE
└── README.md
```

## Reference library

The SKILL.md files stay short — depth lives in `references/*.md` and is read on demand.

- **site-director** — style directions (+ a cliché stop-list), section patterns, visual system (type scale, 60/30/10, oklch, 8pt), emotional design, responsive.
- **site-quality** — laws of UX and Gestalt, WCAG 2.2 accessibility, forms, UX writing, interactions, perceived performance.
- **site-motion** — 7 GSAP recipes in code.

The library is site-focused and does not duplicate a taste tool: it's a fallback and opinionated craft, not a second palette catalog.

## Honest boundary

The collection sets the process and the bar. The result = skills + real tools (UI UX Pro Max, 21st.dev, GSAP) + **your images and brief as input**. Without real photos and your taste, even a perfect process yields an average site. The collection says this plainly instead of promising magic.

## License

MIT © 2026 [Sergey Yelpin](https://yelpin.github.io)

> Author — a UX/UI/AI designer. These skills come from real website-building practice. Feedback and ideas — via Issues.
