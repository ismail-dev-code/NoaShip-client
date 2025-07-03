import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const NoaShipLogo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <TbTruckDelivery className="text-4xl text-primary" />

      <span className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">
        <span className="text-primary">Noa</span>Ship
      </span>
    </div>
  );
};

export default NoaShipLogo;
