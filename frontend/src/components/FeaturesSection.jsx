import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, PenTool, Brain, Globe, Award, CheckCircle } from 'lucide-react';
import { mockData } from '../data/mockData';

const iconMap = {
  TrendingUp, Users, PenTool, Brain, Globe, Award
};

const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mockData.features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Powerful Features for AI Visibility
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Everything you need to dominate AI search results and stay ahead of the competition
          </p>
        </div>

        {/* Features Grid */}
        <div className="card-grid-3">
          {mockData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            const isVisible = visibleFeatures.includes(index);
            
            return (
              <div
                key={feature.id}
                className={`feature-card transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mb-6">
                  <IconComponent size={24} className="text-[var(--accent-primary)]" />
                </div>
                
                <h3 className="h3 text-[var(--text-primary)] mb-4">
                  {feature.title}
                </h3>
                
                <p className="body-md mb-6">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-[var(--accent-primary)] flex-shrink-0" />
                      <span className="body-sm text-[var(--text-secondary)]">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;