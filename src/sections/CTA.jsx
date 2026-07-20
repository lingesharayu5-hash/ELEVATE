import React, { useEffect, useRef } from 'react';

export default function CTA({ onOpenInquiry }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const elevateWordRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const elevateWord = elevateWordRef.current;
    const buttons = buttonsRef.current;

    if (!headline || !buttons || !elevateWord) return;

    // Respect user preference for reduced motion[cite: 3, 4]
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      headline.style.opacity = '1';
      headline.style.transform = 'translateY(0)';
      buttons.style.opacity = '1';
      buttons.style.transform = 'translateY(0)';
      elevateWord.style.opacity = '1';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 1. Headline Entrance Sequence[cite: 3]
          const headlineAnim = headline.animate(
            [
              { opacity: 0, transform: 'translateY(30px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            {
              duration: 700,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'forwards'
            }
          );

          // 2. Buttons Entrance Sequence (80ms Stagger Delay)[cite: 3]
          buttons.animate(
            [
              { opacity: 0, transform: 'translateY(30px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            {
              duration: 700,
              delay: 80,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              fill: 'forwards'
            }
          );

          // 3. Subtle Elegant Secondary Emphasis on "Elevate" Word after headline entrance
          headlineAnim.onfinish = () => {
            elevateWord.animate(
              [
                { opacity: 0.85, filter: 'drop-shadow(0 0 0px rgba(112,162,225,0))' },
                { opacity: 1, filter: 'drop-shadow(0 0 12px rgba(112,162,225,0.35))' }
              ],
              {
                duration: 600,
                easing: 'ease-out',
                fill: 'forwards'
              }
            );
          };

          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact"
      ref={sectionRef} 
      className="bg-[#001025] py-36 md:py-52 px-6 relative overflow-hidden text-center flex flex-col items-center justify-center select-none"
    >
      {/* 
        Imperceptible Ambient Depth Glow[cite: 2]
        Note: The breathing keyframe definition below maps to the requested target opacities (0.22 <-> 0.28).
        To completely remove the inline <style> block as requested, ensure this custom animation keyframe is defined in your global stylesheet:
        
        @keyframes ambientBreathe {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.28; }
        }
        .animate-ambient-glow {
          animation: ambientBreathe 15s ease-in-out infinite;
        }
      */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(3,27,59,1)_0%,transparent_60%)] motion-safe:animate-[ambientBreathe_15s_ease-in-out_infinite]"
        style={{ opacity: 0.22 }}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center -translate-y-8">
        
        {/* Centered Headline with Exact Figma Typographic Dimensions[cite: 2] */}
        <h2 
          ref={headlineRef}
          className="font-manrope font-semibold text-5xl md:text-[72px] text-white tracking-[-0.02em] leading-[72px] mb-14 md:mb-22 max-w-3xl mx-auto opacity-0"
        >
          Ready to <span ref={elevateWordRef} className="text-[#70A2E1] inline-block">Elevate</span> your brand?
        </h2>

        {/* Action Buttons Container */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
        >
          
          {/* Button 1: Contact us (Premium Elegant Pill Variant)[cite: 1, 2, 3] */}
          <button className="w-full sm:w-auto font-afacad font-bold text-[20.5px] leading-none text-white bg-[#031B3B] border border-[#505050] px-[26px] py-[11px] rounded-[20px] cursor-pointer transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#07244f] hover:border-[#70A2E1] motion-safe:hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(112,162,225,0.12)] active:translate-y-0">
            Contact us
          </button>

          {/* Button 2: Get started (Premium Elegant Pill Variant)[cite: 1, 2, 3] */}
          <button 
           type="button"
  onClick={onOpenInquiry}
          className="w-full sm:w-auto font-afacad font-bold text-[20.5px] leading-none text-[#000000] bg-[#D9D9D9] border border-transparent px-[26px] py-[11px] rounded-[20px] cursor-pointer transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#7F7E7E] hover:text-white motion-safe:hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(217,217,217,0.12)] active:translate-y-0">
            Get started
          </button>

        </div>
      </div>
    </section>
  );
}