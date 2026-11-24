import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import AnimatedTitle from '../ui/AnimatedTitle';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { BUSINESS } from '../../data/business';

const faqData = [
  {
    question: "What services does MAS offer?",
    answer: "We are a full-service marketing agency offering tailored online and offline solutions, from digital campaigns, branding, and social media to print, activations, and media planning, designed to grow your brand and drive results."
  },
  {
    question: "How does MAS ensure cultural relevance?",
    answer: "We use Arabic-first strategies, local dialects, and market research to create campaigns that resonate with regional values and trends."
  },
  {
    question: "What is MAS’s campaign process?",
    answer: "We start with market research, develop tailored strategies, execute hybrid campaigns, and track performance for measurable results."
  },
  {
    question: "How does MAS measure success?",
    answer: "At MAS, we measure success by the tangible impact we create for our clients, including growth in brand awareness, engagement, sales, and long-term customer loyalty. We track key performance indicators (KPIs) across every campaign, combining data insights with strategic goals to ensure measurable and meaningful results."
  },
  {
    question: "Who are MAS’s target clients?",
    answer: "MAS works with clients across all industries. Our strategies are built on deep marketing research and professional execution, tailored to fit any sector or business size."
  },
  {
    question: "Can MAS handle international campaigns?",
    answer: "Yes, MAS has the expertise and network to manage international campaigns with local relevance and global impact, seamlessly handling strategy, execution, and performance across borders."
  },
  {
    question: "How fast can MAS respond to an idea?",
    answer: "Our agile team collaborates closely with clients and typically responds to ideas within 1–2 business days to kickstart strategy and execution."
  }
];

// FAQPage structured data, built from the same questions shown on the page so
// search engines and AI platforms can quote the answers directly.
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}).replace(/</g, '\\u003c');

const EditorialFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] section-padding transition-colors duration-700">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <div className="container-custom relative z-10">
        <div className="section-head-center mb-12 md:mb-16">
          <p className="eyebrow mb-6">FAQ</p>
          <AnimatedTitle lines={['Frequently asked *questions*']} className="mb-6 text-center" />
          <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-[480px] mx-auto">
            Clear answers to the questions we hear most, so you know exactly what to expect.
          </p>
        </div>

        <div className="mx-auto max-w-[880px] flex flex-col gap-2.5">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={index}
                className={`v-card ${isOpen ? 'border-white/[0.16] bg-white/[0.035]' : ''}`}
              >
                <h3>
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center gap-4 md:gap-6 px-5 py-5 md:px-7 md:py-6 text-left"
                  >
                    <span className="text-[12px] md:text-[13px] font-medium tabular-nums text-white/35 w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex-1 text-[16px] md:text-[19px] font-medium tracking-[-0.015em] transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/75'}`}>
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-[var(--accent-color)] bg-[var(--accent-color)] text-black' : 'border-white/15 text-white/70'}`}
                    >
                      <Plus size={15} strokeWidth={2} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 md:px-7 md:pb-7 md:pl-[76px] text-white/60 text-[14px] md:text-[15px] leading-[1.75] max-w-[720px]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Still have questions */}
          <div className="v-card mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-5 py-6 md:px-7">
            <div>
              <p className="text-[17px] md:text-[19px] font-medium tracking-[-0.015em]">Still have questions?</p>
              <p className="mt-1 text-[14px] text-white/55">Message us on WhatsApp. We usually reply within the same working day.</p>
            </div>
            <a
              href={BUSINESS.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-black transition-colors hover:bg-white/90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFAQ;
