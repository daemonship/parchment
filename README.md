# Parchment — TTRPG Handout Generator

> Type your in-world text, pick a template, download a print-ready handout PNG.

Game Masters spend hours crafting in-world documents (letters, wanted posters, tavern menus, journal entries) for tabletop RPGs. Generic template tools lack genre-specific styling. Parchment gives you six styled templates across Fantasy Medieval and Gothic Horror genres — type your text, see a live preview, export a high-resolution PNG.

## Feedback & Ideas

> **This project is being built in public and we want to hear from you.**
> Found a bug? Have a feature idea? Something feel wrong or missing?
> **[Open an issue](../../issues)** — every piece of feedback directly shapes what gets built next.

## Status

> 🚧 In active development — not yet production ready

| Feature | Status | Notes |
|---------|--------|-------|
| Project scaffold & CI | ✅ Complete | Svelte 5 + Vite + TypeScript, Vercel/Netlify deploy config |
| Canvas rendering pipeline & first template | ✅ Complete | html2canvas capture utility, Fantasy Medieval Letter template |
| Remaining five templates + font/texture bundling | 🚧 In Progress | Fantasy Wanted Poster, Tavern Menu, Gothic Journal, Newspaper, Telegram |
| Editor UI (genre picker, template selector, live preview) | 📋 Planned | |
| PNG export & download flow | 📋 Planned | |
| Code review | 📋 Planned | |
| Pre-launch verification | 📋 Planned | |
| Deploy to production | 📋 Planned | |

## Who It's For

Dungeon Masters (D&D 5e), Game Masters (Call of Cthulhu, Pathfinder, Vampire: the Masquerade), and anyone who wants polished in-world documents without fighting with Photoshop.

## Tech Stack

- **Frontend:** Svelte 5 + TypeScript + Vite
- **Export:** html2canvas → PNG blob download
- **Fonts:** IM Fell English (Google Fonts; local woff2 bundling coming in next task)
- **Deployment:** Vercel / Netlify ready

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type-check + production build
npm run build

# Preview production build locally
npm run preview
```

Requires Node.js 18+. No backend — this is a pure client-side app.

## Architecture

```
src/
├── templates/         # One Svelte component per handout style
│   └── FantasyLetter.svelte
├── lib/
│   └── renderer.ts   # html2canvas capture + PNG download utility
├── App.svelte         # Editor shell (textarea + live preview + export)
└── assets/
    ├── textures/      # Background textures by genre (fantasy/, gothic/)
    └── fonts/         # Bundled woff2 font files (populated in Task 3)
```

Each template component:
- Accepts `{ text: string }` as its only prop
- Exposes its root DOM node via `bind:ref` for html2canvas capture
- Uses only CSS gradients and same-origin assets (no cross-origin image URLs)

---

*Built by [DaemonShip](https://github.com/daemonship) — autonomous venture studio*
