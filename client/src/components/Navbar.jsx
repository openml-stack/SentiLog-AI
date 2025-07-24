import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from "./ThemeToggle";

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
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="inline-block align-middle">
      <circle 
        cx="16" 
        cy="16" 
        r="14" 
        fill={theme === 'dark' ? '#8b5cf6' : '#a78bfa'} 
        fillOpacity="0.18"
      />
      <path 
        d="M16 8v8l6 3" 
        stroke={theme === 'dark' ? '#93c5fd' : '#60a5fa'} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="16" 
        cy="16" 
        r="2.5" 
        fill={theme === 'dark' ? '#93c5fd' : '#60a5fa'}
      />
    </svg>
    SentiLog <span className="animate-pulse">AI</span>
  </span>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  // Theme implementation
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState({});

  //A little changed colours for navbar
  const themeColors = {
    light: {
      '--bg': '#ffffff',
      '--card-bg': '#f9fafb',
      '--border': '#e5e7eb',
      '--heading': '#111827',
      '--body-text': '#374151',
      '--button': '#6366f1',
      '--button-hover': '#4f46e5',
      '--gradient-from': '#6366f1',
      '--gradient-to': '#d946ef',
      '--input-bg': '#ffffff',
      '--input-border': '#d1d5db',
      '--icon': '#6b7280',
      '--link': '#3b82f6',
      '--link-hover': '#1d4ed8',
      '--nav-bg': 'rgba(255, 255, 255, 0.7)',
      '--nav-border': '#dbeafe',
      '--nav-text': '#374151',
      '--nav-text-active': '#2563eb',
      '--nav-text-hover': '#3b82f6',
    },
    dark: {
      '--bg': '#0b1120',
      '--card-bg': '#111827',
      '--border': '#1f2937',
      '--heading': '#f3f4f6',
      '--body-text': '#d1d5db',
      '--button': '#6366f1',
      '--button-hover': '#4f46e5',
      '--gradient-from': '#6366f1',
      '--gradient-to': '#d946ef',
      '--input-bg': '#1a2332',
      '--input-border': '#334155',
      '--icon': '#94a3b8',
      '--link': '#60a5fa',
      '--link-hover': '#3b82f6',
      '--nav-bg': 'rgba(17, 24, 39, 0.8)',
      '--nav-border': '#374151',
      '--nav-text': '#d1d5db',
      '--nav-text-active': '#60a5fa',
      '--nav-text-hover': '#93c5fd',
    }
  };

  // Force CSS variable updates via JavaScript
  const updateCSSVariables = (themeType) => {
    const root = document.documentElement;
    const colors = themeColors[themeType];
    
    Object.entries(colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    console.log('🔧 Navbar: Updated CSS variables for theme:', themeType);
  };

  useEffect(() => {
    console.log('Navbar: Theme changed to:', theme);
    
    // Update our local state
    setCurrentColors(themeColors[theme]);
    
    // Force update CSS variables manually
    updateCSSVariables(theme);
  }, [theme]);

  return (
    <nav 
      className="sticky top-0 z-50 backdrop-blur-xl shadow-lg flex items-center justify-between px-4 py-3 md:px-10 border-b transition-all duration-300"
      style={{
        backgroundColor: `var(--nav-bg, ${currentColors['--nav-bg'] || 'rgba(255, 255, 255, 0.7)'})`,
        borderBottomColor: `var(--nav-border, ${currentColors['--nav-border'] || '#dbeafe'})`
      }}
    >
      <div className="flex items-center gap-2">
        <Logo theme={theme} currentColors={currentColors} />
      </div>
      
      
      
      <div className="hidden md:flex gap-8">
        
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className="font-semibold text-lg px-2 py-1 rounded transition-all duration-200 relative group"
            style={({ isActive }) => ({
              color: isActive 
                ? `var(--nav-text-active, ${currentColors['--nav-text-active'] || '#2563eb'})`
                : `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`
            })}
            onMouseEnter={(e) => {
              if (!e.target.matches('.active')) {
                e.target.style.color = `var(--nav-text-hover, ${currentColors['--nav-text-hover'] || '#3b82f6'})`;
              }
            }}
            onMouseLeave={(e) => {
              const isActive = window.location.pathname === link.to;
              if (!isActive) {
                e.target.style.color = `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`;
              }
            }}
          >
            <span className="relative z-10">
              {link.label}
              <span 
                className="absolute left-0 -bottom-1 w-full h-1 rounded transition-opacity duration-200"
                style={{
                  background: `linear-gradient(to right, var(--gradient-from, ${currentColors['--gradient-from'] || '#6366f1'}), var(--gradient-to, ${currentColors['--gradient-to'] || '#d946ef'}))`,
                  opacity: window.location.pathname === link.to ? 1 : 0
                }}
                onMouseEnter={(e) => {
                  if (window.location.pathname !== link.to) {
                    e.target.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.location.pathname !== link.to) {
                    e.target.style.opacity = '0';
                  }
                }}
              ></span>
            </span>
          </NavLink>
        ))}
        <ThemeToggle />
      </div>
      
      <button
        className="md:hidden text-2xl focus:outline-none transition-colors duration-200"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        style={{
          color: `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`
        }}
        onMouseEnter={(e) => {
          e.target.style.color = `var(--nav-text-hover, ${currentColors['--nav-text-hover'] || '#3b82f6'})`;
        }}
        onMouseLeave={(e) => {
          e.target.style.color = `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`;
        }}
      >
        {open ? "✖️" : "☰"}
      </button>
      
      {open && (
        <div 
          className="absolute top-full left-0 w-full backdrop-blur-xl shadow-lg flex flex-col items-center md:hidden animate-fade-in border-b z-50 transition-all duration-300"
          style={{
            backgroundColor: `var(--nav-bg, ${currentColors['--nav-bg'] || 'rgba(255, 255, 255, 0.8)'})`,
            borderBottomColor: `var(--nav-border, ${currentColors['--nav-border'] || '#dbeafe'})`
          }}
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="block w-full text-center py-4 font-semibold text-lg border-b transition-all duration-200"
              style={({ isActive }) => ({
                color: isActive 
                  ? `var(--nav-text-active, ${currentColors['--nav-text-active'] || '#2563eb'})`
                  : `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`,
                borderBottomColor: `var(--nav-border, ${currentColors['--nav-border'] || '#dbeafe'})`
              })}
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => {
                if (!e.target.matches('.active')) {
                  e.target.style.color = `var(--nav-text-hover, ${currentColors['--nav-text-hover'] || '#3b82f6'})`;
                }
              }}
              onMouseLeave={(e) => {
                const isActive = window.location.pathname === link.to;
                if (!isActive) {
                  e.target.style.color = `var(--nav-text, ${currentColors['--nav-text'] || '#374151'})`;
                }
              }}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="w-full flex items-center justify-center p-4">
      <ThemeToggle /></div>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;