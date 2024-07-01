import { useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import logo from "/logo.png";

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-black pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-20 wrapper w-full gap-16 md:gap-10 lg:gap-5 xl:gap-10 2xl:px-20 ">
        <div className="footer-col-1 flex flex-col  items-start ">
          <Link
            to="/"
            className="text-4xl md:text-2xl font-semibold text-[#8fc443] hover:text-white duration-300"
          >
            Mazzak Agro.
          </Link>
        </div>
        <div className="footer-col-2 flex flex-col items-start">
          <p className="follow-text uppercase tracking-wider text-gray-400">{`Don't forget to follow us`}</p>
          <div className="social-icons">
            <div className="icon-circle">
              <a
                href="https://www.facebook.com/mazzakagrobusiness/"
                target="_blank"
                className="text-rose-100 mx-auto"
              >
                <FaFacebookF />
              </a>
            </div>
            <div className="icon-circle">
              <FaInstagram className="text-rose-100 mx-auto" />
            </div>
            <div className="icon-circle">
              <FaLinkedinIn className="text-rose-100 mx-auto" />
            </div>
            <div className="icon-circle">
              <FaTwitter className="text-rose-100 mx-auto" />
            </div>
          </div>
        </div>
        <div className="footer-col-3 flex flex-col items-start">
          <p className="uppercase font-medium text-[#8fc443] tracking-wider">
            Useful Links
          </p>
          <div className="nav-link flex flex-col-2 mt-3 gap-10 justify-start">
            <div className="link-col-left flex flex-col text-left gap-1 uppercase">
              <Link to="/" className="footer-nav-links">
                Home
              </Link>
              <Link to="/products" className="footer-nav-links">
                Shop
              </Link>
              <Link to="/products/nuts" className="footer-nav-links">
                Nuts
              </Link>
              <Link to="/products/berries" className="footer-nav-links">
                Berries
              </Link>
            </div>
            <div className="link-col-right flex flex-col text-left gap-1 uppercase">
              <Link to="/about" className="footer-nav-links">
                About
              </Link>
              <Link to="/contact" className="footer-nav-links">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-col-4 flex flex-col items-start xl:items-center gap-3">
          <p className="uppercase tracking-wider text-gray-400">
            Need more informations?
          </p>
          <button className="footer-btn bg-[#8fc443] py-4 px-6 rounded-full uppercase text-sm font-medium hover:text-[#8fc443] hover:bg-rose-50 duration-300 text-white">
            + New Message
          </button>
          <p className="font-medium text-lg">info@mazzakagro.com</p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col border-t border-gray-500/40 pt-10 text-gray-400  text-center ">
        <img width={210} src={logo} alt="Mazzak Agro Logo" />
        <p className="copyright uppercase mt-5">
          &copy; {new Date().getFullYear()} Mazzak Agro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
