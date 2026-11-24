import { useEffect } from 'react';

// Fades cards (.v-card) and marked blocks ([data-reveal]) up as they scroll into view.
// Works for lazily mounted sections via a MutationObserver. The hidden state only
// applies once <html> has the "reveal-ready" class, so content stays visible without JS.
export default function useRevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    // Skip during build-time prerendering (headless Chrome) so the saved HTML stays fully visible.
    if (navigator.webdriver) return;

    const root = document.documentElement;
    const SELECTOR = '.v-card:not(.no-reveal), [data-reveal]';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // A data attribute (not a class) so React re-renders that rewrite className can't undo it.
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    const register = (el: Element) => {
      if (el.hasAttribute('data-reveal-seen')) return;
      el.setAttribute('data-reveal-seen', '');
      // Stagger siblings that share a parent (e.g. a grid of cards).
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.matches(SELECTOR))
        : [];
      const index = Math.max(0, siblings.indexOf(el));
      (el as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(index, 7) * 70}ms`);
      io.observe(el);
    };

    const scan = (node: ParentNode) => node.querySelectorAll(SELECTOR).forEach(register);

    root.classList.add('reveal-ready');
    scan(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches(SELECTOR)) register(el);
          scan(el);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

// Cursor spotlight: feeds the pointer position into each .v-card as CSS vars.
export function useCardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.('.v-card') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
