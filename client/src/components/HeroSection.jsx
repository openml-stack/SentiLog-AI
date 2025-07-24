import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const scrollToDemo = () => {
  const demo = document.getElementById("live-demo-section");
  if (demo) demo.scrollIntoView({ behavior: "smooth" });
};

const AnimatedBackground = () => (
  <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--link, #60a5fa)" />
        <stop offset="100%" stopColor="var(--button, #a78bfa)" />
      </linearGradient>
    </defs>
    <path fill="url(#hero-gradient)" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
    <circle cx="1200" cy="80" r="40" fill="var(--button, #a78bfa)" fillOpacity="0.15">
      <animate attributeName="cy" values="80;120;80" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="300" cy="200" r="30" fill="var(--link, #60a5fa)" fillOpacity="0.12">
      <animate attributeName="cy" values="200;160;200" dur="5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);

  const [colors, setColors] = useState({});

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

  return (
    <section
      className="relative text-center py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: `var(--bg, ${colors.bg})`,
        color: `var(--body-text, ${colors.text})`,
      }}
    >
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          style={{ color: `var(--heading, ${colors.heading})` }}
        >
          <span
            className="bg-gradient-to-r bg-clip-text text-transparent animate-gradient-move"
            style={{
              backgroundImage: `linear-gradient(to right, var(--link, #60a5fa), var(--button, #a78bfa))`
            }}
          >
            SentiLog{" "}
            <span className="relative inline-block px-2">
              <span className="text-white bg-gradient-to-r from-pink-500 to-blue-500 px-2 py-1 rounded shadow-lg animate-glitch">
                AI
              </span>
            </span>
          </span>
          <br />
          <span
            className="text-2xl md:text-3xl font-medium mt-2 block"
            style={{ color: `var(--body-text, ${colors.text})` }}
          >
            AI-powered sentiment insights for your world
          </span>
        </h1>

        <p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: `var(--body-text, ${colors.text})` }}
        >
          Experience real-time emotion and sentiment analysis. Discover patterns
          in news and your own mood, powered by advanced AI.
        </p>

        <button
          onClick={scrollToDemo}
          className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4"
          style={{
            backgroundImage: `linear-gradient(to right, var(--link, #60a5fa), var(--button, #a78bfa))`
          }}
        >
          Try Live Demo
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
