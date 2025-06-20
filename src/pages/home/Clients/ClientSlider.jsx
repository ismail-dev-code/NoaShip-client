import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start_people from "../../../assets/brands/start-people 1.png";
import start from "../../../assets/brands/start.png";

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
    <section className="pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#03373D] text-center mb-7">
          We've helped thousands of sales teams
        </h2>

        <div className="border-b border-dotted border-gray-300 pb-6">
          <Marquee speed={50} pauseOnHover={true} gradient={false}>
            {logos.map((logo, idx) => (
              <div key={idx} className="mx-14">
                <img
                  src={logo}
                  alt={`Client logo ${idx + 1}`}
                  className="h-6 w-auto object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default ClientSlider;
