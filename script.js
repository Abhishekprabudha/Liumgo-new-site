document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
  const sections = [];

  // Map nav links to their target sections
  navLinks.forEach(link => {
    const id = link.getAttribute("href");
    if (id && id.startsWith("#")) {
      const section = document.querySelector(id);
      if (section) {
        sections.push({ id, section, link });
      }
    }
  });

  // 1) Header shadow on scroll
  function updateHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", updateHeaderShadow);
  updateHeaderShadow();

  // Helper to get header height
  function getHeaderHeight() {
    return header ? header.offsetHeight : 0;
  }

  // 2) Smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = getHeaderHeight();
      const targetTop =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  // 3) Active section highlighting
  function updateActiveNav() {
    const scrollPos = window.scrollY;
    const headerHeight = getHeaderHeight();
    const offset = headerHeight + 80;

    let current = null;

    sections.forEach(item => {
      const rect = item.section.getBoundingClientRect();
      const sectionTop = rect.top + window.pageYOffset - offset;
      const sectionBottom = sectionTop + item.section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        current = item;
      }
    });

    sections.forEach(item => {
      if (item.link === current?.link) {
        item.link.style.color = "#111827";
        item.link.style.fontWeight = "600";
      } else {
        item.link.style.color = "#4b5563";
        item.link.style.fontWeight = "400";
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
});
