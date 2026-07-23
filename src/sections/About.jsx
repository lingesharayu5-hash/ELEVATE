import { useEffect, useRef } from "react";
const cards = [
  {
    title: "Brand Strategy",
    description:
      "Every successful brand starts with a clear strategy, positioning, and a strong identity.",
  },
  {
    title: "Creative Excellence",
    description:
      "We craft premium visuals, content, and experiences designed to capture attention.",
  },
  {
    title: "AI-Powered Marketing",
    description:
      "Using AI and automation, we create smarter campaigns that save time and scale faster.",
  },
  {
    title: "Performance Focus",
    description:
      "Every decision is backed by data, helping turn creative ideas into measurable business growth.",
  },
  {
    title: "Long-Term Partnership",
    description:
      "We don't just deliver projects—we become your creative growth partner.",
  },
];
const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const stackParallaxRef = useRef(null);
  const stackFloatRef = useRef(null);
  const stackTiltRef = useRef(null);
  const cardRefs = useRef([]);
  const cardVisualRefs = useRef([]);
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
const text = textRef.current;
const cardElements = cardRefs.current.filter(Boolean);
const cardVisuals = cardVisualRefs.current.filter(Boolean);

if (reduceMotion) {
  if (text) {
    text.style.opacity = "1";
    text.style.transform = "none";
  }

  cardElements.forEach((card) => {
    card.style.opacity = "1";
    card.style.transform = "none";
  });

  return undefined;
}

let isInView = false;
let frameId = 0;
let floatingStarted = false;
let floatAnimation;
let targetRotateX = 0;
let targetRotateY = 0;
let currentRotateX = 0;
let currentRotateY = 0;

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      isInView = true;
      observer.disconnect();
    }
  },
  { threshold: 0.08 },
);

if (sectionRef.current) {
  observer.observe(sectionRef.current);
}

const updateAnimation = () => {
  if (isInView && sectionRef.current) {
    const bounds = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const scrollProgress = clamp(
      (viewportHeight * 0.8 - bounds.top) / (bounds.height * 0.72),
    );

    const textProgress = easeOut(clamp(scrollProgress / 0.28));

    if (text) {
      text.style.opacity = String(textProgress);
      text.style.transform = `translate3d(0, ${
        (1 - textProgress) * 30
      }px, 0)`;
    }

    cardElements.forEach((card, index) => {
      const start = 0.14 + index * 0.145;
      const progress = easeOut(clamp((scrollProgress - start) / 0.22));
      const visual = cardVisuals[index];

      card.style.opacity = String(progress);
      card.style.transform = `perspective(1000px) translate3d(0, ${
        (1 - progress) * 60
      }px, 0) rotateX(${(1 - progress) * 6}deg)`;

      if (visual) {
        if (progress < 1) {
          visual.style.boxShadow = `0 ${
            10 + progress * 14
          }px ${26 + progress * 18}px rgba(0, 0, 0, ${
            0.08 + progress * 0.14
          })`;
        } else {
          visual.style.boxShadow = "";
        }
      }
    });

    const parallaxProgress = clamp(
      (viewportHeight - bounds.top) / (viewportHeight + bounds.height),
    );

    if (stackParallaxRef.current) {
      stackParallaxRef.current.style.transform = `translate3d(0, ${
        (parallaxProgress - 0.5) * -22
      }px, 0)`;
    }

    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;

    if (stackTiltRef.current) {
      stackTiltRef.current.style.transform = `perspective(1100px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    }

    if (scrollProgress >= 0.95 && !floatingStarted) {
      floatingStarted = true;

      floatAnimation = stackFloatRef.current?.animate(
        [
          { transform: "translate3d(0, -3px, 0)" },
          { transform: "translate3d(0, 3px, 0)" },
          { transform: "translate3d(0, -3px, 0)" },
        ],
        {
          duration: 7000,
          easing: "ease-in-out",
          iterations: Infinity,
        },
      );
    }
  }

  frameId = window.requestAnimationFrame(updateAnimation);
};

const handlePointerMove = (event) => {
  if (
    !window.matchMedia("(min-width: 1024px) and (hover: hover)").matches ||
    !stackTiltRef.current
  ) {
    return;
  }

  const bounds = stackTiltRef.current.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  targetRotateX = clamp(-y * 10, -5, 5);
  targetRotateY = clamp(x * 10, -5, 5);
};

const handlePointerLeave = () => {
  targetRotateX = 0;
  targetRotateY = 0;
};

stackTiltRef.current?.addEventListener("pointermove", handlePointerMove);
stackTiltRef.current?.addEventListener("pointerleave", handlePointerLeave);

frameId = window.requestAnimationFrame(updateAnimation);

return () => {
  observer.disconnect();
  window.cancelAnimationFrame(frameId);
  floatAnimation?.cancel();
  stackTiltRef.current?.removeEventListener(
    "pointermove",
    handlePointerMove,
  );
  stackTiltRef.current?.removeEventListener(
    "pointerleave",
    handlePointerLeave,
  );
};
  }, []);
  return (
    <section id="about" ref={sectionRef} className="overflow-hidden bg-[#001025] px-6 md:px-10" >
      <div className="mx-auto grid min-h-[969px] max-w-[1440px] grid-cols-1 px-0 py-20 lg:grid-cols-[673px_579px] lg:px-[95px] lg:py-[105px]">
        <div
          ref={textRef}
          className="max-w-[673px] opacity-0 lg:mt-[186px]"
        >
          <p className="font-['Afacad'] text-[28px] font-bold leading-none text-white lg:text-[32px]">
            About <span className="text-[#6696D3]">ELEVATE</span>
          </p>
      <h2 className="mt-[22px] max-w-[628px] font-['Manrope'] text-[42px] font-bold leading-[1.26] tracking-[-0.04em] text-white sm:text-[50px] lg:text-[57px] lg:leading-[72px]">
        We build brands that people remember, trust, and choose.
      </h2>

      <p className="mt-[22px] max-w-[579px] font-['Inter'] text-[18px] font-medium leading-[1.28] text-[#C3C3C3] lg:text-[20px]">
        From strategy to execution, we combine branding, content, AI, and
        digital marketing to help ambitious businesses stand out and grow.
      </p>
    </div>

    <div
      ref={stackParallaxRef}
      className="relative mt-14 lg:mt-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-24 inset-y-8 rounded-full bg-[#70A2E1]/[0.07] blur-3xl"
      />

      <div ref={stackFloatRef} className="relative">
        <div
          ref={stackTiltRef}
          className="relative flex transform-gpu flex-col gap-[27px] will-change-transform"
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="opacity-0 will-change-transform"
            >
              <article
                ref={(element) => {
                  cardVisualRefs.current[index] = element;
                }}
                className="flex h-[132px] flex-col rounded-[30px] bg-[#00193A] px-7 pt-[13px] transition-[transform,background-color,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-[#00214A] hover:shadow-[0_24px_48px_rgba(22,76,143,0.28)] hover:ring-1 hover:ring-[#70A2E1]/40 sm:px-[87px]"
              >
                <h3 className="font-['Manrope'] text-center text-[22px] font-bold leading-normal text-white lg:text-[24px]">
                  {card.title}
                </h3>

                <p className="mt-[10px] font-['Inter'] text-[17px] font-normal leading-[1.2] text-[#D7D7D7] lg:text-[19px]">
                  {card.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
export default About;