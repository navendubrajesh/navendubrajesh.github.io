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
  "date": "Jun-26",
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

**Context Management docs:** published at `/context-management-for-agents/`. Rebuilt by `.github/workflows/sync-cmfa-docs.yml` from [context-management-for-agents](https://github.com/navendubrajesh/context-management-for-agents) (daily schedule + manual dispatch).

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
