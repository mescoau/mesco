const canEnhanceBackgroundVideo = () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  // To restrict video to desktop only, add this check and include it in the return:
  // const largeScreen = window.matchMedia("(min-width: 1024px)").matches;
  const connection = navigator.connection;
  const saveData = connection?.saveData;
  const slowConnection = ["slow-2g", "2g", "3g"].includes(
    connection?.effectiveType ?? ""
  );

  return !reducedMotion && !saveData && !slowConnection;
};

const hydrateVideo = (video: HTMLVideoElement | null) => {
  if (
    !video ||
    video.dataset.loaded === "true" ||
    !canEnhanceBackgroundVideo()
  ) {
    return;
  }

  const source = document.createElement("source");
  source.src = video.dataset.src ?? "";
  source.type = "video/mp4";
  video.append(source);
  video.dataset.loaded = "true";

  const reveal = () => video.classList.remove("opacity-0");

  video.addEventListener("playing", reveal, { once: true });

  video.load();

  const tryPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — retry on first user interaction
        const retryOnInteraction = () => {
          video.play().then(reveal).catch(() => {});
          document.removeEventListener("touchstart", retryOnInteraction);
          document.removeEventListener("click", retryOnInteraction);
          document.removeEventListener("scroll", retryOnInteraction);
        };
        document.addEventListener("touchstart", retryOnInteraction, { once: true, passive: true });
        document.addEventListener("click", retryOnInteraction, { once: true });
        document.addEventListener("scroll", retryOnInteraction, { once: true, passive: true });
      });
    }
  };

  tryPlay();
};

