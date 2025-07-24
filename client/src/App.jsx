
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JournalPage from "./pages/JournalPage";
import NewsPage from "./pages/NewsPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import Loader from "./components/Preloader/Loader";

import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  // AOS Animations

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Customize options here
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </Router>
      )}
    </>

  );
}

export default App;
