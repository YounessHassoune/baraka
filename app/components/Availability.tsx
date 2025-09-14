const Availability = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800">
              Hungry? We've Got You Covered 24/7!
            </h2>
            <p className="mt-4 text-gray-600">
              Fresh deals available day and night. From morning pastries to
              late-night meals, find discounted food whenever you need it.
            </p>
            <button className="mt-8 bg-green-500 text-white font-bold px-8 py-3 rounded-md hover:bg-green-600">
              Browse Now
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://via.placeholder.com/500x400"
              alt="24/7 Availability"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Availability;
