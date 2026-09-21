/* Shared footer markup, rendered at runtime so every page shares one
   source of truth without a build step. */

(function () {
  const ICON_UP =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';

  function renderFooter(target) {
    if (!target) return;
    target.classList.add("site-footer");
    const year = new Date().getFullYear();
    target.innerHTML = `
      <div class="wrap site-footer-row">
        <p class="site-footer-copy">© ${year} Ekaterina Sharipova</p>
        <a class="site-footer-top" href="#top">
          Back to top
          ${ICON_UP}
        </a>
      </div>
    `;
  }

  window.PortfolioComponents = {
    renderFooter,
  };
})();
