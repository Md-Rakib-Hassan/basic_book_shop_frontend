import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router";
import { Toaster,  } from "sonner";

const AuthLayout = () => {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10 ">
        <Link
          to="/"
          className="text-blue-500 hover:underline flex justify-center items-center"
        >
          <IoChevronBackOutline /> Home
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-4">
        <Outlet></Outlet>
          </div>
          <Toaster position="bottom-right" richColors/>
    </div>
  );
};

export default AuthLayout;
