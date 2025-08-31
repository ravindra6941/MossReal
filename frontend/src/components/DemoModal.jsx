import React, { useState } from 'react';
import { X, Building, Users, Phone, Mail, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    jobTitle: '',
    useCase: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`${API}/demo-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Demo request submitted successfully:', result);
        setIsSubmitted(true);
      } else {
        throw new Error(result.detail || 'Failed to submit demo request');
      }
    } catch (err) {
      console.error('Error submitting demo request:', err);
      setError(err.message || 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      companySize: '',
      jobTitle: '',
      useCase: ''
    });
    setIsSubmitted(false);
    setIsSubmitting(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--accent-bg)] transition-colors"
        >
          <X size={16} className="text-[var(--text-muted)]" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h2 className="h1 text-[var(--text-primary)] mb-3">
                Book Your AIVO Demo
              </h2>
              <p className="body-lg">
                Get a personalized walkthrough of how AIVO can transform your AI visibility
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                  <p className="body-sm text-red-400">{error}</p>
                </div>
              )}
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input-field pl-12"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field pl-12"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field pl-12"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Company Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input-field pl-12"
                      placeholder="Your Company"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block body-sm text-[var(--text-secondary)] mb-2">
                    Company Size *
                  </label>
                  <div className="relative">
                    <Users size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="input-field pl-12 appearance-none"
                      required
                    >
                      <option value="">Select size</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <div>
                <label className="block body-sm text-[var(--text-secondary)] mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Marketing Manager, SEO Director, etc."
                />
              </div>

              {/* Use Case */}
              <div>
                <label className="block body-sm text-[var(--text-secondary)] mb-2">
                  What's your main use case for AIVO?
                </label>
                <textarea
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  className="input-field resize-none h-24"
                  placeholder="Tell us about your AI visibility goals..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Book Demo
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="body-sm text-[var(--text-muted)] text-center">
                By submitting this form, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-[var(--bg-primary)]" />
            </div>
            
            <h2 className="h1 text-[var(--text-primary)] mb-4">
              Demo Booked Successfully!
            </h2>
            
            <p className="body-lg mb-6">
              Thank you for your interest in AIVO. Our team will reach out to you within 24 hours to schedule your personalized demo.
            </p>
            
            <div className="bg-[var(--bg-tertiary)] rounded-xl p-6 mb-8">
              <h3 className="h4 text-[var(--text-primary)] mb-3">What happens next?</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[var(--accent-primary)] mt-1 flex-shrink-0" />
                  <span className="body-sm text-[var(--text-secondary)]">
                    We'll send you a calendar invite within 24 hours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[var(--accent-primary)] mt-1 flex-shrink-0" />
                  <span className="body-sm text-[var(--text-secondary)]">
                    Our AI visibility expert will prepare a custom demo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[var(--accent-primary)] mt-1 flex-shrink-0" />
                  <span className="body-sm text-[var(--text-secondary)]">
                    Get actionable insights for your brand's AI presence
                  </span>
                </li>
              </ul>
            </div>
            
            <button onClick={handleClose} className="btn-primary">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;