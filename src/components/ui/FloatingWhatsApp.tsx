import React, { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS } from '../../data/business';

// Floating WhatsApp shortcut, shown once the visitor scrolls past the hero.
const FloatingWhatsApp: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={BUSINESS.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MAS MENA on WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-3 right-3 md:bottom-6 md:right-6 z-[900] flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition-all duration-500 hover:scale-105 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7" />
    </a>
  );
};

export default FloatingWhatsApp;
