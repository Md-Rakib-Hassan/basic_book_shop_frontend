import React, { use } from "react";
import { GiBlackBook } from "react-icons/gi";
import { CgSearch } from "react-icons/cg";
import { PiUserLight } from "react-icons/pi";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, NavLink, useNavigate } from "react-router";
import { useFullUser } from "../redux/hooks/useUserByEmail";

import ProfileAvatarMenu from "./ProfileAvatarMenu";
import Button from "./ui/Button";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { baseApi } from "../redux/api/baseApi";
import { useLogout } from "../redux/hooks/useLogout";
const Nav = () => {
  const fullUser = useFullUser();
  // console.log(fullUser);
  const navigate = useNavigate();
  const logout = useLogout();
    
    const onDashboard = () => { 
      navigate(`/dashboard/${fullUser?.user?.UserType}`);
    }
  return (
    <div>
      <div className="flex gap-1 justify-around h-16 bg-white items-center  shadow-md relative">
        <Link to={'/'}>
        <div className="md:text-xl text-xs flex items-center md:gap-2 font-medium ">
          <GiBlackBook className="text-primary" />
          BOOKNEST
        </div>
        </Link>

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
          {fullUser?.user?<ProfileAvatarMenu onDashboard={onDashboard} onLogout={logout} imageUrl={fullUser?.user?.ProfileImage} size="w-10 h-10" />:<Link to={'/auth/login'}><Button>Login</Button></Link>}
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
