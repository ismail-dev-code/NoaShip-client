import React from 'react';
import ProFastLogo from '../Profast/ProfastLogo';
import { FaFacebook, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-3">
 
        <ProFastLogo />

   
        <p className="text-sm leading-relaxed max-w-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <p className="text-xs">© <small>{new Date().getFullYear()} ProFast — All rights reserved.</small></p>

 
        <div className="flex gap-6 justify-center mt-1">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
            <FaTwitter size={22} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-red-500 transition">
            <FaYoutube size={22} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
            <FaFacebook size={22} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
            <FaLinkedinIn size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