const initNavigation = () => {
  const navEl = document.querySelector<HTMLElement>("[data-nav]");
  if (!navEl) {
    return;
  }

  const menuButton = document.querySelector<HTMLElement>("[data-menu-button]");
  const burger = menuButton?.querySelector<HTMLElement>("[data-burger]") ?? null;
  const close = menuButton?.querySelector<HTMLElement>("[data-close]") ?? null;
  const mobileMenu = document.getElementById("mobile-menu");
  const logoEl = document.querySelector<HTMLElement>("[data-logo]");
  const logoImage = document.querySelector<HTMLImageElement>("[data-logo-image]");
  const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");
  const primaryLinks =
    document.querySelectorAll<HTMLElement>("[data-primary-link]");
  const glassNav = document.querySelector<HTMLElement>("[data-glass-nav]");
  const hoverPill =
    glassNav?.querySelector<HTMLElement>("[data-hover-pill]") ?? null;
  const enableScrollSwap = navEl.dataset.swap === "true";

  const updateIcons = () => {
    if (!menuButton || !burger || !close) {
      return;
    }

    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    burger.style.setProperty("--burger-display", expanded ? "none" : "block");
    close.style.setProperty("--close-display", expanded ? "block" : "none");
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.setAttribute("aria-expanded", "true");
    mobileMenu.classList.remove(
      "max-h-0",
      "opacity-0",
      "-translate-y-2",
      "pointer-events-none"
    );
    mobileMenu.classList.add(
      "max-h-screen",
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto"
    );
    updateIcons();
  };

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add(
      "max-h-0",
      "opacity-0",
      "-translate-y-2",
      "pointer-events-none"
    );
    mobileMenu.classList.remove(
      "max-h-screen",
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto"
    );
    updateIcons();
  };

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (
      mobileMenu &&
      menuButton &&
      target instanceof Node &&
      !mobileMenu.contains(target) &&
      !menuButton.contains(target) &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton?.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });

  const swapColor = (element: HTMLElement | null, scrolled: boolean) => {
    if (!element) {
      return;
    }

    element.classList.remove("text-white", "text-base-800");
    element.classList.add(scrolled ? "text-base-800" : "text-white");
  };

  const swapLogoSource = (scrolled: boolean) => {
    if (!logoImage) {
      return;
    }

    logoImage.src = scrolled
      ? logoImage.dataset.lightSrc ?? logoImage.src
      : logoImage.dataset.darkSrc ?? logoImage.src;
  };

  const shrinkLogo = (scrolled: boolean) => {
    if (!navLogo) {
      return;
    }

    navLogo.classList.toggle("h-12", !scrolled);
    navLogo.classList.toggle("h-8", scrolled);
  };

  const updatePillTheme = (isDark: boolean) => {
    if (!hoverPill) {
      return;
    }

    if (isDark) {
      hoverPill.style.background = "rgba(255,255,255,0.22)";
      hoverPill.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.4)";
      return;
    }

    hoverPill.style.background = "rgba(0,0,0,0.07)";
    hoverPill.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.6)";
  };

  const updateGlassTheme = (isDark: boolean) => {
    if (!glassNav) {
      return;
    }

    if (isDark) {
      glassNav.style.background = "rgba(255,255,255,0.1)";
      glassNav.style.borderColor = "rgba(255,255,255,0.2)";
      glassNav.style.boxShadow =
        "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 12px rgba(0,0,0,0.08)";
      return;
    }

    glassNav.style.background = "rgba(0,0,0,0.04)";
    glassNav.style.borderColor = "rgba(0,0,0,0.08)";
    glassNav.style.boxShadow =
      "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.04)";
  };

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    shrinkLogo(scrolled);

    if (!enableScrollSwap) {
      return;
    }

    navEl.classList.toggle("bg-white/80", scrolled);
    navEl.classList.toggle("backdrop-blur-xl", scrolled);

    const isDark = !scrolled;
    swapColor(logoEl, scrolled);
    swapLogoSource(scrolled);
    primaryLinks.forEach((element) => swapColor(element, scrolled));
    swapColor(burger, scrolled);
    swapColor(close, scrolled);
    updatePillTheme(isDark);
    updateGlassTheme(isDark);
  };

  updateIcons();
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (!enableScrollSwap) {
    navEl.classList.add("bg-white/80", "backdrop-blur-xl");
    swapColor(logoEl, true);
    swapLogoSource(true);
    primaryLinks.forEach((element) => swapColor(element, true));
    swapColor(burger, true);
    swapColor(close, true);
    updatePillTheme(false);
    updateGlassTheme(false);
  }

  if (glassNav && hoverPill) {
    glassNav.querySelectorAll<HTMLAnchorElement>("a[data-primary-link]").forEach(
      (link) => {
        link.addEventListener("mouseenter", () => {
          const containerRect = glassNav.getBoundingClientRect();
          const linkRect = link.getBoundingClientRect();
          hoverPill.style.left = `${linkRect.left - containerRect.left}px`;
          hoverPill.style.top = `${linkRect.top - containerRect.top}px`;
          hoverPill.style.width = `${linkRect.width}px`;
          hoverPill.style.height = `${linkRect.height}px`;
          hoverPill.style.opacity = "1";
        });
      }
    );

    glassNav.addEventListener("mouseleave", () => {
      hoverPill.style.opacity = "0";
    });
  }
};

const initHeroVideo = () => {
  const video = document.querySelector<HTMLVideoElement>("video[data-hero-video]");
  if (!video || !canEnhanceBackgroundVideo()) {
    return;
  }

  window.addEventListener(
    "load",
    () => {
      window.setTimeout(() => hydrateVideo(video), 1200);
    },
    { once: true }
  );
};

const initFooterVideo = () => {
  const video = document.querySelector<HTMLVideoElement>(
    "video[data-footer-video]"
  );

  if (!video || !canEnhanceBackgroundVideo()) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        hydrateVideo(video);
        observer.disconnect();
      }
    },
    { rootMargin: "240px 0px" }
  );

  observer.observe(video);
};

const initSiteShell = () => {
  initNavigation();
  initHeroVideo();
  initFooterVideo();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSiteShell, { once: true });
} else {
  initSiteShell();
}
