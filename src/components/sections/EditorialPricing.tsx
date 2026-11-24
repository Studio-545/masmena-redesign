import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import AnimatedTitle from '../ui/AnimatedTitle';

type Plan = {
  label: string;
  name: string;
  price: string;
  unit?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    label: 'Brand presence',
    name: 'Basic',
    price: '700',
    unit: 'JOD / mo',
    tagline: 'Perfect for brand presence & social growth',
    features: [
      '15 custom posts & short-form reels / TikToks per month',
      'Localized English & Arabic copywriting & optimization',
      'Professional graphic design & brand asset creation',
      'Strategic hashtag, trend, and target-audience research',
      'Community management & audience engagement',
      'Monthly analytics dashboard & campaign reporting',
    ],
    cta: 'Pick this plan',
  },
  {
    label: 'Social + web',
    name: 'Premium',
    price: '1,000',
    unit: 'JOD / mo',
    tagline: 'Complete social growth & digital presence',
    features: [
      'Everything in the Social Media plan included',
      '30 custom posts & reels / TikToks per month',
      'Custom high-performance marketing website (up to 8 pages)',
      'Modern responsive web design developed in React/Webflow',
      'Complete SEO setup, indexing, & speed optimization',
      'Integrated conversion tracking & lead capture setup',
      'Dedicated account manager & bi-weekly syncs',
      'Premium customer care support & priority access',
    ],
    cta: 'Pick this plan',
    featured: true,
  },
  {
    label: 'Enterprise',
    name: 'Ultimate',
    price: 'Custom',
    tagline: 'For details & custom enterprise scaling',
    features: [
      'Full-scale omnichannel digital strategy & execution',
      'Bespoke high-performance web apps, client portals & e-commerce',
      'Influencer marketing campaigns with GCC & regional creators',
      'Paid media buying & optimization (Meta, Google, TikTok, LinkedIn)',
      'TV, Radio & Out-of-Home (OOH) regional media planning',
      'Dedicated 24/7 partner support & WhatsApp/Slack channel',
    ],
    cta: 'Talk to sales',
  },
];

const EditorialPricing: React.FC = () => {
  return (
    <section id="pricing" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] section-padding transition-colors duration-700 overflow-hidden">
      {/* Soft glow behind the featured plan */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[45%] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[rgba(166,115,255,0.10)] blur-[120px]" />

      <div className="container-custom relative z-10">
        <div className="section-head-center mb-12 md:mb-16">
          <p className="eyebrow mb-6">Pricing</p>
          <AnimatedTitle
            lines={['Plans built for you.', 'Choose the *perfect* fit.']}
            className="mb-6 text-center"
          />
          <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-[540px] mx-auto">
            Choose a plan tailored to scale your brand. From high-impact social media campaigns and custom web experiences to enterprise-grade omnichannel presence management.
          </p>
        </div>

        {/* Phones/tablets: swipe sideways between plans. Desktop: three columns. */}
        <div className="flex lg:grid lg:grid-cols-3 gap-3 md:gap-4 items-stretch overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-8 px-8 md:-mx-16 md:px-16 lg:mx-0 lg:px-0 scroll-px-8 md:scroll-px-16 pb-4 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`v-card flex flex-col p-6 sm:p-8 md:p-9 w-[86%] sm:w-[60%] lg:w-auto flex-shrink-0 snap-center ${
                plan.featured
                  ? 'border-[rgba(166,115,255,0.45)] shadow-[0_0_0_1px_rgba(166,115,255,0.15),0_30px_80px_-30px_rgba(166,115,255,0.45)] lg:-my-3 lg:py-12 order-first lg:order-none'
                  : ''
              }`}
            >
              {plan.featured && <span aria-hidden className="glow-border" />}
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">{plan.label}</span>
                {plan.featured && (
                  <span className="rounded-full bg-[var(--accent-color)] px-3 py-1 text-[11px] font-semibold text-black">
                    Most popular
                  </span>
                )}
              </div>

              <h3 className="text-[20px] font-medium tracking-[-0.02em] text-white/90 mb-3">{plan.name}</h3>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[44px] md:text-[52px] font-semibold tracking-[-0.045em] leading-none text-white">
                  {plan.price}
                </span>
                {plan.unit && <span className="text-[14px] text-white/45">{plan.unit}</span>}
              </div>
              <p className="text-[14px] text-white/55 mb-8">{plan.tagline}</p>

              <ul className="flex-1 mb-10 border-t border-white/[0.08]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 border-b border-white/[0.08] py-3.5 text-[13px] md:text-[14px] text-white/75 leading-snug">
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      className={`mt-[2px] flex-shrink-0 ${plan.featured ? 'text-[var(--accent-color)]' : 'text-white/40'}`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between gap-3">
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-all duration-300 ${
                    plan.featured
                      ? 'bg-white text-black hover:bg-white/90 shadow-[0_8px_30px_-8px_rgba(166,115,255,0.6)]'
                      : 'border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08] hover:border-white/30'
                  }`}
                >
                  {plan.cta}
                  <ArrowUpRight size={16} />
                </a>
                <a href="#faq" className="text-[13px] text-white/45 hover:text-white transition-colors">
                  Questions?
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="lg:hidden mt-2 text-center text-[12px] text-white/40">Swipe to compare plans →</p>
      </div>
    </section>
  );
};

export default EditorialPricing;
