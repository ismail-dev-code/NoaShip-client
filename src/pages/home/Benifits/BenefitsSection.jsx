import React, { useEffect } from "react";
import { benefits } from "./benefitsData";
import Lottie from "lottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

const BenefitsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="w-full py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Why Choose NoaShip?
        </h2>

        <div className="space-y-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`flex flex-col-reverse md:flex-row items-center gap-8 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Lottie Animation */}
              <div className="w-full md:w-1/2 flex justify-center">
                <Lottie
                  animationData={benefit.image}
                  loop
                  className="w-[200px] sm:w-[240px] md:w-[260px] h-auto"
                />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
