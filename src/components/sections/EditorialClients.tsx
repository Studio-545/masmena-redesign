import React from 'react';

const clientLogos = [
  { src: 'images/partners/MOG-logo.png', alt: 'MOG', isDark: true },
  { src: 'images/partners/chupa-chups.png', alt: 'Chupa Chups', isDark: false },
  { src: 'images/partners/drfarah-1.png', alt: 'Dr. Farah', isDark: true },
  { src: 'images/partners/nasmat-watan-1.png', alt: 'Nasmat Watan', isDark: false },
  { src: 'images/partners/serene-kogo.png', alt: 'Serene', isDark: true },
  { src: 'images/partners/super-logo.png', alt: 'Super', isDark: true },
  { src: 'images/partners/giz.png', alt: 'GIZ', isDark: false },
  { src: 'images/partners/halcon.png', alt: 'Halcon', isDark: false },
  { src: 'images/partners/icedchaikarak.png', alt: 'Iced Chai Karak', isDark: true },
  { src: 'images/partners/jordan-esport.png', alt: 'Jordan Esport', isDark: false },
  { src: 'images/partners/megshark.png', alt: 'Megashark', isDark: false },
  { src: 'images/partners/vio-logo.png', alt: 'Vio', isDark: false },
  { src: 'images/partners/al-wazah.png', alt: 'Al Wazah', isDark: false },
  { src: 'images/partners/sama-logo.png', alt: 'Sama', isDark: false },
  { src: 'images/partners/wild-tiger-logo.png', alt: 'Wild Tiger', isDark: false },
  { src: 'images/partners/24-Logo.png', alt: '24', isDark: false },
];

const EditorialClients: React.FC = () => {
  // Repeat the logos array multiple times to ensure it fills widescreen marquees seamlessly
  const repeatedLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="relative w-full bg-[var(--bg-primary)] py-14 md:py-20 overflow-hidden transition-colors duration-700">
      <p className="container-custom text-center text-[13px] md:text-[14px] text-white/50 mb-8 md:mb-10 select-text">
        Trusted by leading brands across Jordan, the GCC &amp; MENA
      </p>

      {/* Full-width infinite marquee */}
      <div className="relative w-full overflow-hidden select-none">
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-[2] pointer-events-none" />

        <div className="animate-marquee flex items-center gap-3 md:gap-4">
          {repeatedLogos.map((logo, index) => (
            <div
              key={index}
              aria-hidden={index >= clientLogos.length ? true : undefined}
              className="v-card no-reveal group flex-shrink-0 flex items-center justify-center h-24 w-44 md:h-28 md:w-60 px-5"
            >
              <img
                src={logo.src}
                alt={index >= clientLogos.length ? '' : logo.alt}
                className="h-14 md:h-[72px] w-auto max-w-full object-contain opacity-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.06]"
                style={logo.isDark ? { filter: 'var(--logo-filter)' } : undefined}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Styles for Infinite Marquee Scrolling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee-scroll 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default EditorialClients;
