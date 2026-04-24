# Intac Advisory — Website

Marketing site for Intac Advisory (intacadvisory.com). Independent insurance brokerage + business advisory, Houston TX.

## Stack

Static HTML/CSS/JS. No build step. Hosted on GitHub Pages.

- `index.html` — homepage
- `about.html`, `services.html`, `home.html`, `auto.html`, `claims.html`, `quote.html`, `payment.html`, `contact.html`, `blog.html`, `privacy.html`, `sitemap.html` — content pages
- `index-print.html` — printable one-pager (homepage with print CSS + auto-`window.print()`)
- `assets/styles.css` — shared styles
- `assets/site.js` — shared header/footer injection

## Local preview

```bash
cd intac-website
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Pushes to `main` auto-deploy via GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
