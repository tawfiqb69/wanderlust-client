import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-[#0d2b33]">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-32 text-center text-white md:py-40">
        <h2 className="font-serif text-5xl font-light md:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-5 text-sm text-white/90 md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>

        <button className="mt-12 flex items-center gap-4 bg-white px-10 py-4 text-sm font-semibold tracking-widest text-gray-900 uppercase transition-colors hover:bg-gray-100">
          Book Your Trip Today
          <ArrowRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
