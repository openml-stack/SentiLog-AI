import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';
import { themeColors } from "./themeColours";

const features = [
  {
    key: "news",
    title: "Analyze News",
    desc: "Identify bias (left, right, neutral) and sentiment (positive, negative) in news articles",
    link: "/news",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="8" width="30" height="24" rx="4" fill="currentColor" fillOpacity="0.15" style={{ color: 'var(--button)' }}/>
        <rect x="9" y="12" width="22" height="4" rx="2" fill="currentColor" style={{ color: 'var(--button)' }}/>
        <rect x="9" y="18" width="14" height="2.5" rx="1.25" fill="currentColor" style={{ color: 'var(--link)' }}/>
        <rect x="9" y="22" width="10" height="2.5" rx="1.25" fill="currentColor" style={{ color: 'var(--link)' }}/>
      </svg>
    ),
    aos: "fade-left",
    animation: (
      <div 
        className="w-full h-2 rounded-full animate-pulse mt-2" 
        style={{ 
          background: `linear-gradient(to right, var(--button), var(--gradient-to))` 
        }}
      />
    )
  },
  {
    key: "journal",
    title: "Log Your Mood",
    desc: "Journal your thoughts and detect mood",
    link: "/journal",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="10" width="24" height="20" rx="4" fill="currentColor" fillOpacity="0.15" style={{ color: 'var(--link)' }}/>
        <rect x="12" y="14" width="16" height="12" rx="3" fill="currentColor" style={{ color: 'var(--link)' }}/>
        <circle cx="20" cy="20" r="3" fill="currentColor" style={{ color: 'var(--button)' }}/>
        <rect x="17" y="25" width="6" height="2" rx="1" fill="currentColor" style={{ color: 'var(--button)' }}/>
      </svg>
    ),
    animation: (
      <div className="flex items-center justify-center mt-2">
        <span className="text-2xl animate-bounce">😊</span>
      </div>
    ),
    aos: "fade-up",
  },
  {
    key: "track",
    title: "Track & Compare",
    desc: "See how your mood and news trends align",
    link: "/dashboard",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="10" width="24" height="20" rx="4" fill="currentColor" fillOpacity="0.10" style={{ color: 'var(--button)' }}/>
        <rect x="13" y="23" width="3" height="7" rx="1.5" fill="currentColor" style={{ color: 'var(--link)' }}/>
        <rect x="18.5" y="18" width="3" height="12" rx="1.5" fill="currentColor" style={{ color: 'var(--button)' }}/>
        <rect x="24" y="14" width="3" height="16" rx="1.5" fill="currentColor" style={{ color: 'var(--link)' }}/>
      </svg>
    ),
    animation: (
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="mt-2">
        <polyline 
          points="0,18 15,10 30,15 45,5 60,12" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          className="animate-dash" 
          style={{ color: 'var(--link)' }}
        />
        <circle 
          cx="45" 
          cy="5" 
          r="3" 
          fill="currentColor" 
          className="animate-pulse" 
          style={{ color: 'var(--button)' }}
        />
      </svg>
    ),
    aos: "fade-right",
  },
];

const FeatureCards = () => {
  const [hovered, setHovered] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState(themeColors[theme]);

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

  return (
    <section 
      className="max-w-7xl mx-auto px-4 py-12"
      style={{ 
        backgroundColor: `var(--bg, ${currentColors['--bg']})`,
        color: `var(--body-text, ${currentColors['--body-text']})`,
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {features.map((f) => (
          <Link
            data-aos={f.aos}
            to={f.link}
            key={f.key}
            className="flex-1 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center border hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer relative group overflow-hidden"
            onMouseEnter={() => setHovered(f.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              backgroundColor: `var(--card-bg, ${currentColors['--card-bg']})`,
              borderColor: `var(--border, ${currentColors['--border']})`,
              color: `var(--body-text, ${currentColors['--body-text']})`,
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2">{f.icon}</div>
              <h3 
                className="text-xl font-bold mb-1 tracking-tight" 
                style={{ 
                  color: `var(--heading, ${currentColors['--heading']})` 
                }}
              >
                {f.title}
              </h3>
              <p 
                className="mb-2" 
                style={{ 
                  color: `var(--body-text, ${currentColors['--body-text']})`, 
                  opacity: 0.8 
                }}
              >
                {f.desc}
              </p>
              <div className="transition-all duration-300 ease-in-out">
                {hovered === f.key ? f.animation : null}
              </div>
            </div>
            <div 
              className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" 
              style={{ 
                background: `linear-gradient(to right, var(--gradient-from, ${currentColors['--gradient-from']}), var(--gradient-to, ${currentColors['--gradient-to']}))` 
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
