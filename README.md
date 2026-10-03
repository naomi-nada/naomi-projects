# naomi's workbench

My personal site for keeping track of projects, documenting the stuff I'm working on, and collecting the places you can find me online.

It's intentionally simple. Just static HTML/CSS/JS, a couple small Python build scripts, and JSON for the bits of the site that are easier to maintain as data.

## what's here

- `index.html` — the main Workbench and project logs.
- `wiki/` — project reference pages and the Wiki.
- `channels.html` — links to my stuff elsewhere.
- `assets/` — shared CSS, JavaScript, icons, and other site assets.
- `data/` — Workbench update/timing data.
- `wiki/data/` — source data used to build the Wiki.
- `tools/build_wiki.py` — rebuilds the generated Wiki pages.
- `tools/build_site_state.py` — rebuilds the browser-readable Workbench update data.

## how it's organized

The site has three main sections:

- **naomi's workbench** — what I'm currently working on, what's finished, and what's coming next.
- **wiki** — reference material for individual projects.
- **channels** — places to find my work or reach me.

Right now the Wiki is mostly focused on **Nada Vfx**, with pages for its effects, modifiers, and the vanilla Valheim assets they're built from.

## updating the site

Most normal page changes can just be edited directly.

If I change the Wiki data in `wiki/data/`, I run:

```bash
python3 tools/build_wiki.py