import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
  { to: "/news", label: "News" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
];

// const Logo = () => (
//   <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
//     <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block align-middle"><circle cx="16" cy="16" r="14" fill="#a78bfa" fillOpacity="0.18"/><path d="M16 8v8l6 3" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="16" r="2.5" fill="#60a5fa"/></svg>
//     SentiLog <span className="animate-pulse">AI</span>
//   </span>
// );

const Navbar = ({mode, setMode}) => {
  const [open, setOpen] = useState(false);

  const toggleMode=()=>{
    if (mode==='light'){
      setMode('dark')
    } else{
      setMode('light')
    }
  }
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-lg flex items-center justify-between px-4 py-3 md:px-10 border-b border-blue-100">
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
      <button className={`${mode==='light'? 'bg-indigo-950': 'bg-yellow-400'} 
      w-fit h-fit hidden md:flex`}
      onClick={toggleMode}>
        {mode==='light'?
        <MdDarkMode className="text-slate-300" size={'20px'}/>  :
        <CiLight className="text-black" size={'20px'}/> }
        </button>
        <div className="flex items-center gap-4">
          <button
        className={`${mode==='light'? '':'bg-blue-950 text-slate-300' } md:hidden text-xl focus:outline-none`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {open ? "✖️" : "☰"}
      </button>
      <button className={`${mode==='light'? 'bg-indigo-950': 'bg-yellow-400'} 
      flex md:hidden`}
      onClick={toggleMode}>
        {mode==='light'?
        <MdDarkMode className="text-slate-300" size={'30px'}/>  :
        <CiLight className="text-black" size={'30px'}/> }
        </button>
        </div>
      
      {open && (
        <div className={`${mode==='light'? 'bg-white/80 text-gray-700': 'bg-blue-950'} absolute top-full backdrop-blur right-0 min-w-60 shadow-lg flex flex-col items-center md:hidden animate-fade-in rounded-s-2xl border-b border-blue-100 z-50`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block w-full text-center py-4 font-semibold text-lg border-b border-blue-50 hover:text-blue-600 transition ${isActive ? "text-blue-600" : `${mode==='light'? 'text-gray-700':'text-slate-300'}`}`
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