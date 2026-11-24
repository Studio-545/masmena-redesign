import React from 'react';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import BookingForm from './BookingForm';
import AnimatedTitle from '../ui/AnimatedTitle';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { BUSINESS } from '../../data/business';

const channels = [
  {
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: BUSINESS.whatsappHref,
    external: true,
    icon: <WhatsAppIcon className="h-5 w-5" />,
    primary: true,
  },
  {
    label: 'Call',
    value: BUSINESS.phoneDisplay,
    href: BUSINESS.phoneHref,
    icon: <Phone size={19} strokeWidth={1.75} />,
    ltr: true,
  },
  {
    label: 'Email',
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
    icon: <Mail size={19} strokeWidth={1.75} />,
  },
];

const EditorialContact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] section-padding transition-colors duration-700"
    >
      <div aria-hidden className="brand-glow pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-70" />

      <div className="container-custom relative z-10">
        <div className="section-head-center mb-12 md:mb-16">
          <p className="eyebrow mb-6">Contact</p>
          <AnimatedTitle lines={['Ready when you are.', "Let's *talk.*"]} className="mb-6 text-center" />
          <p className="text-white/65 text-[15px] leading-relaxed max-w-[540px] mx-auto">
            Whether you operate in Jordan today or are preparing to scale across MENA, let's explore how we can create a plan that fits you perfectly. We will ask the right questions, discuss possibilities, and make an action plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-3 md:gap-4 items-start">
          {/* Direct channels */}
          <div className="flex flex-col gap-3 md:gap-4 lg:sticky lg:top-28">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`v-card group flex items-center gap-4 p-5 md:p-6 ${c.primary ? 'border-[rgba(166,115,255,0.4)]' : ''}`}
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${
                    c.primary ? 'bg-[var(--accent-color)] text-black' : 'border border-white/10 bg-white/[0.04] text-white/85'
                  }`}
                >
                  {c.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-white/45">{c.label}</span>
                  <span className="block truncate text-[16px] md:text-[17px] font-medium tracking-[-0.01em]" dir={c.ltr ? 'ltr' : undefined}>
                    {c.value}
                  </span>
                </span>
                <ArrowUpRight size={18} className="flex-shrink-0 text-white/40 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}

            <address className="v-card not-italic p-5 md:p-6 text-[14px] text-white/70">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors"
              >
                <MapPin size={17} strokeWidth={1.75} className="mt-[2px] flex-shrink-0 text-white/45" />
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-white/45 mb-1">Office</span>
                  {BUSINESS.address}
                </span>
              </a>
              <div className="my-4 h-px bg-white/[0.08]" />
              <div className="flex items-start gap-3">
                <Clock size={17} strokeWidth={1.75} className="mt-[2px] flex-shrink-0 text-white/45" />
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.16em] text-white/45 mb-1">Hours</span>
                  {BUSINESS.hours}
                </span>
              </div>
            </address>
          </div>

          {/* Booking calendar */}
          <div>
            <p className="mb-3 px-1 text-[13px] text-white/50">Or pick a time for a free 30-minute call:</p>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialContact;
