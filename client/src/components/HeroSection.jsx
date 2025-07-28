import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const scrollToDemo = () => {
  const demo = document.getElementById("live-demo-section");
  if (demo) demo.scrollIntoView({ behavior: "smooth" });
};

const AnimatedBackground = ({ theme }) => (
  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
    {/* Solid background */}
    <div 
      className={`absolute inset-0 w-full h-full transition-colors duration-300 ${
        theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
      }`}
      // style={{ backgroundColor: "var(--bg)" }}
    />
    
    {/* Animated wave pattern */}
    <svg
      className="absolute top-0 left-0 w-full h-full z-10"
      viewBox="0 0 1440 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'} />
          <stop offset="100%" stopColor={theme === 'dark' ? '#a78bfa' : '#8b5cf6'} />
        </linearGradient>
      </defs>
      <path
        fill="url(#hero-gradient)"
        fillOpacity="0.15"
        d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
    </svg>
    
    {/* Floating animated circles */}
    <div 
      className={`absolute w-40 h-40 rounded-full opacity-20 animate-pulse ${
        theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
      }`}
      style={{
        top: '15%',
        right: '10%',
        animation: 'float 6s ease-in-out infinite'
      }}
    />
    <div 
      className={`absolute w-32 h-32 rounded-full opacity-15 animate-bounce ${
        theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'
      }`}
      style={{
        top: '60%',
        left: '8%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}
    />
    <div 
      className={`absolute w-24 h-24 rounded-full opacity-25 animate-pulse ${
        theme === 'dark' ? 'bg-pink-500' : 'bg-pink-400'
      }`}
      style={{
        bottom: '20%',
        right: '15%',
        animation: 'float 5s ease-in-out infinite'
      }}
    />
    
    <style jsx>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-20px) scale(1.05); }
      }
    `}</style>
  </div>
);

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);
  const [colors, setColors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const getVar = (name) =>
      getComputedStyle(root).getPropertyValue(name).trim();

    setColors({
      bg: getVar("--bg"),
      heading: getVar("--heading"),
      text: getVar("--body-text"),
      link: getVar("--link"),
      button: getVar("--button"),
      buttonHover: getVar("--button-hover"),
      gradientFrom: getVar("--gradient-from"),
      gradientTo: getVar("--gradient-to"),
    });
  }, [theme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className={`relative text-center py-16 md:py-20 overflow-hidden h-[80vh] flex items-center justify-center ${
        theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
      }`}>
        <div className="animate-pulse text-gray-500">Loading...</div>
      </section>
    );
  }

  return (
    <section
      className={`relative text-center py-16 md:py-20 overflow-hidden h-[80vh] flex items-center justify-center transition-colors duration-300 ${
        theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
      }`}
      // style={{ backgroundColor: "var(--bg)" }}
    >
      <AnimatedBackground theme={theme} />
      <div className="relative z-20 flex flex-col items-center justify-center px-4">
        <h1
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move bg-300%">
            SentiLog{" "}
            <span className="relative inline-block px-2">
              <span className="text-white bg-gradient-to-r from-pink-500 to-blue-500 px-2 py-1 rounded shadow-lg">
                AI
              </span>
            </span>
          </span>
          <br />
          <span
            className={`text-xl md:text-2xl lg:text-3xl font-medium mt-2 block transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            AI-powered sentiment insights for your world
          </span>
        </h1>

        <p
          className={`text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Experience real-time emotion and sentiment analysis. Discover patterns
          in news and your own mood, powered by advanced AI.
        </p>

        <button
          onClick={scrollToDemo}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Try Live Demo
        </button>
      </div>
    </section>
  );
};

export default HeroSection;