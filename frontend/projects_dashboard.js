(function () {
  "use strict";

  const loader = document.querySelector(".page-loader");
  const navShell = document.querySelector(".nav-shell");
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const navClose = document.querySelector(".nav-close");
  const mouseGlow = document.querySelector(".mouse-glow");

  const syncNavState = () => {
    navShell?.classList.toggle("scrolled", window.scrollY > 24);
  };

  const setMenuState = (open) => {
    navToggle?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
    navMobile?.setAttribute("aria-hidden", String(!open));
  };

  window.addEventListener("load", () => {
    loader?.classList.add("hidden");
  });

  syncNavState();
  window.addEventListener("scroll", syncNavState, { passive: true });

  navToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuState(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuState(false);
  });

  navMobile?.addEventListener("click", (event) => {
    if (event.target === navMobile) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
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

  document.querySelectorAll("[data-nav-href]").forEach((button) => {
    button.addEventListener("click", () => {
      const href = button.getAttribute("data-nav-href");
      if (!href) {
        return;
      }
      setMenuState(false);
      window.location.href = href;
    });
  });

  window.addEventListener("mousemove", (event) => {
    if (!mouseGlow) {
      return;
    }
    mouseGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 120px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("in-view");
    });
  }

  const initCreativeCardSlideshows = () => {
    const cards = Array.from(document.querySelectorAll("[data-creative-slideshow]"));
    if (!cards.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imageSets = {
      branding: [
        "picture-1.webp",
        "picture-2.webp",
        "picture-3.webp",
        "picture-4.webp",
        "picture-5.webp",
        "picture-6.webp",
        "picture-7.webp",
        "picture-8.webp",
        "picture-9.webp",
        "picture-10.webp",
        "picture-11.webp",
        "picture-12.webp",
        "picture-13.webp",
        "picture-14.webp",
        "picture-15.webp",
        "picture-16.webp",
        "picture-17.webp",
        "picture-18.webp"
      ].map((file) => `assets/images/Branding/${file}`),
      social: [
        "pitcure-8b.webp",
        "pitcure-9.webp",
        "pitcure-10.webp",
        "pitcure-11.webp",
        "pitcure-12.webp",
        "pitcure-13.webp",
        "pitcure-14.webp",
        "pitcure-15.webp",
        "pitcure-16.webp",
        "pitcure-17.webp",
        "pitcure-18.webp",
        "pitcure-19.webp",
        "pitcure-20.webp",
        "pitcure-21.webp",
        "pitcure-22.webp",
        "pitcure-23.webp",
        "pitcure-24.webp",
        "pitcure-25.webp",
        "pitcure-26.webp",
        "pitcure-27.webp",
        "pitcure-28.webp",
        "pitcure-29.webp",
        "pitcure-30.webp",
        "pitcure-31.webp",
        "pitcure-32.webp"
      ].map((file) => `assets/images/social-media-posts/posts/${file}`),
      storyGrid: [
        "pitcure-33.webp",
        "pitcure-34.webp",
        "pitcure-35.webp",
        "pitcure-36.webp"
      ].map((file) => `assets/images/social-media-posts/story-design/${file}`).concat([
        "pitcure-1.webp",
        "picture-2.webp",
        "picture-3.webp",
        "pitcure-4.webp",
        "pitcure-5.webp",
        "pitcure-6.webp",
        "pitcure-7.webp",
        "pitcure-8.webp"
      ].map((file) => `assets/images/social-media-posts/social-media-grid/${file}`)),
      magazine: [
        "picture-1.webp",
        "picture-2.webp",
        "picture-3.webp",
        "picture-4.webp",
        "picture-5.webp",
        "picture-6.webp",
        "picture-7.webp",
        "picture-8.webp",
        "picture-9.webp",
        "picture-10.webp",
        "picture-11.webp",
        "picture-12.webp",
        "picture-13.webp",
        "picture-14.webp",
        "picture-15.webp",
        "picture-16.webp",
        "picture-17.webp",
        "picture-18.webp"
      ].map((file) => `assets/images/magzine-and-book-covers/${file}`),
      moreWork: [
        "picture-1.webp",
        "picture-2.webp",
        "picture-3.webp",
        "picture-4.webp"
      ].map((file) => `assets/images/more-works/banners/${file}`).concat([
        "picture-8.webp",
        "picture-9.webp",
        "picture-10.webp"
      ].map((file) => `assets/images/more-works/id-card/${file}`), [
        "picture-5.webp",
        "picture-6.webp"
      ].map((file) => `assets/images/more-works/illustrations/${file}`))
    };

    const controllersByCard = new Map();

    const createController = (card, images, cardIndex) => {
      const slideshow = document.createElement("div");
      const slides = [document.createElement("img"), document.createElement("img")];

      slideshow.className = "bento-slideshow";
      slideshow.setAttribute("aria-hidden", "true");
      slides.forEach((slide) => {
        slide.className = "bento-slide";
        slide.alt = "";
        slide.decoding = "async";
        slide.loading = "lazy";
        slideshow.appendChild(slide);
      });
      card.prepend(slideshow);

      let activeLayer = 0;
      let activeIndex = 0;
      let timer = null;
      let loaded = false;
      let visible = false;

      const preloadNext = () => {
        if (images.length < 2) {
          return;
        }
        const preload = new Image();
        preload.decoding = "async";
        preload.src = images[(activeIndex + 1) % images.length];
      };

      const show = (nextIndex) => {
        if (!images.length) {
          return;
        }
        const incomingLayer = activeLayer === 0 ? 1 : 0;
        const incoming = slides[incomingLayer];
        const outgoing = slides[activeLayer];
        incoming.src = images[nextIndex];
        incoming.classList.add("is-active");
        outgoing.classList.remove("is-active");
        activeLayer = incomingLayer;
        activeIndex = nextIndex;
        preloadNext();
      };

      const load = () => {
        if (loaded || !images.length) {
          return;
        }
        loaded = true;
        card.classList.add("has-slideshow");
        slides[0].src = images[0];
        slides[0].classList.add("is-active");
        preloadNext();
      };

      const stop = () => {
        window.clearInterval(timer);
        timer = null;
      };

      const start = () => {
        load();
        if (prefersReducedMotion || images.length < 2 || timer || !visible || document.hidden) {
          return;
        }
        timer = window.setInterval(() => {
          window.requestAnimationFrame(() => {
            show((activeIndex + 1) % images.length);
          });
        }, 3600 + (cardIndex % 3) * 220);
      };

      return {
        setVisible(isVisible) {
          visible = isVisible;
          if (visible) {
            start();
          } else {
            stop();
          }
        },
        refresh() {
          if (visible && !document.hidden) {
            start();
          } else {
            stop();
          }
        }
      };
    };

    cards.forEach((card, index) => {
      const key = card.dataset.creativeSlideshow;
      const images = imageSets[key] || [];
      if (!images.length) {
        return;
      }
      controllersByCard.set(card, createController(card, images, index));
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          controllersByCard.get(entry.target)?.setVisible(entry.isIntersecting);
        });
      }, { rootMargin: "160px 0px", threshold: 0.05 });
      controllersByCard.forEach((_, card) => observer.observe(card));
    } else {
      controllersByCard.forEach((controller) => controller.setVisible(true));
    }

    document.addEventListener("visibilitychange", () => {
      controllersByCard.forEach((controller) => controller.refresh());
    });
  };

  const initSocialPortfolio = () => {
    const modal = document.getElementById("socialPortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const tabs = Array.from(modal.querySelectorAll("[data-social-tab]"));
    const panels = Array.from(modal.querySelectorAll("[data-social-panel]"));
    const lightbox = modal.querySelector(".social-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-social-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-social-lightbox-close]"));
    const prevButton = modal.querySelector("[data-social-lightbox-prev]");
    const nextButton = modal.querySelector("[data-social-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const portfolio = {
      posts: {
        label: "Posts",
        grid: modal.querySelector("[data-social-grid='posts']"),
        items: [
          "pitcure-8b.webp",
          "pitcure-9.webp",
          "pitcure-10.webp",
          "pitcure-11.webp",
          "pitcure-12.webp",
          "pitcure-13.webp",
          "pitcure-14.webp",
          "pitcure-15.webp",
          "pitcure-16.webp",
          "pitcure-17.webp",
          "pitcure-18.webp",
          "pitcure-19.webp",
          "pitcure-20.webp",
          "pitcure-21.webp",
          "pitcure-22.webp",
          "pitcure-23.webp",
          "pitcure-24.webp",
          "pitcure-25.webp",
          "pitcure-26.webp",
          "pitcure-27.webp",
          "pitcure-28.webp",
          "pitcure-29.webp",
          "pitcure-30.webp",
          "pitcure-31.webp",
          "pitcure-32.webp"
        ].map((file, index) => ({
          src: `assets/images/social-media-posts/posts/${file}`,
          title: `Feed Post ${String(index + 1).padStart(2, "0")}`,
          type: "posts"
        }))
      }
    };

    let activeCategory = "posts";
    let activeItems = portfolio.posts.items;
    let activeIndex = 0;
    let lastFocusedElement = null;
    let lightboxTouchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderCategory = (key) => {
      const category = portfolio[key];
      if (!category?.grid) {
        return;
      }
      category.grid.innerHTML = "";
      category.items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "social-portfolio-item";
        button.type = "button";
        button.dataset.socialItem = key;
        button.dataset.socialIndex = String(index);
        button.style.animationDelay = `${Math.min(index * 45, 540)}ms`;
        button.setAttribute("aria-label", `Open ${item.title}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.title;
        image.loading = "lazy";
        image.decoding = "async";
        button.appendChild(image);
        category.grid.appendChild(button);
      });
    };

    Object.keys(portfolio).forEach(renderCategory);

    const setActiveTab = (key) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      tabs.forEach((tab) => {
        const isActive = tab.dataset.socialTab === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach((panel) => {
        const isActive = panel.dataset.socialPanel === key;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("social-portfolio-open");
      setActiveTab("posts");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("social-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const updateLightbox = () => {
      const item = activeItems[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `${portfolio[activeCategory].label} / ${String(activeIndex + 1).padStart(2, "0")}`;
        lightboxImage.style.opacity = "1";
      }, 120);
    };

    const openLightbox = (key, index) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    function closeLightbox() {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    }

    const showAdjacent = (direction) => {
      if (!activeItems.length) {
        return;
      }
      activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
      updateLightbox();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-social-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-social-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        setActiveTab(tab.dataset.socialTab);
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + offset + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        setActiveTab(tabs[nextIndex].dataset.socialTab);
      });
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const item = target instanceof Element ? target.closest("[data-social-item]") : null;
      if (!item) {
        return;
      }
      openLightbox(item.dataset.socialItem, item.dataset.socialIndex);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      lightboxTouchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - lightboxTouchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initBrandingPortfolio = () => {
    const modal = document.getElementById("brandingPortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const grid = modal.querySelector("[data-branding-grid]");
    const lightbox = modal.querySelector(".branding-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-branding-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-branding-lightbox-close]"));
    const prevButton = modal.querySelector("[data-branding-lightbox-prev]");
    const nextButton = modal.querySelector("[data-branding-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const items = [
      "picture-1.webp",
      "picture-2.webp",
      "picture-3.webp",
      "picture-4.webp",
      "picture-5.webp",
      "picture-6.webp",
      "picture-7.webp",
      "picture-8.webp",
      "picture-9.webp",
      "picture-10.webp",
      "picture-11.webp",
      "picture-12.webp",
      "picture-13.webp",
      "picture-14.webp",
      "picture-15.webp",
      "picture-16.webp",
      "picture-17.webp",
      "picture-18.webp"
    ].map((file, index) => ({
      src: `assets/images/Branding/${file}`,
      title: `Branding ${String(index + 1).padStart(2, "0")}`
    }));

    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderItems = () => {
      if (!grid) {
        return;
      }
      grid.innerHTML = "";
      items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "social-portfolio-item";
        button.type = "button";
        button.dataset.brandingItem = String(index);
        button.style.animationDelay = `${Math.min(index * 45, 540)}ms`;
        button.setAttribute("aria-label", `Open ${item.title}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.title;
        image.loading = "lazy";
        image.decoding = "async";
        button.appendChild(image);
        grid.appendChild(button);
      });
    };

    renderItems();

    const updateLightbox = () => {
      const item = items[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `Branding / ${String(activeIndex + 1).padStart(2, "0")}`;
        lightboxImage.style.opacity = "1";
      }, 120);
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("branding-portfolio-open");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("branding-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const openLightbox = (index) => {
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    const showAdjacent = (direction) => {
      if (!items.length) {
        return;
      }
      activeIndex = (activeIndex + direction + items.length) % items.length;
      updateLightbox();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-branding-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-branding-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const item = target instanceof Element ? target.closest("[data-branding-item]") : null;
      if (!item) {
        return;
      }
      openLightbox(item.dataset.brandingItem);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initStoryGridPortfolio = () => {
    const modal = document.getElementById("storyGridPortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const tabs = Array.from(modal.querySelectorAll("[data-story-grid-tab]"));
    const panels = Array.from(modal.querySelectorAll("[data-story-grid-panel]"));
    const lightbox = modal.querySelector(".story-grid-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-story-grid-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-story-grid-lightbox-close]"));
    const prevButton = modal.querySelector("[data-story-grid-lightbox-prev]");
    const nextButton = modal.querySelector("[data-story-grid-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const portfolio = {
      story: {
        label: "Story Design",
        grid: modal.querySelector("[data-story-grid-grid='story']"),
        items: ["pitcure-33.webp", "pitcure-34.webp", "pitcure-35.webp", "pitcure-36.webp"].map((file, index) => ({
          src: `assets/images/social-media-posts/story-design/${file}`,
          title: `Story Design ${String(index + 1).padStart(2, "0")}`
        }))
      },
      grid: {
        label: "Social Media Grid",
        grid: modal.querySelector("[data-story-grid-grid='grid']"),
        items: [
          "pitcure-1.webp",
          "picture-2.webp",
          "picture-3.webp",
          "pitcure-4.webp",
          "pitcure-5.webp",
          "pitcure-6.webp",
          "pitcure-7.webp",
          "pitcure-8.webp"
        ].map((file, index) => ({
          src: `assets/images/social-media-posts/social-media-grid/${file}`,
          title: `Profile Grid ${String(index + 1).padStart(2, "0")}`
        }))
      }
    };

    let activeCategory = "story";
    let activeItems = portfolio.story.items;
    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderCategory = (key) => {
      const category = portfolio[key];
      if (!category?.grid) {
        return;
      }
      category.grid.innerHTML = "";
      category.items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "social-portfolio-item";
        button.type = "button";
        button.dataset.storyGridCategory = key;
        button.dataset.storyGridItem = String(index);
        button.style.animationDelay = `${Math.min(index * 45, 540)}ms`;
        button.setAttribute("aria-label", `Open ${item.title}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.title;
        image.loading = "lazy";
        image.decoding = "async";
        button.appendChild(image);
        category.grid.appendChild(button);
      });
    };

    Object.keys(portfolio).forEach(renderCategory);

    const setActiveTab = (key) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      tabs.forEach((tab) => {
        const isActive = tab.dataset.storyGridTab === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach((panel) => {
        const isActive = panel.dataset.storyGridPanel === key;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    const updateLightbox = () => {
      const item = activeItems[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `${portfolio[activeCategory].label} / ${String(activeIndex + 1).padStart(2, "0")}`;
        lightboxImage.style.opacity = "1";
      }, 120);
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("story-grid-portfolio-open");
      setActiveTab("story");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("story-grid-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const openLightbox = (key, index) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    const showAdjacent = (direction) => {
      if (!activeItems.length) {
        return;
      }
      activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
      updateLightbox();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-story-grid-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-story-grid-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        setActiveTab(tab.dataset.storyGridTab);
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + offset + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        setActiveTab(tabs[nextIndex].dataset.storyGridTab);
      });
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const item = target instanceof Element ? target.closest("[data-story-grid-item]") : null;
      if (!item) {
        return;
      }
      openLightbox(item.dataset.storyGridCategory, item.dataset.storyGridItem);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initEventsPortfolio = () => {
    const modal = document.getElementById("eventsPortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const grid = modal.querySelector("[data-events-category-grid]");
    const lightbox = modal.querySelector(".events-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-events-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-events-lightbox-close]"));
    const prevButton = modal.querySelector("[data-events-lightbox-prev]");
    const nextButton = modal.querySelector("[data-events-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const makeEventItems = (folder, label, count = 4) => Array.from({ length: count }, (_, index) => ({
      src: `assets/images/events/${folder}/picture-${index + 1}.webp`,
      title: `${label} ${String(index + 1).padStart(2, "0")}`
    }));

    const categories = [
      {
        key: "startup-summit",
        title: "Startup Summit",
        description: "Summit coverage, speaker moments, and high-energy audience activations.",
        cover: "assets/images/events",
        items: makeEventItems("startup-summit", "Startup Summit")
      },
      {
        key: "product-launch",
        title: "Product Launch",
        description: "Launch visuals, product reveals, and campaign-ready event storytelling.",
        cover: "assets/images/events",
        items: makeEventItems("product-launch", "Product Launch")
      },
      {
        key: "business-conference",
        title: "Business Conference",
        description: "Conference identities, executive moments, and premium live coverage.",
        cover: "assets/images/events",
        items: makeEventItems("business-conference", "Business Conference")
      }
    ];

    let activeCategory = categories[0];
    let activeItems = activeCategory.items;
    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderCategories = () => {
      if (!grid) {
        return;
      }
      grid.innerHTML = "";
      categories.forEach((category, index) => {
        const button = document.createElement("button");
        button.className = "events-subcard";
        button.type = "button";
        button.dataset.eventsCategory = category.key;
        button.style.animationDelay = `${Math.min(index * 80, 300)}ms`;
        button.setAttribute("aria-label", `Open ${category.title} gallery`);

        const media = document.createElement("span");
        media.className = "events-subcard-media";
        media.style.setProperty("--events-cover", `url("${category.cover}")`);

        const copy = document.createElement("span");
        copy.className = "events-subcard-copy";
        copy.innerHTML = `
          <small>EVENTS</small>
          <strong>${category.title}</strong>
          <p>${category.description}</p>
        `;

        button.appendChild(media);
        button.appendChild(copy);
        grid.appendChild(button);
      });
    };

    renderCategories();

    const updateLightbox = () => {
      const item = activeItems[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `${activeCategory.title} / ${String(activeIndex + 1).padStart(2, "0")}`;
      }, 120);
    };

    if (lightboxImage) {
      lightboxImage.addEventListener("load", () => {
        lightboxImage.style.opacity = "1";
      });
      lightboxImage.addEventListener("error", () => {
        lightboxImage.style.opacity = "0.18";
      });
    }

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("events-portfolio-open");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("events-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const openLightbox = (categoryKey, index = 0) => {
      const category = categories.find((entry) => entry.key === categoryKey);
      if (!category) {
        return;
      }
      activeCategory = category;
      activeItems = category.items;
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    const showAdjacent = (direction) => {
      if (!activeItems.length) {
        return;
      }
      activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
      updateLightbox();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-events-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-events-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const category = target instanceof Element ? target.closest("[data-events-category]") : null;
      if (!category) {
        return;
      }
      openLightbox(category.dataset.eventsCategory);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initMagazinePortfolio = () => {
    const modal = document.getElementById("magazinePortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const grid = modal.querySelector("[data-magazine-grid]");
    const lightbox = modal.querySelector(".magazine-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-magazine-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-magazine-lightbox-close]"));
    const prevButton = modal.querySelector("[data-magazine-lightbox-prev]");
    const nextButton = modal.querySelector("[data-magazine-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const items = [
      "picture-1.webp",
      "picture-2.webp",
      "picture-3.webp",
      "picture-4.webp",
      "picture-5.webp",
      "picture-6.webp",
      "picture-7.webp",
      "picture-8.webp",
      "picture-9.webp",
      "picture-10.webp",
      "picture-11.webp",
      "picture-12.webp",
      "picture-13.webp",
      "picture-14.webp",
      "picture-15.webp",
      "picture-16.webp",
      "picture-17.webp",
      "picture-18.webp"
    ].map((file, index) => ({
      src: `assets/images/magzine-and-book-covers/${file}`,
      title: `Cover System ${String(index + 1).padStart(2, "0")}`
    }));

    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderItems = () => {
      if (!grid) {
        return;
      }
      grid.innerHTML = "";
      items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "social-portfolio-item";
        button.type = "button";
        button.dataset.magazineItem = String(index);
        button.style.animationDelay = `${Math.min(index * 45, 540)}ms`;
        button.setAttribute("aria-label", `Open ${item.title}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.title;
        image.loading = "lazy";
        image.decoding = "async";
        button.appendChild(image);
        grid.appendChild(button);
      });
    };

    const updateLightbox = () => {
      const item = items[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `Magzine And Book Covers / ${String(activeIndex + 1).padStart(2, "0")}`;
        lightboxImage.style.opacity = "1";
      }, 120);
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("magazine-portfolio-open");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("magazine-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const openLightbox = (index) => {
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    const showAdjacent = (direction) => {
      activeIndex = (activeIndex + direction + items.length) % items.length;
      updateLightbox();
    };

    renderItems();

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-magazine-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-magazine-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const item = target instanceof Element ? target.closest("[data-magazine-item]") : null;
      if (!item) {
        return;
      }
      openLightbox(item.dataset.magazineItem);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initMoreWorkPortfolio = () => {
    const modal = document.getElementById("moreWorkPortfolioModal");
    if (!modal) {
      return;
    }

    const shell = modal.querySelector(".social-portfolio-shell");
    const tabs = Array.from(modal.querySelectorAll("[data-more-work-tab]"));
    const panels = Array.from(modal.querySelectorAll("[data-more-work-panel]"));
    const lightbox = modal.querySelector(".more-work-lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxCaption = lightbox?.querySelector("figcaption");
    const closeControls = Array.from(modal.querySelectorAll("[data-more-work-portfolio-close]"));
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-more-work-lightbox-close]"));
    const prevButton = modal.querySelector("[data-more-work-lightbox-prev]");
    const nextButton = modal.querySelector("[data-more-work-lightbox-next]");
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const portfolio = {
      banners: {
        label: "Banners",
        grid: modal.querySelector("[data-more-work-grid='banners']"),
        items: ["picture-1.webp", "picture-2.webp", "picture-3.webp", "picture-4.webp"].map((file, index) => ({
          src: `assets/images/more-works/banners/${file}`,
          title: `Banner ${String(index + 1).padStart(2, "0")}`
        }))
      },
      idCards: {
        label: "ID Cards",
        grid: modal.querySelector("[data-more-work-grid='idCards']"),
        items: ["picture-8.webp", "picture-9.webp", "picture-10.webp"].map((file, index) => ({
          src: `assets/images/more-works/id-card/${file}`,
          title: `ID Card ${String(index + 1).padStart(2, "0")}`
        }))
      },
      illustrations: {
        label: "Illustrations",
        grid: modal.querySelector("[data-more-work-grid='illustrations']"),
        items: ["picture-5.webp", "picture-6.webp"].map((file, index) => ({
          src: `assets/images/more-works/illustrations/${file}`,
          title: `Illustration ${String(index + 1).padStart(2, "0")}`
        }))
      }
    };

    let activeCategory = "banners";
    let activeItems = portfolio.banners.items;
    let activeIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event, scope) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(scope);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const renderCategory = (key) => {
      const category = portfolio[key];
      if (!category?.grid) {
        return;
      }
      category.grid.innerHTML = "";
      category.items.forEach((item, index) => {
        const button = document.createElement("button");
        button.className = "social-portfolio-item";
        button.type = "button";
        button.dataset.moreWorkCategory = key;
        button.dataset.moreWorkItem = String(index);
        button.style.animationDelay = `${Math.min(index * 45, 540)}ms`;
        button.setAttribute("aria-label", `Open ${item.title}`);

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.title;
        image.loading = "lazy";
        image.decoding = "async";
        button.appendChild(image);
        category.grid.appendChild(button);
      });
    };

    Object.keys(portfolio).forEach(renderCategory);

    const setActiveTab = (key) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      activeIndex = 0;
      tabs.forEach((tab) => {
        const isActive = tab.dataset.moreWorkTab === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
      panels.forEach((panel) => {
        const isActive = panel.dataset.moreWorkPanel === key;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    const updateLightbox = () => {
      const item = activeItems[activeIndex];
      if (!item || !lightboxImage || !lightboxCaption) {
        return;
      }
      lightboxImage.style.opacity = "0";
      window.setTimeout(() => {
        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;
        lightboxCaption.textContent = `${portfolio[activeCategory].label} / ${String(activeIndex + 1).padStart(2, "0")}`;
        lightboxImage.style.opacity = "1";
      }, 120);
    };

    const openModal = () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("more-work-portfolio-open");
      setActiveTab("banners");
      window.setTimeout(() => {
        shell?.focus();
      }, 40);
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      shell?.focus();
    };

    const closeModal = () => {
      if (lightbox?.classList.contains("is-open")) {
        closeLightbox();
      }
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("more-work-portfolio-open");
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    const openLightbox = (key, index) => {
      activeCategory = key;
      activeItems = portfolio[key]?.items || [];
      activeIndex = Number(index) || 0;
      updateLightbox();
      lightbox?.classList.add("is-open");
      lightbox?.setAttribute("aria-hidden", "false");
      prevButton?.focus();
    };

    const showAdjacent = (direction) => {
      if (!activeItems.length) {
        return;
      }
      activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
      updateLightbox();
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-more-work-portfolio-trigger]") : null;
      if (!trigger) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const trigger = target instanceof Element ? target.closest("[data-more-work-portfolio-trigger]") : null;
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }
      event.preventDefault();
      openModal();
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        setActiveTab(tab.dataset.moreWorkTab);
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + offset + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        setActiveTab(tabs[nextIndex].dataset.moreWorkTab);
      });
    });

    modal.addEventListener("click", (event) => {
      const target = event.target;
      const item = target instanceof Element ? target.closest("[data-more-work-item]") : null;
      if (!item) {
        return;
      }
      openLightbox(item.dataset.moreWorkCategory, item.dataset.moreWorkItem);
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    lightbox?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (lightbox?.classList.contains("is-open")) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          showAdjacent(-1);
        } else if (event.key === "ArrowRight") {
          showAdjacent(1);
        } else {
          trapFocus(event, lightbox);
        }
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      trapFocus(event, modal);
    });
  };

  const initMotionShowcase = () => {
    const section = document.querySelector("[data-motion-showcase]");
    if (!section) {
      return;
    }

    const tabs = Array.from(section.querySelectorAll("[data-motion-tab]"));
    const tabsList = section.querySelector(".motion-tabs");
    const featuredPlayer = section.querySelector(".motion-featured-player");
    const featuredVideo = section.querySelector(".motion-featured-video");
    const featuredCategory = section.querySelector("[data-motion-featured-category]");
    const featuredTitle = section.querySelector("[data-motion-featured-title]");
    const gallery = section.querySelector("[data-motion-gallery]");
    const prevButton = section.querySelector("[data-motion-prev]");
    const nextButton = section.querySelector("[data-motion-next]");

    if (!tabs.length || !featuredVideo || !gallery) {
      return;
    }

    const categories = {
      cgi: {
        label: "CGI",
        videos: [
          "assets/videos/CGI/Picture%202.webm",
          "assets/videos/CGI/video-7.webm"
        ]
      },
      "3d-animation": {
        label: "3D ANIMATION",
        videos: [
          "assets/videos/3d-animation/video-1.webm",
          "assets/videos/3d-animation/video-2.webm",
          "assets/videos/3d-animation/video-3.webm"
        ]
      },
      "stop-motion": {
        label: "STOP MOTION",
        videos: [
          "assets/videos/stop-motion/video-1.webm",
          "assets/videos/stop-motion/video-2.webm"
        ]
      },
      "reel-edits": {
        label: "REEL EDITS",
        videos: [
          "assets/videos/reel-edits/video-3.webm",
          "assets/videos/reel-edits/video-4.webm",
          "assets/videos/reel-edits/video-5.webm"
        ]
      }
    };

    let activeCategory = "cgi";
    let activeIndex = 0;
    let isSectionVisible = false;
    let pendingFeaturedSrc = "";
    let featuredPlaybackEnabled = false;
    let touchStartX = 0;
    let switchTimer = null;

    const safePlay = (video) => {
      if (!video || !isSectionVisible) {
        return;
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const safePause = (video) => {
      if (!video || video.paused) {
        return;
      }
      video.pause();
    };

    const getCurrentItem = () => categories[activeCategory]?.videos?.[activeIndex];

    const getCategoryVideos = () => categories[activeCategory]?.videos || [];

    const getLoopedIndex = (index) => {
      const videos = getCategoryVideos();
      if (!videos.length) {
        return 0;
      }
      return (index + videos.length) % videos.length;
    };

    const updateIndicator = () => {
      const activeTab = tabs.find((tab) => tab.dataset.motionTab === activeCategory);
      if (!activeTab || !tabsList) {
        return;
      }
      tabsList.style.setProperty("--motion-tab-width", `${activeTab.offsetWidth}px`);
      tabsList.style.setProperty("--motion-tab-left", `${activeTab.offsetLeft - 8}px`);
    };

    const setFeaturedVideo = (src, shouldPlay = featuredPlaybackEnabled) => {
      if (!src) {
        return;
      }
      if (!isSectionVisible) {
        pendingFeaturedSrc = src;
        return;
      }
      pendingFeaturedSrc = "";
      if (featuredVideo.dataset.currentSrc === src) {
        if (shouldPlay) {
          safePlay(featuredVideo);
        } else {
          safePause(featuredVideo);
        }
        return;
      }
      window.clearTimeout(switchTimer);
      featuredPlayer?.classList.add("is-switching");
      switchTimer = window.setTimeout(() => {
        featuredVideo.pause();
        featuredVideo.src = src;
        featuredVideo.dataset.currentSrc = src;
        featuredVideo.setAttribute("preload", "auto");
        featuredVideo.load();
        window.setTimeout(() => {
          featuredPlayer?.classList.remove("is-switching");
          if (shouldPlay) {
            safePlay(featuredVideo);
          } else {
            safePause(featuredVideo);
          }
        }, 60);
      }, 180);
    };

    const updateFeaturedText = () => {
      const category = categories[activeCategory];
      const title = `${category.label} ${String(activeIndex + 1).padStart(2, "0")}`;
      if (featuredCategory) {
        featuredCategory.textContent = category.label;
      }
      if (featuredTitle) {
        featuredTitle.textContent = title;
      }
    };

    const updateActiveCard = () => {
      gallery.querySelectorAll("[data-motion-video-index]").forEach((card) => {
        const isActive = Number(card.dataset.motionVideoIndex) === activeIndex;
        card.classList.toggle("is-active", isActive);
        card.setAttribute("aria-pressed", String(isActive));
      });
    };

    const unloadInactiveVideos = () => {
      const videos = getCategoryVideos();
      const allowed = new Set([
        getLoopedIndex(activeIndex),
        getLoopedIndex(activeIndex - 1),
        getLoopedIndex(activeIndex + 1)
      ]);
      gallery.querySelectorAll("video[data-motion-thumb-index]").forEach((video) => {
        const index = Number(video.dataset.motionThumbIndex);
        if (allowed.has(index)) {
          if (!video.getAttribute("src")) {
            video.src = video.dataset.src;
          }
          video.preload = index === activeIndex ? "auto" : "metadata";
          return;
        }
        safePause(video);
        video.removeAttribute("src");
        video.load();
      });
      if (!videos.length) {
        safePause(featuredVideo);
      }
    };

    const updateCarouselState = (shouldPlay = featuredPlaybackEnabled) => {
      updateFeaturedText();
      updateActiveCard();
      unloadInactiveVideos();
      setFeaturedVideo(getCurrentItem(), shouldPlay);
    };

    const selectVideo = (index, shouldPlay = true) => {
      activeIndex = getLoopedIndex(index);
      featuredPlaybackEnabled = shouldPlay;
      updateCarouselState(shouldPlay);
    };

    const showAdjacent = (direction) => {
      selectVideo(activeIndex + direction);
    };

    const createVideoCard = (src, index, category) => {
      const card = document.createElement("button");
      card.className = "motion-video-card";
      card.type = "button";
      card.dataset.motionVideoIndex = String(index);
      card.style.animationDelay = `${Math.min(index * 70, 360)}ms`;
      card.setAttribute("aria-label", `Play ${category.label} ${index + 1}`);
      card.setAttribute("aria-pressed", String(index === activeIndex));

      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "none";
      video.dataset.src = src;
      video.dataset.motionThumbIndex = String(index);
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      const info = document.createElement("span");
      info.className = "motion-video-info";
      info.innerHTML = `
        <span>
          <span class="motion-video-badge">${category.label}</span>
          <span class="motion-video-title">${category.label} ${String(index + 1).padStart(2, "0")}</span>
        </span>
        <span class="motion-video-play" aria-hidden="true"></span>
      `;

      card.append(video, info);
      card.addEventListener("click", () => selectVideo(index));
      card.addEventListener("mouseenter", () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          safePlay(video);
        }
      });
      card.addEventListener("mouseleave", () => {
        safePause(video);
      });
      return card;
    };

    const loadActiveVideos = () => {
      unloadInactiveVideos();
      if (pendingFeaturedSrc) {
        setFeaturedVideo(pendingFeaturedSrc, featuredPlaybackEnabled);
      }
    };

    const renderGallery = () => {
      const category = categories[activeCategory];
      gallery.innerHTML = "";
      category.videos.forEach((src, index) => {
        gallery.appendChild(createVideoCard(src, index, category));
      });
    };

    const setActiveCategory = (key) => {
      if (!categories[key]) {
        return;
      }
      activeCategory = key;
      activeIndex = 0;
      featuredPlaybackEnabled = false;
      tabs.forEach((tab) => {
        const isActive = tab.dataset.motionTab === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });
      featuredPlayer?.classList.add("is-switching");
      window.setTimeout(() => {
        renderGallery();
        updateCarouselState(false);
        updateIndicator();
        if (gallery.scrollTo) {
          gallery.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 160);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => setActiveCategory(tab.dataset.motionTab));
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const offset = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + offset + tabs.length) % tabs.length;
        tabs[nextIndex].focus();
        setActiveCategory(tabs[nextIndex].dataset.motionTab);
      });
    });

    prevButton?.addEventListener("click", () => showAdjacent(-1));
    nextButton?.addEventListener("click", () => showAdjacent(1));

    featuredPlayer?.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    featuredPlayer?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(deltaX) < 42) {
        return;
      }
      showAdjacent(deltaX > 0 ? -1 : 1);
    }, { passive: true });

    featuredPlayer?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showAdjacent(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showAdjacent(1);
      }
    });

    tabsList?.addEventListener("scroll", updateIndicator, { passive: true });
    window.addEventListener("resize", updateIndicator);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target !== section) {
              return;
            }
            isSectionVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
            if (isSectionVisible) {
              loadActiveVideos();
              if (featuredPlaybackEnabled) {
                safePlay(featuredVideo);
              } else {
                safePause(featuredVideo);
              }
            } else {
              safePause(featuredVideo);
              gallery.querySelectorAll("video").forEach(safePause);
            }
          });
        },
        { threshold: [0, 0.2, 0.6] }
      );
      observer.observe(section);
    } else {
      isSectionVisible = true;
    }

    setActiveCategory("cgi");
    if (isSectionVisible) {
      loadActiveVideos();
    }
  };

  const initMotionGateway = () => {
    const section = document.querySelector("[data-motion-showcase]");
    const modal = document.getElementById("motionPortfolioModal");
    if (!section || !modal) {
      return;
    }

    const cards = Array.from(section.querySelectorAll("[data-motion-category-card]"));
    const categoryGrid = section.querySelector("[data-motion-category-grid]");
    const categoryPrev = section.querySelector("[data-motion-carousel-prev]");
    const categoryNext = section.querySelector("[data-motion-carousel-next]");
    const shell = modal.querySelector(".motion-portfolio-shell");
    const title = modal.querySelector("#motionPortfolioTitle");
    const description = modal.querySelector("[data-motion-modal-description]");
    const viewport = modal.querySelector("[data-motion-carousel-viewport]");
    const grid = modal.querySelector("[data-motion-modal-grid]");
    const lightbox = modal.querySelector(".motion-video-lightbox");
    const lightboxStage = modal.querySelector("[data-motion-lightbox-stage]");
    const lightboxVideo = modal.querySelector("[data-motion-lightbox-video]");
    const lightboxCaption = modal.querySelector("[data-motion-lightbox-caption]");
    const lightboxCloseControls = Array.from(modal.querySelectorAll("[data-motion-lightbox-close]"));
    const lightboxPrev = modal.querySelector("[data-motion-lightbox-prev]");
    const lightboxNext = modal.querySelector("[data-motion-lightbox-next]");
    const closeControls = Array.from(modal.querySelectorAll("[data-motion-modal-close]"));
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const categories = {
      "motion-3d": {
        label: "MOTION & 3D",
        description: "Motion graphics, 3D animation, and product visualization systems.",
        videos: [
          "assets/videos/3d-animation/video-1.webm",
          "assets/videos/3d-animation/video-2.webm",
          "assets/videos/3d-animation/video-3.webm"
        ]
      },
      cgi: {
        label: "CGI",
        description: "Computer-generated visuals, premium simulations, and cinematic product moments.",
        videos: [
          "assets/videos/CGI/Picture%202.webm",
          "assets/videos/CGI/video-7.webm"
        ]
      },
      "vfx-graphics": {
        label: "VFX AND GRAPHICS",
        description: "Visual effects, graphic motion systems, and high-impact digital compositions.",
        videos: [
          "assets/videos/vfx-graphics/video-8.webm"
        ]
      },
      "stop-motion": {
        label: "STOP MOTION",
        description: "Frame-by-frame storytelling, product reveals, and creative campaigns.",
        videos: [
          "assets/videos/stop-motion/video-1.webm",
          "assets/videos/stop-motion/video-2.webm"
        ]
      },
      "reel-edits": {
        label: "REEL EDITS",
        description: "Short-form content, viral edits, and brand storytelling.",
        videos: [
          "assets/videos/reel-edits/video-3.webm",
          "assets/videos/reel-edits/video-4.webm",
          "assets/videos/reel-edits/video-5.webm"
        ]
      }
    };

    let isSectionVisible = false;
    let lastFocusedElement = null;
    let activeVideos = [];
    let activeIndex = 0;
    let activeCategory = null;
    let scrollTimer = 0;
    let modalVideoObserver = null;
    let lightboxTouchStartX = 0;

    const safePlay = (video, requireSectionVisible = true) => {
      if (!video || (requireSectionVisible && !isSectionVisible)) {
        return;
      }
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    const safePause = (video) => {
      if (!video || video.paused) {
        return;
      }
      video.pause();
    };

    const loadVideo = (video, src, preload = "metadata") => {
      if (!video || !src || video.getAttribute("src") === src) {
        return;
      }
      video.src = src;
      video.preload = preload;
      video.load();
    };

    const getFocusableElements = (scope) => Array.from(scope.querySelectorAll(focusableSelector))
      .filter((element) => element.getClientRects().length > 0 || element === document.activeElement);

    const trapFocus = (event) => {
      if (event.key !== "Tab") {
        return;
      }
      const focusable = getFocusableElements(modal);
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const pauseAllMotionVideos = () => {
      cards.forEach((card) => safePause(card.querySelector("video")));
      activeVideos.forEach(safePause);
    };

    const scrollCategoryCarousel = (direction) => {
      if (!categoryGrid) {
        return;
      }
      const firstCard = categoryGrid.querySelector("[data-motion-category-card]");
      const gap = parseFloat(window.getComputedStyle(categoryGrid).columnGap || "0") || 0;
      const scrollAmount = firstCard
        ? firstCard.getBoundingClientRect().width + gap
        : categoryGrid.clientWidth * 0.86;
      categoryGrid.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth"
      });
    };

    const setVideoOrientation = (video, item) => {
      if (!video || !item) {
        return;
      }
      const applyOrientation = () => {
        const orientation = video.videoHeight > video.videoWidth ? "portrait" : "landscape";
        item.classList.toggle("is-portrait", orientation === "portrait");
        item.classList.toggle("is-landscape", orientation === "landscape");
      };
      if (video.readyState >= 1) {
        applyOrientation();
      } else {
        video.addEventListener("loadedmetadata", applyOrientation, { once: true });
      }
    };

    const setLightboxVideo = (index) => {
      if (!activeCategory || !lightboxVideo || !lightboxCaption) {
        return;
      }
      activeIndex = (index + activeCategory.videos.length) % activeCategory.videos.length;
      const src = activeCategory.videos[activeIndex];
      lightboxStage?.classList.remove("is-portrait", "is-landscape");
      loadVideo(lightboxVideo, src, "auto");
      setVideoOrientation(lightboxVideo, lightboxStage);
      lightboxCaption.textContent = `${activeCategory.label} / ${String(activeIndex + 1).padStart(2, "0")}`;
      safePlay(lightboxVideo, false);
    };

    const openLightbox = (index) => {
      if (!activeCategory || !lightbox) {
        return;
      }
      activeVideos.forEach(safePause);
      setLightboxVideo(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    };

    const closeLightbox = () => {
      if (!lightbox?.classList.contains("is-open")) {
        return;
      }
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      safePause(lightboxVideo);
      lightboxVideo?.removeAttribute("src");
      lightboxVideo?.load();
      observeModalVideos();
    };

    const showAdjacentLightboxVideo = (direction) => {
      if (!lightbox?.classList.contains("is-open")) {
        return;
      }
      setLightboxVideo(activeIndex + direction);
    };

    const loadNearbyVideos = (index) => {
      if (!activeCategory) {
        return;
      }
      [index - 1, index, index + 1].forEach((videoIndex) => {
        if (videoIndex < 0 || videoIndex >= activeCategory.videos.length) {
          return;
        }
        loadVideo(activeVideos[videoIndex], activeCategory.videos[videoIndex], videoIndex === index ? "auto" : "metadata");
      });
    };

    const updateActiveSlide = (index, shouldScroll = true) => {
      if (!activeCategory || !grid) {
        return;
      }
      activeIndex = (index + activeCategory.videos.length) % activeCategory.videos.length;
      const items = Array.from(grid.querySelectorAll(".motion-portfolio-item"));
      loadNearbyVideos(activeIndex);
      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === activeIndex;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-current", String(isActive));
        const video = activeVideos[itemIndex];
        if (!video) {
          return;
        }
        if (isActive && modal.classList.contains("is-open")) {
          safePlay(video, false);
        } else {
          safePause(video);
        }
      });
      if (shouldScroll && items[activeIndex]) {
        items[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    };

    const observeModalVideos = () => {
      if (modalVideoObserver) {
        modalVideoObserver.disconnect();
      }
      if (!("IntersectionObserver" in window) || !viewport) {
        activeVideos.forEach((video) => {
          loadVideo(video, video.dataset.src, "metadata");
          if (modal.classList.contains("is-open")) {
            safePlay(video, false);
          }
        });
        return;
      }
      modalVideoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target.querySelector("video");
            if (!video) {
              return;
            }
            if (entry.isIntersecting && entry.intersectionRatio >= 0.36 && modal.classList.contains("is-open")) {
              grid?.querySelectorAll(".motion-portfolio-item").forEach((item) => item.classList.remove("is-active"));
              entry.target.classList.add("is-active");
              loadVideo(video, video.dataset.src, "metadata");
              safePlay(video, false);
            } else {
              safePause(video);
            }
          });
        },
        { root: viewport, threshold: [0, 0.36, 0.68] }
      );
      grid?.querySelectorAll(".motion-portfolio-item").forEach((item) => {
        modalVideoObserver.observe(item);
      });
    };

    const syncActiveSlideFromScroll = () => {
      if (!viewport || !grid) {
        return;
      }
      const items = Array.from(grid.querySelectorAll(".motion-portfolio-item"));
      if (!items.length) {
        return;
      }
      const viewportRect = viewport.getBoundingClientRect();
      const viewportCenter = viewportRect.left + viewportRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(viewportCenter - itemCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== activeIndex) {
        updateActiveSlide(closestIndex, false);
      }
    };

    const renderModalGrid = (category) => {
      if (!grid) {
        return;
      }
      grid.innerHTML = "";
      activeVideos = [];
      activeCategory = category;
      activeIndex = 0;
      category.videos.forEach((src, index) => {
        const item = document.createElement("button");
        item.className = "motion-portfolio-item";
        item.type = "button";
        item.style.animationDelay = `${Math.min(index * 70, 360)}ms`;
        item.setAttribute("aria-label", `Play ${category.label} ${index + 1}`);

        const video = document.createElement("video");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "none";
        video.dataset.src = src;
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        setVideoOrientation(video, item);

        const label = document.createElement("span");
        label.textContent = `${category.label} ${String(index + 1).padStart(2, "0")}`;

        item.append(video, label);
        item.addEventListener("click", () => {
          activeIndex = index;
          grid.querySelectorAll(".motion-portfolio-item").forEach((card) => card.classList.remove("is-active"));
          item.classList.add("is-active");
          loadVideo(video, src, "auto");
          safePlay(video, false);
          item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
          openLightbox(index);
        });

        grid.appendChild(item);
        activeVideos.push(video);
        loadVideo(video, src, index < 4 ? "metadata" : "none");
        if (index === 0) {
          item.classList.add("is-active");
        }
      });
      observeModalVideos();
    };

    const openModal = (key) => {
      const category = categories[key];
      if (!category) {
        return;
      }
      lastFocusedElement = document.activeElement;
      if (title) {
        title.textContent = category.label;
      }
      if (description) {
        description.textContent = category.description;
      }
      renderModalGrid(category);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("motion-portfolio-open");
      window.setTimeout(() => {
        shell?.focus();
        observeModalVideos();
      }, 80);
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("motion-portfolio-open");
      activeVideos.forEach((video) => {
        safePause(video);
        video.removeAttribute("src");
        video.load();
      });
      activeVideos = [];
      activeCategory = null;
      modalVideoObserver?.disconnect();
      modalVideoObserver = null;
      closeLightbox();
      if (grid) {
        grid.innerHTML = "";
      }
      if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
      }
    };

    cards.forEach((card) => {
      const key = card.dataset.motionCategoryCard;
      const category = categories[key];
      const preview = card.querySelector("[data-motion-preview]");
      if (preview && category?.videos?.[0]) {
        preview.dataset.src = category.videos[0];
      }

      card.addEventListener("click", () => openModal(key));
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        event.preventDefault();
        openModal(key);
      });
    });

    closeControls.forEach((control) => {
      control.addEventListener("click", closeModal);
    });

    lightboxCloseControls.forEach((control) => {
      control.addEventListener("click", closeLightbox);
    });

    lightboxPrev?.addEventListener("click", () => showAdjacentLightboxVideo(-1));
    lightboxNext?.addEventListener("click", () => showAdjacentLightboxVideo(1));
    categoryPrev?.addEventListener("click", () => scrollCategoryCarousel(-1));
    categoryNext?.addEventListener("click", () => scrollCategoryCarousel(1));

    lightbox?.addEventListener("touchstart", (event) => {
      lightboxTouchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });

    lightbox?.addEventListener("touchend", (event) => {
      const deltaX = (event.changedTouches[0]?.clientX || 0) - lightboxTouchStartX;
      if (Math.abs(deltaX) < 45) {
        return;
      }
      showAdjacentLightboxVideo(deltaX < 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        if (lightbox?.classList.contains("is-open")) {
          closeLightbox();
          return;
        }
        closeModal();
        return;
      }
      if (lightbox?.classList.contains("is-open") && event.key === "ArrowLeft") {
        event.preventDefault();
        showAdjacentLightboxVideo(-1);
        return;
      }
      if (lightbox?.classList.contains("is-open") && event.key === "ArrowRight") {
        event.preventDefault();
        showAdjacentLightboxVideo(1);
        return;
      }
      trapFocus(event);
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target !== section) {
              return;
            }
            isSectionVisible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
            if (!isSectionVisible) {
              pauseAllMotionVideos();
              return;
            }
            cards.forEach((card) => {
              const video = card.querySelector("[data-motion-preview]");
              if (!video?.dataset.src) {
                return;
              }
              loadVideo(video, video.dataset.src);
              safePlay(video);
            });
            if (modal.classList.contains("is-open")) {
              updateActiveSlide(activeIndex, false);
            }
          });
        },
        { threshold: [0, 0.18, 0.5] }
      );
      observer.observe(section);
    } else {
      isSectionVisible = true;
      cards.forEach((card) => {
        const video = card.querySelector("[data-motion-preview]");
        loadVideo(video, video?.dataset.src);
        safePlay(video);
      });
    }
  };

  initCreativeCardSlideshows();
  initMotionGateway();
  initBrandingPortfolio();
  initStoryGridPortfolio();
  initEventsPortfolio();
  initMagazinePortfolio();
  initMoreWorkPortfolio();
  initSocialPortfolio();
})();
