import Image from "next/image";
import { ContactForm } from "./contact-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact Skyworth PV sales for datasheets, RFQs, and project support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#D5ECFF] py-16 px-6 lg:px-24 font-sans text-brand-ink flex items-center">
      <div className="mx-auto w-full max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Side */}
        <div className="space-y-8 lg:pt-8 animate-reveal">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
            Let's Power Your Future <br className="hidden lg:block" /> with Clean Energy
          </h1>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed max-w-md font-medium">
            Have questions about solar solutions or ready to start your project? Our team is here to help you find the right solar system for your needs. Reach out to us today and take the first step toward sustainable energy.
          </p>
          <div className="relative h-64 lg:h-80 w-full rounded-2xl overflow-hidden shadow-xl">
             <Image 
                src="/yitiguiph.jpg" 
                alt="Solar Panels" 
                fill 
                className="object-cover" 
             />
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-reveal animate-delay-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
