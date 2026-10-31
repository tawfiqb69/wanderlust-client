

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturedDestination {
  _id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: number | string;
  country: string;
  description: string;
  duration: string;
}

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured destinations");
  }

  const featuredData: FeaturedDestination[] = await res.json();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Section Heading */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore the world
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Featured Destinations
          </h2>

          <p className="mt-3 max-w-lg text-gray-500">
            Discover amazing places and plan your next unforgettable journey.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: featuredData.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {featuredData.map((data) => (
            <CarouselItem
              key={data._id}
              className="pl-5 md:basis-1/2 lg:basis-1/3"
            >
              <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={data.imageUrl}
                    alt={data.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-800 backdrop-blur">
                    {data.category}
                  </span>

                  <div className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 shadow-md">
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${Number(data.price).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {data.name}
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="size-4" />
                    {data.country}
                  </p>

                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
                    {data.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarDays className="size-4" />
                      {data.duration}
                    </div>

                    <Link
                      href={`/destinations/${data._id}`}
                      className="flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:gap-2.5"
                    >
                      View Details
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <CarouselPrevious className="static size-10 translate-y-0" />
          <CarouselNext className="static size-10 translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
};

export default Featured;
