import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner1.png";
import bannerImg3 from "../../../assets/banner/banner2.png";
import bannerImg4 from "../../../assets/banner/banner2.png";
import bannerImg5 from "../../../assets/banner/banner3.png";
import bannerImg6 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="w-full overflow-hidden rounded-b-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
        swipeable
        emulateTouch
        className="w-full"
      >
        {[bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5, bannerImg6].map((img, index) => (
          <div key={index} className="w-full">
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover object-center"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
