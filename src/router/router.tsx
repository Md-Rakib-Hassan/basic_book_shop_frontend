import {
    createBrowserRouter,
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
import DashboardLayout from "../pages/dashboard/DashboardLayout";


  

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
          errorElement:<NotFound></NotFound>,
          children: [
              {
                  index: true,
                    element:<Index></Index>       
          },
            {
                path: '/books',
                element:<Books></Books>
            }, {
              path: '/books/:bookId',
              element:<Book></Book>
            },
            {
              path: '/about',
              element:<AboutUs></AboutUs>
            },
            {
              path: '/contact',
              element:<ContactUs></ContactUs>
            },
            {
              path: '/faq',
              element:<Faq></Faq>
            },
            {
              path: '/checkout:bookId',
              element:<Checkout></Checkout>
            },
            
            
      ]
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
        }
      ]
    },
    {
      path:'/dashboard',
      element: <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>,
      children: [
        
      ]
    }
      
  ]);

  export default router;