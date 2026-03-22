import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Printer, ArrowRight, Share2 } from 'lucide-react';

export const Confirmation = () => {
  const applicationId = "PR-8293-2026-XQ";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden" data-aos="zoom-in">
        <div className="bg-[#ACC8A2] p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                 <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40L40 0M-10 10L10 -10M30 50L50 30" stroke="white" strokeWidth="2" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
           </div>
           
           <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10 animate-scale-in">
              <CheckCircle2 size={48} className="text-primary" />
           </div>
           <h1 className="text-4xl font-black text-secondary mb-2 relative z-10">Application Submitted!</h1>
           <p className="text-secondary/70 font-medium relative z-10">Your passport application has been successfully recorded in our system.</p>
        </div>

        <div className="p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Application ID</p>
                 <h3 className="text-2xl font-mono font-bold text-secondary tracking-tighter">{applicationId}</h3>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Appointment Date</p>
                 <h3 className="text-xl font-bold text-secondary">April 12, 2026 • 10:30 AM</h3>
              </div>
           </div>

           <div className="space-y-4 mb-10">
              <h4 className="font-bold text-secondary mb-4">What's Next?</h4>
              {[
                { step: "1", text: "Download your application receipt and acknowledgment form." },
                { step: "2", text: "Visit your selected Passport Seva Kendra (PSK) Lucknow on the scheduled date." },
                { step: "3", text: "Carry original copies of all uploaded documents for physical verification." }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-xl transition-colors">
                   <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
           </div>

           <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
              <button className="flex-grow btn-primary flex items-center justify-center gap-2 py-4">
                 <Download size={20} /> Download PDF Receipt
              </button>
              <button className="sm:w-16 h-14 border-2 border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
                 <Printer size={20} />
              </button>
              <button className="sm:w-16 h-14 border-2 border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
                 <Share2 size={20} />
              </button>
           </div>

           <div className="mt-8 text-center">
              <Link to="/dashboard" className="text-gray-400 font-bold hover:text-secondary flex items-center justify-center gap-2 group">
                 Back to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};
