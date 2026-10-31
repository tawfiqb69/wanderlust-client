'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IApiData } from "@/lib/apiData";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Check } from "lucide-react";



const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: IApiData }) => {
    // console.log("dist",destination);
    const { data: session, } = authClient.useSession()
    const user = session?.user



    const handleBooking = async (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const departureDate = e.target.departureDate.value;

        const data = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...destination,
            destinationId: destination._id,
            departureDate: departureDate,
            bookingDate: new Date()
        }
        // console.log("Destination ID:", destination._id);
        // console.log("Booking Destination ID:", data.destinationId);

        // console.log("Destination:", destination);
        // console.log("Booking Data:", data);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const bookingResponse = await res.json()
        console.log('bookingResponse', bookingResponse);
    }
    return (
        <div>
            <aside className="h-fit rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Starting from</p>

                <p className="mt-1 text-3xl font-medium text-[#29b1d4]">
                    ${destination.price}
                </p>

                <p className="mt-1 text-sm text-gray-500">per person</p>

                <form onSubmit={handleBooking}>
                    <Input
                        type="date"
                        name="departureDate"
                        aria-label="Departure date"
                        defaultValue={destination.departureDate}
                        className="mt-5 h-10 border-transparent bg-gray-100 text-gray-800"
                    />

                    <Button type="submit" className="mt-4 flex h-10 w-full items-center bg-[#29b1d4] text-sm text-white hover:bg-[#239dbd]">
                        Book Now
                        <ArrowRight className="size-4" />
                    </Button>

                </form>

                <ul className="mt-5 space-y-2.5">
                    {perks.map((perk) => (
                        <li
                            key={perk}
                            className="flex items-center gap-2 text-sm text-gray-700"
                        >
                            <Check className="size-4 text-green-600" />
                            {perk}
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default BookingCard;