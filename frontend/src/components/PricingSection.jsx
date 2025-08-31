import React, { useState, useEffect, useRef } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mockData';

const PricingSection = ({ onDemoRequest }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mockData.pricing.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
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
    <section id="pricing" ref={sectionRef} className="section-padding bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Choose the perfect plan to boost your AI visibility
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`body-md ${!isAnnual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-primary)]'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-300 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
            <span className={`body-md ${isAnnual ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              Annual
            </span>
            <span className="bg-[var(--accent-primary)] text-[var(--bg-primary)] px-2 py-1 rounded-md text-sm font-medium">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mockData.pricing.map((plan, index) => {
            const isVisible = visibleCards.includes(index);
            const price = isAnnual ? plan.annualPrice : plan.price;
            
            return (
              <div
                key={plan.id}
                className={`relative transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${plan.popular ? 'md:scale-105' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[var(--accent-primary)] text-[var(--bg-primary)] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`feature-card h-full flex flex-col ${
                  plan.popular ? 'border-[var(--accent-primary)] glow-effect' : ''
                }`}>
                  <div className="text-center mb-8">
                    <h3 className="h2 text-[var(--text-primary)] mb-2">{plan.name}</h3>
                    <p className="body-md mb-6">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="display-sm text-[var(--text-primary)]">${price}</span>
                      <span className="body-md text-[var(--text-muted)]">/month</span>
                    </div>
                    
                    {isAnnual && (
                      <p className="body-sm text-[var(--accent-primary)] mt-2">
                        ${plan.price * 12 - plan.annualPrice * 12} saved annually
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check size={20} className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                          <span className="body-md text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={plan.cta === 'Book Demo' ? onDemoRequest : undefined}
                    className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    {plan.cta}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="body-lg text-[var(--text-secondary)] mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <button onClick={onDemoRequest} className="btn-ghost">
            Contact Sales
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;