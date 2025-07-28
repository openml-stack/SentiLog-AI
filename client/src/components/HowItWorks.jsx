import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  FileText,
  BookOpen,
  TrendingUp,
  Zap,
  Brain,
  BarChart3,
} from "lucide-react";

const StepCard = ({ icon: Icon, title, description, step, delay }) => {
  return (
    <div
      className={`relative group transition-all duration-700 transform translate-y-0 opacity-100`}
    >
      {/* Card Container */}
      <div
        className="relative p-8 rounded-2xl border-2 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border)",
          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.1)",
        }}
      >
        {/* Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

        {/* Icon Container */}
        <div className="flex justify-center mb-6">
          <div
            className="relative p-4 rounded-full transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, var(--gradient-from), var(--gradient-to))`,
              boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
            }}
          >
            <Icon size={32} className="text-white" />

            {/* Pulse Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3
            className="text-xl font-bold mb-3 tracking-tight"
            style={{ color: "var(--heading)" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--body-text)" }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext);

  const steps = [
    {
      icon: FileText,
      title: "Analyze",
      description:
        "Paste a news article or any text to see how it feels. Our AI instantly analyzes sentiment and emotional tone.",
      step: 1,
    },
    {
      icon: BookOpen,
      title: "Journal",
      description:
        "Write your journal entry and reflect on your mood. Track your emotional patterns over time.",
      step: 2,
    },
    {
      icon: TrendingUp,
      title: "Track",
      description:
        "Compare and track your emotions. Discover patterns and insights about your emotional well-being.",
      step: 3,
    },
  ];

  return (
    <section
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Zap className="mr-3 text-purple-500" size={28} />
            <h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: "var(--heading)" }}
            >
              How It{" "}
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--gradient-from), var(--gradient-to))`,
                }}
              >
                Works
              </span>
            </h2>
          </div>

          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--body-text)" }}
          >
            Experience the power of AI-driven sentiment analysis in three simple
            steps. From text analysis to mood tracking, discover insights about
            emotions effortlessly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <StepCard key={step.step} {...step} delay={index * 200} />
          ))}
        </div>
        {/* Bottom CTA Section */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 backdrop-blur-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              borderColor: "var(--border)",
              color: "var(--body-text)",
            }}
          >
            <Brain className="text-purple-500" size={20} />
            <span className="font-medium">
              Powered by advanced machine learning algorithms
            </span>
            <BarChart3 className="text-pink-500" size={20} />
          </div>
        </div>
      </div>
      {/* Decorative floating elements */}
      <div
        className="hidden md:block absolute top-20 left-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-bounce"
        style={{ animationDelay: "0s" }}
      />

      <div
        className="hidden md:block absolute bottom-20 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-25 animate-bounce"
        style={{ animationDelay: "2s" }}
      />
    </section>
  );
};

export default HowItWorks;