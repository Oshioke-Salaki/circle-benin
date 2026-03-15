# Circle Restaurant & Lounge — Menu Website

A luxury restaurant menu website for **Circle Restaurant & Lounge**, Benin City.
Built with **Next.js 14** + **Tailwind CSS**.

## Design

- Deep crimson & gold luxury palette sourced from the brand logo
- Playfair Display + Cormorant Garamond typefaces
- Animated SVG logo reveal on load
- Expandable menu items with rich detail panels
- Sticky category navigation with scroll-spy
- Full mobile & tablet responsive
- Grain overlay texture for depth
- Floating orb atmospheric effects

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Menu Sections

1. **Small Plates** — 6 starter dishes
2. **Soups & Salads** — 4 items
3. **Main Course** — 6 signature mains
4. **From The Grill** — 5 grilled items
5. **Pasta & Rice** — 4 items
6. **Desserts** — 5 handcrafted desserts
7. **Signature Cocktails** — 6 bespoke drinks
8. **Wines & Spirits** — 4 curated selections

## Customization

All menu data lives in `data/menu.js`. Each item supports:
- `name`, `price`, `shortDesc`, `description`
- `badge` (e.g. "Chef's Signature", "House Special")
- `ingredients` array
- `allergens` array
- `chefNote` — italic chef quote
- `pairing` — wine/drink pairing suggestion
- `dietary` — `"vegetarian"` | `"non-alcoholic"` | null
- `spice` — `"mild"` | `"medium"` | `"hot"` | null

## Brand Colors

```
Crimson:    #8B0C2A
Gold:       #C9A96E
Dark BG:    #080309
Cream:      #F2E8DC
```
