import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JournalPage from "./pages/JournalPage";
import NewsPage from "./pages/NewsPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AOS from "aos";
import "aos/dist/aos.css";

// Theme context
export const ThemeContext = createContext();

function App() {
  const [mode, setMode] = useState("light");

  // Get mode from localStorage
  useEffect(() => {
    const currentMode = localStorage.getItem("mode");
    if (currentMode) {
      setMode(currentMode);
      document.body.className = currentMode;
    }
  }, []);

  // AOS Animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <ThemeContext.Provider value={mode}>
      <div
        className={`${
          mode === "light"
            ? "bg-white text-black"
            : "bg-gradient-to-br from-[#111133] via-[#2a2a49] to-[#090949] text-slate-300"
        } min-h-screen flex flex-col`}
      >
        <Router>
          <Navbar mode={mode} setMode={setMode} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer mode={mode} setMode={setMode} />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;