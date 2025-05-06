import React, { useEffect, useState } from "react";
import { Book, Menu, X, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router";
import ProfileAvatarMenu from "./ProfileAvatarMenu";
import Button from "./ui/Button";
import { useFullUser } from "../redux/hooks/useUserByEmail";
import { useLogout } from "../redux/hooks/useLogout";

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullUser = useFullUser();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToDashboard = () => {
    if (fullUser?.user?.UserType) {
      navigate(`/dashboard/${fullUser.user.UserType}`);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <Book className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary-800">
                BookNest
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-primary border-b-2 border-primary pb-1" : "hover:text-primary"
                }
              >
                {link.name}
              </NavLink>
            ))}
            <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer" />

            {fullUser?.user ? (
              <ProfileAvatarMenu
                onDashboard={goToDashboard}
                onLogout={logout}
                imageUrl={fullUser.user.ProfileImage}
                size="w-10 h-10"
              />
            ) : (
              <Link to="/auth/login">
                <Button>Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-primary-800 hover:text-primary-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200 shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="block py-2 px-3 text-primary-900 hover:bg-primary-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              {fullUser?.user ? (
                <>
                  <button
                    onClick={goToDashboard}
                    className="btn btn-outline w-full"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-primary w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="btn btn-primary w-full">Login</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Nav;
