import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JournalPage from './pages/JournalPage';
import NewsPage from './pages/NewsPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/journal' element={<JournalPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
