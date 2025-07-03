import React from "react";
import { Link, Outlet } from "react-router";
import authImg from "../assets/authImage.png";
import NoaShipLogo from "../pages/shared/NoaShip/NoaShipLogo";

const AuthLayout = () => {
  return (
    <div className="p-12">
      <Link to={"/"}>
        <NoaShipLogo />
      </Link>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImg} />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
