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

// ── Shared nav-appearance helpers ──────────────────────────────────────
// Used by both initNavigation (on page-load) and the astro:before-swap
// handler so the logic lives in one place.

interface NavElements {
  navEl: HTMLElement;
  logoEl: HTMLElement | null;
  logoImage: HTMLImageElement | null;
  navLogo: HTMLElement | null;
  primaryLinks: NodeListOf<HTMLElement>;
  menuButton: HTMLElement | null;
  burger: HTMLElement | null;
  close: HTMLElement | null;
  glassNav: HTMLElement | null;
  hoverPill: HTMLElement | null;
}

const queryNavElements = (root: HTMLElement | Document = document): NavElements | null => {
  const navEl = root.querySelector<HTMLElement>("[data-nav]");
  if (!navEl) return null;

  const menuButton = navEl.querySelector<HTMLElement>("[data-menu-button]");
  return {
    navEl,
    logoEl: navEl.querySelector<HTMLElement>("[data-logo]"),
    logoImage: navEl.querySelector<HTMLImageElement>("[data-logo-image]"),
    navLogo: navEl.querySelector<HTMLElement>("[data-nav-logo]"),
    primaryLinks: navEl.querySelectorAll<HTMLElement>("[data-primary-link]"),
    menuButton,
    burger: menuButton?.querySelector<HTMLElement>("[data-burger]") ?? null,
    close: menuButton?.querySelector<HTMLElement>("[data-close]") ?? null,
    glassNav: navEl.querySelector<HTMLElement>("[data-glass-nav]"),
    hoverPill: navEl.querySelector<HTMLElement>("[data-hover-pill]") ?? null,
  };
};

const setTextColor = (el: HTMLElement | null, dark: boolean) => {
  if (!el) return;
  el.classList.remove("text-white", "text-base-800");
  el.classList.add(dark ? "text-base-800" : "text-white");
};

const setLogoSource = (img: HTMLImageElement | null, dark: boolean) => {
  if (!img) return;
  img.src = dark
    ? img.dataset.lightSrc ?? img.src
    : img.dataset.darkSrc ?? img.src;
};

const setGlassTheme = (glassNav: HTMLElement | null, dark: boolean) => {
  if (!glassNav) return;
  if (dark) {
    glassNav.style.background = "rgba(255,255,255,0.1)";
    glassNav.style.borderColor = "rgba(255,255,255,0.2)";
    glassNav.style.boxShadow =
      "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 12px rgba(0,0,0,0.08)";
  } else {
    glassNav.style.background = "rgba(0,0,0,0.04)";
    glassNav.style.borderColor = "rgba(0,0,0,0.08)";
    glassNav.style.boxShadow =
      "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.04)";
  }
};

const setPillTheme = (pill: HTMLElement | null, dark: boolean) => {
  if (!pill) return;
  if (dark) {
    pill.style.background = "rgba(255,255,255,0.22)";
    pill.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.4)";
  } else {
    pill.style.background = "rgba(0,0,0,0.07)";
    pill.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.6)";
  }
};

/** Apply the full solid or transparent appearance to the nav in one call. */
const applyNavTheme = (els: NavElements, solid: boolean) => {
  const { navEl, logoEl, logoImage, primaryLinks, burger, close, glassNav, hoverPill } = els;
  const dark = !solid; // "dark" means dark-background (transparent hero), light text

  if (solid) {
    navEl.classList.add("bg-white/80", "backdrop-blur-xl");
    navEl.classList.remove("nav-transparent");
  } else {
    navEl.classList.remove("bg-white/80", "backdrop-blur-xl");
    navEl.classList.add("nav-transparent");
  }

  setTextColor(logoEl, solid);
  setLogoSource(logoImage, solid);
  primaryLinks.forEach((el) => setTextColor(el, solid));
  setTextColor(burger, solid);
  setTextColor(close, solid);
  setGlassTheme(glassNav, dark);
  setPillTheme(hoverPill, dark);
};

// ── Navigation init ────────────────────────────────────────────────────

// AbortController to tear down listeners from the previous navigation,
// preventing duplicates on the persisted nav element.
let navAbort: AbortController | null = null;

const initNavigation = () => {
  // Abort any listeners from the previous page before re-binding
  navAbort?.abort();
  navAbort = new AbortController();
  const { signal } = navAbort;

  const els = queryNavElements();
  if (!els) return;

  const { navEl, navLogo, menuButton, burger, close, glassNav, hoverPill } = els;
  const mobileMenu = document.getElementById("mobile-menu");
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

  menuButton?.addEventListener(
    "click",
    () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    },
    { signal }
  );

  document.addEventListener(
    "click",
    (event) => {
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
    },
    { signal }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        menuButton?.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
      }
    },
    { signal }
  );

  const shrinkLogo = (scrolled: boolean) => {
    if (!navLogo) {
      return;
    }

    navLogo.classList.toggle("h-12", !scrolled);
    navLogo.classList.toggle("h-8", scrolled);
  };

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    shrinkLogo(scrolled);

    if (!enableScrollSwap) {
      return;
    }

    // Transparent nav — swap between solid (scrolled) and transparent (top)
    applyNavTheme(els, scrolled);
  };

  // Close mobile menu on navigation (it persists across pages)
  closeMenu();

  updateIcons();
  window.addEventListener("scroll", handleScroll, { passive: true, signal });
  handleScroll();

  // Force solid appearance for non-transparent pages
  if (!enableScrollSwap) {
    applyNavTheme(els, true);
  }

  if (glassNav && hoverPill) {
    glassNav.querySelectorAll<HTMLAnchorElement>("a[data-primary-link]").forEach(
      (link) => {
        link.addEventListener(
          "mouseenter",
          () => {
            const containerRect = glassNav.getBoundingClientRect();
            const linkRect = link.getBoundingClientRect();
            hoverPill.style.left = `${linkRect.left - containerRect.left}px`;
            hoverPill.style.top = `${linkRect.top - containerRect.top}px`;
            hoverPill.style.width = `${linkRect.width}px`;
            hoverPill.style.height = `${linkRect.height}px`;
            hoverPill.style.opacity = "1";
          },
          { signal }
        );
      }
    );

    glassNav.addEventListener(
      "mouseleave",
      () => {
        hoverPill.style.opacity = "0";
      },
      { signal }
    );
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

// ── View Transitions: sync persisted nav ───────────────────────────────
// The nav element persists across View Transitions. Before the DOM swap
// we read the incoming page's data-swap value and immediately apply the
// matching visual state so there is no flash during the transition.
document.addEventListener("astro:before-swap", (event) => {
  const els = queryNavElements();
  if (!els) return;

  const detail = (event as unknown as CustomEvent).detail;
  const newDoc = detail.newDocument as Document;
  const incomingNav = newDoc.querySelector<HTMLElement>("[data-nav]");
  if (!incomingNav) return;

  const shouldBeTransparent = incomingNav.dataset.swap === "true";
  els.navEl.dataset.swap = shouldBeTransparent ? "true" : "false";

  // Apply theme immediately — solid for non-transparent pages,
  // transparent for transparent pages (scroll handler will refine on page-load).
  applyNavTheme(els, !shouldBeTransparent);

  // Hide hover pill to prevent stale positioning during transition
  if (els.hoverPill) {
    els.hoverPill.style.opacity = "0";
  }
});

// Re-initialize after each client-side navigation.
// astro:page-load fires on initial load AND after every View Transition nav.
document.addEventListener("astro:page-load", () => {
  initNavigation();
  initHeroVideo();
  initFooterVideo();
});
