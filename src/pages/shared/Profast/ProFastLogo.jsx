import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";
const ProFastLogo = () => {
  return (
    <div className="flex items-end">
      <img className="mb-2" src={logo} alt="" />
      <Link to={"/"} className="text-3xl -ml-2 font-extrabold">
        ProFast
      </Link>
    </div>
  );
};

export default ProFastLogo;
