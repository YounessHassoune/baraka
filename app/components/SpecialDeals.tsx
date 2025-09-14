"use client";

import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

const SpecialDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const { hours, minutes, seconds } = prevTime;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        }
        if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        }
        if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      name: "Family Pizza Deal",
      originalPrice: 120,
      salePrice: 50,
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Sushi Platter",
      originalPrice: 150,
      salePrice: 70,
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Dessert Box",
      originalPrice: 90,
      salePrice: 35,
      image: "https://via.placeholder.com/400x300",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Super Delicious Deals Just for You!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer">
                <FaHeart className="text-red-500" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {deal.name}
                </h3>
                <div className="mt-4">
                  <span className="text-gray-500 line-through text-lg">
                    {deal.originalPrice} DH
                  </span>
                  <span className="text-green-600 text-4xl font-bold ml-2">
                    {deal.salePrice} DH
                  </span>
                </div>
                <div className="mt-4 bg-red-100 text-red-600 font-bold text-center py-2 rounded-lg">
                  <span>
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDeals;
