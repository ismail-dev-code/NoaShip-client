import React from "react";
import { benefits } from "../Benifits/benefitsData";

const BenefitsSection = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 bg-base-100 pt-0">
      <div className="space-y-8">
        {benefits.map((item, index) => (
          <div
            key={item.id}
            className="card card-side shadow-md flex flex-col md:flex-row items-center"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
          >
            <figure className="md:w-1/3 w-full p-4 flex justify-center items-center">
              <div className="h-32 md:border-r md:border-dotted md:border-gray-400 pr-4 flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full object-contain rounded-md"
                />
              </div>
            </figure>
            <div className="card-body md:w-2/3">
              <h3 className="card-title text-xl md:text-2xl">{item.title}</h3>
              <p className="text-sm md:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
