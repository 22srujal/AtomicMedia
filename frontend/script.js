import { initScrollReveal, initParallax } from "./animations/scroll-effects.js";
import { initHoverEffects } from "./animations/hover-effects.js";
import { initPageTransitions } from "./animations/page-transitions.js";

const navToggle = document.querySelector(".nav-toggle");
const navMobile = document.querySelector(".nav-mobile");
const navShell = document.querySelector(".nav-shell");
const navClose = document.querySelector(".nav-close");
const navLinks = document.querySelectorAll("[data-target]");
const pageSections = document.querySelectorAll("main section[id]");
const mouseGlow = document.querySelector(".mouse-glow");

const syncNavState = () => {
  navShell?.classList.toggle("scrolled", window.scrollY > 24);
};

const setMenuState = (open) => {
  navToggle?.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
  navMobile?.setAttribute("aria-hidden", String(!open));
};

navToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  setMenuState(false);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-target");
    if (!target) {
      return;
    }
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuState(false);
  });
});

navMobile?.addEventListener("click", (event) => {
  if (event.target === navMobile) {
    setMenuState(false);
  }
});

document.addEventListener("click", (event) => {
  const isOpen = document.body.classList.contains("nav-open");
  if (!isOpen) {
    return;
  }
  const target = event.target;
  if (target instanceof Element && navShell?.contains(target)) {
    return;
  }
  setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("data-target") === entry.target.id
        );
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

pageSections.forEach((section) => sectionObserver.observe(section));

syncNavState();
window.addEventListener("scroll", syncNavState, { passive: true });

window.addEventListener("mousemove", (event) => {
  if (!mouseGlow) {
    return;
  }
  mouseGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
});

initPageTransitions();
initScrollReveal();
initHoverEffects();
initParallax();
