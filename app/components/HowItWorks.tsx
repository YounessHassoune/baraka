import { FaSearch, FaCreditCard, FaShoppingBag } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="h-12 w-12 text-green-500" />,
      title: "Browse Deals",
      description:
        "Browse through surplus food from restaurants and bakeries near you. All items are fresh and heavily discounted.",
    },
    {
      icon: <FaCreditCard className="h-12 w-12 text-green-500" />,
      title: "Reserve & Pay",
      description:
        "Reserve your meal and pay online. See exact savings - compare original prices vs. discounted prices.",
    },
    {
      icon: <FaShoppingBag className="h-12 w-12 text-green-500" />,
      title: "Pickup & Enjoy",
      description:
        "Pick up your food during the specified time window. Enjoy fresh, quality food while saving money and helping the environment.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Simple and Easy</h2>
        <p className="mt-2 text-gray-600">
          Save money and reduce waste in just a few steps!
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
