import { Outlet } from "react-router";
import Nav from "./components/Nav";
import Footer from "./pages/home/Footer";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  
  return (
    // <div className="min-h-screen bg-gradient-to-b from-primary-100 to-gray-50">
    <div className="min-h-screen bg-[#f9fafb]">
      <ScrollToTop/>
      <Toaster richColors position="top-right" />
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
