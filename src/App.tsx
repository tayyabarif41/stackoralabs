import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <ScrollToTop />
      <CustomCursor />
      {/* <AnimatedBackground /> */}
      <Navigation />
      <main className="relative z-10">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/services"   element={<ServicesPage />} />
          <Route path="/work"       element={<WorkPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="/blog"       element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
      {!loading && <CookieConsent />}
    </div>
  );
}

export default App;
