import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { mockData } from '../data/mockData';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % mockData.testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--bg-primary)]">
      <div className="container">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="display-md text-[var(--text-primary)] mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            See how companies are transforming their visibility in the AI era
          </p>
        </div>

        {/* Testimonials Carousel */}
         <div className={`max-w-4xl mx-auto transition-all duration-800 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative">
            {/* Main Testimonial */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <Quote size={48} className="text-[var(--accent-primary)] opacity-20 absolute top-8 right-8" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(mockData.testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-[var(--accent-primary)] fill-current" />
                  ))}
                </div>
                
                <blockquote className="h2 text-[var(--text-primary)] mb-8 leading-relaxed">
                  "{mockData.testimonials[activeTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center">
                    <span className="text-[var(--bg-primary)] font-bold">
                      {mockData.testimonials[activeTestimonial].avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text-primary)]">
                      {mockData.testimonials[activeTestimonial].author}
                    </div>
                    <div className="body-sm text-[var(--text-muted)]">
                      {mockData.testimonials[activeTestimonial].title}  {mockData.testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {mockData.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-[var(--accent-primary)]' 
                      : 'bg-[var(--border-primary)] hover:bg-[var(--accent-primary)]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Company Logos Placeholder */}
        <div className={`mt-16 transition-all duration-800 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
            {/*
          <p className="text-center body-sm text-[var(--text-muted)] mb-8">
            Trusted by 5+ companies worldwide
          </p>
          
          <div className="flex justify-center items-center gap-8 opacity-50">
            {['TechFlow', 'GrowthLab', 'DataScale', 'InnovateCorp', 'ScaleUp'].map((company, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] rounded-lg px-6 py-3 border border-[var(--border-subtle)]">
                <span className="body-sm text-[var(--text-secondary)] font-medium">{company}</span>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;