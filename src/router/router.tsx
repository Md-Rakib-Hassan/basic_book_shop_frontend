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
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentFailedPage from "../pages/PaymentFailedPage";



  

  
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
          path: "/checkout/:bookId",
          element: <ProtectedRoute><Checkout></Checkout></ProtectedRoute>
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
        {
          path: "/success/:tran_id",
          element: <PaymentSuccessPage></PaymentSuccessPage>,
        },
        {
          path: "/fail/:tran_id",
          element: <PaymentFailedPage></PaymentFailedPage>,
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
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        
        {
          index: true,
          path:'admin',
          element: <AdminDashboard  />,
        },
        {
          path: "user",
          element: <UserDashboard />,
        },
        {
          path: "admin/users",
          element: <ManageUsers />,
        },
        {
          path: "admin/books",
          element: <ManageBooks />,
        },
        {
          path: "admin/books/add",
          element: <AddBook />,
        },
        {
          path: "admin/books/edit/:id",
          element: <EditBook />,
        },
        {
          path: "admin/orders",
          element: <ManageOrders />,
        },
        {
          path: "user/orders",
          element: <UserOrders />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        
      ],
    },
  ]);

  export default router;