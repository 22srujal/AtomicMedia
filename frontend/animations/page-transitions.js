export function initPageTransitions() {
  const loader = document.querySelector(".page-loader");
  window.addEventListener("load", () => {
    loader?.classList.add("hidden");
    document.body.classList.add("is-loaded");
  });
}
