import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import MyBookingCard from './MyBookingCard';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

interface Booking {
  _id: string;
  destinationId?: string;
  image: string;
  name: string;
  departureDate: string;
  price: number;
}

const MyBookingPage = async() => {
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user
console.log(user);

const token = await getTokenFromServer()
console.log("TOKEN:",token);

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user?.email}`,{
  headers: {
    authorization: `Bearer ${token}`
  }
})
const bookings: Booking[] = await res.json();
console.log("jjjjj",bookings);
    return (
  <div className="mx-auto max-w-6xl space-y-5 px-4 py-8">
    {bookings.map((booking) => (
      <MyBookingCard key={booking._id} booking={booking} />
    ))}
  </div>
);
};

export default MyBookingPage;