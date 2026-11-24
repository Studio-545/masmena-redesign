import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import CtaButton from '../ui/CtaButton';
import AnimatedTitle from '../ui/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);


const servicesData = [
  {
    num: '(01)',
    image: 'images/slider/MOG-design.webp',
    imageAlt: 'MOG brand campaign with creators and models',
    title: 'Influencer & Creator',
    items: [
      { num: '(1.1)', label: 'Influencer Marketing' },
      { num: '(1.2)', label: 'Affiliate Marketing' },
      { num: '(1.3)', label: 'Creator Partnerships' },
      { num: '(1.4)', label: 'Campaign Strategy & Management' },
      { num: '(1.5)', label: 'Performance Tracking & Reporting' }
    ]
  },
  {
    num: '(02)',
    image: 'images/slider/mr-king-1.webp',
    imageAlt: 'Mr. King iced coffee product photography',
    title: 'Content Production',
    items: [
      { num: '(2.1)', label: 'Short-Form Video Production' },
      { num: '(2.2)', label: 'Professional Photography' },
      { num: '(2.3)', label: 'Commercial Photography' },
      { num: '(2.4)', label: 'Lifestyle Photography' },
      { num: '(2.5)', label: 'Corporate Photography' },
      { num: '(2.6)', label: 'Product Photography' }
    ]
  },
  {
    num: '(03)',
    image: 'images/slider/POST7.webp',
    imageAlt: 'Chupa Chups Sparkling social media post',
    title: 'Social Media',
    items: [
      { num: '(3.1)', label: 'Content Planning & Strategy' },
      { num: '(3.2)', label: 'Community Management' },
      { num: '(3.3)', label: 'Audience Engagement' },
      { num: '(3.4)', label: 'Moderation & Customer Interaction' }
    ]
  },
  {
    num: '(04)',
    image: 'images/slider/slider-4.webp',
    imageAlt: 'Digital campaign banner',
    title: 'Digital Marketing',
    items: [
      { num: '(4.1)', label: 'Search Engine Optimization (SEO) & Digital PR' },
      { num: '(4.2)', label: 'Generative Engine Optimization (GEO) & Ai Search Visibility' },
      { num: '(4.3)', label: 'Media Outreach' },
      { num: '(4.4)', label: 'Online Reputation & Authority' }
    ]
  },
  {
    num: '(05)',
    image: 'images/slider/super-design-3.webp',
    imageAlt: 'Super Drink website and e-commerce design',
    title: 'E-Commerce',
    items: [
      { num: '(5.1)', label: 'Shopify Store Development' },
      { num: '(5.2)', label: 'Conversion Rate Optimization' },
      { num: '(5.3)', label: 'E-Commerce Strategy' },
      { num: '(5.4)', label: 'Customer Journey Optimization' }
    ]
  },
  {
    num: '(06)',
    image: 'images/slider/super-design.webp',
    imageAlt: 'Super Drink branded van and merchandise activation',
    title: 'Experiential',
    items: [
      { num: '(6.1)', label: 'Brand Activations' },
      { num: '(6.2)', label: 'Pop-Up Experiences' },
      { num: '(6.3)', label: 'Consumer Engagement Events' },
      { num: '(6.4)', label: 'On-Ground Campaigns' }
    ]
  }
];

const EditorialAbout: React.FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Only download and play the showcase video once it's near the viewport,
  // and pause it again when it scrolls out of view.
  useEffect(() => {
    const video = showcaseVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoContainerRef.current) {
      gsap.fromTo(
        videoContainerRef.current,
        {
          scale: 0.85,
        },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          }
        }
      );
    }
  }, []);

  // As each service card arrives, the ones underneath shrink and dim, giving a stacked-deck effect.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      cards.forEach((card, i) => {
        const inner = card.querySelector('.stack-inner');
        const img = card.querySelector('.stack-img');
        if (img) {
          gsap.fromTo(img, { scale: 1.15 }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 20%', scrub: true },
          });
        }
        const next = cards[i + 1];
        // Stacking only on tablet/desktop; on phones the cards are taller than the screen.
        if (!next || !inner || window.innerWidth < 768) return;
        gsap.to(inner, {
          scale: 0.9 + i * 0.012,
          filter: 'brightness(0.5)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 75%', end: 'top 15%', scrub: true },
        });
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-clip transition-colors duration-700">
      <div className="container-custom">
        {/* Header Block exactly like the image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end relative pb-4">

          <div className="relative z-10">
            <p className="eyebrow mb-6">Our Services</p>
            
            <AnimatedTitle lines={['The kind of work', 'we do for our *partners*']} className="mb-8" />

            <p className="text-[var(--text-secondary)] text-[15px] md:text-[16px] leading-relaxed max-w-[500px] font-normal">
              Marketing today requires more than a single service. That's why MAS combines strategy, content, media, influencers, technology, and experiences to help brands grow through a fully integrated approach.
            </p>
          </div>

          <div className="relative z-10 flex lg:justify-end items-end h-full lg:pb-4">
            <CtaButton href="#contact" text="Book a call" />
          </div>

        </div>

        {/* Video showcase with responsive Scroll Effect */}
        <div className="w-full mt-16 md:mt-24 relative overflow-visible flex justify-center">
          <div 
            ref={videoContainerRef} 
            className="w-full aspect-video overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(166,115,255,0.35)] relative"
            style={{ transformOrigin: 'center center' }}
          >
            <video
              ref={showcaseVideoRef}
              src="images/show-case.mp4"
              poster="images/show-case-poster.webp"
              preload="none"
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Service cards that stack on top of each other as you scroll */}
        <div ref={stackRef} className="relative z-10 mt-16 md:mt-24">
          {servicesData.map((category, index) => (
            <div
              key={category.title}
              className="stack-card relative md:sticky mb-4 md:mb-10 last:mb-0"
              style={{ top: `calc(84px + ${index * 14}px)` }}
            >
              <div className="stack-inner v-card no-reveal grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 p-5 sm:p-7 md:p-10 bg-[#0b0b0d] origin-top md:min-h-[min(560px,calc(100vh-140px))]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6 md:mb-10">
                    <span className="eyebrow">Service {category.num.replace(/[()]/g, '')}</span>
                    <span className="text-[12px] text-white/35 tabular-nums">/ 06</span>
                  </div>
                  <h3 className="text-[34px] sm:text-[44px] md:text-[56px] font-semibold tracking-[-0.045em] leading-[0.95] mb-6 md:mb-10 text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                  <ul className="mt-auto border-t border-white/[0.08]">
                    {category.items.map((item) => (
                      <li key={item.label} className="flex items-center justify-between gap-4 border-b border-white/[0.08] py-3 text-[14px] md:text-[15px] text-white/70 leading-snug">
                        <span>{item.label}</span>
                        <ArrowUpRight size={15} className="flex-shrink-0 text-white/25" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-cursor="view" className="relative order-first md:order-none overflow-hidden rounded-[14px] md:rounded-[18px] border border-white/10 aspect-[16/9] md:aspect-auto">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="stack-img absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EditorialAbout;
