import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const features = [
  {
    key: "news",
    title: "Analyze News",
    desc: "Identify bias (left, right, neutral) and sentiment (positive, negative) in news articles",
    link: "/news",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="5" y="8" width="30" height="24" rx="4" fill="#60a5fa" fillOpacity="0.15"/><rect x="9" y="12" width="22" height="4" rx="2" fill="#60a5fa"/><rect x="9" y="18" width="14" height="2.5" rx="1.25" fill="#a78bfa"/><rect x="9" y="22" width="10" height="2.5" rx="1.25" fill="#a78bfa"/></svg>
    ),
    animation: (
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full animate-pulse mt-2" />
    )
  },
  {
    key: "journal",
    title: "Log Your Mood",
    desc: "Journal your thoughts and detect mood",
    link: "/journal",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="10" width="24" height="20" rx="4" fill="#a78bfa" fillOpacity="0.15"/><rect x="12" y="14" width="16" height="12" rx="3" fill="#a78bfa"/><circle cx="20" cy="20" r="3" fill="#60a5fa"/><rect x="17" y="25" width="6" height="2" rx="1" fill="#60a5fa"/></svg>
    ),
    animation: (
      <div className="flex items-center justify-center mt-2">
        <span className="text-2xl animate-bounce">😊</span>
      </div>
    )
  },
  {
    key: "track",
    title: "Track & Compare",
    desc: "See how your mood and news trends align",
    link: "/dashboard",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="10" width="24" height="20" rx="4" fill="#60a5fa" fillOpacity="0.10"/><rect x="13" y="23" width="3" height="7" rx="1.5" fill="#a78bfa"/><rect x="18.5" y="18" width="3" height="12" rx="1.5" fill="#60a5fa"/><rect x="24" y="14" width="3" height="16" rx="1.5" fill="#a78bfa"/></svg>
    ),
    animation: (
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="mt-2">
        <polyline points="0,18 15,10 30,15 45,5 60,12" stroke="#a78bfa" strokeWidth="2" fill="none" className="animate-dash" />
        <circle cx="45" cy="5" r="3" fill="#60a5fa" className="animate-pulse" />
      </svg>
    )
  }
];

const FeatureCards = () => {
   const theme=useContext(ThemeContext)
  
  const [hovered, setHovered] = useState(null);
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-6 justify-center ">
        {features.map((f) => (
          <Link
            to={f.link}
            key={f.key}
            className={`${theme==='light'? 'bg-white/80 text-gray-600': 'bg-[#171736] text-slate-300 hover:text-slate-300'} 
              flex-1  backdrop-blur-lg rounded-2xl
              shadow-xl p-8 text-center border border-pink-100 
              hover:scale-105 hover:shadow-2xl transition-transform 
              cursor-pointer relative group overflow-hidden`}
            onMouseEnter={() => setHovered(f.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2">{f.icon}</div>
              <h3 className={`${theme==='light'? 'text-gray-900': 'text-sky-500'} 
              text-xl font-bold mb-1  tracking-tight`}>{f.title}</h3>
              <p className="mb-2">{f.desc}</p>
              <div className="transition-all duration-300 ease-in-out">
                {hovered === f.key ? f.animation : null}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 
            bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 
            group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;

// Add to global CSS for animated chart line:
// .animate-dash {
//   stroke-dasharray: 100;
//   stroke-dashoffset: 100;
//   animation: dashmove 1s linear forwards;
// }
// @keyframes dashmove {
//   to { stroke-dashoffset: 0; }
// } 
