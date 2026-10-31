'use client'
import { authClient } from "@/lib/auth-client";
import { Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const leftLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
];

export function Navbar() {
  const { data: session, } = authClient.useSession()
  const user = session?.user
  const router = useRouter()
  const handleSignOut = () => {
    authClient.signOut()
    router.push('/')

  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-white px-8">
      <nav className="flex items-center gap-8">
        {leftLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm font-semibold text-gray-800 hover:text-gray-500 ${link.active ? "text-[#1b9cc4] underline underline-offset-4" : ""
              }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl font-bold tracking-tight text-[#1b9cc4]"
      >
        Wanderlust
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/profile"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-800 hover:text-gray-500"
        >
          <Search className="size-4" />
          Profile
        </Link>


        {
          user ? <Popover>
            <PopoverTrigger
              render={
                <button type="button">
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              }
            >
              Open Popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{user?.name}</PopoverTitle>
                <PopoverDescription>
                  {user?.email}
                </PopoverDescription>

                <Button onClick={handleSignOut} variant={"destructive"}> SignOut</Button>

              </PopoverHeader>
            </PopoverContent>
          </Popover> : <>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-800 hover:text-gray-500"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold text-gray-900 hover:text-gray-500"
            >
              Sign Up
            </Link>
          </>
        }



      </nav>
    </header>
  );
}
