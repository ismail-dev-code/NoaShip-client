import React from "react";
import merchantImg from "../../../assets/location-merchant.png";


const BeMerchant = () => {
  return (
    <section data-aos="flip-up" className="bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat rounded-3xl my-24 px-0 md:px-0 lg:px-0 text-white overflow-hidden">
      {/* Content Area */}
      <div className="px-4 md:px-8 lg:px-16 py-12 flex flex-col lg:flex-row-reverse items-center">
        {/* Right Side Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={merchantImg}
            alt="Merchant delivery"
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>

        {/* Left Side Content */}
        <div className="w-full text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Merchant & Customer Satisfaction is Our Top Priority
          </h2>

          <p className="text-base md:text-lg text-gray-200">
            We offer the lowest delivery charges with the highest value—
            ensuring 100% safety for your products. NoaShip Courier delivers
            parcels to every corner of Bangladesh, right on time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
            <button className="btn rounded-full btn-primary text-black">
              Become a Merchant
            </button>
            <button className="btn rounded-full btn-outline hover:text-black btn-primary">
              Earn with NoaShip Courier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeMerchant;
