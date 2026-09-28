# Circle Restaurant & Lounge: Menu Website

The digital menu for **Circle Restaurant & Lounge**, Benin City Mall. Live at [circlebenin.com](https://circlebenin.com).

Built with Next.js 14, Tailwind CSS 3 and Motion. See `style_guide.md` for the design system.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing the menu

Everything lives in `data/menu.js`.

- **Change a price:** edit the item's `price` (a plain number, e.g. `25000`).
- **Add a dish:** add `{ id, name, price, desc }` to the right group. Ids must be unique.
- **Add a photo:** upload it to Cloudinary and set `image` to the Cloudinary URL. The dish moves from the text rows into the photo layout on its own.
- **Feature a dish near the top:** add `signature: true` (it needs a photo).
- **Bottle lists:** use `options: [{ name, price }]` instead of `price`. The site shows "from" the lowest price.

Restaurant details (phone, address, hours) are in the `restaurant` export at the bottom of the same file.

## Images

Photos are served from Cloudinary (`dmpulmnb9`). `lib/cloudinary-loader.js` asks Cloudinary for the right size and format for each screen, so pages stay fast on mobile data.
