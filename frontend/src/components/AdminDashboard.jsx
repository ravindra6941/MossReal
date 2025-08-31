import React, { useState, useEffect } from 'react';
import { Users, Mail, Calendar, Building, Phone, User, Eye, EyeOff } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [demoRequests, setDemoRequests] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('demos');
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [demosResponse, newsletterResponse] = await Promise.all([
        fetch(`${API}/demo-requests`),
        fetch(`${API}/newsletter`)
      ]);

      const demosData = await demosResponse.json();
      const newsletterData = await newsletterResponse.json();

      setDemoRequests(demosData.success ? demosData.data : []);
      setNewsletters(newsletterData.success ? newsletterData.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const maskEmail = (email) => {
    if (showEmails) return email;
    const [user, domain] = email.split('@');
    return `${user.substring(0, 2)}***@${domain}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="h1 text-[var(--text-primary)] mb-2">AIVO Admin Dashboard</h1>
          <p className="body-lg">Monitor demo requests and newsletter subscriptions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="feature-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center">
                <Users size={24} className="text-[var(--accent-primary)]" />
              </div>
              <span className="h2 text-[var(--text-primary)]">{demoRequests.length}</span>
            </div>
            <h3 className="h3 text-[var(--text-primary)] mb-2">Demo Requests</h3>
            <p className="body-sm text-[var(--text-muted)]">Total demo bookings</p>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center">
                <Mail size={24} className="text-[var(--accent-primary)]" />
              </div>
              <span className="h2 text-[var(--text-primary)]">{newsletters.length}</span>
            </div>
            <h3 className="h3 text-[var(--text-primary)] mb-2">Newsletter Subscribers</h3>
            <p className="body-sm text-[var(--text-muted)]">Active subscriptions</p>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[var(--accent-bg)] rounded-xl flex items-center justify-center">
                <Calendar size={24} className="text-[var(--accent-primary)]" />
              </div>
              <span className="h2 text-[var(--text-primary)]">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <h3 className="h3 text-[var(--text-primary)] mb-2">Today</h3>
            <p className="body-sm text-[var(--text-muted)]">Current date</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('demos')}
              className={`btn-ghost ${activeTab === 'demos' ? 'bg-[var(--accent-bg)] text-[var(--accent-primary)]' : ''}`}
            >
              Demo Requests ({demoRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`btn-ghost ${activeTab === 'newsletter' ? 'bg-[var(--accent-bg)] text-[var(--accent-primary)]' : ''}`}
            >
              Newsletter ({newsletters.length})
            </button>
          </div>
        </div>

        {/* Email visibility toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowEmails(!showEmails)}
            className="btn-ghost flex items-center gap-2"
          >
            {showEmails ? <EyeOff size={16} /> : <Eye size={16} />}
            {showEmails ? 'Hide' : 'Show'} Full Emails
          </button>
        </div>

        {/* Demo Requests Table */}
        {activeTab === 'demos' && (
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-subtle)]">
              <h2 className="h2 text-[var(--text-primary)]">Demo Requests</h2>
            </div>
            
            {demoRequests.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[var(--text-muted)]">No demo requests yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--bg-tertiary)]">
                    <tr>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Contact</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Company</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Use Case</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoRequests.map((request, index) => (
                      <tr key={index} className="border-t border-[var(--border-subtle)]">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-[var(--text-primary)]">
                              {request.firstName} {request.lastName}
                            </div>
                            <div className="body-sm text-[var(--text-muted)]">
                              {maskEmail(request.email)}
                            </div>
                            {request.phone && (
                              <div className="body-sm text-[var(--text-muted)]">{request.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-[var(--text-primary)]">{request.company}</div>
                            <div className="body-sm text-[var(--text-muted)]">{request.companySize}</div>
                            {request.jobTitle && (
                              <div className="body-sm text-[var(--text-muted)]">{request.jobTitle}</div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="body-sm text-[var(--text-secondary)] max-w-xs truncate">
                            {request.useCase || 'No use case provided'}
                          </div>
                        </td>
                        <td className="p-4 body-sm text-[var(--text-muted)]">
                          {formatDate(request.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Newsletter Subscribers Table */}
        {activeTab === 'newsletter' && (
          <div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-subtle)]">
              <h2 className="h2 text-[var(--text-primary)]">Newsletter Subscribers</h2>
            </div>
            
            {newsletters.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[var(--text-muted)]">No newsletter subscribers yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--bg-tertiary)]">
                    <tr>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Email</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Source</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Status</th>
                      <th className="text-left p-4 body-sm text-[var(--text-secondary)]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.map((subscriber, index) => (
                      <tr key={index} className="border-t border-[var(--border-subtle)]">
                        <td className="p-4 font-medium text-[var(--text-primary)]">
                          {maskEmail(subscriber.email)}
                        </td>
                        <td className="p-4 body-sm text-[var(--text-secondary)] capitalize">
                          {subscriber.source}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            subscriber.isActive 
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {subscriber.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-4 body-sm text-[var(--text-muted)]">
                          {formatDate(subscriber.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;