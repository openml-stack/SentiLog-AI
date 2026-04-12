import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

const About = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        AOS.init({ duration: 600, once: true });
        AOS.refresh();
    }, [theme]);

    return (
        <section
            className={`relative py-20 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col items-center transition-colors duration-300 ${theme === "dark" ? "bg-theme-dark" : "bg-theme-light"
                }`}
            data-aos="fade-up"
        >
            {/* Background overlay */}
            <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                style={{
                    background:
                        theme === "dark"
                            ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"
                            : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    zIndex: 0,
                }}
            />

            {/* Overview */}
            <h2
                className={`relative z-10 text-5xl font-extrabold mb-8 text-center tracking-tight transition-colors duration-300 ${theme === "dark"
                    ? "text-gray-100 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-500 bg-clip-text text-transparent"
                    : "text-gray-900 bg-gradient-to-r from-sky-600 to-blue-700 dark:from-sky-700 dark:to-blue-800 bg-clip-text text-transparent"
                    }`}
                data-aos="fade-left"
            >
                About SentiLog AI
            </h2>
            <p
                className={`relative z-10 max-w-3xl text-center text-lg leading-relaxed mb-16 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                data-aos="fade-right"
            >
                SentiLog AI is an open-source platform that empowers individuals and organizations to
                understand sentiment and emotion trends from both global news and personal reflections.
                By combining AI-powered media analysis with personal mood tracking, it offers a unique
                perspective on world events and individual well-being.
            </p>

            {/* Vision */}
            <div
                className="relative z-10 max-w-4xl mb-16 text-center space-y-4"
                data-aos="fade-up"
                data-aos-delay="100"
            >
                <h3
                    className={`text-3xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    Our Vision
                </h3>
                <p
                    className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    To create a transparent AI tool that helps users identify media bias,
                    monitor emotional well-being, and make informed, unbiased decisions
                    in an increasingly fast-paced information ecosystem.
                </p>
            </div>

            {/* Key Features */}
            <div
                className="relative z-10 grid md:grid-cols-2 gap-12 max-w-5xl w-full mb-16"
                data-aos="fade-up"
            >
                {[
                    {
                        title: "📰 News Bias Filtering System",
                        desc: "Analyzes current news articles in real-time to detect political bias — Left, Right, or Neutral — enabling users to view multiple perspectives and make balanced judgments.",
                        gradientLight: "from-blue-400 to-blue-600",
                        gradientDark: "from-sky-600 to-blue-500",
                    },
                    {
                        title: "📓 Mood Journaling",
                        desc: "Track daily moods and emotions over time. AI-powered sentiment analysis uncovers patterns, emotional trends, and possible external influences.",
                        gradientLight: "from-blue-400 to-blue-600",
                        gradientDark: "from-sky-500 to-blue-600",
                    },
                ].map(({ title, desc, gradientLight, gradientDark }, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-3xl shadow-xl backdrop-blur-md border border-transparent transition-colors duration-300 hover:scale-105 ${theme === "dark"
                            ? "bg-gray-800/70 border-gray-700"
                            : "bg-white/80 border-gray-200"
                            }`}
                        data-aos="zoom-in"
                        data-aos-delay={i * 150}
                    >
                        <h3
                            className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${theme === "dark" ? gradientDark : gradientLight
                                }`}
                        >
                            {title}
                        </h3>
                        <p
                            className={`text-base ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Technology Stack */}
            <div
                className="relative z-10 max-w-4xl mb-16 text-center space-y-4"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <h3
                    className={`text-3xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    Technology Stack
                </h3>
                <p
                    className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    React, Vite, Tailwind CSS, Node.js, Express, MongoDB (Mongoose), and
                    AI/ML microservices built with Python, Flask, Transformers, and VADER Sentiment.
                </p>
            </div>

            {/* Future Scope */}
            <div
                className="relative z-10 max-w-4xl text-center space-y-4"
                data-aos="fade-up"
                data-aos-delay="450"
            >
                <h3
                    className={`text-3xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    Future Scope
                </h3>
                <p
                    className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Plans include multilingual sentiment models, deeper bias classification
                    across global political contexts, integration with more news sources,
                    and enhanced mood analytics with predictive insights.
                </p>
            </div>
        </section>
    );
};

export default About;
