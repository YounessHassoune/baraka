import { getSession } from "@/lib/session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaLeaf } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { SignOutButton } from "@/components/sign-out-button";
import { Store, User } from "lucide-react";

export default async function DynamicHeader() {
  const session = await getSession();

  return (
    <header className="bg-white">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <FaLeaf className="text-green-500 h-8 w-8 mr-2" />
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Baraka
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-500">
              How It Works
            </a>
            <a href="#" className="text-gray-600 hover:text-green-500">
              For Businesses
            </a>
            <a href="#" className="text-gray-600 hover:text-green-500">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-green-500">
              Help
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {session.name}
                </span>
                {session.role === "seller" && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/seller">
                      <Store className="h-4 w-4 mr-2" />
                      Seller Dashboard
                    </Link>
                  </Button>
                )}
                {session.role === "buyer" && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                )}
                <SignOutButton />
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/signin">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 font-serif">
          Save Food, Save Money !
          <br />
          Get Fresh Meals at{" "}
          <span className="text-green-500 font-serif">Half Price!</span>
        </h1>

        {/* Hero images */}
        <div className="mt-8 flex justify-center items-center gap-4 md:gap-8">
          {/* Baguette image - left side */}
          <div className="hidden md:block relative">
            <img
              src="/baguette.png"
              alt="Fresh baguette"
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
            <div className="w-fit text-center font-serif absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg font-recoleta">
              For just 8DH!
            </div>
          </div>

          {/* Main hero image - center */}
          <div className="relative">
            <img
              src="/hero-image.jpg"
              alt="Delicious burger deal"
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
            <div className="w-fit text-center font-serif absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg font-recoleta">
              For just 10DH!
            </div>
          </div>

          {/* Salad image - right side */}
          <div className="hidden md:block relative">
            <img
              src="/salad.png"
              alt="Fresh salad"
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
            <div className="w-fit text-center font-serif absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg font-recoleta">
              For just 6DH!
            </div>
          </div>
        </div>

        {/* Mobile version */}
        <div className="mt-4 flex justify-center gap-4 md:hidden">
          <img
            src="/baguette.png"
            alt="Fresh baguette"
            className="w-20 h-20 object-contain"
          />
          <img
            src="/salad.png"
            alt="Fresh salad"
            className="w-20 h-20 object-contain"
          />
        </div>

        <p className="mt-8 text-gray-600 max-w-2xl mx-auto">
          Discover surplus food from restaurants, bakeries, and cafes in
          Morocco. Help reduce food waste while enjoying delicious meals at
          incredible discounts - up to 70% off original prices!
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your location in Morocco"
              className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
          <div className="mt-2 flex justify-center space-x-2 text-gray-500 text-sm">
            <span>Casablanca</span>
            <span>Rabat</span>
            <span>Marrakech</span>
            <span>Fez</span>
            <span>Tangier</span>
          </div>
        </div>
      </div>
    </header>
  );
}
