import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Clock, CheckCircle, ChevronRight, Download, Calendar, Loader2 } from 'lucide-react';
import api from '../services/api';

export const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await api.get('/applications');
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const latestDraft = applications.find(app => app.status === 'DRAFT');
  const progress = latestDraft ? (latestDraft.currentStep / 5) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div data-aos="fade-right">
          <h1 className="text-3xl font-bold text-secondary mb-2">Account Dashboard</h1>
          <p className="text-gray-500">Welcome back. Track your applications here.</p>
        </div>
        <Link to="/application" data-aos="fade-left" className="btn-primary flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus size={20} /> New Passport Application
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-gray-400 font-medium">Loading your applications...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Statistics */}
          <div className="lg:col-span-1 space-y-6">
            <div data-aos="fade-up" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Drafts</span>
                  <span className="font-bold text-secondary">{applications.filter(a => a.status === 'DRAFT').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Submitted</span>
                  <span className="font-bold text-secondary">{applications.filter(a => a.status === 'SUBMITTED').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Appointments</span>
                  <span className="font-bold text-secondary font-mono tracking-tighter">0 Pending</span>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="bg-gradient-to-br from-secondary to-gray-800 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-6">Our support team is available 24/7 to guide you through the process.</p>
              <a href="mailto:aman11202004@gmail.com" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Contact Support <ChevronRight size={18} />
              </a>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div data-aos="fade-up" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-secondary">Recent Applications</h2>
                <Link to="/" className="text-primary font-bold text-sm hover:underline">View All</Link>
              </div>

              {latestDraft ? (
                <div className="border border-gray-100 rounded-2xl p-6 transition-all border-l-4 border-l-primary hover:shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-lg">Fresh Passport Application</h4>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">DRAFT</span>
                      </div>
                      <p className="text-gray-500 text-sm">Application ID: <span className="font-mono">{latestDraft._id.slice(-8).toUpperCase()}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium">LAST EDITED</p>
                      <p className="text-sm font-bold text-gray-700">{new Date(latestDraft.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-secondary">Progress: {progress}%</span>
                      <span className="text-gray-400">Step {latestDraft.currentStep} of 5</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to="/application" className="btn-primary py-2 px-5 text-sm">Resume Application</Link>
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-2xl">
                   <p className="text-gray-400 font-medium mb-4">No drafts found. Let's start a new one!</p>
                   <Link to="/application" className="text-primary font-bold hover:underline underline-offset-4">Create Application</Link>
                </div>
              )}
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="bg-primary/5 border border-primary/20 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                <Calendar size={32} />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg font-bold text-secondary mb-1">Appointment Status</h3>
                <p className="text-gray-600 text-sm italic">You can book an appointment once your application is at least 80% complete.</p>
              </div>
              <button disabled={progress < 80} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${progress >= 80 ? 'bg-secondary text-white hover:bg-black active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                Book Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
