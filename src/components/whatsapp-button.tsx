import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang produk Skyworth.",
  );
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`;

  return (
    <div className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6">
      <span
        className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-70"
        aria-hidden="true"
      />
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat via WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_24px_50px_rgba(15,23,42,0.3)]"
      >
        <FaIcon icon={icons.whatsapp} size={28} />
      </Link>
    </div>
  );
}
