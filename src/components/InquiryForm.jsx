import React, { useEffect, useRef, useState } from 'react';
import { supabase } from "../lib/supabase";

export default function InquiryForm({ isOpen, onClose }) {
  const servicesRef = useRef(null);
  const services = [
  "Brand Identity",
  "Logo Design",
  "Website Design",
  "Website Development",
  "UI/UX Design",
  "Social Media Management",
  "Content Creation",
  "Video Editing",
  "Performance Marketing",
  "SEO",
  "AI Automation",
  "Complete Branding Package",
];

const [selectedServices, setSelectedServices] = useState([]);
const [isServicesOpen, setIsServicesOpen] = useState(false);
const [formData, setFormData] = useState({

  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  monthlyBudget: "",
});
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
  // Listen for Escape key press to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validateForm = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = true;
  }

  if (!formData.businessName.trim()) {
    newErrors.businessName = true;
  }

  if (!formData.email.trim()) {
    newErrors.email = true;
  }

  if (!formData.phone.trim()) {
    newErrors.phone = true;
  }

  if (!formData.businessType) {
    newErrors.businessType = true;
  }

  if (!formData.monthlyBudget) {
    newErrors.monthlyBudget = true;
  }

  if (selectedServices.length === 0) {
    newErrors.services = true;
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      {/* Clickable dim backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Main Frame Card: Rect 6 specs mapped to flex/grid container */}
      <div className="relative w-full max-w-[747px] bg-[#001530] border border-[#848383] rounded-[20px] px-6 py-8 md:p-[40px] shadow-2xl z-10 transition-transform scale-100">
        
        {/* Close Interaction Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 text-white/60 hover:text-white font-inter text-xl transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          &#x2715;
        </button>

        {/* Form Heading Header Token */}
        <h2 className="text-center font-manrope font-bold text-[32px] leading-[44px] text-[#FFFFFF] mb-6">
          Inquiry
        </h2>

        {/* Form Inputs Grid System Layout */}
        <form
  onSubmit={async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

setIsSubmitting(true);

    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          full_name: formData.fullName,
          business_name: formData.businessName,
          email: formData.email,
          phone: formData.phone,
          business_type: formData.businessType,
          monthly_budget: formData.monthlyBudget,
          services: selectedServices.join(", "),
        },
      ]);

   if (error) {
  alert("Something went wrong. Please try again.");
  console.error(error);
  setIsSubmitting(false);
  return;
}
alert("Calling email API...");

const emailResponse = await fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullName: formData.fullName,
    businessName: formData.businessName,
    email: formData.email,
    phone: formData.phone,
    businessType: formData.businessType,
    monthlyBudget: formData.monthlyBudget,
    services: selectedServices,
  }),
});
console.log("Status:", emailResponse.status);

const responseBody = await emailResponse.text();
console.log("Response:", responseBody);

if (!emailResponse.ok) {
  console.error("Email failed to send");
}

setSubmitSuccess(true);
setFormData({
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  monthlyBudget: "",
});
setSelectedServices([]);
setErrors({});
setIsServicesOpen(false);

setTimeout(() => {
  setSubmitSuccess(false);
}, 3000);
setIsSubmitting(false);
  }}
  className="space-y-5"
