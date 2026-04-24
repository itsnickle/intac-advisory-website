// Shared header + footer for Intac Advisory site
(function () {
  const pages = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "claims.html", label: "Claims" },
    { href: "payment.html", label: "Payments" },
    { href: "blog.html", label: "Resources" },
    { href: "contact.html", label: "Contact" },
  ];

  const current = (document.body.dataset.page || "").toLowerCase();

  function headerHTML() {
    const navLinks = pages
      .map(p => {
        const active = p.href.replace(".html", "") === current ? " is-active" : "";
        return `<a href="${p.href}" class="${active.trim()}">${p.label}</a>`;
      })
      .join("");
    return `
      <header class="site-header">
        <div class="container site-header__bar">
          <a href="index.html" class="brand" aria-label="Intac Advisory home">
            <img src="assets/intac-logo-horizontal.png" alt="Intac Advisory" class="brand__logo" />
          </a>
          <nav class="nav nav--desktop" id="primary-nav-desktop" aria-label="Primary">
            ${navLinks}
          </nav>
          <div class="header-cta">
            <a href="tel:+18772378167" class="btn btn--ghost btn--sm header-cta__phone" aria-label="Call us">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="header-cta__phone-text">(877) 237‑8167</span>
            </a>
            <a href="quote.html" class="btn btn--primary btn--sm header-cta__quote">Get a quote <span class="arr">→</span></a>
            <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav">
              <svg class="nav-toggle__open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              <svg class="nav-toggle__close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
          </div>
        </div>
        <nav class="nav nav--mobile" id="primary-nav" aria-label="Primary mobile" aria-hidden="true">
          <div class="container">
            ${navLinks}
          </div>
        </nav>
      </header>
    `;
  }

  function footerHTML() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="brand brand--footer">
                <img src="assets/intac-logo-full.png" alt="Intac Advisory" class="brand__logo-stacked" />
              </a>
              <p>Independent advisory and insurance brokerage. We shop the market on your behalf, so you get the right coverage at the right price — from people you can actually reach.</p>
              <div class="socials" style="margin-top:20px">
                <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg></a>
                <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37a4 4 0 1 1-7.91 1.2 4 4 0 0 1 7.91-1.2z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05a3.73 3.73 0 0 1 3.36-1.84c3.59 0 4.26 2.36 4.26 5.44v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45z"/></svg></a>
              </div>
            </div>
            <div>
              <h4>Insurance</h4>
              <ul>
                <li><a href="services.html#commercial">Commercial Lines</a></li>
                <li><a href="services.html#personal">Personal Lines</a></li>
                <li><a href="https://www.kenwoodpc.com/" target="_blank" rel="noopener">Business Growth Services</a></li>
                <li><a href="https://georgeadamsinsurance.com/" target="_blank" rel="noopener">Surety</a></li>
                <li><a href="services.html">All services</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="about.html">About us</a></li>
                <li><a href="blog.html">Resources</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="privacy.html">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4>Customer care</h4>
              <ul>
                <li><a href="claims.html">File a claim</a></li>
                <li><a href="payment.html">Make a payment</a></li>
                <li><a href="quote.html">Get a quote</a></li>
                <li><a href="tel:+18772378167">(877) 237‑8167</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© 2026 Intac Advisory · License #TX‑2184772</div>
            <div><a href="privacy.html">Privacy</a> · <a href="#">Accessibility</a></div>
          </div>
        </div>
      </footer>
    `;
  }

  function wireNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;
    const close = () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const headerSlot = document.querySelector("[data-slot=header]");
    const footerSlot = document.querySelector("[data-slot=footer]");
    if (headerSlot) headerSlot.outerHTML = headerHTML();
    if (footerSlot) footerSlot.outerHTML = footerHTML();
    wireNav();
  });
})();
