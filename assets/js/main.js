// MVPulse — interactions du site

document.documentElement.classList.remove("no-js");

// ----- Black Friday -----
// L'opération s'affiche (bandeau, section, prix barrés) uniquement entre ces deux dates,
// puis disparaît toute seule. Pour la prolonger ou la refaire, change simplement les dates.
const BF_START = new Date("2026-11-18T00:00:00+01:00");
const BF_END = new Date("2026-11-30T23:59:59+01:00");
const isBlackFriday = () => {
  const now = Date.now();
  return now >= BF_START.getTime() && now <= BF_END.getTime();
};

if (isBlackFriday()) {
  document.documentElement.classList.add("is-bf");
  const pad = (n) => String(n).padStart(2, "0");
  const shortEls = document.querySelectorAll('[data-bf-countdown="short"]');
  const fullEls = document.querySelectorAll('[data-bf-countdown="full"]');
  const tickBf = () => {
    const left = Math.max(0, BF_END.getTime() - Date.now());
    if (left === 0) {
      document.documentElement.classList.remove("is-bf");
      clearInterval(bfTimer);
      return;
    }
    const s = Math.floor(left / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    shortEls.forEach((el) => (el.textContent = d > 0 ? `${d}j ${pad(h)}h ${pad(m)}min` : `${pad(h)}h ${pad(m)}min ${pad(sec)}s`));
    fullEls.forEach((el) => {
      el.querySelector('[data-unit="d"]').textContent = pad(d);
      el.querySelector('[data-unit="h"]').textContent = pad(h);
      el.querySelector('[data-unit="m"]').textContent = pad(m);
      el.querySelector('[data-unit="s"]').textContent = pad(sec);
    });
  };
  const bfTimer = setInterval(tickBf, 1000);
  tickBf();

  // Fenêtre d'accueil : une seule fois par visite, après quelques secondes
  const pop = document.getElementById("bf-pop");
  if (pop) {
    let seen = false;
    try { seen = sessionStorage.getItem("bf-pop-seen") === "1"; } catch (e) {}
    const closePop = () => {
      pop.classList.remove("is-open");
      setTimeout(() => (pop.hidden = true), 250);
      try { sessionStorage.setItem("bf-pop-seen", "1"); } catch (e) {}
    };
    if (!seen) {
      setTimeout(() => {
        pop.hidden = false;
        requestAnimationFrame(() => pop.classList.add("is-open"));
      }, 2500);
    }
    pop.addEventListener("click", (e) => {
      if (e.target === pop || e.target.closest(".bf-pop__close") || e.target.closest(".bf-pop__cta")) closePop();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pop.hidden) closePop(); });
  }
}

// ----- Menu mobile -----
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// ----- Header opaque au scroll -----
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ----- Apparition des éléments au scroll -----
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// ----- Compteurs animés -----
const counters = document.querySelectorAll("[data-count]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCounter(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  counters.forEach((el) => counterObserver.observe(el));
} else {
  counters.forEach((el) => (el.textContent = el.dataset.count));
}

// ----- Année du footer -----
document.getElementById("year").textContent = new Date().getFullYear();
