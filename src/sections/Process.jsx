import { useEffect, useRef } from "react";

const processSteps = [
  {
    number: "01",
    title: "Strategy & Planning",
    description: "We build a custom growth plan covering branding, content, ads, AI, and your website.",
  },
  {
    number: "02",
    title: "Brand & Website",
    description: "We create your brand assets, website, creatives, and marketing systems.",
  },
  {
    number: "03",
    title: "Content & Campaigns",
    description: "We craft compelling content and run targeted multi-channel campaigns to scale your digital reach.",
  },
  {
    number: "04",
    title: "Growth & Optimization",
    description: "We analyze data, improve performance, and scale what works to maximize your growth.",
  },
];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);

export default function Process() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heading = headingRef.current;
    const line = lineRef.current;
    const cardElements = cardRefs.current.filter(Boolean);
    const dotElements = dotRefs.current.filter(Boolean);

    if (reduceMotion) {
      if (heading) {
        heading.style.opacity = "1";
        heading.style.transform = "none";
      }
      if (line) {
        line.style.opacity = "1";
        line.style.transform = "none";
      }
      cardElements.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "none";
      });
      dotElements.forEach((dot) => {
        dot.style.opacity = "1";
        dot.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
      });
      return undefined;
    }

    let isInView = false;
    let frameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isInView = true;
        } else {
          isInView = false;
        }
      },
      { threshold: 0.02 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const updateAnimation = () => {
      if (isInView && sectionRef.current) {
        const bounds = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // scrollProgress starts when the top of the section enters 85% of the viewport height
        // and is fully completed when the section is mostly scrolled past.
        const scrollProgress = clamp(
          (viewportHeight * 0.85 - bounds.top) / (bounds.height * 0.75)
        );

        // Animate section heading
        const headingProgress = easeOut(clamp(scrollProgress / 0.22));
        if (heading) {
          heading.style.opacity = String(headingProgress);
          heading.style.transform = `translate3d(0, ${(1 - headingProgress) * 30}px, 0)`;
        }

        // Animate center timeline line
        const lineProgress = clamp(scrollProgress / 0.95);
        if (line) {
          line.style.transform = `scaleY(${lineProgress})`;
          line.style.opacity = String(clamp(scrollProgress / 0.08));
        }

        // Animate each card and its corresponding dot
        cardElements.forEach((card, index) => {
          const start = 0.12 + index * 0.18; // Staggered start times
          const progress = easeOut(clamp((scrollProgress - start) / 0.22));

          card.style.opacity = String(progress);
          card.style.transform = `perspective(1000px) translate3d(0, ${(1 - progress) * 45}px, 0) rotateX(${(1 - progress) * 4}deg)`;

          const dot = dotElements[index];
          if (dot) {
            const dotProgress = easeOut(clamp((scrollProgress - start) / 0.12));
            dot.style.opacity = String(dotProgress);
            dot.style.transform = `translate3d(-50%, -50%, 0) scale(${dotProgress})`;
          }
        });
      }

      frameId = window.requestAnimationFrame(updateAnimation);
    };

    frameId = window.requestAnimationFrame(updateAnimation);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="work"
      ref={sectionRef}
      className="bg-[#001025] px-6 py-24 md:py-32 overflow-hidden relative select-none"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div ref={headingRef} className="text-center opacity-0 mb-16 md:mb-28 will-change-transform">
          
          <h2 className="font-['Manrope'] font-semibold text-[40px] sm:text-[54px] lg:text-[64px] text-white leading-none tracking-tight">
            The <span className="text-[#70A2E1]">ELEVATE</span> Process
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-6xl mt-12 md:mt-20">
          {/* Vertical timeline line */}
          <div
            ref={lineRef}
            className="absolute left-[11px] md:left-1/2 top-[125px] bottom-[115px] md:top-[150px] md:bottom-[150px] z-0 w-[3px] bg-white transform -translate-x-[1px] md:-translate-x-1/2 origin-top opacity-0 will-change-transform"
          />

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center md:items-stretch justify-between w-full ${
                    isLeft ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block md:w-[44%] lg:w-[45%]" />

                  {/* Timeline Dot (Intersection Node) */}
                  <div
                    ref={(element) => {
                      dotRefs.current[index] = element;
                    }}
                    className="absolute left-[20px] md:left-[51.7%] top-[60%] md:top-[57%] w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full bg-white transform -translate-x-[9px] md:-translate-x-1/2 -translate-y-1/2 z-20 opacity-100 scale-100"
                    />

                  {/* Process Card Column */}
                  <div
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    className="w-full md:w-[44%] lg:w-[45%] pl-12 md:pl-0 opacity-0 will-change-transform"
                  >
                    <article className="relative h-full rounded-[30px] bg-gradient-to-br from-[#00193B] to-[#001F48] p-8 sm:p-10 border border-[#505050]/20 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.015] hover:border-[#70A2E1]/50 hover:shadow-[0_20px_40px_rgba(112,162,225,0.12)] flex flex-col justify-center">
                      <span className="font-['Manrope'] font-bold text-[34px] sm:text-[42px] text-[#B1B1B1] leading-none mb-3 block">
                        {step.number}
                      </span>
                      <h3 className="font-['Manrope'] font-bold text-[24px] sm:text-[30px] lg:text-[34px] text-white tracking-tight mb-4">
                        {step.title}
                      </h3>
                      <p className="font-['Inter'] font-medium text-[16px] sm:text-[18px] lg:text-[21px] text-[#ABA6A6] leading-relaxed">
                        {step.description}
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
