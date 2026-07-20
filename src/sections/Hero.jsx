import { useEffect, useRef } from "react";

function Hero({ onOpenInquiry }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const illustrationEntranceRef = useRef(null);
  const illustrationFloatRef = useRef(null);
  const illustrationScrollRef = useRef(null);
  const sceneRef = useRef(null);
  const clusterRef = useRef(null);
  const blueOrbRef = useRef(null);
  const purpleOrbRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const entranceElements = [
      headingRef.current,
      paragraphRef.current,
      buttonRef.current,
      illustrationEntranceRef.current,
      blueOrbRef.current,
      purpleOrbRef.current,
    ].filter(Boolean);

    if (reduceMotion) {
      entranceElements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });

      return undefined;
    }

    const easing = "cubic-bezier(0.16, 1, 0.3, 1)";
    const animations = [];

    const animate = (element, keyframes, options) => {
      if (!element) return;

      animations.push(
        element.animate(keyframes, {
          fill: "forwards",
          easing,
          ...options,
        }),
      );
    };

    animate(
      blueOrbRef.current,
      [
        { opacity: 0, transform: "translate3d(-8px, 8px, 0) scale(0.7)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: 1000 },
    );

    animate(
      headingRef.current,
      [
        { opacity: 0, transform: "translate3d(0, 24px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 800, delay: 150 },
    );

    animate(
      paragraphRef.current,
      [
        { opacity: 0, transform: "translate3d(0, 22px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 800, delay: 350 },
    );

    animate(
      buttonRef.current,
      [
        { opacity: 0, transform: "translate3d(0, 18px, 0) scale(0.96)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: 700, delay: 550 },
    );

    animate(
      illustrationEntranceRef.current,
      [
        { opacity: 0, transform: "translate3d(0, 36px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      { duration: 1000, delay: 750 },
    );

    animate(
      purpleOrbRef.current,
      [
        { opacity: 0, transform: "translate3d(10px, 10px, 0) scale(0.7)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ],
      { duration: 1000, delay: 980 },
    );

    const clusterFloat = illustrationFloatRef.current?.animate(
      [
        { transform: "translate3d(0, -8px, 0) rotate(-1deg)" },
        { transform: "translate3d(0, 8px, 0) rotate(1deg)" },
        { transform: "translate3d(0, -8px, 0) rotate(-1deg)" },
      ],
      {
        duration: 7200,
        delay: 1650,
        easing: "ease-in-out",
        iterations: Infinity,
      },
    );

    const blueOrbPulse = blueOrbRef.current?.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(0.9)", opacity: 0.65 },
        { transform: "translate3d(10px, -8px, 0) scale(1.15)", opacity: 1 },
        { transform: "translate3d(0, 0, 0) scale(0.9)", opacity: 0.65 },
      ],
      {
        duration: 5600,
        delay: 1200,
        easing: "ease-in-out",
        iterations: Infinity,
      },
    );

    const purpleOrbPulse = purpleOrbRef.current?.animate(
      [
        { transform: "translate3d(0, 0, 0) scale(0.85)", opacity: 0.55 },
        { transform: "translate3d(-8px, -10px, 0) scale(1.1)", opacity: 0.9 },
        { transform: "translate3d(0, 0, 0) scale(0.85)", opacity: 0.55 },
      ],
      {
        duration: 6800,
        delay: 1800,
        easing: "ease-in-out",
        iterations: Infinity,
      },
    );

    let frameId = 0;
    let targetRotateX = 8;
    let targetRotateY = -10;
    let currentRotateX = 8;
    let currentRotateY = -10;
    let targetTextY = 0;
    let targetIllustrationY = 0;
    let currentTextY = 0;
    let currentIllustrationY = 0;

    const supportsHover = window.matchMedia("(hover: hover)").matches;

    const updateFrame = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;
      currentTextY += (targetTextY - currentTextY) * 0.08;
      currentIllustrationY +=
        (targetIllustrationY - currentIllustrationY) * 0.08;

      if (clusterRef.current) {
        clusterRef.current.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${currentTextY}px, 0)`;
      }

      if (illustrationScrollRef.current) {
        illustrationScrollRef.current.style.transform = `translate3d(0, ${currentIllustrationY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(updateFrame);
    };

    const handleScroll = () => {
      const heroTop = heroRef.current?.getBoundingClientRect().top ?? 0;
      const scrollOffset = Math.max(-heroTop, 0);

      targetTextY = Math.min(scrollOffset * -0.1, 40);
      targetIllustrationY = Math.min(scrollOffset * -0.15, 60);
    };

    const handlePointerMove = (event) => {
      if (!supportsHover || !sceneRef.current) return;

      const bounds = sceneRef.current.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      targetRotateX = 8 - y * 10;
      targetRotateY = -10 + x * 14;
    };

    const handlePointerLeave = () => {
      targetRotateX = 8;
      targetRotateY = -10;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    sceneRef.current?.addEventListener("pointermove", handlePointerMove);
    sceneRef.current?.addEventListener("pointerleave", handlePointerLeave);

    handleScroll();
    frameId = window.requestAnimationFrame(updateFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      sceneRef.current?.removeEventListener("pointermove", handlePointerMove);
      sceneRef.current?.removeEventListener("pointerleave", handlePointerLeave);

      [
        ...animations,
        clusterFloat,
        blueOrbPulse,
        purpleOrbPulse,
      ]
        .filter(Boolean)
        .forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-[620px] overflow-hidden bg-[#001025] px-6 text-white md:px-10"
    >
      <div className="mx-auto flex min-h-[820px] max-w-[1440px] flex-col items-center pt-[112px] text-center  lg:min-h-[1089px]">
        <div ref={textRef}>
          <h1
            ref={headingRef}
            className="opacity-0 font-['Manrope'] text-[44px] font-bold leading-[1.2] tracking-[-0.04em] text-white sm:text-[56px] lg:text-[72px]"
          >
            Building Brands That Lead.
          </h1>

          <p
            ref={paragraphRef}
            className="mt-7 max-w-[620px] lg:translate-x-29 opacity-0 font-['Inter'] text-[18px] sm:text-[22px] lg:text-[26px] font-normal leading-[1.35] text-[#ABA6A6]"
          >
            Building premium brands through content, AI, and web experiences.
          </p>

          <a
            ref={buttonRef}
            onClick={onOpenInquiry}
            className="mt-[52px] inline-flex rounded-[18px] bg-white px-[24px] py-[14px] opacity-0 font-['Afacad'] text-[24px] font-bold leading-none text-black transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#70A2E1] hover:text-white hover:shadow-[0_12px_28px_rgba(112,162,225,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4 focus-visible:ring-offset-[#001025]"
          >
            Get started
          </a>
        </div>

        <div
          ref={illustrationEntranceRef}
          className="mt-[42px] h-[390px] w-full max-w-[623px] opacity-0 sm:h-[500px] lg:h-[700px] lg:max-w-[700px] lg:translate-x-18 translate-x-16 translate-y-14 lg:translate-y-14"
        >
          <div ref={illustrationFloatRef} className="size-full">
            <div ref={illustrationScrollRef} className="size-full">
              <div
                ref={sceneRef}
                className="relative size-full cursor-default [perspective:1400px]"
              >
                <div
                  ref={clusterRef}
                  className="absolute inset-0 transform-gpu transition-transform duration-200 ease-out [transform-style:preserve-3d] [transform:rotateX(8deg)_rotateY(-10deg)]"
                >
                  <article className="absolute left-[8.57%] top-[7.14%] h-[32.14%] w-[38.57%] rounded-[16px] border border-white/[0.14] bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-[clamp(14px,3.1vw,22px)] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md [transform:translateZ(60px)_rotate(-3deg)]">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[1.5px] text-[#8FB4FF] sm:text-[11px]">
                      Type System
                    </p>
                    <p className="mt-3 font-['Space_Grotesk'] text-[34px] font-semibold leading-none text-[#E8EDF7] sm:text-[46px]">
                      Aa
                    </p>
                    <div className="mt-3.5 h-1.5 rounded-[3px] bg-white/[0.14]" />
                    <div className="mt-3.5 h-1.5 w-[60%] rounded-[3px] bg-white/[0.14]" />
                  </article>

                  <article className="absolute left-0 top-[41.07%] h-[30.36%] w-[32.86%] rounded-[16px] border border-white/[0.14] bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-[clamp(12px,2.6vw,18px)] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md [transform:translateZ(110px)_rotate(2deg)]">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[1.5px] text-[#8B7BFF] sm:text-[11px]">
                      Growth
                    </p>
                    <div className="mt-3.5 flex h-[52%] items-end gap-2">
                      <i className="h-[35%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                      <i className="h-[55%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                      <i className="h-[40%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                      <i className="h-[75%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                      <i className="h-[60%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                      <i className="h-[92%] flex-1 rounded-t-[4px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.15))]" />
                    </div>
                  </article>

                  <article className="absolute left-[47.14%] top-[19.64%] h-[33.93%] w-[27.14%] rounded-[16px] border border-white/[0.14] bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-[clamp(12px,2.3vw,16px)] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md [transform:translateZ(160px)_rotate(-1deg)]">
                    <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[1.5px] text-[#8FB4FF] sm:text-[11px]">
                      Palette
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <span className="aspect-square rounded-[6px] bg-[#4D8DFF]" />
                      <span className="aspect-square rounded-[6px] bg-[#8B7BFF]" />
                      <span className="aspect-square rounded-[6px] bg-[#0E2140]" />
                      <span className="aspect-square rounded-[6px] bg-[#E8EDF7]" />
                      <span className="aspect-square rounded-[6px] bg-[#1A3A66]" />
                      <span className="aspect-square rounded-[6px] bg-[#6EA8FE]" />
                    </div>
                  </article>

                  <article className="absolute left-[27.14%] top-[64.29%] h-[23.21%] w-[30%] rounded-[16px] border border-white/[0.14] bg-[linear-gradient(155deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-[clamp(12px,2.3vw,16px)] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md [transform:translateZ(200px)_rotate(4deg)]">
                    <div className="h-[5px] w-[80%] rounded-[3px] bg-white/[0.16]" />
                    <div className="mt-2.5 h-[5px] w-[55%] rounded-[3px] bg-white/[0.16]" />
                    <div className="mt-3.5 flex gap-2">
                      <span className="size-[10px] rounded-full border-[1.5px] border-[#8FB4FF]" />
                      <span className="size-[10px] rounded-full border-[1.5px] border-[#8FB4FF]" />
                      <span className="size-[10px] rounded-full border-[1.5px] border-[#8FB4FF]" />
                    </div>
                  </article>

                  <span
                    ref={blueOrbRef}
                    className="absolute left-[48.57%] top-[3.57%] size-[14px] rounded-full bg-[#4D8DFF] opacity-0 blur-[2px] shadow-[0_0_24px_6px_rgba(77,141,255,0.8)] [transform:translateZ(220px)]"
                  />
                  <span
                    ref={purpleOrbRef}
                    className="absolute left-[8.57%] top-[75%] size-[9px] rounded-full bg-[#8B7BFF] opacity-0 blur-[2px] shadow-[0_0_18px_5px_rgba(139,123,255,0.8)] [transform:translateZ(240px)]"
                  />
                  <span className="absolute left-[60%] top-[26.79%] size-[6px] rounded-full bg-white blur-[2px] shadow-[0_0_14px_4px_rgba(255,255,255,0.6)] [transform:translateZ(180px)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;