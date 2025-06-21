import { Link, NavLink } from "react-router";
import ProFastLogo from "../Profast/ProfastLogo";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setShowModal(false);
      })
      .catch((error) => {
        toast.error("Failed to log out");
        console.error("Logout error:", error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar shadow-sm bg-neutral text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <ProFastLogo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <span className="mr-4 hidden md:inline-block">
              {user.displayName || user.email}
            </span>
            {/* Show modal instead of directly logging out */}
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-sm btn-outline btn-error rounded-full px-6"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn btn-sm btn-outline hover:text-black btn-primary rounded-full px-6"
          >
            Log In
          </Link>
        )}
      </div>

      {/* Logout Modal - Should be outside the conditional render block */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg text-secondary font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn text-teal-700 btn-sm btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn text-base-100 btn-sm btn-error" onClick={handleLogout}>
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
