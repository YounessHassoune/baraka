const Partners = () => {
  const partners = [
    {
      name: "Marjane",
      logo: "https://www.marjane.ma/icons/logo_marjane.svg",
    },
    {
      name: "Carrefour",
      logo: "https://1000logos.net/wp-content/uploads/2023/04/Carrefour-logo.png",
    },
    {
      name: "Label'Vie",
      logo: "https://labelvie.ma/wp-content/uploads/2020/07/logo-labelvie.png",
    },
    {
      name: "McDonald's",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png",
    },
    {
      name: "Burger King",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Burger-King-Logo.png",
    },
    {
      name: "Venezia Ice",
      logo: "https://www.venezia-ice.com/images/config/logo_venezia_ice1.png",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Partner Restaurants & Businesses
        </h2>
        <div className="flex justify-center items-center space-x-8">
          {partners.map((partner, index) => (
            <div key={index} className="rounded-full overflow-hidden border bg-white shadow-md">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-24 w-24 object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
