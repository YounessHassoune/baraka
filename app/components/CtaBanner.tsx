const CtaBanner = () => {
  return (
    <section className="bg-gradient-to-r from-orange-400 to-red-500 py-16">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold">
          Find Special Offers from Your Favorite Restaurants!
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Join thousands of Moroccans saving money and reducing food waste.
          Download the app or browse online to discover amazing deals near you.
        </p>
        <button className="mt-8 bg-white text-gray-800 font-bold px-8 py-3 rounded-md hover:bg-gray-100">
          Browse Restaurants
        </button>
      </div>
    </section>
  );
};

export default CtaBanner;
