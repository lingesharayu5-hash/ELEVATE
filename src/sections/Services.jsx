import { useEffect, useRef, useState } from "react";

const services = [
  { number: "01", title: "Branding & Identity" },
  { number: "02", title: "Social Media Marketing" },
  { number: "03", title: "AI Strategy & Execution" },
  { number: "04", title: "Performance Marketing" },
  { number: "05", title: "Website Design & Development" },
];

const barHeights = ["h-[40%]", "h-[60%]", "h-[45%]", "h-[80%]", "h-full"];

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

function ServiceVisual({ serviceIndex }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!root || reduceMotion) return undefined;

    const animations = [];

    const animateAll = (selector, keyframes, options) => {
      root.querySelectorAll(selector).forEach((element, index) => {
        animations.push(
          element.animate(
            typeof keyframes === "function" ? keyframes(index) : keyframes,
            {
              iterations: Infinity,
              ...options(index),
            },
          ),
        );
      });
    };

    if (serviceIndex === 0) {
      animateAll(
        "[data-brand-orbit]",
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        () => ({
          duration: 10000,
          easing: "linear",
        }),
      );

      animateAll(
        "[data-brand-swatch]",
        [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
        () => ({
          duration: 10000,
          easing: "linear",
        }),
      );
    }

    if (serviceIndex === 1) {
      animateAll(
        "[data-social-phone]",
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-6px)" },
          { transform: "translateY(0)" },
        ],
        () => ({
          duration: 4000,
          easing: "ease-in-out",
        }),
      );

      animateAll(
        "[data-social-shimmer]",
        [{ transform: "translateX(0)" }, { transform: "translateX(380%)" }],
        () => ({
          duration: 2600,
          easing: "ease-in-out",
        }),
      );

      animateAll(
        "[data-social-heart]",
        [
          { transform: "translateX(-50%) scale(1)" },
          { transform: "translateX(-50%) scale(1.3)", offset: 0.15 },
          { transform: "translateX(-50%) scale(1)", offset: 0.3 },
          { transform: "translateX(-50%) scale(1)" },
        ],
        () => ({
          duration: 1600,
          easing: "ease-in-out",
        }),
      );

      animateAll(
        "[data-social-burst]",
        [
          { transform: "translateX(-50%) scale(1)", opacity: 0 },
          {
            transform: "translateX(-50%) scale(1)",
            opacity: 0.7,
            offset: 0.12,
          },
          {
            transform: "translateX(-50%) scale(2.6)",
            opacity: 0,
            offset: 0.45,
          },
          { transform: "translateX(-50%) scale(2.6)", opacity: 0 },
        ],
        () => ({
          duration: 1600,
          easing: "ease-out",
        }),
      );

      animateAll(
        "[data-social-bubble]",
        () => [
          { transform: "translateY(0) scale(0.5)", opacity: 0 },
          {
            transform: "translateY(-35px) scale(1)",
            opacity: 1,
            offset: 0.2,
          },
          { transform: "translateY(-200px) scale(1)", opacity: 0 },
        ],
        (index) => ({
          duration: [3000, 2400, 3400, 2800, 3200][index],
          delay: [200, 1100, 2000, 700, 1600][index],
          easing: "ease-in",
        }),
      );
    }

    if (serviceIndex === 2) {
      animateAll(
        "[data-neural-node]",
        () => [
          {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(77,141,255,0.5)",
          },
          {
            transform: "scale(1.3)",
            boxShadow: "0 0 0 8px rgba(77,141,255,0)",
          },
          {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(77,141,255,0)",
          },
        ],
        (index) => ({
          duration: 2400,
          delay: index * 300,
          easing: "ease-in-out",
        }),
      );

      animateAll(
        "[data-neural-line]",
        [{ strokeDashoffset: "0" }, { strokeDashoffset: "-20" }],
        () => ({
          duration: 2000,
          easing: "linear",
        }),
      );
    }

    if (serviceIndex === 3) {
      animateAll(
        "[data-performance-bar]",
        [
          { transform: "scaleY(0.4)" },
          { transform: "scaleY(1)" },
          { transform: "scaleY(0.4)" },
        ],
        (index) => ({
          duration: 2600,
          delay: index * 150,
          easing: "ease-in-out",
        }),
      );

      const performanceDot = root.querySelector("[data-performance-dot]");

      if (performanceDot) {
        performanceDot.style.offsetPath =
          "path('M5,120 Q45,90 90,60 T175,15')";

        animations.push(
          performanceDot.animate(
            [
              { offsetDistance: "0%", opacity: 0 },
              { offsetDistance: "10%", opacity: 1 },
              { offsetDistance: "90%", opacity: 1 },
              { offsetDistance: "100%", opacity: 0 },
            ],
            {
              duration: 2600,
              iterations: Infinity,
              easing: "ease-in-out",
            },
          ),
        );
      }
    }

    if (serviceIndex === 4) {
      animateAll(
        "[data-web-block]",
        () => [
          { opacity: 0, transform: "translateY(8px) scale(0.9)" },
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            offset: 0.15,
          },
          {
            opacity: 1,
            transform: "translateY(0) scale(1)",
            offset: 0.8,
          },
          { opacity: 0, transform: "translateY(8px) scale(0.9)" },
        ],
        (index) => ({
          duration: 3500,
          delay: index * 200 + [0, 300, 500, 700, 900, 1100][index],
          easing: "ease-in-out",
        }),
      );

      const cursor = root.querySelector("[data-web-cursor]");

      if (cursor) {
        animations.push(
          cursor.animate(
            [
              { transform: "translate3d(150px, 100px, 0)", opacity: 0 },
              {
                transform: "translate3d(120px, 40px, 0)",
                opacity: 1,
                offset: 0.1,
              },
              {
                transform: "translate3d(120px, 40px, 0) scale(0.85)",
                opacity: 1,
                offset: 0.55,
              },
              {
                transform: "translate3d(120px, 40px, 0) scale(1)",
                opacity: 1,
                offset: 0.6,
              },
              { transform: "translate3d(150px, 100px, 0)", opacity: 0 },
            ],
            {
              duration: 3500,
              iterations: Infinity,
              easing: "ease-in-out",
            },
          ),
        );
      }
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [serviceIndex]);

  if (serviceIndex === 0) {
    return (
      <div
        ref={rootRef}
        className="relative flex size-full items-center justify-center"
      >
        <div className="relative size-[150px]">
          <div className="absolute inset-[6px] rounded-full border-[1.5px] border-dashed border-[#8FB4FF]/25" />

          <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-['Manrope'] text-[34px] font-semibold leading-none text-[#E8EDF7] drop-shadow-[0_0_20px_rgba(232,237,247,0.35)]">
            Aa
          </span>

          <div data-brand-orbit className="absolute inset-0">
            <span
              data-brand-swatch
              className="absolute left-1/2 top-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2 translate-x-[58px] rounded-[10px] bg-[#4D8DFF]"
            />
            <span
              data-brand-swatch
              className="absolute left-1/2 top-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2 -translate-y-[58px] rounded-[10px] bg-[#8B7BFF]"
            />
            <span
              data-brand-swatch
              className="absolute left-1/2 top-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2 -translate-x-[58px] rounded-[10px] bg-[#5EEAD4]"
            />
            <span
              data-brand-swatch
              className="absolute left-1/2 top-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2 translate-y-[58px] rounded-[10px] bg-[#E8EDF7]"
            />
          </div>
        </div>
      </div>
    );
  }

  if (serviceIndex === 1) {
    return (
      <div
        ref={rootRef}
        className="relative flex size-full items-center justify-center"
      >
        <div
          data-social-phone
          className="relative h-[190px] w-[110px] rounded-[20px] border border-white/[0.14] bg-white/[0.04]"
        >
          <div className="absolute left-3 right-3 top-4 h-[60px] overflow-hidden rounded-[8px] bg-white/[0.06]">
            <span
              data-social-shimmer
              className="absolute inset-y-0 -left-[60%] w-1/2 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.16),transparent)]"
            />
          </div>

          <div className="absolute left-3 right-3 top-[84px] flex items-center gap-[10px]">
            <span className="h-[5px] w-6 rounded-[3px] bg-white/10" />
            <span className="h-[5px] w-4 rounded-[3px] bg-white/10" />
            <span className="h-[5px] w-5 rounded-[3px] bg-white/10" />
          </div>

          <span
            data-social-burst
            className="absolute bottom-[34px] left-1/2 size-[28px] -translate-x-1/2 rounded-full border-[1.5px] border-[#4D8DFF]"
          />

          <svg
            data-social-heart
            viewBox="0 0 24 24"
            fill="none"
            className="absolute bottom-[34px] left-1/2 z-10 size-[28px] -translate-x-1/2"
          >
            <path
              d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1.2 4 2.5C10.5 5.2 12 4 14 4c4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z"
              fill="#4D8DFF"
            />
          </svg>

          <span
            data-social-bubble
            className="absolute bottom-5 left-[18%] size-[10px] rounded-full bg-[linear-gradient(135deg,#4D8DFF,#8B7BFF)]"
          />
          <span
            data-social-bubble
            className="absolute bottom-5 left-[68%] size-[7px] rounded-full bg-[linear-gradient(135deg,#5EEAD4,#4D8DFF)]"
          />
          <span
            data-social-bubble
            className="absolute bottom-5 left-[42%] size-[5px] rounded-full bg-[linear-gradient(135deg,#4D8DFF,#8B7BFF)]"
          />
          <span
            data-social-bubble
            className="absolute bottom-5 left-[78%] size-[6px] rounded-full bg-[linear-gradient(135deg,#8B7BFF,#5EEAD4)]"
          />
          <span
            data-social-bubble
            className="absolute bottom-5 left-[30%] size-[8px] rounded-full bg-[linear-gradient(135deg,#4D8DFF,#8B7BFF)]"
          />
        </div>
      </div>
    );
  }

  if (serviceIndex === 2) {
    return (
      <div
        ref={rootRef}
        className="relative flex size-full items-center justify-center"
      >
        <div className="relative h-[150px] w-[180px]">
          <svg className="absolute inset-0 size-full">
            <path
              data-neural-line
              d="M6,16 L91,46"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <path
              data-neural-line
              d="M6,76 L91,46"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <path
              data-neural-line
              d="M6,76 L91,106"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <path
              data-neural-line
              d="M6,136 L91,106"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <path
              data-neural-line
              d="M91,46 L174,71"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <path
              data-neural-line
              d="M91,106 L174,71"
              fill="none"
              stroke="rgba(143,180,255,0.25)"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
          </svg>

          <span
            data-neural-node
            className="absolute left-0 top-[10px] size-3 rounded-full bg-[#8FB4FF]"
          />
          <span
            data-neural-node
            className="absolute left-0 top-[70px] size-3 rounded-full bg-[#8FB4FF]"
          />
          <span
            data-neural-node
            className="absolute left-0 top-[130px] size-3 rounded-full bg-[#8FB4FF]"
          />
          <span
            data-neural-node
            className="absolute left-[85px] top-[40px] size-3 rounded-full bg-[#8B7BFF]"
          />
          <span
            data-neural-node
            className="absolute left-[85px] top-[100px] size-3 rounded-full bg-[#8B7BFF]"
          />
          <span
            data-neural-node
            className="absolute left-[168px] top-[65px] size-3 rounded-full bg-[#5EEAD4]"
          />
        </div>
      </div>
    );
  }

  if (serviceIndex === 3) {
    return (
      <div
        ref={rootRef}
        className="relative flex size-full items-center justify-center"
      >
        <div className="relative flex h-[140px] w-[180px] items-end gap-[10px]">
          {barHeights.map((height, index) => (
            <span
              key={`${height}-${index}`}
              data-performance-bar
              className={`${height} flex-1 origin-bottom rounded-t-[5px] bg-[linear-gradient(180deg,#4D8DFF,rgba(77,141,255,0.1))]`}
            />
          ))}

          <svg className="absolute inset-0 size-full overflow-visible">
            <circle
              data-performance-dot
              cx="5"
              cy="120"
              r="4"
              fill="#5EEAD4"
              className="drop-shadow-[0_0_6px_rgba(94,234,212,0.9)]"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative flex size-full items-center justify-center"
    >
      <div className="relative h-[150px] w-[190px] overflow-hidden rounded-[10px] border border-white/[0.12] bg-white/[0.03]">
        <div className="flex h-[18px] items-center gap-1 bg-white/[0.06] px-2">
          <span className="size-[5px] rounded-full bg-white/20" />
          <span className="size-[5px] rounded-full bg-white/20" />
          <span className="size-[5px] rounded-full bg-white/20" />
        </div>

        <span
          data-web-block
          className="absolute left-[10px] top-[30px] h-[34px] w-[70px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />
        <span
          data-web-block
          className="absolute left-[88px] top-[30px] h-4 w-[92px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />
        <span
          data-web-block
          className="absolute left-[88px] top-[52px] h-3 w-[70px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />
        <span
          data-web-block
          className="absolute left-[10px] top-[76px] size-[50px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />
        <span
          data-web-block
          className="absolute left-[68px] top-[76px] size-[50px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />
        <span
          data-web-block
          className="absolute left-[126px] top-[76px] h-[50px] w-[54px] rounded-[5px] bg-[linear-gradient(135deg,rgba(77,141,255,0.5),rgba(139,123,255,0.3))]"
        />

        <svg
          data-web-cursor
          viewBox="0 0 24 24"
          fill="none"
          className="absolute size-[14px]"
        >
          <path
            d="M4 2 L4 20 L9 15 L12 21 L15 19.5 L12 13.5 L18 13.5 Z"
            fill="#E8EDF7"
          />
        </svg>
      </div>
    </div>
  );
}

function Services() {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const stageRef = useRef(null);
  const activeServiceRef = useRef(0);
  const requestedServiceRef = useRef(0);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    activeServiceRef.current = activeService;

    const textAnimation = textRef.current?.animate(
      [
        {
          opacity: 0,
          filter: "blur(5px)",
          transform: "translate3d(0, 36px, 0)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translate3d(0, 0, 0)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    );

    const stageAnimation = stageRef.current?.animate(
      [
        {
          opacity: 0,
          filter: "blur(5px)",
          transform: "translate3d(0, 36px, 0)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translate3d(0, 0, 0)",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    );

    return () => {
      textAnimation?.cancel();
      stageAnimation?.cancel();
    };
  }, [activeService]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return undefined;

    let frameId = 0;

    const transitionToService = (nextService) => {
      if (
        isTransitioningRef.current ||
        nextService === activeServiceRef.current
      ) {
        return;
      }

      isTransitioningRef.current = true;

      const exitOptions = {
        duration: 280,
        fill: "forwards",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      };

      const textExit = textRef.current?.animate(
        [
          {
            opacity: 1,
            filter: "blur(0px)",
            transform: "translate3d(0, 0, 0)",
          },
          {
            opacity: 0,
            filter: "blur(4px)",
            transform: "translate3d(0, -34px, 0)",
          },
        ],
        exitOptions,
      );

      const stageExit = stageRef.current?.animate(
        [
          {
            opacity: 1,
            filter: "blur(0px)",
            transform: "translate3d(0, 0, 0)",
          },
          {
            opacity: 0,
            filter: "blur(4px)",
            transform: "translate3d(0, -34px, 0)",
          },
        ],
        exitOptions,
      );

      Promise.all([
        textExit?.finished ?? Promise.resolve(),
        stageExit?.finished ?? Promise.resolve(),
      ]).then(() => {
        const requestedService = requestedServiceRef.current;

        activeServiceRef.current = nextService;
        setActiveService(nextService);
        isTransitioningRef.current = false;

        if (requestedService !== nextService) {
          transitionToService(requestedService);
        }
      });
    };

    const updateScrollTimeline = () => {
      const section = sectionRef.current;

      if (section) {
        const bounds = section.getBoundingClientRect();
        const scrollDistance = Math.max(
          section.offsetHeight - window.innerHeight,
          1,
        );
        const progress = clamp(-bounds.top / scrollDistance);
        const nextService = Math.min(
          services.length - 1,
          Math.floor(progress * services.length),
        );

        requestedServiceRef.current = nextService;

        if (nextService !== activeServiceRef.current) {
          transitionToService(nextService);
        }
      }

      frameId = window.requestAnimationFrame(updateScrollTimeline);
    };

    frameId = window.requestAnimationFrame(updateScrollTimeline);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="min-h-[500vh] bg-[#001025]">
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
        <div className="mx-auto h-full max-w-[1440px]">
          <p className="pt-[52px] text-center font-['Afacad'] text-[40px] font-bold leading-normal text-[#BCBCBC]">
            What we provide
          </p>

          <div className="ml-[135px] mt-[62px] grid grid-cols-[420px_609px] gap-[208px]">
            <div className="flex h-[544px] items-start pt-[102px]">
              <div ref={textRef} className="w-[420px]">
                <p className="font-['Inter'] text-[40px] font-medium leading-[58px] text-[#848383]">
                  {services[activeService].number}
                </p>
                <h2 className="max-w-[420px] font-['Manrope'] text-[64px] font-bold leading-[1.14] tracking-[-0.04em] text-white">
                  {services[activeService].title}
                </h2>
              </div>
            </div>

            <div
              ref={stageRef}
              className="flex h-[544px] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(27,45,75,0.55),rgba(8,16,32,0.55)_68%,rgba(0,16,37,0)_100%)]"
            >
              <ServiceVisual
                key={services[activeService].title}
                serviceIndex={activeService}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:hidden">
        <p className="text-center font-['Afacad'] text-[32px] font-bold leading-normal text-[#BCBCBC]">
          What we provide
        </p>

        <div className="mt-14 space-y-24">
          {services.map((service, index) => (
            <article key={service.title} className="grid gap-10">
              <div>
                <p className="font-['Inter'] text-[28px] font-medium leading-normal text-[#848383]">
                  {service.number}
                </p>
                <h2 className="max-w-[420px] font-['Manrope'] text-[44px] font-bold leading-[1.14] tracking-[-0.04em] text-white">
                  {service.title}
                </h2>
              </div>

              <div className="flex aspect-[609/544] items-center justify-center bg-[radial-gradient(circle_at_center,rgba(27,45,75,0.55),rgba(8,16,32,0.55)_68%,rgba(0,16,37,0)_100%)]">
                <ServiceVisual serviceIndex={index} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;