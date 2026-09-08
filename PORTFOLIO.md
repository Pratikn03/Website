# Pratik Niroula's portfolio

A bold red, white, and blue portfolio for research, papers, and software, published from the
`main` branch through GitHub Pages.

- Website: https://pratikn03.github.io/Website/
- Repository: https://github.com/Pratikn03/Website
- Local working folder: `JOb`

## Files

- `index.html`: page structure, biography, contact information, and paper summaries.
- `portfolio.css`: responsive layout, artwork styles, and accessible motion rules.
- `projects.js`: curated project descriptions, methods, status, and repository index.
- `portfolio.js`: project rendering, links to full project pages, filters, and particle animation.
- `projects/<project-id>/index.html`: eight standalone, long-form project pages.
- `project-stories.mjs`: source-backed editorial content for the project pages.
- `build-projects.mjs`: dependency-free static HTML generator for those pages.
- `case-study.css`: project-page layout, responsive navigation, and card-link styles.
- `case-study.js`: reading progress, active section navigation, and motion preference.
- `favicon.svg`: local icon.
- `.nojekyll`: serve the static files directly on GitHub Pages.

The published site is static; no package installation or runtime build is needed.
Each project page contains its full content in HTML and is readable without JavaScript.
Preview with:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://127.0.0.1:4173 in a browser.

## Updating content

Edit the corresponding entry in `projects.js` to update a project summary. Edit
`project-stories.mjs` for the full narrative, then run `node build-projects.mjs` to
regenerate all eight pages. Commit the generated HTML alongside the source. The
generator writes only `projects/<project-id>/index.html` for the curated projects.
Paper summaries and links are in `index.html`. Prefer descriptive claims supported by the
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
git add index.html portfolio.css portfolio.js projects.js favicon.svg PORTFOLIO.md .gitignore .nojekyll case-study.css case-study.js project-stories.mjs build-projects.mjs projects/*/index.html
git commit -m "Update portfolio"
git push origin main
```

The root `.gitignore` is an allowlist: unrelated folders in `JOb`, including
applications, outreach, documents, and local preview artifacts, stay untracked.

## Motion and accessibility

The decorative particle sketch supports Sphere, Wave, and Spiral. The Motion control pauses
decorative motion and saves the preference locally. Device reduced-motion settings
take priority. Canvas animation stops when the hero is outside the viewport or
the tab is hidden. Project cards use ordinary links to shareable project pages,
supporting keyboard navigation, opening a new tab, and browser Back. Each project
page includes section anchors, a desktop sticky table of contents, reading progress,
an accessible conceptual workflow, and a next-project link. Content is never hidden
behind JavaScript-dependent reveal effects.

## Full project stories

All eight featured projects have their own page: K-Bound, ORIUS, AutoML, ELARA,
Sentifargo, OmniChatX, SocialSense-SLM, and TradeGuard. Each page covers the question,
approach, components, current status, limits, and the bigger idea, with links to
the source documentation and available papers. GitHub Pages serves the nested
directories directly; there is no client-side router or server-side dependency.

The September 2026 expansion uses the public GitHub README and architecture
documentation for the seven projects with repositories. ELARA remains a
draft-level research overview, with no invented repository, results, or release.
Project pages distinguish documented workflows from independently reproduced
evidence and do not promote repository roadmap items into completed features.

## Visual direction

One red, white, and blue theme connects all project art, heavier typography, and
a two-color particle study. The opening research premise explains why
indistinguishable observations can leave a decision unresolved. The final Vision
section states an aspiration for AI that earns trust through evidence, evaluation,
and honest uncertainty; it is not presented as an achieved guarantee.

## Voice

Use plain first-person language grounded in the author’s real work. Keep the
research status and assumptions clear, explain technical ideas before naming them,
and avoid invented personal anecdotes. The hero animation is explicitly labeled
as a decorative sketch, while the separate two-world diagram explains the research
question. The closing vision is a personal aspiration.
