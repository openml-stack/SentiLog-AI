import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
        duration: 600,
        once: true,
      });
    });
  }, []);

  return (
    <footer
      data-aos="fade-up"
      className={`w-full py-10 mt-0 text-center text-sm relative transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-theme-dark border-gray-700' 
          : 'bg-theme-light border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-2 mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            className="inline-block align-middle"
          >
            <circle cx="16" cy="16" r="14" fill="#a78bfa" fillOpacity="0.18" />
            <path
              d="M16 8v8l6 3"
              stroke="#60a5fa"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="2.5" fill="#60a5fa" />
          </svg>
          <span className={`font-bold text-lg tracking-tight ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            SentiLog AI
          </span>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <a
            href="https://github.com/IkkiOcean/SentiLog-AI"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:scale-110 transition-all duration-300 ${
              theme === 'dark' 
                ? 'text-gray-400 hover:text-blue-400' 
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="inline-block"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>

        <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
          Built with{" "}
          <span className="text-pink-500">♥</span>{" "}
          for open source
        </div>
      </div>
    </footer>
  );
};

export default Footer;