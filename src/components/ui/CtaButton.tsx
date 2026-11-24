import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CtaButtonProps {
  href: string;
  text: string;
  className?: string;
  /** primary = solid white pill, secondary = outlined pill */
  variant?: 'primary' | 'secondary';
}

const CtaButton: React.FC<CtaButtonProps> = ({ href, text, className = '', variant = 'primary' }) => {
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-6px_rgba(166,115,255,0.55)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_40px_-6px_rgba(166,115,255,0.8)]'
      : 'border border-white/15 bg-white/[0.03] text-white hover:border-white/35 hover:bg-white/[0.07]';

  return (
    <a
      href={href}
      className={`magnetic group relative inline-flex max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-300 ${styles} ${className}`}
    >
      <span>{text}</span>
      <ArrowUpRight
        size={16}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};

export default CtaButton;
