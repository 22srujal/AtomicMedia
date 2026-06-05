export function initHoverEffects() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!canHover.matches) {
    return;
  }

  const cards = document.querySelectorAll(".hover-glow");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (!canHover.matches) {
        return;
      }
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    });
  });
}
