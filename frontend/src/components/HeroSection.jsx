import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { mockData } from '../data/mockData';

const HeroSection = ({ onDemoRequest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { label: 'Prompts Analyzed', value: mockData.stats.prompts, icon: Sparkles },
    { label: 'Companies Trust Us', value: mockData.stats.companies, icon: TrendingUp },
    { label: 'AI Platforms', value: mockData.stats.platforms, icon: Zap },
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate stats every 3 seconds
    const statInterval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(statInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent-primary)] opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-primary)] opacity-3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="display-lg text-[var(--text-primary)] mb-6">
              {mockData.hero.headline}
            </h1>
          </div>

          {/* Subheadline */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="body-lg max-w-2xl mx-auto mb-12">
              {mockData.hero.subheadline}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="btn-primary glow-effect">
              {mockData.hero.primaryCTA}
              <ArrowRight size={20} />
            </button>
            <button onClick={onDemoRequest} className="btn-secondary">
              {mockData.hero.secondaryCTA}
            </button>
          </div>

          {/* Animated Stats */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-[var(--bg-secondary)]/50 backdrop-blur-md border border-[var(--border-subtle)] rounded-2xl p-8 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-full flex items-center justify-center flex-shrunk-0">
                  {React.createElement(stats[currentStat].icon, { 
                    size: 28, 
                    className: "text-[var(--accent-primary)]" 
                  })}
                </div>
                <div className="text-left">
                  <div className="h2 text-[var(--accent-primary)]">
                    {stats[currentStat].value}
                  </div>
                  <div className="body-sm text-[var(--text-muted)]">
                    {stats[currentStat].label}
                  </div>
                </div>
              </div>
              
              {/* Stat Indicators */}
              <div className="flex justify-center gap-8">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStat 
                        ? 'bg-[var(--accent-primary)]' 
                        : 'bg-[var(--border-primary)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          {/*
          <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col items-center gap-3">
              <span className="body-sm text-[var(--text-muted)] mb-1 tracking-wide">Scroll to explore</span>
              <div className="w-7 h-12 border-2 border-[var(--border-primary)] rounded-full flex justify-center ">
                <div className="w-1.5 h-4 bg-[var(--accent-primary)] rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>*/}
        </div>
      </div>

      {/* Hero Visual Placeholder */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <div className="w-96 h-96 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-3xl border border-[var(--border-subtle)] p-8 shadow-2xl">
          <div className="h-full bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-subtle)] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-[var(--bg-primary)]" />
              </div>
              <div className="h4 text-[var(--text-primary)] mb-2">AI Dashboard</div>
              <div className="body-sm text-[var(--text-muted)]">Real-time AI visibility tracking</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;