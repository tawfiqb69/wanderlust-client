import { DestinationsListing, mapDestinations } from "@/components/destinations-listing";




export default async function AllDestinationPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
        cache: "no-store",
    });

    const data = await res.json();
    const destinations = mapDestinations(data);
    console.log("habi jbai", destinations);

    return (
        <main className="min-h-screen bg-white pt-14 pb-24">
            {/* Page heading */}
            <div className="px-6">
                <div className="mx-auto max-w-6xl">
                    <h1 className="font-serif text-5xl text-gray-900">
                        Explore All Destinations
                    </h1>

                    <p className="mt-4 text-sm text-gray-500">
                        Find your perfect travel experience from our curated collection
                    </p>
                </div>
            </div>

            {/* Filters + destination cards */}
            <div className="mt-10">
                <DestinationsListing destinations={destinations} />
            </div>
        </main>
    );
}