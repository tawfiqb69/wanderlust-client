"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

// What a destination looks like after we clean it up for rendering.
export type Destination = {
  name: string;
  location: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  imageUrl: string;
  _id: string

};

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

// Used when an API item has no image — we cycle through these local files.
const FALLBACK_IMAGES = [
  "/images/destinations/image1.png",
  "/images/destinations/image2.png",
  "/images/destinations/image3.png",
  "/images/destinations/image4.png",
  "/images/destinations/image5.png",
  "/images/destinations/image6.png",
];

// ⚠️ Adjust these to match what your backend actually returns.
const categoryOptions = [
  "Beach",
  "Mountain",
  "Cultural",
  "Adventure",
  "City Break",
  "Cruise",
];

const priceRangeOptions = [
  { label: "Under $1000", min: 0, max: 1000 },
  { label: "$1000 - $2000", min: 1000, max: 2000 },
  { label: "$2000 - $3000", min: 2000, max: 3000 },
  { label: "Above $3000", min: 3000, max: Number.POSITIVE_INFINITY },
];

const sortOptions = [
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Rating: High to Low", value: "rating" },
];

/* -------------------------------------------------------------------------- */
/*  Cleaning up API data                                                      */
/* -------------------------------------------------------------------------- */

// The backend field names may change between projects, so we look for several
// possible keys and fall back to a sensible default. Edit the key lists below
// to match your API's JSON.
function readString(
  source: Record<string, unknown>,
  keys: string[],
  fallback: string
): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.length > 0) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function readNumber(
  source: Record<string, unknown>,
  keys: string[],
  fallback: number
): number {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
}

// Turns the messy API response into a clean list of Destination objects.
export function mapDestinations(rawList: unknown[]): Destination[] {
  console.log("Raw destination:", rawList);
  return rawList.map((raw, index) => {
    const item = (raw ?? {}) as Record<string, unknown>;
    const fallbackImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

    return {
      name: readString(item, ["name", "title"], `Destination ${index + 1}`),
      location: readString(item, ["location", "country"], "Unknown"),
      price: readNumber(item, ["price", "cost"], 0),
      duration: readString(item, ["duration", "days"], "—"),
      category: readString(item, ["category", "type"], "Other"),
      rating: readNumber(item, ["rating", "score"], 4.5),
      imageUrl: readString(item, ["image", "image_url", "imageUrl", "img"], fallbackImage),
      _id: readString(item, ["_id", "id"], `destination-${index}`),
    };
  });
}

/* -------------------------------------------------------------------------- */
/*  One grid card                                                             */
/* -------------------------------------------------------------------------- */

function DestinationCard({ destination }: { destination: Destination }) {
  // console.log("dddd", destination);
  return (
    <article >
      <div className="p-3 border">
        <div className=" relative h-52">
          <Image
            src={destination.imageUrl || "/images/destinations/image1.png"}
            alt={destination.name}
            fill
            className="object-cover"
          />
          {/* Rating badge on top of the image */}
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2.5 py-1 text-sm font-medium text-gray-900">
            {(destination.rating ?? 4.5).toFixed(1)}
            <Star className="size-3.5 fill-black" />
          </span>
        </div>

        <p className="mt-4 flex items-center gap-1.5 text-sm text-gray-600">
          <MapPin className="size-4" />
          {destination.location}
        </p>

        <div className="mt-1 flex items-baseline justify-between">
          <h3 className="font-serif text-xl text-gray-900">{destination.name}</h3>
          <p>
            <span className="text-lg font-bold text-gray-900">
              ${destination.price}
            </span>
            <span className="text-xs text-gray-500">/Person</span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-800">
          <Calendar className="size-4" />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-3 inline-flex items-center gap-1 border-b border-[#1b9cc4] pb-0.5 text-sm font-medium tracking-wide text-[#1b9cc4] uppercase"
        >
          Book Now
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared styling for the three filter dropdowns                             */
/* -------------------------------------------------------------------------- */

const filterTriggerClass =
  "w-full justify-between rounded-md border-gray-200 bg-white pl-6 pr-4 text-gray-600 data-[size=default]:h-12";

function FilterSelect({
  placeholder,
  options,
  onChange,
}: {
  placeholder: string;
  options: { label: string; value: string }[];
  onChange: (value: string | null) => void;
}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger size="default" className={filterTriggerClass}>
        <SelectValue
          placeholder={placeholder}
          className="text-sm tracking-widest uppercase"
        />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* -------------------------------------------------------------------------- */
/*  Filter values that mean "no filter at all"                                */
/* -------------------------------------------------------------------------- */

const ALL_CATEGORY = "all-categories";
const ANY_PRICE = "any-price";
const POPULAR_SORT = "popular";

/* -------------------------------------------------------------------------- */
/*  Main section: filters + list                                              */
/* -------------------------------------------------------------------------- */

export function DestinationsListing({
  destinations
}: {
  destinations: Destination[];
}) {

  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  // Step 1: filter, Step 2: sort. Plain array code, easy to change later.

  // console.log("destinations: ",destinations);
  if (category !== null && category !== ALL_CATEGORY) {
    const chosen = categoryOptions[Number(category)];
    destinations = destinations.filter((item) => item.category === chosen);
  }

  if (priceRange !== null && priceRange !== ANY_PRICE) {
    const range = priceRangeOptions[Number(priceRange)];
    destinations = destinations.filter(
      (item) => item.price >= range.min && item.price < range.max
    );
  }

  if (sort !== null && sort !== POPULAR_SORT) {
    destinations = [...destinations].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return b.rating - a.rating; // "rating"
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* The three dropdown filters */}
      <div className="grid gap-1.5 sm:grid-cols-3">
        <FilterSelect
          placeholder="Category"
          options={[
            { label: "All Categories", value: ALL_CATEGORY },
            ...categoryOptions.map((label, index) => ({
              label,
              value: String(index),
            })),
          ]}
          onChange={setCategory}
        />
        <FilterSelect
          placeholder="Price Range"
          options={[
            { label: "Any Price", value: ANY_PRICE },
            ...priceRangeOptions.map((option, index) => ({
              label: option.label,
              value: String(index),
            })),
          ]}
          onChange={setPriceRange}
        />
        <FilterSelect
          placeholder="Sort By"
          options={[
            { label: "Popular", value: POPULAR_SORT },
            ...sortOptions,
          ]}
          onChange={setSort}
        />
      </div>

      <p className="mt-8 text-sm text-gray-700">
        Showing {destinations.length} destination{destinations.length === 1 ? "" : "s"}
      </p>

      {destinations.length === 0 ? (
        <p className="mt-10 text-sm text-gray-500">
          No destinations match your filters.
        </p>
      ) : (
        <div className="mt-6 grid gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={`${destination.name}-${index}`}
              destination={destination}
            />
          ))}
        </div>
      )}
    </div>
  );
}
