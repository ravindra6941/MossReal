import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const Footer = ({ onDemoRequest }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Integrations', href: '#' },
      { name: 'API', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Status', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Security', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
      {/* Main CTA Section */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="container py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto space-y-10">
            <h2 className="display-md text-[var(--text-primary)] mb-4">
              Ready to own the future of SEO?
            </h2>
            <p className="body-lg mb-8">
              Join thousands of companies already optimizing for AI visibility
            </p>
            <button onClick={onDemoRequest} className="btn-primary glow-effect px-8 py-4 tect-lg rounded-lg flex items-center gap-2">
              Start with MossPilot Today
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 xl:col-span-2 flex flex-col space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--bg-primary)] font-bold text-lg">MP</span>
                
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">MossPilot</span>
            </div>
            
            <p className="body-md max-w-md mb-6">
              Transform your SEO strategy for the AI era. Get discovered where your customers are actually searching.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <h5 className="h4 text-[var(--text-primary)] mb-4">Stay Updated</h5>
              <NewsletterSignup source="footer" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--accent-primary)]" />
                <span className="body-sm text-[var(--text-secondary)]">team@mosspilot.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--accent-primary)]" />
                <span className="body-sm text-[var(--text-secondary)]">+91 8824920949</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--accent-primary)]" />
                <span className="body-sm text-[var(--text-secondary)]">Jodhpur, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="h4 text-[var(--text-primary)] mb-6">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="h4 text-[var(--text-primary)] mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="h4 text-[var(--text-primary)] mb-6">Resources</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div>
              <h5 className="h4 text-[var(--text-primary)] mb-4">Follow Us</h5>
              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-[var(--bg-tertiary)] rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all duration-200 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="body-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <p className="body-sm text-[var(--text-muted)]">
              © {currentYear} AIVO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;