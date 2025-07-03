import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  FaHome,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaUserTie,
  FaMotorcycle,
  FaInfoCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import NoaShipLogo from "../NoaShip/NoaShipLogo";

const Navbar = () => {
  const { user, logOut, updateUser } = useAuth();
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
      <NavLink className="mr-4 flex items-center gap-2" to="/">
        <FaHome /> Home
      </NavLink>
    </li>
    <li>
      <NavLink className="mr-4 flex items-center gap-2" to="/sendParcel">
        <FaBoxOpen /> Send a Parcel
      </NavLink>
    </li>
    <li>
      <NavLink className="mr-4 flex items-center gap-2" to="/coverage">
        <FaMapMarkedAlt /> Coverage
      </NavLink>
    </li>
    {user && (
      <li>
        <NavLink className="mr-4 flex items-center gap-2" to="/dashboard">
          <FaUserTie /> Dashboard
        </NavLink>
      </li>
    )}
    <li>
      <NavLink className="mr-4 flex items-center gap-2" to="/beARider">
        <FaMotorcycle /> Be a Rider
      </NavLink>
    </li>
    <li>
      <NavLink className="mr-4 flex items-center gap-2" to="/about">
        <FaInfoCircle /> About Us
      </NavLink>
    </li>
  </>
);

  return (
    <div className="sticky top-0 z-50 shadow-sm bg-secondary">
      <div className="navbar w-11/12 mx-auto text-white">
        <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="text-xl"><NoaShipLogo /></Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle avatar hover:ring hover:ring-primary/50 transition">
              <div className="w-10 rounded-full overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User Profile" />
                ) : (
                  <div className="bg-gray-300 text-gray-700 w-full h-full flex items-center justify-center font-bold text-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                  </div>
                )}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="mb-1 px-2 text-sm text-gray-500">{user.displayName || user.email}</li>
              <li>
                <button
                  onClick={() =>
                    Swal.fire({
                      title: "Edit Profile",
                      html: `
                        <input type="text" id="name" placeholder="Name" class="swal2-input" value="${user.displayName || ""}">
                        <input type="text" id="photo" placeholder="Photo URL" class="swal2-input" value="${user.photoURL || ""}">
                      `,
                      confirmButtonText: "Update",
                      showCancelButton: true,
                      focusConfirm: false,
                      preConfirm: () => {
                        const name = document.getElementById("name").value;
                        const photo = document.getElementById("photo").value;
                        if (!name) {
                          Swal.showValidationMessage("Name is required");
                          return false;
                        }
                        return { displayName: name, photoURL: photo };
                      },
                    }).then(async (result) => {
                      if (result.isConfirmed && result.value) {
                        try {
                          await updateUser(result.value);
                          Swal.fire("Success!", "Profile updated successfully.", "success");
                          location.reload();
                        } catch (err) {
                          console.error(err);
                          Swal.fire("Error", "Failed to update profile.", "error");
                        }
                      }
                    })
                  }
                >
                  👤 Edit Profile
                </button>
              </li>
              <li>
                <button onClick={() => setShowModal(true)} className="text-red-600 hover:bg-red-100">
                  🔓 Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn bg-primary text-black btn-sm mr-2 btn-outline hover:text-black btn-primary rounded-full px-6">Log In</Link>
            <Link to="/register" className="btn btn-sm hover:bg-primary btn-outline hover:text-black btn-primary rounded-full px-6">Register</Link>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg text-secondary font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6 text-sm text-gray-600">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button className="btn text-teal-700 btn-sm btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn text-base-100 btn-sm btn-error" onClick={handleLogout}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar;
