import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import QuickActions from "../components/QuickActions";
import SentimentChartPreview from "../components/SentimentChartPreview";
import HowItWorks from "../components/HowItWorks";
import BacktoTopButton from "../components/BackToTop"

const HomePage = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
    <main className="flex-1">
      <HeroSection />
      <FeatureCards />
      <QuickActions />
      <SentimentChartPreview />
      <HowItWorks />
      <BacktoTopButton />
    </main>
  </div>
);

export default HomePage;
