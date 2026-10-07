import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

import HomePage from './Pages/HomePage.jsx';
import Features from './Pages/Features.jsx';
import Enterprise from './Pages/Enterprise.jsx';
import About from './Pages/About.jsx';
import Pricing from './Pages/Pricing.jsx';
import NotFound from './Pages/NotFound.jsx';
import Authentication from './Pages/Authentication.jsx';
import HomeComponent from './Pages/home.jsx';
import History from './Pages/history.jsx';
import VideoMeetComponent from './Pages/videomeet.jsx';
import './App.css';

function App() {
  const location = useLocation();

  // Show Navbar and Footer only on standard pages, hiding them on video calls and auth
  const standardPages = ['/', '/about', '/features', '/pricing', '/enterprise', '/home', '/history'];
  const showNavAndFooter = standardPages.includes(location.pathname);

  return (
    <div className="appWrapper">
      {showNavAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/history" element={<History />} />
        <Route path="/:url" element={<VideoMeetComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
