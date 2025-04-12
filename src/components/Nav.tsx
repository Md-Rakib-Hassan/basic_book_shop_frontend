import React from "react";
import { GiBlackBook } from "react-icons/gi";
import { CgSearch } from "react-icons/cg";
import { PiUserLight } from "react-icons/pi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { NavLink } from "react-router";
const Nav = () => {
  return (
    <div>
      <div className="flex gap-1 justify-around h-16 bg-white items-center  shadow-md relative">
        <div className="md:text-xl text-xs flex items-center md:gap-2 font-medium ">
          <GiBlackBook className="text-primary" />
          BOOKNEST
        </div>

        <div className="w-1/2">
          <form action="" className="relative w-full text-xs md:text-base">
            <input
              type="text"
              placeholder="Search for books"
              className="border border-gray-100 rounded-full px-8 py-2 outline-none w-full"
            />
            <button className="text-gray-400 text-2xl  absolute top-1/2 transform -translate-y-1/2 right-3">
              <CgSearch ></CgSearch>
            </button>
          </form>
        </div>

        <div className="flex md:gap-4 gap-1 md:text-3xl font-bold text-gray-600">
          {/* <PiShoppingCartSimpleLight></PiShoppingCartSimpleLight> */}
          <PiUserLight></PiUserLight>
        </div>
      </div>
      <div className="flex justify-center gap-8  font-medium  py-4 shadow-md text-gray-600">
      
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/books"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                Books
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                About Us
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                Contact Us
            </NavLink>
            <NavLink
                to="/blog"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                Blog
            </NavLink>
            <NavLink
                to="/faq"
                className={({ isActive }) =>
                    isActive ? "border-b-2 border-primary pb-1" : ""
                }
            >
                FAQ
            </NavLink>
        </div>
     
    </div>
  );
};

export default Nav;
