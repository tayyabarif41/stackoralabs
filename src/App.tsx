import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ServicesStrip from './sections/ServicesStrip';
import About from './sections/About';
import Positioning from './sections/Positioning';
import Services from './sections/Services';
import Process from './sections/Process';
import Cases from './sections/Cases';
import WhyUs from './sections/WhyUs';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import CTABand from './sections/CTABand';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <LanguageProvider>
      <div ref={mainRef} className="relative">
        <CustomCursor />
        <AnimatedBackground />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <ServicesStrip />
          <About />
          <Positioning />
          <Services />
          <Process />
          <Cases />
          <WhyUs />
          <Testimonials />
          <Pricing />
          <Contact />
          <CTABand />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;