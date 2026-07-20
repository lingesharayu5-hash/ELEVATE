import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Process from "./sections/Process";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import { useState } from "react";
import InquiryForm from "./components/InquiryForm";


export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  return (
    <>
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />
       <main className="pt-20"></main>
      <Hero onOpenInquiry={() => setIsInquiryOpen(true)} />
      <About />
      <Services />
      <Process />
      <CTA onOpenInquiry={() => setIsInquiryOpen(true)} />
      <Footer />
      <InquiryForm
  isOpen={isInquiryOpen}
  onClose={() => setIsInquiryOpen(false)}
/>
    </>
  );
}