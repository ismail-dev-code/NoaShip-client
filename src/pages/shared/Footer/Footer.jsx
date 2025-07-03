import { FaFacebook, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import NoaShipLogo from "../NoaShip/NoaShipLogo";
import { Link } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaMotorcycle,
  FaInfoCircle,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-secondary text-base-content px-6 py-10">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-start space-y-3">
          <Link to="/">
            <NoaShipLogo />
          </Link>
          <p className="text-sm max-w-sm">
            Fast, secure, and reliable parcel delivery service with real-time tracking and 24/7 customer support across Noakhali and beyond.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500 transition">
              <FaYoutube size={20} />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
  <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <Link to="/" className="flex items-center gap-2 hover:text-primary">
        <FaHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/sendParcel" className="flex items-center gap-2 hover:text-primary">
        <FaBoxOpen /> Send a Parcel
      </Link>
    </li>
    <li>
      <Link to="/coverage" className="flex items-center gap-2 hover:text-primary">
        <FaMapMarkedAlt /> Coverage
      </Link>
    </li>
    <li>
      <Link to="/beARider" className="flex items-center gap-2 hover:text-primary">
        <FaMotorcycle /> Be a Rider
      </Link>
    </li>
    <li>
      <Link to="/about" className="flex items-center gap-2 hover:text-primary">
        <FaInfoCircle /> About Us
      </Link>
    </li>
  </ul>
</div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <ul className="text-sm space-y-2">
            <li>Email: <a href="mailto:support@noaship.com" className="hover:text-primary">support@noaship.com</a></li>
            <li>Phone: <a href="tel:+880123456789" className="hover:text-primary">+880 123 456 789</a></li>
            <li>Location: Maijdee, Noakhali</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NoaShip — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
