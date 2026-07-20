import React from 'react';
import logoIcon from "../assets/logos/logo-icon.svg";
import logoText from "../assets/logos/logo-text.svg";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] w-full min-h-[86px] py-8 lg:py-0 px-6 md:px-12 lg:px-24 flex items-center select-none">
      {/* 
        Container matching the site-wide maximum content alignment width.
        Seamlessly shifts from a three-column desktop Flexbox layout to a structured mobile stack.
      */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
        {/* LEFT SECTION: Logo Assets with explicit Figma inspect dimensions */}
        <div className="flex items-center gap-[12px] shrink-0">
          <img 
            src={logoIcon} 
            alt="Elevate Logo Icon" 
            className="w-[19.38px] h-[33.40px] object-contain"
            draggable="false"
          />
          <img 
            src={logoText} 
            alt="ELEVATE" 
            className="h-[39px] object-contain"
            draggable="false"
          />
        </div>

        {/* CENTER SECTION: Strategic Statement Tagline matching Figma panel tokens precisely */}
        <div className="font-inter font-light text-[22px] md:text-[20px] lg:text-[20px] lg:leading-[34px] text-[#494949] tracking-normal text-center md:text-left">
          Built with strategy. Designed for growth.
        </div>

        {/* RIGHT SECTION: Copyright Anchor matching Figma panel tokens precisely */}
        <div className="font-inter font-light text-[18px] md:text-[21px] lg:text-[20px] lg:leading-[29px] text-[#494949] tracking-normal text-center md:text-right shrink-0">
          &copy; 2026 Elevate
        </div>

      </div>
    </footer>
  );
}