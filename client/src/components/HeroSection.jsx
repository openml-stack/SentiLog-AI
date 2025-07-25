import React from "react";

const scrollToDemo = () => {
  const demo = document.getElementById("live-demo-section");
  if (demo) demo.scrollIntoView({ behavior: "smooth" });
};

const AnimatedBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full z-0"
    viewBox="0 0 1440 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <path
      fill="url(#hero-gradient)"
      fillOpacity="0.2"
      d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    />
    <circle cx="1200" cy="80" r="40" fill="#a78bfa" fillOpacity="0.15">
      <animate
        attributeName="cy"
        values="80;120;80"
        dur="4s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="300" cy="200" r="30" fill="#60a5fa" fillOpacity="0.12">
      <animate
        attributeName="cy"
        values="200;160;200"
        dur="5s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const HeroSection = () => (
  <section
    data-aos="fade-up"
    className="relative text-center py-24 md:py-32 overflow-hidden bg-gradient-to-r from-blue-50 to-pink-50"
  >
    <AnimatedBackground />
    <div className="relative z-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
        <span className="bg-gradient-to-r animate-spin from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-move">
          SentiLog{" "}
          <span className="relative inline-block px-2">
            <span className="text-white bg-gradient-to-r from-pink-500 to-blue-500 px-2 py-1 rounded shadow-lg animate-glitch">
              AI
            </span>
          </span>
        </span>
        <br />
        <span className="text-2xl md:text-3xl font-medium text-gray-700 mt-2 block">
          AI-powered sentiment insights for your world
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Experience real-time emotion and sentiment analysis. Discover patterns
        in news and your own mood, powered by advanced AI.
      </p>
      <button
        onClick={scrollToDemo}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        Try Live Demo
      </button>
    </div>
  </section>
);

export default HeroSection;

// Add the following to your global CSS for the gradient and glitch animation:
// .animate-gradient-move {
//   background-size: 200% 200%;
//   animation: gradientMove 4s ease-in-out infinite;
// }
// @keyframes gradientMove {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-glitch {
//   animation: glitch 1.2s infinite linear alternate-reverse;
// }
// @keyframes glitch {
//   0% { text-shadow: 2px 0 #a78bfa, -2px 0 #60a5fa; }
//   20% { text-shadow: -2px 0 #a78bfa, 2px 0 #60a5fa; }
//   40% { text-shadow: 2px 2px #a78bfa, -2px -2px #60a5fa; }
//   60% { text-shadow: -2px 2px #a78bfa, 2px -2px #60a5fa; }
//   80% { text-shadow: 0 2px #a78bfa, 0 -2px #60a5fa; }
//   100% { text-shadow: 2px 0 #a78bfa, -2px 0 #60a5fa; }
// }
