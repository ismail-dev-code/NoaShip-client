import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import Banner from "../pages/home/Banner/Banner";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
