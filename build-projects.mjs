// Generate readable, shareable project pages. No browser framework or dependency install.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { runInNewContext } from "node:vm";
import stories from "./project-stories.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const sandbox = { window: {} };
runInNewContext(readFileSync(join(root, "projects.js"), "utf8"), sandbox);
const { projects, username } = sandbox.window.PORTFOLIO;
const site = "https://pratikn03.github.io/Website/";
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const paragraphs = items => `<div class="story-prose">${items.map(item => `<p>${escape(item)}</p>`).join("\n")}</div>`;
const external = href => href.startsWith("https://") ? ' target="_blank" rel="noopener noreferrer"' : "";
const count = number => String(number).padStart(2, "0");
const toc = [
  ["question", "The question"],
  ["approach", "How it works"],
  ["inside", "Inside the project"],
  ["evidence", "Status & limits"],
  ["takeaway", "The bigger idea"],
  ["resources", "Read the sources"]
];

for (const [index, project] of projects.entries()) {
  const story = stories[project.id];
  if (!story) throw new Error(`Missing editorial content for ${project.id}`);
  const next = projects[(index + 1) % projects.length];
  const nextStory = stories[next.id];
  const canonical = `${site}projects/${project.id}/`;
  const repo = project.repo ? `https://github.com/${username}/${encodeURIComponent(project.repo)}` : null;
  const text = [...story.question, ...story.approach, ...story.steps.flat(), story.inside, ...story.components.flat(), ...story.evidence, ...story.limits, ...story.takeaway, story.closing].join(" ");
  const minutes = Math.max(3, Math.ceil(text.split(/\s+/).length / 220));
  const resources = [...story.resources];
  if (project.paper && !resources.some(item => item.href === project.paper)) resources.unshift({
    title: project.paperLabel || "Read the manuscript",
    href: project.paper,
    description: project.id === "elara" ? "Request the current research draft directly from me." : "The paper or report behind the project. Check the manuscript for the full methods, evidence, and limitations."
  });
  const sectionHead = (number, label, title) => `<p class="eyebrow">${count(number)} / ${escape(label)}</p><h2>${escape(title)}</h2>`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title}: ${story.subtitle}`,
    description: project.summary,
    author: { "@type": "Person", name: "Pratik Niroula", url: site },
    mainEntityOfPage: canonical,
    inLanguage: "en",
    about: project.tags
  };
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#ffffff" />
  <title>${escape(project.title)} | Pratik Niroula</title>
  <meta name="description" content="${escape(project.summary)}" />
  <meta property="og:title" content="${escape(project.title)} | Pratik Niroula" />
  <meta property="og:description" content="${escape(story.subtitle)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../portfolio.css" />
  <link rel="stylesheet" href="../../case-study.css" />
  <script src="../../case-study.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(articleSchema).replace(/</g, "\\u003c")}</script>
</head>
<body class="case-study">
  <a class="skip-link" href="#main">Skip to project story</a>
  <div class="page-progress" aria-hidden="true"></div>
  <header class="site-header wrap">
    <a class="wordmark" href="../../" aria-label="Pratik Niroula, home">pn<span class="brand-dot">.</span><span class="wordmark-caption">RESEARCH &amp; THINGS I BUILD</span></a>
    <nav class="primary-nav" aria-label="Main navigation"><a href="../../#work" aria-current="page">Work</a><a href="../../#papers">Papers</a><a href="../../#vision">Vision</a></nav>
    <button class="motion-toggle mono" id="motion-toggle" type="button" aria-pressed="true"><span class="motion-indicator" aria-hidden="true"></span><span id="motion-label">Motion on</span></button>
  </header>
  <main id="main">
    <article aria-labelledby="story-title">
      <div class="wrap">
        <div class="story-breadcrumb"><a href="../../#work"><span aria-hidden="true">&larr;</span> Back to all projects</a><span class="mono">PROJECT ${count(index + 1)} / ${count(projects.length)}</span></div>
        <header class="story-hero">
          <div class="story-hero-copy">
            <p class="eyebrow">${escape(story.kind.toUpperCase())}</p>
            <h1 id="story-title">${escape(story.displayTitle)}</h1>
            <p class="story-subtitle">${escape(story.subtitle)}</p>
            <p class="story-deck">${escape(project.summary)}</p>
            <div class="story-actions"><a class="button button-dark" href="#question">Read the story <span aria-hidden="true">&darr;</span></a>${repo ? `<a class="text-link" href="${escape(repo)}"${external(repo)}>Explore the code <span aria-hidden="true">&nearr;</span></a>` : `<a class="text-link" href="${escape(project.paper)}">Request the draft <span aria-hidden="true">&nearr;</span></a>`}</div>
          </div>
          <figure class="story-map" aria-labelledby="map-title">
            <p class="mono"><span>THE IDEA, AT A GLANCE</span><span>${count(index + 1)}</span></p>
            <h2 class="story-map-title" id="map-title">${escape(story.mapTitle)}</h2>
            <ol>${story.map.map(([title, description], i) => `<li><span class="story-step-number" aria-hidden="true">${count(i + 1)}</span><div><strong>${escape(title)}</strong><p>${escape(description)}</p></div></li>`).join("\n")}</ol>
            <figcaption>A conceptual overview, not a chart of experimental results.</figcaption>
          </figure>
        </header>
        <dl class="story-facts">
          <div><dt>Project status</dt><dd>${escape(story.stage)}</dd></div>
          <div><dt>Reading time</dt><dd>About ${minutes} minutes &middot; By Pratik Niroula</dd></div>
          <div><dt>${project.id === "elara" ? "Research themes" : "Tools & themes"}</dt><dd><div class="project-tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join("")}</div></dd></div>
        </dl>
        <div class="story-layout">
          <aside class="story-aside">
            <p class="mono">IN THIS PROJECT</p>
            <nav class="story-toc" aria-label="On this page">${toc.map(([id, label], i) => `<a href="#${id}"><span aria-hidden="true">${count(i + 1)}</span>${escape(label)}</a>`).join("\n")}</nav>
            <p class="story-aside-note">A closer look at the question, the work, and what it does and does not show.<br><br><a href="mailto:pratik.niroula@mnsu.edu?subject=${encodeURIComponent(`${project.title} project question`)}">Have a question?</a></p>
          </aside>
          <div class="story-body">
            <section class="story-section" id="question">
              ${sectionHead(1, "THE QUESTION", story.questionTitle)}
              ${paragraphs(story.question)}
              <aside class="story-callout"><span class="mono">IN PLAIN LANGUAGE</span><p>${escape(story.callout)}</p></aside>
            </section>
            <section class="story-section" id="approach">
              ${sectionHead(2, "HOW IT WORKS", story.approachTitle)}
              ${paragraphs(story.approach)}
              <ol class="story-flow">${story.steps.map(([title, description]) => `<li><div><h3>${escape(title)}</h3><p>${escape(description)}</p></div></li>`).join("\n")}</ol>
            </section>
            <section class="story-section" id="inside">
              ${sectionHead(3, "INSIDE THE PROJECT", story.insideTitle)}
              ${paragraphs([story.inside])}
              <div class="story-components">${story.components.map(([title, description, path], i) => `<section class="story-component"><span class="mono">${count(i + 1)} / ${project.id === "elara" ? "RESEARCH THEME" : "PROJECT COMPONENT"}</span><h3>${escape(title)}</h3><p>${escape(description)}</p><code>${escape(path)}</code></section>`).join("\n")}</div>
            </section>
            <section class="story-section" id="evidence">
              ${sectionHead(4, "STATUS & LIMITS", story.evidenceTitle)}
              ${paragraphs(story.evidence)}
              <aside class="story-status"><span class="mono">WHAT TO KEEP IN MIND</span><h3>${escape(story.statusTitle)}</h3><ul>${story.limits.map(item => `<li>${escape(item)}</li>`).join("")}</ul></aside>
            </section>
            <section class="story-section" id="takeaway">
              ${sectionHead(5, "THE BIGGER IDEA", story.takeawayTitle)}
              ${paragraphs(story.takeaway)}
              <div class="story-takeaway"><p>${escape(story.closing)}</p></div>
            </section>
            <section class="story-section" id="resources">
              ${sectionHead(6, "KEEP EXPLORING", "Read the work behind the story.")}
              ${paragraphs([project.id === "elara" ? "If this question interests you, ask me for the current draft. I would be glad to discuss the idea and its scope." : "This is the readable overview. The repository and research documents contain the details, assumptions, and setup instructions behind it."])}
              <div class="story-resources">${resources.map(item => `<a class="story-resource" href="${escape(item.href)}"${external(item.href)}><div><strong>${escape(item.title)}</strong><p>${escape(item.description)}</p></div><span class="resource-arrow" aria-hidden="true">&nearr;</span></a>`).join("\n")}</div>
              <p class="story-source-note">${escape(story.sourceNote || "Written from the linked public project documentation for this portfolio in September 2026. Repository documentation may change; follow the sources for the current implementation and evidence. This overview is not an independent reproduction of the experiments.")}</p>
            </section>
          </div>
        </div>
      </div>
    </article>
    <section class="story-next" aria-labelledby="next-title"><div class="wrap">
      <div class="story-next-top"><p class="eyebrow">ANOTHER QUESTION. ANOTHER PROJECT.</p><a href="../../#work">All projects</a></div>
      <a class="story-next-link" href="../${escape(next.id)}/"><div><h2 id="next-title">${escape(next.title)}</h2><p>${escape(nextStory.subtitle)}</p></div><span class="story-next-arrow" aria-hidden="true">&nearr;</span></a>
      <div class="story-contact"><p>Something here caught your interest?<br>I would like to hear what you are working on.</p><a href="mailto:pratik.niroula@mnsu.edu">pratik.niroula@mnsu.edu &nearr;</a></div>
    </div></section>
  </main>
  <footer class="site-footer wrap mono"><span>&copy; <span id="year">2026</span> PRATIK NIROULA</span><span>THANKS FOR READING.</span><a href="https://github.com/Pratikn03/Website" target="_blank" rel="noopener noreferrer">SITE SOURCE &nearr;</a></footer>
</body>
</html>
`;
  const directory = join(root, "projects", project.id);
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "index.html"), html);
  process.stdout.write(`Generated projects/${project.id}/index.html\n`);
}
