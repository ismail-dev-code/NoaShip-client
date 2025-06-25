import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/shared/Profast/ProfastLogo";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle checkbox (used to control sidebar on small screens) */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        {/* Your nested route page content will show here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-2 text-base-content">
          <Link to={"/"}>
            <ProFastLogo />
          </Link>
          <li>
            <a>Home</a>
          </li>
          <li>
            <NavLink to={"/dashboard/myParcels"}>My Parcels</NavLink>
          </li>
          <li>
            <a>Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
