import React from "react";
import Marquee from "react-fast-marquee";

// Correctly imported logos
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start_people from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

// Use correct variable names in array
const logos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  start_people,
  start,
];

const ClientSlider = () => {
  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Trusted by Our Clients
      </h2>

      <Marquee speed={30} pauseOnHover={true} gradient={false}>
        {logos.map((logo, idx) => (
          <div key={idx} className="mx-6">
            <img
              src={logo}
              alt={`Client logo ${idx + 1}`}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ClientSlider;
