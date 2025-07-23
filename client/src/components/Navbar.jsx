import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

// Dashboard stays in navLinks, not in logged-in-only area
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/journal', label: 'Journal' },
  { to: '/news', label: 'News' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
];

const Logo = () => (
  <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
    {/* ...Logo SVG... */}
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
      className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-10 border-b border-blue-100 backdrop-blur-xl shadow-lg ${
        isAuthPage ? 'bg-white' : 'bg-white/70'
      }`}
    >
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="hidden md:flex items-center gap-8">
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

      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? '✖️' : '☰'}
      </button>
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
