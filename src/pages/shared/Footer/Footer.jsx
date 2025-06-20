import React from 'react';
import ProFastLogo from '../Profast/ProfastLogo';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
      <aside>
        <ProFastLogo />
        <p className="font-bold">
          ProFast Technologies
          <br />
          Empowering fast, secure, and scalable digital solutions
        </p>
        <p>© {new Date().getFullYear()} ProFast — All rights reserved.</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 text-white">
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="YouTube">
           <FaYoutube />
          </a>
          <a href="#" aria-label="Facebook">
           <FaFacebook />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
