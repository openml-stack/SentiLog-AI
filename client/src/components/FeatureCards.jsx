import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';
import { Newspaper, Smile, LineChart } from "lucide-react";

const features = [
  {
    key: "news",
    title: "Analyze News",
    desc: "Identify bias (left, right, neutral) and sentiment (positive, negative) in news articles",
    link: "/news",
    icon: <Newspaper className="w-10 h-10 text-blue-500 transition-transform duration-300 group-hover:scale-110" />,
    aos: "fade-left",
  },
  {
    key: "journal",
    title: "Log Your Mood",
    desc: "Journal your thoughts and detect mood patterns over time",
    link: "/journal",
    icon: <Smile className="w-10 h-10 text-purple-500 transition-transform duration-300 group-hover:scale-110" />,
    aos: "fade-up",
  },
  {
    key: "track",
    title: "Track & Compare",
    desc: "See how your mood and news trends align with interactive charts",
    link: "/dashboard",
    icon: <LineChart className="w-10 h-10 text-pink-500 transition-transform duration-300 group-hover:scale-110" />,
    aos: "fade-right",
  },
];

const FeatureCards = () => {
  const [hovered, setHovered] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
        duration: 600,
        once: true,
      });
    });
  }, [theme]);

  return (
    <section
      key={theme}
      className={`w-full py-16 px-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-theme-dark' : 'bg-theme-light'
      }`}
      // style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Powerful AI Features
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover how our AI technology can help you understand sentiment and emotions
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              data-aos={feature.aos}
              to={feature.link}
              key={feature.key}
              className={`group relative backdrop-blur-sm rounded-3xl p-8 text-center border shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600'
                  : 'bg-white/80 border-gray-200/50 hover:border-gray-300'
              }`}
              onMouseEnter={() => setHovered(feature.key)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl font-bold mb-4 tracking-tight transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.desc}
                </p>
                
                {/* Action Indicator */}
                <div className="mt-6 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className={`text-sm font-medium mr-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    Explore
                  </span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Bottom Gradient Bar */}
              <div className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                feature.key === 'news' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                feature.key === 'journal' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                'bg-gradient-to-r from-pink-400 to-pink-600'
              }`}></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;