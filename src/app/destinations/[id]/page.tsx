
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Star,
  
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import { IApiData } from "@/lib/apiData";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";


type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DestinationDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;
  // console.log("iiiiiiiiiii",id);

// Token access from server component

  const token = await getTokenFromServer();
  console.log("TOKEN:",token);


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) notFound();

  const apiData = (await res.json()) as IApiData;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Top bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="size-4 text-gray-400" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestinationDialog apiData={apiData} />
          <DeleteDestinationDialog id={id}/> 
          
        </div>
      </div>

      {/* Destination Details */}
      <DestinationDetails apiData={apiData} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Destination Details                                                       */
/* -------------------------------------------------------------------------- */

function DestinationDetails({apiData}: {apiData: IApiData;}) {
  const destination = {
    _id: apiData._id,
    name: apiData.name ?? "Unnamed Destination",
    location: apiData.country ?? apiData.location ?? "Unknown",
    price: Number(apiData.price ?? 0),
    duration: apiData.duration ?? "—",
    rating: Number(apiData.rating ?? 4.5),
    reviews: Number(apiData.reviewCount ?? apiData.reviews ?? 0),
    description: apiData.description ?? "",
    // departureDate: apiData.departureDate,
    highlights: Array.isArray(apiData.highlights)
      ? apiData.highlights
      : [],
    image:
      apiData.imageUrl ??
      apiData.image_url ??
      "/images/destinations/image1.png",
  };



  return (
    <>
      {/* Hero image */}
      <div className="mx-auto max-w-5xl px-6 pt-3">
        <div className="relative h-[380px]">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Gray divider */}
      <div className="mt-4 h-5 bg-gray-100" />

      {/* Details */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-12 px-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="size-4" />
            {destination.location}
          </p>

          <h1 className="mt-2 font-serif text-5xl text-gray-900">
            {destination.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <Star className="size-4 fill-green-600 text-green-600" />

            <span className="font-semibold">
              {destination.rating.toFixed(1)}
            </span>

            <span className="text-[#29b1d4]">
              ({destination.reviews} reviews)
            </span>

            <span className="text-gray-300">|</span>

            <Calendar className="size-4 text-gray-700" />

            <span className="font-semibold text-gray-900">
              {destination.duration}
            </span>
          </div>

          <h2 className="mt-9 text-xl text-gray-900">Overview</h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
            {destination.description}
          </p>

          {/* Highlights */}
          {destination.highlights.length > 0 && (
            <div className="mt-9">
              <h2 className="text-xl text-gray-900">Highlights</h2>

              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {destination.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Check className="size-4 text-green-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Booking card */}
          <BookingCard destination={destination}/>
      </div>
    </>
  );
}
