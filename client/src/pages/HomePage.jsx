import React, { useContext, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import QuickActions from "../components/QuickActions";
import SentimentChartPreview from "../components/SentimentChartPreview";
import HowItWorks from "../components/HowItWorks";
import { ThemeContext } from "../App";


const HomePage = () =>{
  const theme=useContext(ThemeContext)


  // tab title
  useEffect(()=>{
     document.title='SentiLogAI-Home'
  },[])


return (<div className={`${theme==='light'? 'bg-gradient-to-r from-blue-50 to-white':'bg-gradient-to-r from-[#171736] to-[#2d2d64]'} min-h-screen flex flex-col`}>
      <HeroSection />
      <FeatureCards />
      <QuickActions />
      <SentimentChartPreview />
      <HowItWorks />
  </div>
)
}
;

export default HomePage;
