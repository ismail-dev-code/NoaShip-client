import React from 'react';
import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const howItWorksData = [
  {
    title: 'Booking Pick & Drop',
    description: 'Schedule your parcel pickup and drop-off from your doorstep, hassle-free.',
    icon: <FaTruckPickup className="text-4xl text-blue-500" />,
  },
  {
    title: 'Cash On Delivery',
    description: 'We offer secure and reliable cash collection upon parcel delivery.',
    icon: <FaMoneyBillWave className="text-4xl text-green-500" />,
  },
  {
    title: 'Delivery Hub',
    description: 'Your package is routed through our efficient local delivery hubs for faster service.',
    icon: <FaWarehouse className="text-4xl text-purple-500" />,
  },
  {
    title: 'Booking SME & Corporate',
    description: 'Customized logistics support for SMEs and corporate clients at scale.',
    icon: <FaBuilding className="text-4xl text-orange-500" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-left mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {howItWorksData.map((item, index) => (
          <div
            key={index}
            className=" rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
