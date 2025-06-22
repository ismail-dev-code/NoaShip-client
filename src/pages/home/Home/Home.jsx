import OurServices from "../Services/OurServices";
import ClientSlider from "../Clients/ClientSlider";
import BenefitsSection from "../Benifits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";
import Banner from "../Banner/Banner";
import HowItWorks from "../howitworks/HowItWorks";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Banner />
      <HowItWorks/>
      <OurServices />
      <ClientSlider />
      <BenefitsSection />
      <BeMerchant />
      <Reviews/>
    </>
  );
};

export default Home;
