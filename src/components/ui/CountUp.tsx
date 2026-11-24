import React, { useEffect, useRef, useState } from 'react';

// Counts from 0 to `to` when scrolled into view. Renders the final number
// up front so prerendered HTML and no-JS visitors still see the real value.
const CountUp: React.FC<{ to: number; duration?: number; className?: string }> = ({ to, duration = 1600, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || navigator.webdriver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {value.toLocaleString('en-US')}
    </span>
  );
};

export default CountUp;
