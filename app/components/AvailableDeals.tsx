import { FaStar } from "react-icons/fa";

const AvailableDeals = () => {
  const deals = [
    {
      restaurant: "Atlas Restaurant",
      rating: 4.2,
      distance: 1.5,
      item: "Chicken Tagine",
      originalPrice: 60,
      salePrice: 20,
      quantity: 2,
      pickupTime: "8 PM",
      image: "https://via.placeholder.com/300x200",
    },
    {
      restaurant: "Pâtisserie Bennis",
      rating: 4.7,
      distance: 0.8,
      item: "Mixed Pastries Box",
      originalPrice: 80,
      salePrice: 25,
      quantity: 5,
      pickupTime: "9 PM",
      image: "https://via.placeholder.com/300x200",
    },
    {
      restaurant: "Café Central",
      rating: 4.0,
      distance: 2.1,
      item: "Fresh Sandwich & Juice",
      originalPrice: 35,
      salePrice: 12,
      quantity: 4,
      pickupTime: "7 PM",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Fresh Deals Available Now
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            All
          </button>
          <button className="text-gray-600 hover:text-green-500">
            Ending Soon
          </button>
          <button className="text-gray-600 hover:text-green-500">
            Best Deals
          </button>
          <button className="text-gray-600 hover:text-green-500">
            Nearby
          </button>
          <button className="text-gray-600 hover:text-green-500">
            New Today
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.item}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {Math.round(
                    ((deal.originalPrice - deal.salePrice) /
                      deal.originalPrice) *
                      100
                  )}
                  % OFF
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {deal.restaurant}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaStar className="text-yellow-400 mr-1" />
                    {deal.rating} • {deal.distance} km
                  </div>
                </div>
                <p className="text-gray-800 font-semibold mt-2">{deal.item}</p>
                <div className="mt-2">
                  <span className="text-gray-500 line-through">
                    {deal.originalPrice} DH
                  </span>
                  <span className="text-green-600 text-2xl font-bold ml-2">
                    {deal.salePrice} DH
                  </span>
                </div>
                <p className="text-sm text-green-700 font-semibold">
                  Save {deal.originalPrice - deal.salePrice} DH (
                  {Math.round(
                    ((deal.originalPrice - deal.salePrice) /
                      deal.originalPrice) *
                      100
                  )}
                  %)
                </p>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                  <p>{deal.quantity} portions left</p>
                  <p>Available until {deal.pickupTime}</p>
                </div>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableDeals;
