import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa"; 

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/journal", label: "Journal" },
  { to: "/news", label: "News" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

const Logo = ({ theme, currentColors }) => (
  <span
    className="flex items-center gap-2 text-2xl font-extrabold tracking-tight select-none transition-all duration-300"
    style={{
      background: `linear-gradient(to right, var(--gradient-from, ${currentColors['--gradient-from'] || '#6366f1'}), var(--gradient-to, ${currentColors['--gradient-to'] || '#d946ef'}))`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
     
    {/* <img src="/companylogo.png"></img>  */}
     <img src="/SentiLog.png"></img> 
     
    </svg>
        {/* <img src={"/companylogo.png"} style={{ width: "32px", height: "32px", borderRadius:8 }} */}
        <img src="/SentiLog.png" style={{ width: "32px", height: "32px", borderRadius:8 }} 
></img>

    SentiLog <span className="animate-pulse">AI</span>
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered") === "1"
  );
  const [email, setEmail] = useState(localStorage.getItem("email")); 
  const [showDropdown, setShowDropdown] = useState(false); 

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  const themeColors = {
    light: {
      "--bg": "#ffffff",
      "--card-bg": "#f9fafb",
      "--border": "#e5e7eb",
      "--heading": "#111827",
      "--body-text": "#374151",
      "--button": "#6366f1",
      "--button-hover": "#4f46e5",
      "--gradient-from": "#6366f1",
      "--gradient-to": "#d946ef",
      "--input-bg": "#ffffff",
      "--input-border": "#d1d5db",
      "--icon": "#000000",
      "--link": "#3b82f6",
      "--link-hover": "#1d4ed8",
      "--nav-bg": "rgba(255, 255, 255, 0.7)",
      "--nav-border": "#dbeafe",
      "--nav-text": "#000000",
      "--nav-text-active": "#2563eb",
      "--nav-text-hover": "#3b82f6",
    },
    dark: {
      "--bg": "#0b1120",
      "--card-bg": "#111827",
      "--border": "#1f2937",
      "--heading": "#f3f4f6",
      "--body-text": "#d1d5db",
      "--button": "#6366f1",
      "--button-hover": "#4f46e5",
      "--gradient-from": "#6366f1",
      "--gradient-to": "#d946ef",
      "--input-bg": "#1a2332",
      "--input-border": "#334155",
      "--icon": "#000000",
      "--link": "#60a5fa",
      "--link-hover": "#3b82f6",
      "--nav-bg": "rgba(17, 24, 39, 0.8)",
      "--nav-border": "#374151",
      "--nav-text": "#ffffff",
      "--nav-text-active": "#60a5fa",
      "--nav-text-hover": "#93c5fd",
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

  // Update auth state on location change
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRegistered(localStorage.getItem("registered") === "1");
    setEmail(localStorage.getItem("email")); 
  }, [location]);

  // Listen for custom auth change events
  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token"));
      setRegistered(localStorage.getItem("registered") === "1");
      setEmail(localStorage.getItem("email"));
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    localStorage.removeItem("email");
    setToken(null);
    setRegistered(false);
    setEmail(null);
    setShowDropdown(false);
    
    // Dispatch auth change event
    window.dispatchEvent(new Event("authChange"));
    
    navigate("/");
  };

  // Helper function to determine if user is logged in
  const isLoggedIn = token && token !== "null" && token !== "" && token.trim() !== "";

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl shadow-lg flex items-center justify-between px-4 py-3 md:px-10 border-b transition-all duration-300"
      style={{
        backgroundColor: `var(--nav-bg, ${currentColors["--nav-bg"]})`,
        borderBottomColor: `var(--nav-border, ${currentColors["--nav-border"]})`,
      }}
    >
      <Logo theme={theme} currentColors={currentColors} />

      {/* Desktop Nav */}
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
        
        {/* Authentication Section */}
        <div className="flex gap-4 items-center relative" ref={dropdownRef}>
          {isLoggedIn ? (
            /* Profile Icon with Dropdown - Shown when user is logged in */
            <>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="text-3xl text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                aria-label="User menu"
                title={`Signed in as ${email || "User"}`}
              >
                <FaUserCircle />
              </button>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-12 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl w-64 p-4 z-50"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">
                      <FaUserCircle className="mx-auto" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Signed in as:
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 break-all text-sm">
                      {email || "User"}
                    </p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-600 mb-4" />
                  <button
                    onClick={logout}
                    className="w-full text-red-600 hover:text-white hover:bg-red-600 dark:text-red-400 dark:hover:bg-red-500 transition-all duration-200 py-2 px-4 rounded-md border border-red-600 dark:border-red-400 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Sign out
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* Login/Signup Buttons - Shown when user is not logged in */
            <>
              <NavLink
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? "✖️" : "☰"}
      </button>

      {/* Mobile nav links */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
              {link.label}
            </NavLink>
          ))}

          <div className="w-full flex items-center justify-center p-4">
            <ThemeToggle />
          </div>

          {/* Mobile Authentication Section */}
          {isLoggedIn ? (
            /* Mobile Profile Section - Shown when logged in */
            <div className="w-full p-4 border-t border-gray-200 dark:border-gray-600">
              <div className="text-center mb-4">
                <div className="text-5xl text-blue-600 dark:text-blue-400 mb-3">
                  <FaUserCircle className="mx-auto" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Signed in as:
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100 break-all mb-4">
                  {email || "User"}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-center py-3 font-semibold text-lg text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-600 hover:text-white border border-red-600 rounded-md transition-all duration-200"
              >
                Sign out
              </button>
            </div>
          ) : (
            /* Mobile Login/Signup Buttons - Shown when not logged in */
            <div className="w-full p-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
              <NavLink
                to="/signup"
                className="block w-full text-center py-3 font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 transition-opacity duration-200"
                onClick={() => setOpen(false)}
              >
                Signup
              </NavLink>
              <NavLink
                to="/login"
                className="block w-full text-center py-3 font-semibold text-lg text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400 transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;