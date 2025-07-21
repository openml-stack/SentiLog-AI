import React, { useState } from "react";

const steps = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="5" y="8" width="30" height="24" rx="4" fill="#60a5fa" fillOpacity="0.13"/><rect x="9" y="12" width="22" height="4" rx="2" fill="#60a5fa"/><rect x="9" y="18" width="14" height="2.5" rx="1.25" fill="#a78bfa"/><rect x="9" y="22" width="10" height="2.5" rx="1.25" fill="#a78bfa"/></svg>
    ),
    title: "Analyze",
    desc: "Paste a news article → See how it feels"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="10" width="24" height="20" rx="4" fill="#a78bfa" fillOpacity="0.13"/><rect x="12" y="14" width="16" height="12" rx="3" fill="#a78bfa"/><circle cx="20" cy="20" r="3" fill="#60a5fa"/><rect x="17" y="25" width="6" height="2" rx="1" fill="#60a5fa"/></svg>
    ),
    title: "Journal",
    desc: "Write your journal entry → Reflect on your mood"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="10" width="24" height="20" rx="4" fill="#60a5fa" fillOpacity="0.10"/><rect x="13" y="23" width="3" height="7" rx="1.5" fill="#a78bfa"/><rect x="18.5" y="18" width="3" height="12" rx="1.5" fill="#60a5fa"/><rect x="24" y="14" width="3" height="16" rx="1.5" fill="#a78bfa"/></svg>
    ),
    title: "Track",
    desc: "Compare and track → Discover patterns over time"
  }
];

const HowItWorks = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">How It Works</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-pink-200 to-blue-200 opacity-60 z-0" style={{transform:'translateY(-50%)'}} />
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`flex-1 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center border border-pink-100 relative z-10 transition-all duration-300 ease-in-out group ${hovered === i ? 'scale-105 shadow-2xl border-blue-300' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{animation: `fadeInUp 0.7s cubic-bezier(.39,.575,.56,1) both`, animationDelay: `${i * 0.15}s`}}
          >
            <div className={`mx-auto mb-3 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-pink-100 ${hovered === i ? 'ring-4 ring-blue-300' : ''} transition-all duration-300`}>{s.icon}</div>
            <h3 className="text-lg font-bold mb-1 text-gray-900">{s.title}</h3>
            <p className="text-gray-600">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 w-6 h-1 bg-gradient-to-r from-blue-300 to-pink-300 opacity-80 z-20" style={{transform:'translateY(-50%)'}} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

// Add to global CSS for fade-in animation:
// @keyframes fadeInUp {
//   0% { opacity: 0; transform: translateY(30px); }
//   100% { opacity: 1; transform: translateY(0); }
// } 