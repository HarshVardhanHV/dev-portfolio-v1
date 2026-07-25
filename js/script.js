/* ==========================================
   PORTFOLIO JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initScrollProgress();
  initScrollReveal();
  initActiveNav();
  initTypingEffect();
});

/* ==========================================
   DARK MODE
========================================== */

function initTheme() {
  const themeBtn = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", dark ? "dark" : "light");

    themeBtn.innerHTML = dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i';
  });
}

/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {
  const menu = document.querySelector(".nav-links");

  const toggle = document.querySelector(".menu-toggle");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    toggle.innerHTML = menu.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i';
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");

      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

function initScrollProgress() {
  const progress = document.querySelector(".progress-bar");

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    const height = document.documentElement.scrollHeight - window.innerHeight;

    progress.style.width = (scroll / height) * 100 + "%";
  });
}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initScrollReveal() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => section.classList.add("hidden"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================
   ACTIVE NAV LINK
========================================== */

function initActiveNav() {
  const sections = document.querySelectorAll("section");

  const links = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;

      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================
   TYPING EFFECT
========================================== */

function initTypingEffect() {
  const text = document.getElementById("typing-text");

  if (!text) return;

  const words = [
    "Software Engineer"
  ];

  let wordIndex = 0;

  let charIndex = 0;

  let deleting = false;

  function type() {
    const current = words[wordIndex];

    if (!deleting) {
      text.textContent = current.substring(0, charIndex++);

      if (charIndex > current.length) {
        deleting = true;

        setTimeout(type, 2500);

        return;
      }
    } else {
      text.textContent = current.substring(0, charIndex--);

      if (charIndex < 0) {
        deleting = false;

        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}
