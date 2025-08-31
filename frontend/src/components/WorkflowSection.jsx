import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, Shield, Zap, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const iconMap = {
  Search, Eye, Shield, Zap
};

const WorkflowSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animatez̄ steps one by one
            mockData.workflow.steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            {mockData.workflow.title}
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            {mockData.workflow.subtitle}
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockData.workflow.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              const isVisible = visibleSteps.includes(index);
              
              return (
                <div
                  key={step.id}
                  className={`relative transition-all duration-600 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Step Number */}
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-[var(--accent-primary)] text-[var(--bg-primary)] rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      {step.id}
                    </div>
                    <div className="h-px bg-[var(--border-primary)] flex-1"></div>
                  </div>

                  {/* Step Card */}
                  <div className="feature-card hover-lift">
                    <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mb-4">
                      <IconComponent size={24} className="text-[var(--accent-primary)]" />
                    </div>
                    
                    <h3 className="h3 text-[var(--text-primary)] mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="body-md mb-4">
                      {step.description}
                    </p>
                    
                    <div className="bg-[var(--bg-tertiary)] rounded-lg p-3">
                      <p className="body-sm text-[var(--accent-primary)] font-medium">
                        {step.stats}
                      </p>
                    </div>
                  </div>

                  {/* Connection Line (hidden on last item) */}
                  {index < mockData.workflow.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[var(--border-primary)]">
                      <ArrowRight 
                        size={16} 
                        className="text-[var(--text-muted)] absolute -top-2 -right-2" 
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-5">
          <button className="btn-primary">
            See How AIVO Works
            <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;