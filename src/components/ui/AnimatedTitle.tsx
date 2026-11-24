import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  /**
   * Each string becomes one line. Wrap a word in asterisks to render it as a
   * serif-italic accent, e.g. 'Connect. Create. *Thrive.*'
   */
  lines: string[];
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span';
  /** Extra seconds to wait before animating in. */
  delay?: number;
}

/**
 * Heading whose characters rise in with a soft blur as it scrolls into view.
 * Accent words (*word*) are set in Cormorant Garamond italic.
 */
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ lines, className = '', tag = 'h2', delay = 0 }) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll<HTMLSpanElement>('.anim-char');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const tween = gsap.fromTo(
      chars,
      { opacity: 0, yPercent: 60, filter: 'blur(8px)' },
      {
        opacity: 1,
        yPercent: 0,
        filter: 'blur(0px)',
        stagger: 0.018,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const Tag = tag;
  const hasCustomSize = /(^|\s)(md:)?text-\[/.test(className);
  const sizeClass = hasCustomSize ? '' : 'text-[38px] sm:text-[48px] md:text-[64px]';

  // Full text (without the * markers) for screen readers and crawlers that
  // don't join per-letter spans.
  const fullText = lines.map((l) => l.replace(/\*/g, '')).join(' ');

  return (
    <Tag
      ref={ref}
      aria-label={fullText}
      className={`relative font-display font-semibold tracking-[-0.04em] leading-[1.02] text-[var(--text-primary)] ${sizeClass} ${className}`}
    >
      {lines.map((line, i) => {
        const words = line.split(' ');
        return (
          <span key={i} aria-hidden="true" className="block pb-[0.08em]">
            {words.map((raw, wIdx) => {
              const isAccent = raw.startsWith('*') && raw.endsWith('*') && raw.length > 2;
              const word = isAccent ? raw.slice(1, -1) : raw;
              return (
                <span key={wIdx} className={`inline-block whitespace-nowrap ${isAccent ? 'accent-serif' : ''}`}>
                  {word.split('').map((char, cIdx) => (
                    <span key={cIdx} className="anim-char inline-block">
                      {char}
                    </span>
                  ))}
                  {wIdx < words.length - 1 && ' '}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
};

export default AnimatedTitle;
