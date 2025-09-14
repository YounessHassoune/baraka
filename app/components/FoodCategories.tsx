const FoodCategories = () => {
  const categories = [
    {
      name: "Pastries",
      discount: "Up to 60% off",
      items: 12,
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Bread",
      discount: "Up to 50% off",
      items: 8,
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Main Dishes",
      discount: "Up to 70% off",
      items: 15,
      image: "https://via.placeholder.com/300x200",
    },
    {
      name: "Desserts",
      discount: "Up to 40% off",
      items: 10,
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Top Food Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h3>
                <p className="text-green-500 font-semibold mt-1">
                  {category.discount}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {category.items} items available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
