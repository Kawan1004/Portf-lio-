/**
 * Ponto único de entrada das animações. Componentes só declaram atributos `data-*`;
 * toda a lógica vive aqui. GSAP e Lenis são carregados sob demanda (code-split).
 *
 * Atributos suportados:
 *  data-reveal            fade + slide ao entrar na tela (filhos com data-reveal-item entram em stagger)
 *  data-split             título revelado por linha (ou por letra com data-split="chars")
 *  data-counter           número animado de 0 até o valor do texto
 *  data-parallax="0.15"   deslocamento vertical proporcional ao scroll (desktop)
 *  data-magnetic          botão atraído pelo cursor (desktop)
 *  data-tilt              inclinação 3D leve no hover (desktop)
 *  data-case-card         cases em profundidade: zoom de entrada e saída ligado ao scroll (desktop)
 */
const media = {
  reduced: () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: () => matchMedia('(hover: hover) and (pointer: fine)').matches,
  desktop: () => matchMedia('(min-width: 1024px)').matches,
};

export type MotionEnv = typeof media;

async function boot() {
  const root = document.documentElement;
  if (media.reduced()) {
    root.classList.add('motion-off');
    return;
  }

  try {
    const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ]);
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const [{ initScroll }, effects, pointer] = await Promise.all([
      import('./scroll'),
      import('./effects'),
      import('./pointer'),
    ]);

    initScroll(gsap, ScrollTrigger);
    effects.initSplit(gsap, SplitText);
    effects.initReveal(gsap, ScrollTrigger);
    effects.initCounters(gsap, ScrollTrigger);
    if (media.desktop()) {
      effects.initParallax(gsap);
      effects.initStack(gsap);
    }
    if (media.finePointer()) pointer.initPointer(gsap);

    root.classList.add('motion-ready');
    ScrollTrigger.refresh();
  } catch {
    // Sem animação, mas nunca sem conteúdo.
    root.classList.add('motion-off');
  }
}

export function initMotion() {
  const start = () => void boot();
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 800 });
  else setTimeout(start, 1);
}
