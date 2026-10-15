import type { gsap as GSAP } from 'gsap';
import type { ScrollTrigger as ST } from 'gsap/ScrollTrigger';
import type { SplitText as Split } from 'gsap/SplitText';

const EASE = 'power3.out';

/** Fade + slide ao entrar na tela; filhos com data-reveal-item entram em stagger. */
export function initReveal(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  gsap.set(items, { y: 28 });
  ScrollTrigger.batch(items, {
    start: 'top bottom',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const children = el.querySelectorAll('[data-reveal-item]');
        if (children.length) gsap.from(children, { y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: EASE });
      });
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: EASE, clearProps: 'transform' });
    },
  });
}

/** Títulos revelados por linha (padrão) ou letra. SplitText mantém o aria-label do texto original. */
export function initSplit(gsap: typeof GSAP, SplitText: typeof Split) {
  gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
    const byChars = el.dataset['split'] === 'chars';
    SplitText.create(el, {
      type: byChars ? 'chars,words' : 'lines',
      ...(byChars ? {} : { mask: 'lines' as const }),
      autoSplit: true,
      aria: 'auto',
      onSplit: (self) =>
        gsap.from(byChars ? self.chars : self.lines, {
          yPercent: byChars ? 60 : 110,
          opacity: byChars ? 0 : 1,
          duration: byChars ? 0.8 : 1,
          stagger: byChars ? 0.025 : 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }),
    });
  });
}

/** Conta de 0 até o número já presente no HTML (o valor real aparece mesmo sem JS). */
export function initCounters(gsap: typeof GSAP, ScrollTrigger: typeof ST) {
  gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
    const target = Number(el.textContent?.replace(/\D/g, ''));
    if (!Number.isFinite(target) || target === 0) return;
    const suffix = el.textContent?.replace(/[\d.,\s]/g, '') ?? '';
    const state = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        }),
    });
  });
}

/** Parallax vertical leve, só no desktop. */
export function initParallax(gsap: typeof GSAP) {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset['parallax'] || 0.15);
    gsap.to(el, {
      yPercent: -amount * 100,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/**
 * Cases em profundidade: o próximo se aproxima (zoom de entrada) e o atual se afasta (zoom de saída),
 * com leve inclinação 3D. Só escala/rotação ligadas ao scroll — sem deslocamento vertical extra.
 */
export function initStack(gsap: typeof GSAP) {
  gsap.utils.toArray<HTMLElement>('[data-case-card]').forEach((card) => {
    const inner = card.firstElementChild;
    if (!inner) return;
    gsap.set(inner, { transformPerspective: 1400, transformOrigin: '50% 50%' });
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } })
      // Entrada: de longe (pequeno, inclinado para trás) até o tamanho real no centro da tela.
      .fromTo(inner, { scale: 0.78, rotationX: 14, opacity: 0.35 }, { scale: 1, rotationX: 0, opacity: 1, ease: 'power2.out', duration: 1 })
      .to(inner, { duration: 0.35 })
      // Saída: recua para o fundo, inclinando para a frente.
      .to(inner, { scale: 0.8, rotationX: -12, opacity: 0.3, ease: 'power2.in', duration: 1 });
  });
}
