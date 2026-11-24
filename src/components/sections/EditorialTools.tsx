import React from 'react';
import AnimatedTitle from '../ui/AnimatedTitle';
import CtaButton from '../ui/CtaButton';

const track1 = [
  { name: 'Figma', category: 'Design & Prototyping', iconSrc: 'images/skills/figma.png' },
  { name: 'Photoshop', category: 'Creative Production', iconSrc: 'images/skills/photoshop.png' },
  { name: 'Webflow', category: 'Development & Hosting', iconSrc: 'images/skills/webflow.png' },
  { name: 'Framer', category: 'Interactive Design', iconSrc: 'images/skills/farmer.png' }
];

const track2 = [
  { name: 'React', category: 'Frontend Technology', iconSrc: 'images/skills/react.png' },
  { name: 'Shopify', category: 'E-Commerce Solutions', iconSrc: 'images/skills/social.svg' },
  { name: 'WordPress', category: 'CMS Platforms', iconSrc: 'images/skills/wordpress-1.svg' },
  { name: 'Squarespace', category: 'Digital Publishing', iconSrc: 'images/skills/squarespace-white.svg' }
];

// Repeat tracks 8 times to fill ultra-widescreen viewports without gaps
const repeatedTrack1 = [...track1, ...track1, ...track1, ...track1, ...track1, ...track1, ...track1, ...track1];
const repeatedTrack2 = [...track2, ...track2, ...track2, ...track2, ...track2, ...track2, ...track2, ...track2];

const EditorialTools: React.FC = () => {
  return (
    <section id="tools" className="py-24 md:py-32 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden transition-colors duration-700">
      <div className="container-custom">
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end relative z-10 pb-4 mb-16">

          <div className="relative z-10">
            <p className="eyebrow mb-6">Our Stack</p>
            
            <AnimatedTitle lines={['The tools behind', 'our *work*']} className="mb-8" />

            <p className="text-[var(--text-secondary)] text-[15px] md:text-[16px] leading-relaxed max-w-[500px] font-normal">
              We leverage industry-leading design, development, and publishing platforms to build robust, scalable, and visually arresting campaigns.
            </p>
          </div>

          <div className="relative z-10 flex lg:justify-end items-end h-full lg:pb-4">
            <CtaButton href="#contact" text="Start a project" variant="secondary" />
          </div>

        </div>

        {/* Dual Marquee Track System */}
        <div className="flex flex-col gap-3 md:gap-4 relative z-[2] w-full overflow-hidden select-none py-4">
          {/* Vignette Overlays for smooth side-fade edges (aligned exactly with the vertical grid lines) */}
          <div className="absolute top-0 left-0 bottom-0 w-6 sm:w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-6 sm:w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />

          {/* Track 1: Moving Left */}
          <div className="w-full overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-3 md:gap-4">
              {repeatedTrack1.map((tool, index) => (
                <div 
                  key={`t1-${index}`}
                  aria-hidden={index >= track1.length ? true : undefined}
                  className="v-card no-reveal group flex-shrink-0 flex items-center gap-4 px-5 py-4 w-64 h-[84px]"
                >
                  <div className="w-12 h-12 flex items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/10 transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
                    <img 
                      src={tool.iconSrc} 
                      alt={`${tool.name} Logo`} 
                      className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-1 truncate">{tool.category}</span>
                    <p className="text-[15px] font-display font-medium text-[var(--text-primary)] tracking-tight truncate">{tool.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Moving Right */}
          <div className="w-full overflow-hidden">
            <div className="animate-marquee-right flex items-center gap-3 md:gap-4">
              {repeatedTrack2.map((tool, index) => (
                <div 
                  key={`t2-${index}`}
                  aria-hidden={index >= track2.length ? true : undefined}
                  className="v-card no-reveal group flex-shrink-0 flex items-center gap-4 px-5 py-4 w-64 h-[84px]"
                >
                  <div className="w-12 h-12 flex items-center justify-center p-2.5 rounded-xl bg-white/[0.04] border border-white/10 transition-transform duration-500 group-hover:scale-105 flex-shrink-0">
                    <img 
                      src={tool.iconSrc} 
                      alt={`${tool.name} Logo`} 
                      className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium mb-1 truncate">{tool.category}</span>
                    <p className="text-[15px] font-display font-medium text-[var(--text-primary)] tracking-tight truncate">{tool.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Embedded CSS for Dual Marquee Tracks */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 45s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default EditorialTools;
