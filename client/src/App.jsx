import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Preloader/Loader";
import OAuthCallback from "./components/OAuthCallback";
import About from "./components/About";

import AnalyzePage from "./pages/AnalyzePage";
import { ContactPage } from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import NewsListingPage from "./pages/NewsListingPage";
import HomePage from "./pages/HomePage";
import JournalPage from "./pages/JournalPage";
import LoginPage from "./pages/LoginPage";
// import NewsPage from "./pages/NewsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ResetPassword from "./pages/ResetPassword";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./pages/UserProfile";
import HelpCenterPage from "./pages/HelpCenterPage";

function App() {
  // AOS Animations

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Customize options here
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/news-listing" element={<NewsListingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
