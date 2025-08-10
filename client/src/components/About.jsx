import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
        });
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

            {/* Title */}
            <h2
                className={`relative z-10 text-5xl font-extrabold mb-8 text-center tracking-tight transition-colors duration-300 ${theme === "dark"
                        ? "text-gray-100 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient-move"
                        : "text-gray-900 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move"
                    }`}
                data-aos="fade-left"
            >
                About SentiLog AI
            </h2>

            {/* Intro paragraph */}
            <p
                className={`relative z-10 max-w-3xl text-center text-lg leading-relaxed mb-12 transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                data-aos="fade-right"
            >
                SentiLog AI is an open-source platform designed to empower users by combining advanced news sentiment analysis with personal mood journaling. Our modern tech stack includes React, Node.js/Express, and Python/Flask ML microservices, delivering real-time sentiment and emotion insights seamlessly.
            </p>

            {/* Features grid */}
            <div
                className="relative z-10 grid md:grid-cols-2 gap-12 max-w-5xl w-full"
                data-aos="fade-up"
            >
                {[
                    {
                        title: "📰 Real-Time News Bias Filter",
                        desc: `Automatically analyzes current news articles to detect political bias — Left, Right, or Neutral — helping you recognize media bias and form balanced opinions using state-of-the-art Natural Language Processing (NLP).`,
                        gradientLight: "from-blue-400 to-blue-600",
                        gradientDark: "from-purple-600 to-pink-500",
                    },
                    {
                        title: "📓 Daily Mood Journal",
                        desc: `Log your daily thoughts and moods to gain insights into your mental state over time. AI-powered analysis recognizes happiness, sadness, anxiety, and more, assisting in identifying patterns and external influences.`,
                        gradientLight: "from-pink-400 to-pink-600",
                        gradientDark: "from-purple-500 to-blue-600",
                    },
                ].map(({ title, desc, gradientLight, gradientDark }, i) => (
                    <div
                        key={i}
                        className={`p-6 rounded-3xl shadow-xl backdrop-blur-md border border-transparent transition-colors duration-300 cursor-default transform hover:scale-105 hover:border-pink-500 dark:hover:border-purple-500 ${theme === "dark"
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
                            className={`text-base leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Expanded content section */}
            <div
                className="relative z-10 max-w-4xl mt-20 space-y-8 text-center"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <h3
                    className={`text-3xl font-bold mb-4 transition-colors duration-300 ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                        }`}
                >
                    Transform your data into actionable insights
                </h3>
                <p
                    className={`text-lg leading-relaxed transition-colors duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Powered by advanced sentiment analysis and cutting-edge AI-driven analytics,
                    SentiLog AI helps you understand emotion trends in news and your personal mood
                    to gain a deeper awareness of the world and yourself.
                </p>
                <p
                    className={`text-sm italic transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    Built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose,
                    and state-of-the-art machine learning microservices using Python, Flask,
                    transformers, and vaderSentiment.
                </p>
            </div>

            {/* Navigation mock (no links, styled text) */}
            <nav
                className={`relative z-10 mt-24 flex flex-wrap justify-center gap-6 text-base font-semibold tracking-wide uppercase transition-colors duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                data-aos="fade-up"
                data-aos-delay="450"
            >
                {[
                    "Home",
                    "Analyze",
                    "Journal",
                    "News",
                    "Dashboard",
                    "About",
                    "Reset Password",
                    "User Profile",
                    "Login",
                    "Logout",
                ].map((item, i) => (
                    <span
                        key={i}
                        className="cursor-default hover:text-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-colors"
                    >
                        {item}
                    </span>
                ))}
            </nav>
        </section>
    );
};

export default About;
