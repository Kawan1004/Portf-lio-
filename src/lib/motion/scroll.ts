import type { gsap as GSAP } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/** Smooth scroll (Lenis) sincronizado com o ticker do GSAP + barra de progresso e nav que se esconde. */
export function initScroll(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Links para seções da mesma página (`#x` ou `/#x`): um único controlador de rolagem, com ajuste final
  // caso algo mude de altura no caminho (imagens, animações). Evita o salto nativo brigar com o Lenis.
  // O Lenis já respeita o `scroll-margin-top` da seção (folga para o menu fixo); o ajuste final mira essa mesma folga.
  let navigating = false; // durante a navegação pelos links o menu fica visível
  const margin = (el: Element) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', url.hash);
    navigating = true;
    lenis.scrollTo(target, {
      onComplete: () => {
        navigating = false;
        const drift = target.getBoundingClientRect().top - margin(target);
        if (Math.abs(drift) > 2) lenis.scrollTo(target, { immediate: true });
      },
    });
  });

  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const nav = document.querySelector<HTMLElement>('[data-autohide]');
  let lastY = 0;

  lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
    if (progress) progress.style.transform = `scaleX(${limit > 0 ? scroll / limit : 0})`;
    if (nav) {
      const hide = !navigating && scroll > 120 && scroll > lastY && !nav.contains(document.activeElement);
      nav.classList.toggle('-translate-y-full', hide);
      lastY = scroll;
    }
  });
}
