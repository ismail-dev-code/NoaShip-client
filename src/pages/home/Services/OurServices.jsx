import React from "react";
import {
  FaTruck,
  FaGlobe,
  FaBoxes,
  FaMoneyBillWave,
  FaWarehouse,
  FaUndo,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTruck className="text-4xl" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaGlobe className="text-4xl" />,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaBoxes className="text-4xl" />,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaWarehouse className="text-4xl" />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: <FaUndo className="text-4xl" />,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-base-100 text-base-content">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="card hover:bg-primary transition-all cursor-pointer shadow-md hover:shadow-lg duration-500"
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            data-aos-duration="800"
          >
            <div className="card-body items-center text-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="card-title text-xl font-semibold">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
