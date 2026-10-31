"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    author: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    author: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    author: "Michael",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    author: "Sarah",
    location: "New York, USA",
    image: "/images/person2.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white px-4 py-24">
      <Carousel
        opts={{ loop: true }}
        className="mx-auto max-w-6xl "
      >
        <div className="flex items-center justify-between px-8 pt-12 pb-10">
          <div>
            <h2 className="font-serif text-5xl text-gray-900">
              What Travelers Say
            </h2>
            <p className="mt-4 text-sm text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <CarouselPrevious className="relative top-auto right-auto bottom-auto left-auto my-0 size-12 border-transparent bg-white text-gray-400 shadow-lg shadow-gray-300/60 hover:bg-white hover:text-gray-600" />
            <CarouselNext className="relative top-auto right-auto bottom-auto left-auto my-0 size-12 border-transparent bg-white text-gray-400 shadow-lg shadow-gray-300/60 hover:bg-white hover:text-gray-600" />
          </div>
        </div>

        <CarouselContent className="-ml-2">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.author}
              className="pl-2 md:basis-1/2"
            >
              <article className="flex min-h-[280px] bg-white">
                <div className="flex min-w-0 flex-1 flex-col px-6 py-8 md:px-8">
                  <p className="text-xl leading-snug text-gray-900">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="mt-auto pt-8">
                    <p className="flex items-center gap-2 text-[#1b9cc4]">
                      <span className="h-px w-5 bg-[#1b9cc4]" />
                      {testimonial.author}
                    </p>
                    <p className="mt-1 pl-7 text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="relative w-[38%] max-w-[220px] shrink-0 self-stretch">
                  <Image
                    src={testimonial.image}
                    alt={`Portrait of ${testimonial.author}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
