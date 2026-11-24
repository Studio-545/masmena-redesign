import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// One-time intro (once per browser session): the MAS wordmark rises in,
// a purple line sweeps across, then the curtain lifts to reveal the site.
const SESSION_KEY = 'mas-intro-seen';

const shouldPlay = () => {
  try {
    if (navigator.webdriver) return false; // build-time prerender
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.location.pathname !== '/') return false;
    // Desktop only: on phones/tablets the intro would delay the first content
    // (a Core Web Vitals ranking signal) on slower processors and connections.
    if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return false;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? '')) return false;
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    return true;
  } catch {
    return false;
  }
};

// Decided once per page load, so the hero can wait for the curtain to lift.
const WILL_PLAY = typeof window !== 'undefined' && shouldPlay();

/** Seconds the hero's entrance should wait so it plays after the intro, not behind it. */
export const introDelay = () => (WILL_PLAY ? 1.4 : 0);

const IntroLoader: React.FC = () => {
  const [active, setActive] = useState(WILL_PLAY);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !rootRef.current) return;
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* storage blocked */ }
    window.dispatchEvent(new Event('scroll-lock'));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event('scroll-unlock'));
          setActive(false);
        },
      });
      tl.fromTo('.intro-letter', { yPercent: 110 }, { yPercent: 0, duration: 0.55, stagger: 0.06, ease: 'power4.out' })
        .fromTo('.intro-sub', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.25')
        .fromTo('.intro-line', { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, '-=0.2')
        .to('.intro-content', { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' }, '+=0.05')
        .to(rootRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.65, ease: 'power4.inOut' }, '-=0.1');
    }, rootRef);

    return () => {
      ctx.revert();
      window.dispatchEvent(new Event('scroll-unlock'));
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[11000] flex items-center justify-center bg-[#050505]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div aria-hidden className="brand-glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="intro-content relative flex flex-col items-center">
        <div className="flex overflow-hidden font-display font-semibold tracking-[-0.06em] leading-[0.9] text-[96px] md:text-[160px] text-white">
          {'MAS'.split('').map((l) => (
            <span key={l} className="intro-letter inline-block">{l}</span>
          ))}
        </div>
        <div className="intro-line mt-4 h-px w-[220px] md:w-[320px] origin-left bg-[var(--accent-color)]" />
        <p className="intro-sub mt-4 text-[12px] md:text-[13px] uppercase tracking-[0.3em] text-white/50">
          Connect · Create · <span className="accent-serif normal-case tracking-normal text-[16px] text-[var(--accent-color)]">Thrive</span>
        </p>
      </div>
    </div>
  );
};

export default IntroLoader;
