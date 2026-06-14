# navendubrajesh.github.io

Personal portfolio site for **Navendu Brajesh**, published via [GitHub Pages](https://navendubrajesh.github.io).

## Local preview

Static site — no build step. Serve from the repo root:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Open `http://localhost:8080`.

## Add a project

Append an object to `projects.json`:

```json
{
  "title": "your-project-name",
  "description": "One-line description.",
  "tags": ["Tag One", "Tag Two"],
  "featured": false,
  "links": {
    "repo": "https://github.com/navendubrajesh/your-repo",
    "live": "",
    "article": ""
  }
}
```

Set `"template": true` on schema-only entries; `main.js` filters them out.

## Deploy

Push to `main` on the `navendubrajesh/navendubrajesh.github.io` repository. GitHub Pages serves files from the root automatically.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page layout |
| `styles.css` | Light/dark theme, responsive layout |
| `main.js` | Theme toggle, projects loader, nav highlight |
| `projects.json` | Project card data |
| `.nojekyll` | Disable Jekyll processing |
| `assets/` | Favicon, monogram, web manifest |

## License

Content © Navendu Brajesh. Code MIT unless noted otherwise.
