export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

export function initParallax() {
  const layers = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!layers.length) {
    return;
  }

  const update = () => {
    const scrollY = window.scrollY || 0;
    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallax || "0");
      layer.style.setProperty("--parallax-offset", `${scrollY * depth * 0.05}px`);
    });
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}
