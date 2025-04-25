import {
    createBrowserRouter,
    Navigate,
  } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import Login from "../pages/auth/Login";

import SignUp from "../pages/auth/SignUp";
import Index from "../pages/home/Index";
import Book from "../pages/Book";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Faq from "../pages/Faq";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../pages/auth/AuthLayout";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ChangePassword from "../pages/dashboard/user/ChangePassword";
import UserProfile from "../pages/dashboard/user/UserProfile";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import EditBook from "../pages/dashboard/admin/EditBook";
import AddBook from "../pages/dashboard/admin/AddBook";
import ManageBooks from "../pages/dashboard/admin/ManageBooks";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";



  

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          index: true,
          element: <Index></Index>,
        },
        {
          path: "/books",
          element: <Books></Books>,
        },
        {
          path: "/books/:bookId",
          element: <Book></Book>,
        },
        {
          path: "/about",
          element: <AboutUs></AboutUs>,
        },
        {
          path: "/contact",
          element: <ContactUs></ContactUs>,
        },
        {
          path: "/faq",
          element: <Faq></Faq>,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          index: true,
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        
        {
          index: true,
          element: <AdminDashboard  />,
        },
        {
          path: "users",
          element: <ManageUsers />,
        },
        {
          path: "books",
          element: <ManageBooks />,
        },
        {
          path: "books/add",
          element: <AddBook />,
        },
        {
          path: "books/edit/:id",
          element: <EditBook />,
        },
        {
          path: "orders",
          element: <ManageOrders />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  export default router;