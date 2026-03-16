import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
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
import NotFound from './pages/NotFound';

function App() {
  const [loading, setLoading] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [loading]);

  return (
    <div className="relative">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <ScrollToTop />
      <CustomCursor />
      <AnimatedBackground />
      <Navigation />
      <main ref={pageRef} className="relative z-10" style={loading ? { opacity: 0 } : undefined}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/services"   element={<ServicesPage />} />
          <Route path="/work"       element={<WorkPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="/blog"       element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {!loading && <CookieConsent />}
    </div>
  );
}

export default App;
