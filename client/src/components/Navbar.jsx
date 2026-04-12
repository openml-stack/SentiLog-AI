import React, { useState, useContext, useEffect,useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { useUser } from '../context/UserContext';
import { IoHome } from "react-icons/io5";
import { TbAnalyzeFilled } from "react-icons/tb";
import { IoIosJournal } from "react-icons/io";
import { FaRegNewspaper, FaListUl } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsInfoSquareFill } from "react-icons/bs";

const navLinks = [
  { to: "/", label: "Home" ,icon: <IoHome/>},
  { to: "/analyze", label: "Analyze" ,icon: <TbAnalyzeFilled/> },
  { to: "/journal", label: "Journal",icon: <IoIosJournal/> },
  { to: "/news-listing", label: "News",icon: <FaListUl/> },
  { to: "/dashboard", label: "Dashboard",icon: <MdDashboard/> },
  { to: "/about", label: "About" ,icon: <BsInfoSquareFill/>},
];

const Logo = () => (
  <span className="flex items-center gap-2 select-none transition-all duration-300">
    <img src="/SentiLog.png" className="w-8 h-8 rounded-lg shadow-sm" alt="Logo" />
    <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 bg-clip-text text-transparent">
      SentiLog <span className="animate-pulse">AI</span>
    </span>
  </span>
);

const Navbar = () => {
  const { user, loading, setUser: setGlobalUser } = useUser();
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered") === "1"
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  
  console.log(user);
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const themeColors = {
    light: {
      "--bg": "#f1f5f9",
      "--card-bg": "#ffffff",
      "--border": "#e2e8f0",
      "--heading": "#0f172a",
      "--body-text": "#334155",
      "--button": "#0284c7",
      "--button-hover": "#0369a1",
      "--gradient-from": "#0284c7",
      "--gradient-to": "#2563eb",
      "--input-bg": "#ffffff",
      "--input-border": "#cbd5e1",
      "--icon": "#0f172a",
      "--link": "#0ea5e9",
      "--link-hover": "#0284c7",
      "--nav-bg": "rgba(241, 245, 249, 0.25)",
      "--nav-border": "rgba(226, 232, 240, 1)",
      "--nav-text": "#334155",
      "--nav-text-active": "#0284c7",
      "--nav-text-hover": "#0369a1",
    },
    dark: {
      "--bg": "#0f172a",
      "--card-bg": "#1e293b",
      "--border": "#334155",
      "--heading": "#f8fafc",
      "--body-text": "#94a3b8",
      "--button": "#0ea5e9",
      "--button-hover": "#38bdf8",
      "--gradient-from": "#0369a1",
      "--gradient-to": "#1e40af",
      "--input-bg": "#1e293b",
      "--input-border": "#334155",
      "--icon": "#f8fafc",
      "--link": "#38bdf8",
      "--link-hover": "#7dd3fc",
      "--nav-bg": "rgba(15, 23, 42, 0.25)",
      "--nav-border": "rgba(51, 65, 85, 1)",
      "--nav-text": "#94a3b8",
      "--nav-text-active": "#38bdf8",
      "--nav-text-hover": "#e2e8f0",
    },
  };

  const updateCSSVariables = (themeType) => {
    const root = document.documentElement;
    const colors = themeColors[themeType];
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  };

  useEffect(() => {
    setCurrentColors(themeColors[theme]);
    updateCSSVariables(theme);
  }, [theme]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRegistered(localStorage.getItem("registered") === "1");
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    setToken(null);
    setRegistered(false);
    navigate("/");
  };
  const handleDeleteAccount = async () => {// for
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("registered");
        setToken(null);
        setRegistered(false);
        setShowDeleteModal(false);
        navigate("/signup");
        alert("Your account has been deleted successfully.");
      } else {
        alert("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred.");
    }
  };


  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-10 transition-all duration-300 relative ${
        isScrolled 
          ? "backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/20 dark:border-white/5" 
          : "bg-transparent border-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? `var(--nav-bg, ${currentColors["--nav-bg"]})` : "transparent",
      }}
    >
      {/* Gradient Underline */}
      <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`} />

      {/* Logo wrapped in Link*/}
      <NavLink to="/" className="flex items-center" onClick={() => window.scrollTo(0,0)}>
        <Logo />
      </NavLink>
      

      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="font-semibold text-lg px-2 py-1 rounded transition-all duration-200"
              style={({ isActive }) => ({
                color: isActive
                  ? currentColors["--nav-text-active"]
                  : currentColors["--nav-text"],
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <ThemeToggle />

        <div className="flex gap-4 items-center">
          {!token && !registered && (
            <NavLink
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 text-white hover:text-white rounded hover:opacity-90 transition"
            >
              Signup
            </NavLink>
          )}
          {!token && registered && (
            <NavLink
              to="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
            >
              Login
            </NavLink>
          )}
          {token && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 border rounded border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-white bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-white font-bold uppercase shadow-md overflow-hidden">
                  {/* This entire block is the corrected logic for Step 3 */}
                  {!loading && user?.profilephoto ? (
                    <img
                      src={user.profilephoto}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Fallback to initials if no photo or still loading
                    <span>{user?.firstname?.[0]}</span>
                  )}
                </div>
                <span>My Profile ▾</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                  <NavLink
                    to="/forgot-password"
                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-white rounded"
                  >
                    Reset Password
                  </NavLink>
                  <NavLink
                    to="/user-profile"
                    className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-white rounded"
                  >
                    User Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm  text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900  hover:text-white rounded bg-transparent"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        className="md:hidden text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-sky-200 to-blue-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? "✖️" : "☰"}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute top-full left-0 w-full backdrop-blur-xl shadow-lg flex flex-col items-center md:hidden animate-fade-in border-b z-50"
          style={{
            backgroundColor: currentColors["--nav-bg"],
            borderBottomColor: currentColors["--nav-border"],
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="block w-full text-center py-4 font-semibold text-lg border-b transition-all duration-200"
              style={({ isActive }) => ({
                color: isActive
                  ? currentColors["--nav-text-active"]
                  : currentColors["--nav-text"],
                borderBottomColor: currentColors["--nav-border"],
              })}
              onClick={() => setOpen(false)}
            >
              <div className="flex gap-8 px-4 items-center">
                <p>
                  {link.icon}
                </p>
                <p>
                  {link.label}
                </p>
                
              </div>
              
            </NavLink>
          ))}

          <div className="w-full flex items-center justify-center p-4">
            <ThemeToggle />
          </div>

          {!token && !registered && (
            <NavLink
              to="/signup"
              className="w-full text-center py-4 font-semibold text-lg bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 text-white hover:text-white rounded"
              onClick={() => setOpen(false)}
            >
              Signup
            </NavLink>
          )}

          {!token && registered && (
            <NavLink
              to="/login"
              className="w-full text-center py-4 font-semibold text-lg hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>
          )}

          {token && (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full text-center py-4 font-semibold text-lg border-t border-red-500 text-red-600 bg-red-50 rounded"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
      {/* {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-red-600 mb-4">Delete Account</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete your account? This action is irreversible.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;