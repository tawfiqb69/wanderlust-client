import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e9f7fc] px-4 py-24">
      <div className="mx-auto max-w-6xl ">
        <div className="px-8 pt-12 pb-12 text-center">
          <h2 className="font-serif text-5xl text-gray-900">
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-white px-6 py-10">
              <feature.icon className="size-10 text-[#1b9cc4]" />
              <h3 className="mt-6 font-serif text-2xl text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
