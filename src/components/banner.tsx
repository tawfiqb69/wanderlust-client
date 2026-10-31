import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100vh-56px)] flex-col bg-[#1f3d33]">
      <Image
        src='/images/Banner.png'
        alt="Coastal village seen from the hills"
        
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="max-w-3xl font-serif text-6xl leading-[1.1] font-light md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <button className="flex items-center gap-3 bg-[#29b1d4] px-8 py-3.5 text-sm font-semibold tracking-widest uppercase transition-colors hover:bg-[#239dbd]">
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <button className="bg-white/40 px-8 py-3.5 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25">
            View Destination
          </button>
        </div>
      </div>

      <form className="relative z-10 grid grid-cols-2 md:grid-cols-5">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="border-t border-white/40 bg-black/30 px-6 py-4 backdrop-blur-sm md:border-t-0 md:border-l"
          >
            <label className="block text-base font-semibold text-white">
              {field.label}
            </label>
            <span className="mt-0.5 block text-sm text-white/90">
              {field.value}
            </span>
          </div>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-[#29b1d4] py-5 text-base font-bold text-white transition-colors hover:bg-[#239dbd] md:col-span-1"
        >
          Search
        </button>
      </form>
    </section>
  );
}
