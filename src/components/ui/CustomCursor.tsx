import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Dot + ring cursor.
// - Over [data-cursor="view" | "drag" | "play"] the ring grows into a purple label bubble.
// - Over links and buttons the ring grows slightly.
// - Elements with .magnetic are pulled toward the pointer.
const LABELS: Record<string, string> = { view: 'View', drag: 'Drag', play: 'Play' };

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    let mode = '';
    let magnet: HTMLElement | null = null;

    const setMode = (next: string) => {
      if (next === mode) return;
      mode = next;
      if (next in LABELS) {
        label.textContent = LABELS[next];
        gsap.to(ring, { width: 88, height: 88, backgroundColor: 'rgba(166,115,255,0.95)', borderColor: 'rgba(166,115,255,0)', duration: 0.35, ease: 'power3.out' });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, delay: 0.05 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else {
        const size = next === 'link' ? 52 : 32;
        gsap.to(ring, { width: size, height: size, backgroundColor: next === 'link' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0.5)', duration: 0.35, ease: 'power3.out' });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    const releaseMagnet = () => {
      if (!magnet) return;
      gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as Element | null;
      const labelled = target?.closest?.('[data-cursor]') as HTMLElement | null;
      const interactive = target?.closest?.('a, button, [role="button"]');
      setMode(labelled ? labelled.dataset.cursor || '' : interactive ? 'link' : '');

      const m = target?.closest?.('.magnetic') as HTMLElement | null;
      if (m !== magnet) releaseMagnet();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.35,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    };

    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onEnterWindow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onEnterWindow);
      releaseMagnet();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[10000] h-2 w-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[10000] flex h-8 w-8 items-center justify-center rounded-full border border-white/50 pointer-events-none"
        style={{ translate: '-50% -50%' }}
      >
        <span ref={labelRef} className="text-[13px] font-semibold text-black opacity-0 scale-[0.6]">
          View
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
