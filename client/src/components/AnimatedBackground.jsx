import React from 'react';

const AnimatedBackground = ({ theme }) => (
  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
    {/* Solid background */}
    <div 
      className={`absolute inset-0 w-full h-full transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
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

export default AnimatedBackground;
