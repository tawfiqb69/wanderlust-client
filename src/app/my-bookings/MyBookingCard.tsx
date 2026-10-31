'use client'

import Link from "next/link";
import {
    CalendarDays,
    Ticket,
    Wallet,
    Eye,
    Trash2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";



interface Booking {
    _id: string;
    destinationId?: string;
    image: string;
    name: string;
    departureDate: string;
    price: number;
}



const MyBookingCard = ({ booking }: { booking: Booking }) => {
const router = useRouter();
    const handleCancelBooking = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
            { method: "DELETE" }
        )
        const data = await res.json()
        console.log(data);
        if (data.deletedCount > 0) {
            router.refresh();
        }
    }

    return (
        <div className="flex flex-col items-center gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row">

            {/* Destination Image */}
            <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                <Image
                    src={booking.image}
                    alt={booking.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Booking Information */}
            <div className="w-full flex-1 space-y-3">
                <h2 className="text-xl font-bold text-gray-800">
                    {booking.name}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={17} className="shrink-0 text-primary" />
                    <span>
                        Departure: {booking.departureDate || "Not selected"}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Ticket size={17} className="shrink-0 text-primary" />
                    <span className="break-all">
                        Booking ID: {booking._id}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <Wallet size={18} />
                    <span>${booking.price.toLocaleString("en-US")}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full shrink-0 gap-3 sm:w-auto sm:flex-row">
                {booking.destinationId && (
                    <Link
                        href={`/destinations/${booking.destinationId}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md sm:flex-none"
                    >
                        <Eye size={17} />
                        View
                    </Link>
                )}

                <button
                    onClick={handleCancelBooking}
                    type="button"

                    title="Delete functionality coming soon"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 sm:flex-none"
                >
                    <Trash2 size={17} />
                    Cancel
                </button>
            </div>

        </div>
    );
};

export default MyBookingCard;