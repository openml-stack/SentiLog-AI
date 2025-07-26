import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { themeColors } from "./themeColours";
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const [currentColors, setCurrentColors] = useState(themeColors[theme]);

  useEffect(() => {
    setCurrentColors(themeColors[theme]);
  }, [theme]);

  return (
    <footer
      data-aos="fade-up"
      className="backdrop-blur-xl py-10 mt-12 text-center text-sm relative transition-all"
      style={{
        backgroundColor: `var(--card-bg, ${currentColors["--card-bg"]})`,
        borderTop: `1px solid var(--border, ${currentColors["--border"]})`,
        color: `var(--body-text, ${currentColors["--body-text"]})`
      }}
    >
      <div className="flex justify-center items-center gap-2 mb-2">
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
            stroke="var(--link, #60a5fa)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2.5" fill="var(--link, #60a5fa)" />
        </svg>
        <span
          className="font-bold text-base tracking-tight"
          style={{ color: `var(--link, ${currentColors["--link"]})` }}
        >
          SentiLog AI
        </span>
        <span style={{ color: `var(--icon, ${currentColors["--icon"]})` }}>
          &copy; {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex justify-center gap-4 mb-2">
        <a
          href="https://github.com/IkkiOcean/SentiLog-AI"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <svg
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="inline-block transition-colors"
            style={{ color: `var(--icon, ${currentColors["--icon"]})` }}
          >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
          </svg>
        </a>
      </div>

      <div>
        Built with{" "}
        <span
          style={{
            color: `var(--gradient-to, ${currentColors["--gradient-to"]})`
          }}
        >
          ♥
        </span>{" "}
        for open source
      </div>
      <p>View our  <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-purple-600">
        Privacy Policy
      </Link>
      </p>
    </footer>
  );
};

export default Footer;
