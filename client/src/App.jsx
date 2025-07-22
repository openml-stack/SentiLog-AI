import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JournalPage from "./pages/JournalPage";
import NewsPage from "./pages/NewsPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
