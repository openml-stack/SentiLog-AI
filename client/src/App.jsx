import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JournalPage from "./pages/JournalPage";
import NewsPage from "./pages/NewsPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Preloader/Loader";

import AOS from "aos";
import "aos/dist/aos.css";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {

  // AOS Animations

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Customize options here
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
