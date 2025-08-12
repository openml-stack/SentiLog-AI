import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";
import { useUser } from '../context/UserContext';

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
    className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight select-none transition-all duration-300 flex-nowrap whitespace-nowrap"
    style={{
      background: `linear-gradient(to right, var(--gradient-from, ${currentColors['--gradient-from'] || '#6366f1'}), var(--gradient-to, ${currentColors['--gradient-to'] || '#d946ef'}))`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    <img
      src="/SentiLogAI.png"
      alt="Logo"
      className="flex-shrink-0"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "6px",
        objectFit: "cover",
        verticalAlign: "middle"
      }}
    />
    <span className="xs:hidden xs:inline ">SentiLog AI </span>
  </span>
);

const Navbar = () => {
  const { user, loading, setUser: setGlobalUser } = useUser();
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState({});
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    setToken(null);
    setRegistered(false);
    navigate("/");
  };

  const handleDeleteAccount = async () => {
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
      className="sticky top-0 z-50 backdrop-blur-xl shadow-lg flex items-center justify-between px-3 sm:px-4 py-3 md:px-10 border-b transition-all duration-300"
      style={{
        backgroundColor: `var(--nav-bg, ${currentColors["--nav-bg"]})`,
        borderBottomColor: `var(--nav-border, ${currentColors["--nav-border"]})`,
      }}
    >
      {/* Logo wrapped in Link*/}
      <NavLink to="/" className="flex items-center min-w-0 flex-shrink-0 mr-6" onClick={() => window.scrollTo(0, 0)}>
        <Logo theme={theme} currentColors={currentColors} />
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
              className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded hover:opacity-90 transition"
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
                className="flex items-center gap-2 px-3 py-2 border rounded border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-white font-bold uppercase shadow-md overflow-hidden flex-shrink-0">
                  {!loading && user?.profilephoto ? (
                    <img
                      src={user.profilephoto}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs">{user?.firstname?.[0]}</span>
                  )}
                </div>
                <span className="whitespace-nowrap">My Profile ▾</span>
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
        className="md:hidden text-2xl px-3 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none flex-shrink-0"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? "✖️" : "☰"}
      </button>

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

          {!token && !registered && (
            <NavLink
              to="/signup"
              className="w-full text-center py-4 font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded"
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