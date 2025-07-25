import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Newspaper,Smile,LineChart} from "lucide-react"

// Feature data
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

// Main component
const FeatureCards = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {features.map((f) => (
          <Link
            data-aos={f.aos}
            to={f.link}
            key={f.key}
            className="group relative flex-1 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-center border border-pink-100 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer overflow-hidden"
            onMouseEnter={() => setHovered(f.key)}
            onMouseLeave={() => setHovered(null)}
          >

            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0">
              <div className="card-border-animate" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center mb-4">
                {f.icon}

            <div className="flex flex-col items-center justify-center">
              <div className="mb-2">{f.icon}</div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 tracking-tight">
                {f.title}
              </h3>
              <p className="text-gray-600 mb-2">{f.desc}</p>
              <div className="transition-all duration-300 ease-in-out">
                {hovered === f.key ? f.animation : null}

              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 tracking-tight">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;

