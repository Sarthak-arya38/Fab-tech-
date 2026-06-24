const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery article");
const contactForm = document.querySelector(".contact-form");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

contactForm?.querySelector("button")?.addEventListener("click", () => {
  const data = new FormData(contactForm);
  const subject = data.get("subject") || "Website quotation request";
  const body = [
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    "",
    data.get("message") || "",
  ].join("\n");

  window.location.href = `mailto:advancefabtechengg@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelectorAll(".service-card, .process-rail div, .gallery article, .check-list div, .material-grid article, .service-detail-grid article, .stats-grid div, .quote-box, .media-grid article, .contact-form, .image-mosaic img, .blog-card").forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});

