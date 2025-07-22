import React from "react";

const Footer = () => (
  <footer className="bg-white/70 backdrop-blur-xl border-t border-blue-100 py-8 mt-12 text-center text-gray-600 text-sm relative">
    <div className="flex justify-center items-center gap-2 mb-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="inline-block align-middle"><circle cx="16" cy="16" r="14" fill="#a78bfa" fillOpacity="0.18"/><path d="M16 8v8l6 3" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="16" cy="16" r="2.5" fill="#60a5fa"/></svg>
      <span className="font-bold text-blue-700 text-base tracking-tight">SentiLog AI</span>
      <span className="text-gray-400">&copy; {new Date().getFullYear()}</span>
    </div>
    <div className="flex justify-center gap-4 mb-2">
      <a href="https://github.com/IkkiOcean/SentiLog-AI" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline-block text-gray-700 hover:text-blue-500"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
      </a>
    </div>
    <div className="text-gray-400">Built with <span className="text-pink-500">♥</span> for open source</div>
  </footer>
);

export default Footer; 