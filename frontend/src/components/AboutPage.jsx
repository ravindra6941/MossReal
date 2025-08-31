import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Users, Target, Zap, Globe, Award, Mail, Linkedin, Twitter } from 'lucide-react';
import { mockAboutData } from '../data/mockAboutData';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName && !visibleSections.includes(sectionName)) {
              setVisibleSections(prev => [...prev, sectionName]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [visibleSections]);

  return (
    <div className="about-page">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">AIVO</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="/" className="btn-ghost">Home</a>
              <a href="/#features" className="btn-ghost">Features</a>
              <a href="/#pricing" className="btn-ghost">Pricing</a>
              <a href="/about" className="btn-ghost bg-[var(--accent-bg)] text-[var(--accent-primary)]">About</a>
              <a href="/" className="btn-primary">Get Started</a>
            </div>
            
            <div className="md:hidden">
              <button className="btn-ghost">Menu</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-20">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent-primary)] opacity-5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-primary)] opacity-3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="display-lg text-[var(--text-primary)] mb-6">
                {mockAboutData.hero.headline}
              </h1>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="body-lg max-w-3xl mx-auto mb-8">
                {mockAboutData.hero.description}
              </p>
            </div>

            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/#pricing" className="btn-primary">
                  Start Your Journey
                  <ArrowRight size={20} />
                </a>
                <a href="#team" className="btn-secondary">
                  Meet Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section data-section="mission" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-800 ${
              visibleSections.includes('mission') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="display-md text-[var(--text-primary)] mb-6">
                {mockAboutData.mission.title}
              </h2>
              <p className="body-lg mb-8">
                {mockAboutData.mission.description}
              </p>
              <div className="space-y-4">
                {mockAboutData.mission.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-[var(--bg-primary)] rounded-full"></div>
                    </div>
                    <p className="body-md text-[var(--text-secondary)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-800 delay-200 ${
              visibleSections.includes('mission') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <div className="bg-[var(--bg-primary)] rounded-2xl p-8 border border-[var(--border-subtle)]">
                <div className="grid grid-cols-2 gap-6">
                  {mockAboutData.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mx-auto mb-4">
                        {React.createElement(stat.icon === 'Users' ? Users : stat.icon === 'Target' ? Target : stat.icon === 'Zap' ? Zap : Globe, {
                          size: 24,
                          className: "text-[var(--accent-primary)]"
                        })}
                      </div>
                      <div className="h2 text-[var(--accent-primary)] mb-1">{stat.value}</div>
                      <div className="body-sm text-[var(--text-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-section="values" className="section-padding bg-[var(--bg-primary)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Our Core Values
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              The principles that guide everything we do at MossPilot
            </p>
          </div>

          <div className="card-grid-3">
            {mockAboutData.values.map((value, index) => (
              <div
                key={index}
                data-section="values"
                className={`feature-card transition-all duration-600 ${
                  visibleSections.includes('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center mb-6">
                  {React.createElement(value.icon === 'Zap' ? Zap : value.icon === 'Users' ? Users : value.icon === 'Target' ? Target : Award, {
                    size: 24,
                    className: "text-[var(--accent-primary)]"
                  })}
                </div>
                <h3 className="h3 text-[var(--text-primary)] mb-4">{value.title}</h3>
                <p className="body-md">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" data-section="team" className="section-padding bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Meet Our Team
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              The brilliant minds behind MossPilot's revolutionary AI visibility platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {mockAboutData.team.map((member, index) => (
              <div
                key={index}
                className={`feature-card text-center transition-all duration-600 ${
                  visibleSections.includes('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[var(--bg-primary)]">
                    {member.avatar}
                  </span>
                </div>
                
                <h3 className="h3 text-[var(--text-primary)] mb-2">{member.name}</h3>
                <p className="body-md text-[var(--accent-primary)] mb-4">{member.role}</p>
                <p className="body-sm text-[var(--text-secondary)] mb-6">{member.bio}</p>
                
                <div className="flex justify-center gap-3">
                  <a href={member.linkedin} className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200">
                    <Linkedin size={18} />
                  </a>
                  {/*<a href={member.twitter} className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200">
                    <Twitter size={18} /> 
                  </a>*/}
                  <a href={`mailto:${member.email}`} className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-section="cta" className="section-padding bg-[var(--bg-primary)]">
        <div className="container">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-800 ${
            visibleSections.includes('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Ready to Transform Your AI Visibility?
            </h2>
            <p className="body-lg mb-8">
              Join thousands of companies already optimizing for the future of search
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/#pricing" className="btn-primary glow-effect">
                Get Started Today
                <ArrowRight size={20} />
              </a>
              <a href="/#features" className="btn-secondary">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">AIVO</span>
            </div>
            
            <div className="flex gap-6">
              <a href="/" className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">Home</a>
              <a href="/about" className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">About</a>
              <a href="/#features" className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">Features</a>
              <a href="/#pricing" className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">Pricing</a>
            </div>
            
            <p className="body-sm text-[var(--text-muted)]">
              © 2025 MossPilot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;