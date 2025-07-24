import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },    
  { to: '/journal', label: 'Journal' },
  { to: '/news', label: 'News' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
];

const Logo = () => (
  <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block align-middle">
      <circle cx="16" cy="16" r="14" fill="#a78bfa" fillOpacity="0.18" />
      <path d="M16 8v8l6 3" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="2.5" fill="#60a5fa" />
    </svg>
    SentiLog <span className="animate-pulse">AI</span>
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [registered, setRegistered] = useState(localStorage.getItem('registered') === '1');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRegistered(localStorage.getItem('registered') === '1');
  }, [location]);

  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('registered');
    setToken(null);
    setRegistered(false);
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-10 border-b border-blue-100 dark:bg-white/5 dark:backdrop-blur-md dark:border-b dark:border-white/10 backdrop-blur-xl shadow-lg ${
        isAuthPage ? 'bg-white' : 'bg-white/70'
      }`}
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>

      <div className="hidden md:flex items-center gap-8">
        {/* Main nav links including Dashboard visible always */}
        <div className="flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-semibold text-lg px-2 py-1 rounded transition relative group ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth buttons: show Signup/Login when logged out, Logout when logged in */}
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
            <button
              onClick={logout}
              className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu toggle button */}
      <button
        className="md:hidden text-2xl focus:outline-none px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? '✖️' : '☰'}
     <button
        className="md:hidden text-2xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none"
         onClick={() => setOpen(o => !o)}
         aria-label="Toggle menu"
        >
        {open ? "✖️" : "☰"}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl shadow-lg flex flex-col items-center md:hidden animate-fade-in border-b border-blue-100 z-50">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block w-full text-center py-4 font-semibold text-lg border-b border-blue-50 hover:text-blue-600 transition ${
                  isActive ? 'text-blue-600' : 'text-gray-700'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {!token && !registered && (
            <NavLink
              to="/signup"
              className="block w-full text-center py-4 font-semibold text-lg border-b border-blue-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded"
              onClick={() => setOpen(false)}
            >
              Signup
            </NavLink>
          )}

          {!token && registered && (
            <NavLink
              to="/login"
              className="block w-full text-center py-4 font-semibold text-lg border-b border-blue-50 hover:text-blue-600"
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
              className="block w-full text-center py-4 font-semibold text-lg border-b border-red-500 text-red-600 bg-red-50 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
