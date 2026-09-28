# Circle Restaurant & Lounge: Style Guide

The menu site is a late-night lounge in a browser: obsidian, Circle crimson and off-white, with the circle as the brand shape. Most guests open it on a phone after scanning the table QR code, so every decision starts at phone width.

## Colour

All colours are CSS variables in `app/globals.css`, exposed to Tailwind as `bg`, `surface`, `surface-2`, `ink`, `muted`, `crimson`, `crimson-hover` and `accent`. Use `text-ink/60`, `border-ink/10` and so on for tints so both themes work.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `bg` | `#0B090B` | `#F4F2F2` | Page background |
| `surface` | `#151215` | `#FCFBFB` | Sheets, cards |
| `ink` | `#F6F1F2` | `#161013` | Text |
| `muted` | `#ACA3A8` | `#5E565A` | Descriptions, labels |
| `crimson` | `#89162D` | `#89162D` | Logo red. Buttons, active pills, the dessert card, the footer. |
| `crimson-glow` | `#A81E3A` | `#89162D` | Logo red lifted for dark backgrounds: hero rings, header mark, progress line |
| `accent` | `#EE5C76` | `#89162D` | Crimson for text on the page (prices, group names, the `&`) |

Dark is the house default. The header toggle switches to light and remembers the choice.

`.on-crimson` re-scopes the tokens so a whole block can sit in logo red with warm-white text (used by the Visit footer and the dessert card).

## Type

- **Bodoni Moda** (`font-display`): section titles and dish names (the logo lettering is drawn from it too). Italic is the only flourish (the `&` in section titles, group headings).
- **Geist** (`font-sans`): everything functional. Prices use `.tabular`.
- No em dashes anywhere in visible copy.

## Shape

- Images and panels: `rounded-tile` (20px).
- Every control (buttons, pills, tabs, inputs): full pill.
- The brand shape (hero plate, Mains plates, Visit photo): full circle.

## Layers

Only these z-index values exist (Tailwind `z-*`): `raised` 1, `header` 40, `dock` 45, `sheet` 60, `palette` 70, `grain` 90.

## Menu layouts

Each section in `data/menu.js` names a `layout`:

| Layout | Section | What it does |
|---|---|---|
| `bento` | Starters | One large photo plus four around it, then text rows |
| `plates` | Mains | Round-cropped photos that turn on hover |
| `preview` | Pasta & Steak | One list; a pinned photo follows the row you hover (tablet and up) |
| `card` | Desserts | A printed-menu card with sides as chips |
| `bar` | Drinks | Tabs, a photo gallery, then text rows |
| `cellar` | Spirits | Shot photos, then bottle lists set in columns |

Dishes without a photo render as menu rows (name, dotted leader, price). Add an `image` and the dish moves into its section's visual layout automatically.

## Motion

Motion (`motion/react`) with `MotionConfig reducedMotion="user"`, so everything calms down for guests who ask for reduced motion. Motion is used for: the hero reveal and turning plate, scroll reveals, the sliding active pill, sheet and search transitions. Nothing loops except the hero plate and its text ring.

## Logo

`components/brand/Logo.js` holds the logo as vectors: `LogoMark` (the rings), `Wordmark` ("circle") and `LogoLockup` (all three with "Restaurant & lounge"). The rings are traced from the original artwork; the lettering is Bodoni Moda outlines. Everything uses `currentColor`.

- Header: mark in logo red + wordmark.
- Hero: the dish photo sits in the rings' inner circle and the rings turn around it.
- Opening moment (`components/brand/Intro.js`): logo red with the lockup, once per visit.
- Footer, favicon, Apple icon and the WhatsApp/Instagram share image (`app/opengraph-image.png`) all use the mark.
