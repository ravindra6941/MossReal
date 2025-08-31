import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsletterSignup = ({ source = "footer", className = "" }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubscribed(true);
        setEmail('');
        console.log('Newsletter subscription successful:', result);
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);
      } else {
        throw new Error(result.detail || 'Failed to subscribe to newsletter');
      }
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError(err.message || 'Failed to subscribe. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg ${className}`}>
        <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
        <p className="body-sm text-green-400">Successfully subscribed to newsletter!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field pl-12 w-full"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[var(--bg-primary)] border-t-transparent rounded-full animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
      
      {error && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
          <p className="body-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;