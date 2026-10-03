# naomi's workbench

A small static site for public project working logs, project-specific Wiki pages, and quiet contact/channel links.

## Structure

- `index.html` — Workbench module and project selector.
- `wiki/index.html` — Wiki module with a compact project dropdown.
- `wiki/<project-id>.html` — project Wiki landing pages.
- `channels.html` — compact links/contact module.
- `assets/site-shell.css` — shared module tabs, headers, project index, palette, and page geometry.
- `assets/workbench.css` — working-log and weekly-update styling.
- `assets/channels.css` — compact channel rows.
- `wiki/assets/wiki.css` — Wiki indexes, source catalog, and detail pages.
- `data/site.json` / `data/updates.json` — weekly update timing and current additions.
- `wiki/data/effects.json` / `modifiers.json` / `projects.json` — Wiki source data.
- `tools/build_wiki.py` — rebuilds generated Wiki pages.
- `tools/build_site_state.py` — rebuilds the browser-readable weekly update state.

## Modules

The top-level navigation is intentionally small: `naomi's workbench`, `wiki`, and `channels`. Effects, Modifiers, and Vanilla Set are categories inside the Nada Vfx Wiki, not separate site modules.

The module tabs share one paper-file/tab treatment. Blue, green, and magenta identify the module; the content beneath them stays mostly neutral so the site reads as one system.

## Project selection

Workbench keeps Active projects first with Archived projects directly underneath, then reveals the selected project's working log. The Wiki home stays intentionally minimal: choose a project from the Active/Archived dropdown, then move to that project's own Wiki landing page.

## Weekly update

`NEXT UPDATE` is a compact status-style control. Hover it for the short explanation; click/tap also works because it is a `<details>` element. `NEW THIS WEEK` is separate and every item links directly to the page that changed.

## Wiki links in the working log

When a thing mentioned in the working log already has a Wiki entry, the name links to that entry. The links are intentionally quiet so the log is still readable on its own.
