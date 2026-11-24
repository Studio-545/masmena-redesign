import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import CtaButton from '../ui/CtaButton';
import { BUSINESS } from '../../data/business';

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/modern.advanced.services/', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/mas-modern-advanced-services/', Icon: Linkedin },
  { name: 'Facebook', href: 'https://www.facebook.com/ModernAdvancedServices', Icon: Facebook },
  { name: 'Email', href: `mailto:${BUSINESS.email}`, Icon: Mail },
];

const columns = [
  {
    title: 'Company',
    links: [
      { name: 'Why us', href: '#why-us' },
      { name: 'How we work', href: '#process' },
      { name: 'Our work', href: '/work' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Influencer & creator', href: '#about' },
      { name: 'Content production', href: '#about' },
      { name: 'Social media', href: '#about' },
      { name: 'Digital marketing', href: '#about' },
      { name: 'E-commerce', href: '#about' },
      { name: 'Experiential', href: '#about' },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

const SiteFooter: React.FC = () => {
  const fillRef = useRef<HTMLSpanElement>(null);

  // "Let's talk" fills from faint to purple/white as you reach the end of the page.
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.backgroundPosition = '0% 0';
      return;
    }
    const tween = gsap.fromTo(
      el,
      { backgroundPosition: '100% 0' },
      {
        backgroundPosition: '0% 0',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 45%', scrub: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
  <footer className="relative overflow-hidden bg-[var(--bg-primary)] text-white">
    {/* Closing call to action */}
    <div className="relative">
      <div aria-hidden="true" className="brand-glow pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-custom relative flex flex-col items-center py-24 md:py-32 text-center">
        <p className="eyebrow mb-6 md:mb-8">Got a project in mind?</p>
        <a href="#contact" className="group block mb-8 md:mb-10" aria-label="Let's talk: go to contact">
          <span
            ref={fillRef}
            className="block font-display font-semibold tracking-[-0.06em] leading-[0.85] text-[22vw] md:text-[17vw] xl:text-[240px] bg-clip-text text-transparent [background-image:linear-gradient(90deg,#a673ff_0%,#ffffff_45%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_100%)] [background-size:220%_100%] [background-position:100%_0] transition-transform duration-500 group-hover:scale-[1.02]"
          >
            Let&apos;s <span className="accent-serif !font-normal">talk</span>
          </span>
        </a>
        <p className="text-white/60 text-[15px] md:text-[17px] max-w-[460px] mb-9">
          Tell us where your brand wants to go. We&apos;ll plan the campaign that gets it there.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <CtaButton href="#contact" text="Book a call" />
          <CtaButton href="/work" text="See our work" variant="secondary" />
        </div>
      </div>
    </div>

    {/* Social links, aligned to the same container as the rest of the site */}
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
        {socials.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="v-card no-reveal group flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-[14px] text-white/75 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <Icon size={16} />
              {name}
            </span>
            <ArrowUpRight size={16} className="opacity-50 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>

    {/* Link columns */}
    <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-10 py-14 md:py-16">
      {columns.map((col) => (
        <div key={col.title}>
          <p className="mb-4 text-[13px] text-white/40">{col.title}</p>
          <ul className="space-y-2.5">
            {col.links.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="text-[14px] text-white/75 transition-colors hover:text-white">{l.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="col-span-2">
        <p className="mb-4 text-[13px] text-white/40">Contact</p>
        <address className="not-italic space-y-2.5 text-[14px] text-white/75">
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">{BUSINESS.address}</a>
          <a href={BUSINESS.phoneHref} dir="ltr" className="block hover:text-white transition-colors">{BUSINESS.phoneDisplay}</a>
          <a href={`mailto:${BUSINESS.email}`} className="block hover:text-white transition-colors">{BUSINESS.email}</a>
          <p className="text-white/50">{BUSINESS.hours}</p>
        </address>
      </div>
    </div>

    {/* Oversized wordmark */}
    <div aria-hidden="true" className="relative select-none overflow-hidden">
      <div className="container-custom">
        <div className="text-[28vw] md:text-[22vw] font-semibold leading-[0.78] tracking-[-0.07em] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] to-white/[0.01] text-center translate-y-[12%]">
          MAS
        </div>
      </div>
    </div>

    <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-2 border-t border-white/10 py-6 text-[12px] text-white/40">
      <span>© {new Date().getFullYear()} MAS MENA®. All rights reserved.</span>
      <span>Amman, Jordan · Serving Jordan, the GCC & MENA</span>
    </div>
  </footer>
  );
};

export default SiteFooter;
