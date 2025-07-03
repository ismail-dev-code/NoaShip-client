import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Lottie from "lottie-react";
import { Link } from "react-router";

import lottieFile1 from "../../../assets/lottie/hero.json";
import lottieFile2 from "../../../assets/lottie/rider.json";
import lottieFile3 from "../../../assets/lottie/admin.json";

const bannerData = [
  {
    animation: lottieFile1,
    title: "Streamlined Delivery",
    description:
      "Ensure fast and reliable parcel delivery with real-time tracking and status updates.",
    buttonText: "Send a Parcel",
    buttonLink: "/sendParcel",
  },
  {
    animation: lottieFile2,
    title: "Rider Application System",
    description:
      "Allow new riders to apply, get approved, and start delivering with ease.",
    buttonText: "Be a Rider",
    buttonLink: "/beARider",
  },
  {
    animation: lottieFile3,
    title: "Parcel Tracking System",
    description:
      "Easily track the real-time status of your parcels using tracking IDs. Stay updated with every step of the delivery process.",
    buttonText: "Track Your Parcel",
    buttonLink: "/dashboard/track",
  },
];

const Banner = () => {
  return (
    <div className="w-full bg-white py-10 px-4 md:px-10 lg:px-20">
      <Carousel
        autoPlay={true}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={9000}
        transitionTime={800}
        swipeable
        emulateTouch
        className="w-full"
      >
        {bannerData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Lottie Animation */}
            <div className="w-full md:w-1/2 flex justify-center">
              <Lottie
                animationData={item.animation}
                loop={true}
                className="w-full h-[500px]" 
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {item.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                {item.description}
              </p>

              <Link
                to={item.buttonLink}
                className="inline-block px-6 py-2 bg-primary text-black font-medium rounded-md hover:select-secondary transition"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
