import React from 'react';
import { FaFacebookF, FaTwitter, FaGooglePlusG } from 'react-icons/fa';
import { GiBlackBook } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 mt-10  z-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 ">
        
        {/* Bookshop Intro */}
        <div>
          <div className="flex items-center space-x-1 mb-4">
            
              <GiBlackBook className="text-white text-lg" />
            
            <span className="font-bold text-xl">BOOKNEST</span>
          </div>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.
          </p>
          <a href="#" className="mt-4 inline-block text-sm text-white underline">
            Learn More About Us
          </a>
        </div>

        {/* Main Office */}
        <div>
          <h3 className="font-semibold text-lg mb-3">OUR MAIN OFFICE</h3>
          <p className="text-sm">
            San Francisco, California, US<br />
            P.O. BOX: 553204<br />
            Phone: (+1) 998 3384<br />
            Mail: <a href="mailto:admin@bookshop.com" className="underline">admin@bookshop.com</a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3">KEEP IN TOUCH WITH US</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <FaFacebookF /> <a href="#" className="hover:underline">Facebook</a>
            </li>
            <li className="flex items-center space-x-2">
              <FaTwitter /> <a href="#" className="hover:underline">Twitter</a>
            </li>
            <li className="flex items-center space-x-2">
              <FaGooglePlusG /> <a href="#" className="hover:underline">Google Plus</a>
            </li>
          </ul>
        </div>

        {/* Information Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">INFORMATIONS</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">My Account</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Blog</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="  py-3 mt-4 text-center text-sm bg-primary-700">
        © 2016 Bookshop Pty Ltd. ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
