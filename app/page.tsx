import Header from "./components/Header";
import Partners from "./components/Partners";
import FoodCategories from "./components/FoodCategories";
import AvailableDeals from "./components/AvailableDeals";
import SpecialDeals from "./components/SpecialDeals";
import CtaBanner from "./components/CtaBanner";
import HowItWorks from "./components/HowItWorks";
import Availability from "./components/Availability";
import Tips from "./components/Tips";
import Footer from "./components/Footer";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <main>
      <Header />
      <Partners />
      <FoodCategories />
      <AvailableDeals />
      <SpecialDeals />
      <CtaBanner />
      <HowItWorks />
      <Availability />
      <Tips />
      <Footer />
    </main>
  );
}
