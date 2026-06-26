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

// --- UNIVERSAL SCROLL REVEAL (AUTO-APPLY) ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); 
      }
    });
  },
  { threshold: 0.12 } 
);

const elementsToReveal = document.querySelectorAll(`
  section, 
  .service-card, 
  .blog-card, 
  .gallery article, 
  .mv-card, 
  .timeline div, 
  .stats-grid div, 
  .material-grid article,
  .process-rail div
`);

elementsToReveal.forEach((item) => {
  if (!item.classList.contains('reveal')) {
    item.classList.add("reveal");
  }
  revealObserver.observe(item);
});

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

const counters = document.querySelectorAll(".count-up");

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const targetValue = parseInt(targetElement.getAttribute("data-target"), 10);
        let currentValue = 0;
        
        const increment = targetValue / 40; 
        
        const updateCounter = () => {
          currentValue += increment;
          if (currentValue < targetValue) {
            targetElement.innerText = Math.ceil(currentValue);
            requestAnimationFrame(updateCounter);
          } else {
            targetElement.innerText = targetValue;
          }
        };
        
        updateCounter();
        countObserver.unobserve(targetElement); 
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => countObserver.observe(counter));


document.addEventListener("mousemove", (e) => {
  if (window.scrollY < window.innerHeight) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.backgroundPosition = `
      ${x * 10}px ${y * 10}px, 
      ${x * 5}% ${y * 5}%, 
      ${100 - x * 5}% ${100 - y * 5}%
    `;
  }
});


const scene = document.querySelector('.scene');
const carousel = document.querySelector('.carousel');

if (carousel) {
  const cells = carousel.querySelectorAll('.carousel__cell');
  const tooltip = document.querySelector('.machine-tooltip'); 
  const cellCount = cells.length; 
  let selectedIndex = 0;
  let cellWidth = carousel.offsetWidth;
  let radius, theta;
  let autoPlayInterval;

  function rotateCarousel() {
    const angle = theta * selectedIndex * -1;
    carousel.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
  }

  function setupCarousel() {
    theta = 360 / cellCount; 
    cellWidth = carousel.offsetWidth;
    radius = Math.round((cellWidth / 2) / Math.tan(Math.PI / cellCount));

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const cellAngle = theta * i;
      cell.style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
      
     
      const img = cell.querySelector('img');
      const machineName = img.getAttribute('alt'); 
      
      cell.addEventListener('mouseenter', () => {
        tooltip.textContent = machineName;
        tooltip.classList.add('is-visible');
        clearInterval(autoPlayInterval); 
      });
      
      cell.addEventListener('mouseleave', () => {
        tooltip.classList.remove('is-visible');
        resetAutoPlay();
      });
    }
    rotateCarousel();
  }

  setupCarousel();
  window.addEventListener('resize', setupCarousel);


  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  prevBtn?.addEventListener('click', () => {
    selectedIndex--;
    rotateCarousel();
    resetAutoPlay();
  });

  nextBtn?.addEventListener('click', () => {
    selectedIndex++;
    rotateCarousel();
    resetAutoPlay();
  });

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      selectedIndex++;
      rotateCarousel();
    }, 2000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();
}
