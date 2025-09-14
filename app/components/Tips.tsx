const Tips = () => {
  const tips = [
    {
      title: "Best Times to Find Deals",
      description:
        "Check the app between 4-6 PM when restaurants list their surplus from lunch service.",
    },
    {
      title: "Maximum Savings Strategy",
      description:
        "Look for items with 60%+ discounts and 'ending soon' labels for the best deals.",
    },
    {
      title: "Meal Planning Hack",
      description:
        "Follow your favorite restaurants to get notified when they post new surplus food deals.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Baraka Tips & Tricks
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-2">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tips;
