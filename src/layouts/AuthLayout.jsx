import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import Lottie from "lottie-react";
import authLottie from "../assets/lottie/login_box.json";
import NoaShipLogo from "../pages/shared/NoaShip/NoaShipLogo";

const AuthLayout = () => {
   useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="w-8/12 mx-auto pt-10">
      <Link to={"/"} className="block">
        <NoaShipLogo />
      </Link>

      <div className="hero-content flex-col lg:flex-row-reverse rounded-xl p-8">
        {/* Lottie animation section */}
        <div className="flex-1 flex justify-center items-center mb-6 lg:mb-0">
          <Lottie
            animationData={authLottie}
            loop
            className="w-full max-w-md"
          />
        </div>

        {/* Outlet for forms */}
        <div className="flex-1 w-full max-w-md">
          <div className="bg-white rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
