import OurServices from "../Services/OurServices";
import ClientSlider from "../Clients/ClientSlider";
import BenefitsSection from "../Benifits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <>
      <Banner />
      <OurServices />
      <ClientSlider />
      <BenefitsSection />
      <BeMerchant />
    </>
  );
};

export default Home;
