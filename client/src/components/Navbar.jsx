import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
  { to: "/news", label: "News" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

const Logo = () => (
  <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block align-middle"><circle cx="16" cy="16" r="14" fill="#a78bfa" fillOpacity="0.18"/><path d="M16 8v8l6 3" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="16" r="2.5" fill="#60a5fa"/></svg>
    SentiLog <span className="animate-pulse">AI</span>
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-lg flex items-center justify-between px-4 py-3 md:px-10 border-b border-blue-100 dark:bg-white/5 dark:backdrop-blur-md dark:border-b dark:border-white/10">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="hidden md:flex gap-8">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `font-semibold text-lg px-2 py-1 rounded transition relative group ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            <span className="relative z-10">
              {link.label}
              <span className="absolute left-0 -bottom-1 w-full h-1 rounded bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 group-hover:opacity-80 transition-opacity duration-200 ${window.location.pathname === link.to ? 'opacity-100' : ''}"></span>
            </span>
          </NavLink>
        ))}
      </div>
     <button
        className="md:hidden text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
         onClick={() => setOpen(o => !o)}
         aria-label="Toggle menu"
        >
        {open ? "✖️" : "☰"}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white/80 backdrop-blur-xl shadow-lg flex flex-col items-center md:hidden animate-fade-in border-b border-blue-100 z-50">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block w-full text-center py-4 font-semibold text-lg border-b border-blue-50 hover:text-blue-600 transition ${isActive ? "text-blue-600" : "text-gray-700"}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 