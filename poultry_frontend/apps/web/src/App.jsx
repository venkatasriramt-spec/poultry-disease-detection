
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import AboutPage from './pages/AboutPage';
import PoultryInfoPage from './pages/PoultryInfoPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/predict" element={<PredictPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/poultry-info" element={<PoultryInfoPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" closeButton={true} richColors />
      </Router>
    </AuthProvider>
  );
}

export default App;
