import OurServices from "../Services/OurServices";
import ClientSlider from "../Clients/ClientSlider";
import BenefitsSection from "../Benifits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";
import Banner from "../Banner/Banner";
import HowItWorks from "../howitworks/HowItWorks";
import Reviews from "../Reviews/Reviews";
import Faq from "../Faq/Faq";

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
      <Faq/>
    </>
  );
};

export default Home;
