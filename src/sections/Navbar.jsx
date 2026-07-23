import { useEffect, useState } from "react";
import logoIcon from "../assets/logos/logo-icon.svg";
import logoText from "../assets/logos/logo-text.svg";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
const COLORS = {
  primary: "#001A4D",
  accent: "#70A2E1",
  accentDark: "#5881B5",
  lightButton: "#D9D9D9",
};

export default function Navbar({ onOpenInquiry }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className=" fixed top-0 left-0 w-full z-50 h-[78px] bg-white px-6 md:px-12 xl:px-[110px]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto grid h-full max-w-[1220px] grid-cols-[minmax(0,1fr)_40px] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
      >
        <a href="/" aria-label="Elevate home"  className="justify-self-start min-w-0">
          <span className="flex h-[44px] items-center min-w-0">
            <img
              src={logoIcon}
              alt=""
              className="mr-[7px] h-[34.401px] w-[19.381px]"
            />
            <img src={logoText} alt="Elevate" className="h-[44px] w-auto" />
          </span>
        </a>

        <div className="hidden items-center gap-8 font-['Afacad'] text-[25px] font-medium leading-none text-black lg:flex xl:gap-[60px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer transition-colors duration-[250ms] ease-[ease] hover:text-[#777777] active:text-[#70A2E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden justify-self-end lg:mr-[-30px] gap-[12px] lg:flex">
          <a
            href="#contact"
            className="rounded-[14.521px] bg-[#D9D9D9] px-[13px] py-[7.5px] lg:px-[18px] lg:py-[10px] font-['Afacad'] text-[20.5px] lg:text-[22px] font-medium leading-none text-black transition-all duration-[250ms] ease-[ease] hover:bg-[#9E9E9E] hover:text-white active:bg-[#5881B5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
          >
            Contact us
          </a>

          <button
             type="button"
             onClick={onOpenInquiry}
            className="inline-flex items-center justify-center rounded-[14.521px] bg-[#001A4D] px-[18px] h-[44px] font-['Afacad'] text-[20.5px] font-medium leading-none text-white transition-all duration-[250ms] ease-[ease] hover:bg-[#0447A0] active:bg-[#00133D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="justify-self-end flex size-10 flex-col items-center justify-center gap-1.5 rounded-md text-black transition-colors duration-[250ms] hover:text-[#70A2E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] lg:hidden"
        >
          <span className="h-0.5 w-6 bg-current" />
          <span className="h-0.5 w-6 bg-current" />
          <span className="h-0.5 w-6 bg-current" />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/20"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="ml-auto grid size-10 place-items-center rounded-md text-2xl leading-none transition-colors duration-[250ms] hover:text-[#777777] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777777]"
            >
              ×
            </button>

            <div className="mt-12 flex flex-col gap-8 font-['Afacad'] text-[25px] font-medium text-black">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="transition-colors duration-[250ms] ease-[ease] hover:text-[#70A2E1] active:text-[#70A2E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto flex w-fit gap-[10px]">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-[14.521px] bg-[#D9D9D9] px-[13px] py-[7.5px] font-['Afacad'] text-[20.5px] font-medium leading-none text-black transition-all duration-[250ms] ease-[ease] hover:bg-[#9E9E9E] hover:text-white active:bg-[#5881B5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
              >
                Contact us
              </a>

              <a
                type="button"
  onClick={() => {
    onOpenInquiry();
    setMenuOpen(false);
  }}
                className="rounded-[14.521px] bg-[#001A4D] px-[13px] py-[7.5px] font-['Afacad'] text-[20.5px] font-medium leading-none text-white transition-all duration-[250ms] ease-[ease] hover:bg-[#0447A0] active:bg-[#00133D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70A2E1] focus-visible:ring-offset-4"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
