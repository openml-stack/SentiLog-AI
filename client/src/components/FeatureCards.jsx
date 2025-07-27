import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';
import { themeColors } from "./themeColours";
import {Newspaper,Smile,LineChart} from "lucide-react"

const features = [
  {
    key: "news",
    title: "Analyze News",
    desc: "Identify bias (left, right, neutral) and sentiment (positive, negative) in news articles",
    link: "/news",

    icon: <Newspaper className="w-10 h-10 text-blue-400 transition-transform duration-300 group-hover:animate-bounce" />,

    aos: "fade-left",

  },
  {
    key: "journal",
    title: "Log Your Mood",
    desc: "Journal your thoughts and detect mood",
    link: "/journal",

    icon: <Smile className="w-10 h-10 text-blue-500 transition-transform duration-300 group-hover:animate-bounce"/>,

    aos: "fade-up",

  },
  {
    key: "track",
    title: "Track & Compare",
    desc: "See how your mood and news trends align",
    link: "/dashboard",


    icon: <LineChart className="w-10 h-10 text-blue-500 transition-transform duration-300 group-hover:animate-bounce"/>,

    aos: "fade-right",
  },

];

const FeatureCards = () => {
   const theme=useContext(ThemeContext)
  
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
            className={`${theme==='light'? 'bg-white/80 text-gray-600': 'bg-[#171736] text-slate-300 hover:text-slate-300'} 
              flex-1  backdrop-blur-lg rounded-2xl
              shadow-xl p-8 text-center border border-pink-100 
              hover:scale-105 hover:shadow-2xl transition-transform 
              cursor-pointer relative group overflow-hidden`}

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
                className={`text-xl font-bold mb-1 tracking-tight ${theme==='light'? 'text-gray-900': 'text-sky-500'}}
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
