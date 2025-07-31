import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

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
     
    <img src="../../public/companylogo.png"></img>
     
    </svg>
        <img src="../../public/companylogo.png" style={{ width: "32px", height: "32px", borderRadius:8 }}
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

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered") === "1"
  );

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

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    setToken(null);
    setRegistered(false);
    navigate("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl shadow-lg flex items-center justify-between px-4 py-3 md:px-10 border-b transition-all duration-300"
      style={{
        backgroundColor: `var(--nav-bg, ${currentColors["--nav-bg"]})`,
        borderBottomColor: `var(--nav-border, ${currentColors["--nav-border"]})`,
      }}
    >
      <Logo theme={theme} currentColors={currentColors} />

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
            <>
              <NavLink
                to="/forgot-password"
                className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50 transition"
              >
                Reset Password
              </NavLink>
              <button
                onClick={logout}
                className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <button
        className="md:hidden text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
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
    </nav>
  );
};

export default Navbar;
