"use strict";

(() => {
  const root = document.documentElement;
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const button = document.getElementById("motion-toggle");
  let preference = null;
  try { preference = localStorage.getItem("portfolio-motion"); } catch { /* Optional storage. */ }

  function syncMotion() {
    const enabled = !query.matches && preference !== "off";
    root.dataset.motion = enabled ? "on" : "off";
    button.disabled = query.matches;
    button.setAttribute("aria-pressed", String(enabled));
    button.title = query.matches ? "Reduced motion is enabled in your device settings" : "Pause or resume decorative motion";
    document.getElementById("motion-label").textContent = enabled ? "Motion on" : "Motion off";
  }
  button.addEventListener("click", () => {
    preference = root.dataset.motion === "on" ? "off" : "on";
    try { localStorage.setItem("portfolio-motion", preference); } catch { /* Optional storage. */ }
    syncMotion();
  });
  query.addEventListener("change", syncMotion);
  syncMotion();

  const sections = Array.from(document.querySelectorAll(".story-section"));
  const links = Array.from(document.querySelectorAll(".story-toc a"));
  const progress = document.querySelector(".page-progress");
  let queued = false;
  let current = "";
  function updateReadingPosition() {
    queued = false;
    const distance = root.scrollHeight - window.innerHeight;
    const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    let active = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .32) active = section.id;
    }
    if (active !== current) {
      links.forEach(link => {
        if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      current = active;
    }
  }
  function queueUpdate() {
    if (!queued) { queued = true; requestAnimationFrame(updateReadingPosition); }
  }
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  window.addEventListener("load", queueUpdate);
  updateReadingPosition();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
