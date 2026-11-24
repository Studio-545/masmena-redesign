import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditorialMenu from './EditorialMenu';

const navLinks = [
  { name: 'Why us', href: '#why-us' },
  { name: 'Services', href: '#about' },
  { name: 'Work', href: '/work' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const EditorialNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Slightly more solid background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        aria-label="Main"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 md:top-5 left-0 right-0 z-[1000] px-3 md:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto mx-auto flex h-14 w-full max-w-[1100px] items-center justify-between rounded-full border pl-5 pr-2 backdrop-blur-xl transition-colors duration-500 ${
            scrolled ? 'border-white/12 bg-black/70' : 'border-white/8 bg-black/35'
          }`}
        >
          <a href="/" className="flex items-center" aria-label="MAS MENA home">
            <img src="logo-masmena.png" alt="MAS MENA" className="h-6 w-auto object-contain" />
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[14px] font-medium text-white/65 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-black transition-colors duration-200 hover:bg-white/90"
            >
              Let&apos;s talk
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              className="lg:hidden flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full transition-colors hover:bg-white/[0.06]"
            >
              <span className="block h-[1.5px] w-5 bg-white" />
              <span className="block h-[1.5px] w-5 bg-white" />
            </button>
          </div>
        </div>
      </motion.nav>

      <EditorialMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default EditorialNavbar;
