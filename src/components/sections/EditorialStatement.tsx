import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Big statement whose words light up one by one as you scroll.
// *word* = serif italic accent.
const STATEMENT =
  "We're a full-service marketing agency in Amman. We help brands across Jordan, the GCC and MENA *connect* with people, *create* work worth talking about, and *thrive* long after launch.";

const EditorialStatement: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stmt-word',
        { opacity: 0.22 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const words = STATEMENT.split(' ');

  return (
    <section className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] py-24 md:py-40">
      <div className="container-custom">
        <p className="eyebrow mb-8 md:mb-10">Who we are</p>
        <div ref={ref}>
          <p className="max-w-[1180px] font-display font-medium tracking-[-0.035em] leading-[1.12] text-[30px] sm:text-[40px] md:text-[56px] lg:text-[64px]">
            {words.map((w, i) => {
              const accent = /^\*.+\*[.,]?$/.test(w);
              const clean = w.replace(/\*/g, '');
              return (
                <React.Fragment key={i}>
                  <span className={`stmt-word ${accent ? 'accent-serif text-[var(--accent-color)]' : ''}`}>{clean}</span>{' '}
                </React.Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditorialStatement;
