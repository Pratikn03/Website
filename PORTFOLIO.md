# Pratik Niroula's portfolio

An editorial portfolio for research, papers, and software, published from the
`main` branch through GitHub Pages.

- Website: https://pratikn03.github.io/Website/
- Repository: https://github.com/Pratikn03/Website
- Local working folder: `JOb`

## Files

- `index.html`: page structure, biography, contact information, and paper summaries.
- `portfolio.css`: responsive layout, artwork styles, and accessible motion rules.
- `projects.js`: curated project descriptions, methods, status, and repository index.
- `portfolio.js`: project rendering, detail dialogs, filters, and particle animation.
- `favicon.svg`: local icon.
- `.nojekyll`: serve the static files directly on GitHub Pages.

No build step or package installation is needed. Preview with:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://127.0.0.1:4173 in a browser.

## Updating content

Edit the corresponding entry in `projects.js` to update a project. Paper summaries
and links are in `index.html`. Prefer descriptive claims supported by the
manuscripts and repository documentation. A research draft is not a peer-reviewed
publication; theoretical guarantees and empirical results have different scopes.

The initial content was grounded in the author's research profile, the maintained
K-Bound abstract, the ORIUS abstract and README, the AutoML benchmark README,
Sentifargo project documentation, and the public project READMEs. Public paper
links were checked during setup. ELARA is listed as a draft available on request.
Original manuscripts and private job documents are not copied into this site.

The curated project collection works without GitHub API access. Expanding the
repository index refreshes public metadata; network errors keep the curated
collection available. No API key is used. Fonts are loaded from Google Fonts,
with local serif, sans-serif, and monospace fallbacks.

## Publishing

GitHub Pages uses `main` and the repository root. Push a website-only commit:

```sh
git add index.html portfolio.css portfolio.js projects.js favicon.svg PORTFOLIO.md .gitignore .nojekyll
git commit -m "Update portfolio"
git push origin main
```

The root `.gitignore` is an allowlist: unrelated folders in `JOb`, including
applications, outreach, documents, and local preview artifacts, stay untracked.

## Motion and accessibility

The particle sculpture supports Orbit, Wave, and Flow. The Motion control pauses
decorative motion and saves the preference locally. Device reduced-motion settings
take priority. Canvas animation stops when the hero is outside the viewport or
the tab is hidden. Project dialogs support keyboard focus, Escape, and close controls.
