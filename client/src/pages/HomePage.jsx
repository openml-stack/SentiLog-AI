import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import QuickActions from "../components/QuickActions";
import SentimentChartPreview from "../components/SentimentChartPreview";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const HomePage = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
    <main className="flex-1">
      <HeroSection />
      <FeatureCards />
      <QuickActions />
      <SentimentChartPreview />
      <HowItWorks />
    </main>
  </div>
);

export default HomePage;
