import { Outlet } from "react-router";
import Nav from "./components/Nav";
import Banner from "./pages/home/Banner";
import BookSwiper from "./pages/home/BookSwiper";
import Footer from "./pages/home/Footer";
import Testimonial from "./pages/home/Testimonial";
import { useGetBookQuery } from "./redux/features/books/bookApi";
import { Toaster } from "sonner";

const App = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-gray-50">
      <Toaster richColors position="top-right" />
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
