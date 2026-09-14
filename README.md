# RohitX Tools — v1

Professional, mobile-first tools and digital products hub.

## Files
- `index.html` — page structure
- `styles.css` — visual theme and responsive design
- `products.js` — tools/products data
- `app.js` — filtering, search, theme toggle and UI behavior
- `bio.html` — fully working client-side Bio Generator

## Add a new tool
Edit `products.js` and add an object to `XR` with:
- `id`
- `kind: "tool"`
- `icon`
- `name`
- `category`
- `type: "Free" | "Premium"`
- `desc`
- `link`

Then push to GitHub. Hosting can be done on Cloudflare Pages.
