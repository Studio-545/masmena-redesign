import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaButton from '../ui/CtaButton';

gsap.registerPlugin(ScrollTrigger);

// Real MAS campaign work, arranged on a 3D ring that turns as you scroll
// (the title sits inside the ring, so cards pass in front of and behind it).
const work = [
  { src: 'images/slider/POST7.webp', alt: 'Chupa Chups Sparkling social media post' },
  { src: 'images/slider/super-design-3.webp', alt: 'Super Drink brand identity and packaging' },
  { src: 'images/slider/serene-2.webp', alt: 'Serene peach juice product photography' },
  { src: 'images/slider/MOG-design.webp', alt: 'MOG brand identity and fashion campaign' },
  { src: 'images/slider/mr-king-1.webp', alt: 'Mr. King iced coffee product photography' },
  { src: 'images/slider/chai-karak.webp', alt: 'Iced Chai Karak product photography' },
  { src: 'images/slider/super.webp', alt: 'Super Drink lifestyle photography' },
  { src: 'images/slider/slider-(1).webp', alt: 'Restaurant campaign visual' },
  { src: 'images/slider/serene3.webp', alt: 'Serene juice cans flat-lay' },
  { src: 'images/slider/super-design.webp', alt: 'Super Drink campaign design and merchandise' },
  { src: 'images/slider/slider-4.webp', alt: 'Digital campaign banner' },
];

const EditorialIntro: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ring = ringRef.current;
    if (!section || !ring) return;

    const cards = Array.from(ring.querySelectorAll<HTMLElement>('[data-orbit-card]'));
    const step = 360 / cards.length;

    const layout = () => {
      const w = window.innerWidth;
      const radius = w < 640 ? 300 : w < 1024 ? 460 : 640;
      cards.forEach((card, i) => {
        card.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
      });
      // Shrink the whole ring on short screens so it fits between the navbar and the caption.
      if (stageRef.current) {
        const available = stageRef.current.clientHeight;
        const needed = w < 640 ? 420 : w < 1024 ? 600 : 780;
        const scale = Math.min(1, available / needed);
        stageRef.current.style.transform = `scale(${scale})`;
      }
    };

    // Dim cards as they turn away from the viewer.
    const shade = (rotation: number) => {
      cards.forEach((card, i) => {
        const angle = ((i * step + rotation) * Math.PI) / 180;
        const facing = (Math.cos(angle) + 1) / 2; // 1 = front, 0 = back
        card.style.opacity = String(0.25 + facing * 0.75);
        card.style.filter = `brightness(${0.45 + facing * 0.55})`;
      });
    };

    layout();
    window.addEventListener('resize', layout);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = { rotation: 0 };
    shade(0);

    let ctx: gsap.Context | undefined;
    if (!reduce) {
      ctx = gsap.context(() => {
        gsap.to(state, {
          rotation: -360,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
          },
          onUpdate: () => {
            ring.style.transform = `rotateX(-18deg) rotateY(${state.rotation}deg)`;
            // Counter-rotate the title so it always faces the viewer.
            if (titleRef.current) titleRef.current.style.transform = `rotateY(${-state.rotation}deg) rotateX(18deg)`;
            shade(state.rotation);
          },
        });

        gsap.fromTo(
          '.orbit-title',
          { opacity: 0, scale: 0.85, filter: 'blur(12px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 70%', end: 'top 10%', scrub: true },
          }
        );
      }, section);
    }

    return () => {
      window.removeEventListener('resize', layout);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="Selected work"
      className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] h-[200vh] md:h-[260vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Atmosphere */}
        <div aria-hidden className="brand-glow pointer-events-none absolute inset-0 opacity-80" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        />

        <div
          ref={stageRef}
          data-cursor="view"
          className="absolute inset-x-0 top-[72px] bottom-[120px] md:bottom-[150px] flex items-center justify-center [perspective:1800px]"
        >
          <div
            ref={ringRef}
            className="relative h-0 w-0 [transform-style:preserve-3d]"
            style={{ transform: 'rotateX(-18deg) rotateY(0deg)' }}
          >
            {/* Title lives inside the 3D space so cards pass in front of and behind it */}
            <div ref={titleRef} className="absolute left-0 top-0 [transform-style:preserve-3d]" style={{ transform: "rotateX(18deg)" }}>
              <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap">
              <h2 className="orbit-title font-display font-semibold tracking-[-0.05em] leading-[0.9] text-[64px] sm:text-[110px] md:text-[150px] lg:text-[190px]">
                Our <span className="accent-serif">work</span>
              </h2>
              </div>
            </div>

            {work.map((img) => (
              <div
                key={img.src}
                data-orbit-card
                className="absolute left-0 top-0 -ml-[90px] -mt-[60px] h-[120px] w-[180px] sm:-ml-[120px] sm:-mt-[80px] sm:h-[160px] sm:w-[240px] md:-ml-[150px] md:-mt-[100px] md:h-[200px] md:w-[300px] overflow-hidden rounded-[14px] md:rounded-[18px] border border-white/15 bg-white/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] [backface-visibility:visible]"
              >
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Fade so the caption stays readable when cards pass behind it */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[200px] md:h-[240px] bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/85 to-transparent" />

        {/* Caption + CTA, aligned to the same container as every other section */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10 z-10">
          <div className="container-custom flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <p className="max-w-[460px] md:max-w-[320px] text-[14px] text-white/60">
              Product shoots, social content, brand identities and full launches for brands across Jordan and the GCC.
            </p>
            <CtaButton href="/work" text="See all work" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialIntro;
