import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Connect', 'Create', 'Thrive'];

// Giant brand marquee. It drifts on its own, speeds up with scroll speed
// and leans (skews) in the direction you scroll.
const EditorialMarquee: React.FC = () => {
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const a = rowA.current;
    const b = rowB.current;
    const section = wrap.current;
    if (!a || !b || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let xA = 0;
    let xB = 0;
    let boost = 0;
    let skew = 0;
    let visible = false;
    let raf = 0;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => { visible = self.isActive; },
      onUpdate: (self) => {
        const v = self.getVelocity(); // px per second
        boost = Math.max(-12, Math.min(12, v / 250));
      },
    });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const halfA = a.scrollWidth / 2;
      const halfB = b.scrollWidth / 2;
      const speed = 0.6 + Math.abs(boost);
      const dir = boost < 0 ? -1 : 1;
      xA -= speed * dir;
      xB += speed * dir;
      if (xA <= -halfA) xA += halfA;
      if (xA > 0) xA -= halfA;
      if (xB >= 0) xB -= halfB;
      if (xB < -halfB) xB += halfB;
      skew += (boost * 1.2 - skew) * 0.12;
      boost *= 0.92;
      a.style.transform = `translate3d(${xA}px,0,0) skewX(${-skew}deg)`;
      b.style.transform = `translate3d(${xB}px,0,0) skewX(${-skew}deg)`;
    };
    xB = -1; // start row B offset so it can travel right
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
    };
  }, []);

  const row = (outline: boolean) =>
    [0, 1].map((copy) => (
      <div key={copy} className="flex flex-shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
        {[...WORDS, ...WORDS].map((w, i) => (
          <React.Fragment key={i}>
            <span
              className={`px-6 md:px-10 font-display font-semibold tracking-[-0.05em] leading-none whitespace-nowrap ${
                outline ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.35)]' : 'text-white'
              } ${i % 3 === 2 ? 'accent-serif !font-normal' : ''}`}
            >
              {i % 3 === 2 && !outline ? <span className="text-[var(--accent-color)]">{w}</span> : w}
            </span>
            <span className="text-[var(--accent-color)] text-[0.4em]">✦</span>
          </React.Fragment>
        ))}
      </div>
    ));

  return (
    <section
      ref={wrap}
      aria-label="Connect, Create, Thrive"
      className="relative w-full overflow-hidden bg-[var(--bg-primary)] py-16 md:py-28 select-none"
    >
      <div className="flex flex-col gap-2 md:gap-4 text-[64px] sm:text-[96px] md:text-[150px] lg:text-[190px]">
        <div ref={rowA} className="flex w-max will-change-transform">{row(false)}</div>
        <div ref={rowB} className="flex w-max will-change-transform">{row(true)}</div>
      </div>
    </section>
  );
};

export default EditorialMarquee;
