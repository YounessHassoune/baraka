import DynamicHeader from "@/components/dynamic-header";
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
  return (
    <main>
      <DynamicHeader />
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
