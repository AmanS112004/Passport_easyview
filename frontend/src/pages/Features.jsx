import React from 'react';
import { Shield, Zap, Clock, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Features = () => {
  const features = [
    {
      title: "Secure & Encrypted",
      desc: "Your personal data is protected with military-grade encryption.",
      icon: <Shield className="text-primary" size={32} />
    },
    {
      title: "Real-time Autosave",
      desc: "Never lose your progress. We save your application as you type.",
      icon: < Zap className="text-primary" size={32} />
    },
    {
      title: "Smart Document Verifier",
      desc: "Instant feedback on your uploaded documents to ensure high acceptance.",
      icon: <Globe className="text-primary" size={32} />
    },
    {
      title: "Priority Scheduling",
      desc: "Book your PSK slots directly through our integrated calendar.",
      icon: <Clock className="text-primary" size={32} />
    }
  ];

  return (
    <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4">Powerful Features</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto italic">Simplifying your passport journey with state-of-the-art technology and intuitive design.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {features.map((f, i) => (
          <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden" data-aos="zoom-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to experience the difference?</h2>
        <Link to="/signup" className="btn-primary inline-flex items-center gap-2 py-4 px-10 relative z-10">
          Get Started Now <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Features;
