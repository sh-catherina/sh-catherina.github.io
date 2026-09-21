(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const C = window.PortfolioComponents;
    if (C) {
      C.renderFooter(document.getElementById("site-footer"));
    }

    initScrollSpy();
    initReveal();
    initLightbox();
    initInPageAnchors();
  });

  // Same-page # links (bottom section nav, skip link, etc.) normally push a
  // history entry per click, so the browser Back button steps back through
  // sections instead of leaving the page. Scroll manually and swap the hash
  // in place with replaceState so Back always exits to the previous page.
  function initInPageAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      a.addEventListener("click", (e) => {
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#" + id);
      });
    });
  }

  function initScrollSpy() {
    if (!("IntersectionObserver" in window)) return;
    const navLinks = document.querySelectorAll(".case-bottom-nav a");
    if (!navLinks.length) return;

    const map = new Map();
    navLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const id = href.includes("#") ? href.split("#")[1] : null;
      if (!id) return;
      if (!map.has(id)) map.set(id, []);
      map.get(id).push(a);
    });
    if (!map.size) return;

    const sections = [];
    map.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) sections.push(el);
    });
    if (!sections.length) return;

    const clearActive = () =>
      map.forEach((links) => links.forEach((l) => l.classList.remove("is-active")));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearActive();
            const links = map.get(entry.target.id);
            if (links) {
              links.forEach((l) => {
                l.classList.add("is-active");
                l.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              });
            }
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -10% 0px" }
    );
    items.forEach((el) => observer.observe(el));
  }

  function initLightbox() {
    const images = document.querySelectorAll(".case-cover img, .case-content figure img");
    if (!images.length) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image preview");
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      "</button>" +
      '<img class="lightbox-img" alt="">';
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector(".lightbox-img");
    const closeBtn = overlay.querySelector(".lightbox-close");
    let lastFocused = null;

    function open(img) {
      lastFocused = document.activeElement;
      overlayImg.src = img.currentSrc || img.src;
      overlayImg.alt = img.alt || "";
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      overlayImg.src = "";
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    images.forEach((img) => {
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      if (!img.hasAttribute("aria-label")) {
        img.setAttribute("aria-label", "Expand image: " + (img.alt || "image"));
      }
      img.addEventListener("click", () => open(img));
      img.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(img);
        }
      });
    });

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }
})();