>
          
          {/* Row 1: Full name & Business name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[14px]">
            <div className="flex flex-col gap-1.5">
              <label
  className={`font-inter font-light text-[14px] leading-[17px] ${
    errors.fullName ? "text-red-500" : "text-[#FFFFFF]"
  }`}
>
  *Full name
</label>
              <input 
                type="text" 
                placeholder="Full name" 
                value={formData.fullName}

  onChange={(e) => {
  setFormData({
    ...formData,
    fullName: e.target.value,
  });

  setErrors({
    ...errors,
    fullName: false,
  });
}}

                className="w-full h-[44px] bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
  className={`font-inter font-light text-[14px] leading-[17px] ${
    errors.businessName ? "text-red-500" : "text-[#FFFFFF]"
  }`}
>
  *Business name
</label>
              <input
  type="text"
  placeholder="Business/brand name"
  value={formData.businessName}
  onChange={(e) => {
    setFormData({
      ...formData,
      businessName: e.target.value,
    });

    setErrors({
      ...errors,
      businessName: false,
    });
  }}
  className="w-full h-[44px] bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
/>
            </div>
          </div>

          {/* Row 2: Email address & Phone number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[14px]">
            <div className="flex flex-col gap-1.5">
              <label
  className={`font-inter font-light text-[14px] leading-[17px] ${
    errors.email ? "text-red-500" : "text-[#FFFFFF]"
  }`}
>
  *Email Address
</label>
              <input
  type="email"
  placeholder="Email address"
  value={formData.email}
  onChange={(e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });

    setErrors({
      ...errors,
      email: false,
    });
  }}
  className="w-full h-[44px] bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
  className={`font-inter font-light text-[14px] leading-[17px] ${
    errors.phone ? "text-red-500" : "text-[#FFFFFF]"
  }`}
>
  *Phone number
</label>
              <input 
                type="tel" 
                placeholder="Phone number" 
                 value={formData.phone}

  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value,
    })
  }
                className="w-full h-[44px] bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>

          {/* Row 3: Business type & Services needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[14px]">
            <div className="flex flex-col gap-1.5">
              <label
  className={`font-inter font-light text-[14px] leading-[17px] ${
    errors.businessType ? "text-red-500" : "text-[#FFFFFF]"
  }`}
>
  *Business type
</label>

  <div className="relative">
    <select
      value={formData.businessType}
      onChange={(e) =>
  setFormData({
    ...formData,
    businessType: e.target.value,
  })
}
      className="w-full h-[44px] appearance-none bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 pr-12 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
    >
      <option value="" disabled>
        Select business type
      </option>
      <option>Startup</option>
      <option>Small Business</option>
      <option>Personal Brand</option>
      <option>E-commerce</option>
      <option>Agency</option>
      <option>Restaurant / Cafe</option>
      <option>Gym / Fitness</option>
      <option>Healthcare</option>
      <option>Real Estate</option>
      <option>Education</option>
      <option>Other</option>
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-[#5A5A5A]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        />
      </svg>
    </div>
  </div>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end pt-2">
            <div className="flex flex-col gap-1.5 -mt-2">
              <label className="font-inter font-light text-[14px] leading-[17px] text-[#FFFFFF]">*Monthly budget</label>

  <div className="relative  w-[325px]">
    <select
      value={formData.monthlyBudget}
      onChange={(e) =>
  setFormData({
    ...formData,
    monthlyBudget: e.target.value,
  })
}
      className="w-full h-[44px] appearance-none bg-[#D9D9D9] text-[#5A5A5A] rounded-[20px] px-5 pr-12 font-inter font-light text-[15px] leading-[18px] focus:outline-hidden focus:ring-2 focus:ring-white/40"
    >
      <option value="" disabled>
        Select budget
      </option>

      <option>Under ₹25,000</option>
      <option>₹25,000 – ₹50,000</option>
      <option>₹50,000 – ₹1,00,000</option>
      <option>₹1,00,000 – ₹2,50,000</option>
      <option>₹2,50,000+</option>
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-[#5A5A5A]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        />
      </svg>
    </div>
  </div>
</div>
            </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-inter font-light text-[14px] leading-[17px] text-[#FFFFFF]">*Services needed</label>
     <div ref={servicesRef} className="relative">
  <button
    type="button"
    onClick={() => setIsServicesOpen(!isServicesOpen)}
    className="flex w-full min-h-[44px] items-center justify-between rounded-[20px] bg-[#D9D9D9] px-5 py-3 text-left"
  >
    <div className="flex flex-wrap items-center gap-2 flex-1">
      {selectedServices.length === 0 ? (
        <span className="text-[#5A5A5A]">Services Needed</span>
      ) : (
        selectedServices.map((service) => (
          <span
            key={service}
            className="flex items-center gap-2 rounded-full bg-[#001530] px-3 py-1 text-xs text-white"
          >
            {service}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedServices(
                  selectedServices.filter((item) => item !== service)
                );
              }}
              className="font-bold hover:text-red-300"
            >
              ✕
            </button>
          </span>
        ))
      )}
    </div>

    {/* Chevron */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`ml-3 h-5 w-5 flex-shrink-0 text-[#5A5A5A] transition-transform duration-200 ${
        isServicesOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
      />
    </svg>
  </button>

  {isServicesOpen && (
    <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-[#848383] bg-white shadow-lg">
      {services.map((service) => (
        <button
          key={service}
          type="button"
          onClick={() => {
            if (selectedServices.includes(service)) {
              setSelectedServices(
                selectedServices.filter((item) => item !== service)
              );
            } else {
              setSelectedServices([...selectedServices, service]);
            }
          }}
          className="flex w-full items-center justify-between px-5 py-3 text-left transition-colors hover:bg-gray-100"
        >
          <span>{service}</span>

          {selectedServices.includes(service) && (
            <span className="font-bold text-green-600">✓</span>
          )}
        </button>
      ))}
    </div>
  )}
</div>

          {/* Row 4: Monthly budget & Submit Anchor layout */}
            
            {/* Action Trigger Submit Element */}
            <div className="flex flex-col items-center md:items-end">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-[100px] h-[40px] px-6 bg-[#FFFFFF] rounded-[14.5208px] font-afacad font-bold text-[18px] leading-[27px] text-[#000000] flex justify-center items-center hover:bg-white/90 active:scale-98 transition-all cursor-pointer shadow-xs"
              >
               {isSubmitting ? "Submitting..." : "Send Inquiry"}
              </button>
              {submitSuccess && (
  <p className="mt-3 text-center text-green-400 font-inter text-sm">
    ✅ Thank you! Your inquiry has been submitted successfully.
  </p>
)}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}