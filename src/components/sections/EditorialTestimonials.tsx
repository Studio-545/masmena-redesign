import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from '../ui/AnimatedTitle';
import CountUp from '../ui/CountUp';

const testimonials = [
  {
    id: 1,
    image: "images/testimonials/super.webp",
    quote: `"We chose the amazing team at MAS to elevate Super's visual identity, and they exceeded all our expectations! Their creativity and eye for detail gave our products a massive competitive edge. We couldn't be happier with the results.."`,
    author: "",
    title: "",
    company: "Super",
    avatar: ""
  },
  {
    id: 2,
    image: "images/testimonials/MOG.webp",
    quote: `"Building a unique marketplace like MOG from scratch was a massive challenge, but the team at MAS handled it flawlessly! They managed all our branding, marketing, and web development, bringing our vision to life perfectly."`,
    author: "",
    title: "",
    company: "MOG",
    avatar: ""
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    quote: `"We sincerely thank MAS Marketing Agency for their outstanding work on the Wild Tiger TVC. Their professionalism, creativity, and production quality truly stood out, delivering everything on time despite tight requirements. We highly appreciate their effort and look forward to future collaborations."`,
    author: "",
    title: "",
    company: "Wild Tiger",
    avatar: "",
    video: "videos/wild-tiger.mp4",
    poster: "videos/wild-tiger-poster.webp"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
    quote: `"Great work on the 3D video for Chupa Chups sparkling drinks! The video perfectly captured the brand’s fun, vibrant, and refreshing spirit in a creative way. We appreciate the smooth collaboration and the effort put into delivering such a strong result."`,
    author: "",
    title: "",
    company: "Chupa Chups",
    avatar: "",
    video: "videos/chupa-chups.mp4",
    poster: "videos/chupa-chups-poster.webp"
  }
];

interface TestimonialCardProps {
  testimonial: typeof testimonials[number];
  onVideoClick: (videoUrl: string) => void;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onVideoClick, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if ('video' in testimonial && testimonial.video && videoRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Video preview play error:", err);
      });

      // Stop play after 5 seconds
      timerRef.current = window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          videoRef.current.load(); // Reset to show the poster image
          setIsPlaying(false);
        }
      }, 5000);
    }
  };

  const handleMouseLeave = () => {
    if ('video' in testimonial && testimonial.video && videoRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load(); // Reset to show the poster image
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if ('video' in testimonial && testimonial.video) {
      onVideoClick(testimonial.video);
    }
  };

  const hasVideo = 'video' in testimonial && !!testimonial.video;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: testimonial.id * 0.1, duration: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor={hasVideo ? 'play' : undefined}
      className={`v-card relative aspect-auto min-h-[440px] md:min-h-0 md:aspect-[1.15/1] group flex flex-col md:block ${index % 2 === 1 ? 'md:translate-y-10' : ''} ${hasVideo ? 'cursor-pointer' : ''}`}
    >
      {/* Background Image - monochromatic & desaturated */}
      <div className="relative md:absolute top-0 left-0 right-0 h-[200px] sm:h-[240px] md:h-[65%] overflow-hidden brightness-[0.85] transition-all duration-[1.2s] ease-in-out group-hover:brightness-100 flex-shrink-0">
        {hasVideo ? (
          <>
            <video 
              ref={videoRef}
              src={testimonial.video ? `${testimonial.video}#t=0.1` : undefined}
              poster={'poster' in testimonial ? testimonial.poster : undefined}
              muted
              playsInline
              loop
              preload="none"
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                const target = e.currentTarget;
                const fallback = 'images/show-case.mp4';
                if (!target.src.includes(fallback)) {
                  target.src = fallback;
                  if (isPlaying) {
                    target.play().catch(() => {});
                  }
                }
              }}
            />
            {/* Action Indicators */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-none transition-opacity duration-300 group-hover:opacity-0 z-10">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                <span className="inline md:hidden">Tap to Play</span>
                <span className="hidden md:inline">Hover to Preview</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <img 
            src={testimonial.image} 
            alt={`${testimonial.company} campaign`} 
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-in-out group-hover:scale-105"
          />
        )}
        
        {/* Vignette to blend into bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none z-[1]" />
      </div>
      
      {/* Content Block */}
      <div className="relative md:absolute md:inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end flex-1 md:flex-initial pointer-events-none select-none">
        
        {/* Quote Text */}
        <span aria-hidden className="font-serif italic text-[56px] leading-[0.6] text-[var(--accent-color)] mb-3">&ldquo;</span>
        <p className="text-[15px] md:text-[16px] text-white/85 leading-[1.6] mb-6 md:mb-8 font-normal max-w-[95%] tracking-[-0.005em]">
          {testimonial.quote.replace(/^"|"$/g, '').replace(/\.\.$/, '.')}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-end w-full">
          
          {/* Author Info */}
          {testimonial.author ? (
            <div className="flex items-center gap-4">
              {testimonial.avatar && (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-11 h-11 object-cover grayscale brightness-110"
                />
              )}
              <div className="flex flex-col">
                <p className="text-[14px] font-semibold text-[var(--text-primary)] tracking-tight leading-tight">{testimonial.author}</p>
                <p className="text-[12px] text-[var(--text-secondary)] mt-1 font-medium">{testimonial.title}</p>
              </div>
            </div>
          ) : (
            <div />
          )}

          {/* Company Logo */}
          <div className="mix-blend-normal opacity-90 z-10 pointer-events-auto">
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-color)]" />
              {testimonial.company}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const EditorialTestimonials: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  return (
    <section id="testimonials" className="relative w-full bg-[var(--bg-primary)] text-[var(--text-primary)] section-padding transition-colors duration-700">
      <div className="container-custom relative z-10">
        
        {/* Header Area */}
        <div className="mb-12 md:mb-16 relative">
          <AnimatedTitle lines={['From the mouth of our', '*beloved* partners & winners']} className="mb-6 leading-[1.1]" />
          <p className="text-[var(--text-secondary)] text-[14px] md:text-[15px] leading-relaxed max-w-[420px] mt-6">
            Don't take our word for it. These are the founders and marketing leads who trusted us with their companies and kept coming back.
          </p>
        </div>

        {/* Headline numbers */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {[
            { value: '200', suffix: '+', label: 'Projects delivered' },
            { value: '12', suffix: '+', label: 'Countries reached' },
            { value: '6', suffix: '', label: 'Service disciplines' },
          ].map((stat) => (
            <div key={stat.label} className="v-card px-4 py-5 md:px-8 md:py-8">
              <div className="text-[30px] sm:text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] leading-none">
                <CountUp to={Number(stat.value)} /><span className="text-[var(--accent-color)]">{stat.suffix}</span>
              </div>
              <div className="mt-2 md:mt-3 text-[11px] md:text-[13px] text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 md:pb-10">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              onVideoClick={setActiveVideoUrl}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Full Video Lightbox Modal */}
      {activeVideoUrl && (
        <div 
          className="fixed inset-0 z-[3000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveVideoUrl(null)}
        >
          {/* Modal content container */}
          <div 
            className="relative w-full max-w-[1000px] aspect-video bg-black border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/10 text-white p-2 rounded-full transition-colors flex items-center justify-center"
              onClick={() => setActiveVideoUrl(null)}
              aria-label="Close video"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Video element */}
            <video 
              src={activeVideoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== 'images/show-case.mp4') {
                  target.src = 'images/show-case.mp4';
                  target.play().catch(() => {});
                }
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EditorialTestimonials;
