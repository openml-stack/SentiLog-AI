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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; 
import Loader from "./components/Preloader/Loader";

import AOS from "aos";
import "aos/dist/aos.css";
import { ContactPage } from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";


function App() {

  // AOS Animations

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Customize options here
  }, []);

  return (
    <>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
