import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import WorkflowSection from './WorkflowSection';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import Footer from './Footer';
import DemoModal from './DemoModal';

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoRequest = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-bold text-lg">MP</span>
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">MossPilot</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="btn-ghost">Features</a>
              <a href="#pricing" className="btn-ghost">Pricing</a>
              <a href="/about" className="btn-ghost">About</a>
              <button onClick={handleDemoRequest} className="btn-primary">
                Book Demo
              </button>
            </div>
            
            <div className="md:hidden">
              <button className="btn-ghost">Menu</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection onDemoRequest={handleDemoRequest} />
        <WorkflowSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection onDemoRequest={handleDemoRequest} />
        <Footer onDemoRequest={handleDemoRequest} />
      </main>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={handleCloseDemoModal} 
      />
    </div>
  );
};

export default LandingPage;