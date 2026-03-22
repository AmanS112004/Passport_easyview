import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, FileCheck, CheckCircle2, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-8 overflow-hidden bg-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-[#ACC8A2] opacity-5 rounded-bl-[100px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-5 rounded-tr-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-secondary font-bold text-sm mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted by 2M+ Citizens
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-secondary leading-tight mb-6">
              Passport Application <br />
              <span className="text-primary italic">Redefined.</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Experience a seamless, intuitive, and modern way to apply for your passport. No more confusing forms or long queues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={user ? "/dashboard" : "/signup"} className="btn-primary py-4 px-10 text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                {user ? "Continue to Dashboard" : "Apply Now"} <ArrowRight size={20} />
              </Link>
              <Link to={user ? "/dashboard" : "/login"} className="py-4 px-10 border-2 border-secondary/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                Check Status
              </Link>
            </div>
          </div>

          <div className="relative mt-20 lg:mt-0 flex justify-center" data-aos="fade-up">
            {/* Animated Passport Card - Scaled for Mobile */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-[280px] sm:w-[320px] lg:w-[400px] h-[400px] sm:h-[480px] lg:h-[560px] bg-secondary rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden p-6 lg:p-8 border border-white/10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Shield size={32} className="text-secondary" />
                </div>
                <div className="text-right text-white/40 font-mono text-xs uppercase tracking-[0.3em]">
                  Republic of India <br />
                  Digital Passport
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-center">
                   <div className="w-24 h-32 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-white/20">
                     <User size={48} />
                   </div>
                   <div className="space-y-3 flex-grow">
                      <div className="h-4 w-3/4 bg-white/10 rounded" />
                      <div className="h-4 w-1/2 bg-white/10 rounded" />
                      <div className="h-4 w-5/6 bg-white/10 rounded" />
                   </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex justify-between items-center">
                        <div className="h-2 w-24 bg-white/5 rounded" />
                        <div className="h-2 w-16 bg-primary/20 rounded" />
                     </div>
                   ))}
                </div>

                <div className="pt-12 flex justify-center">
                   <div className="w-48 h-48 bg-white/5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3">
                      <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <CheckCircle2 size={40} />
                      </div>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Verified Digital ID</span>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                 <div className="space-y-1">
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Valid Until</div>
                    <div className="text-white font-mono text-sm leading-none">2036 MAR 22</div>
                 </div>
                 <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                    <div className="w-6 h-4 bg-[#ACC8A2] rounded-sm opacity-50" />
                 </div>
              </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-10" />
            
            {/* Floating badges - Adjusted for Mobile */}
            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 -right-4 sm:-right-8 lg:-right-12 z-20 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 lg:gap-3 scale-75 sm:scale-90 lg:scale-100"
            >
               <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={18} />
               </div>
               <div>
                  <div className="text-[10px] lg:text-xs font-bold text-secondary">Document Verified</div>
                  <div className="text-[8px] lg:text-[10px] text-gray-400">Identity check complete</div>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-10 sm:bottom-20 -left-4 sm:-left-8 lg:-left-12 z-20 bg-white p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 lg:gap-3 scale-75 sm:scale-90 lg:scale-100"
            >
               <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Clock size={18} />
               </div>
               <div>
                  <div className="text-[10px] lg:text-xs font-bold text-secondary">15 Min Process</div>
                  <div className="text-[8px] lg:text-[10px] text-gray-400">Average time</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Shield size={32} />, title: "Secure & Encrypted", desc: "Your personal data is protected by industry-leading security standards." },
            { icon: <Clock size={32} />, title: "Save & Resume", desc: "Start your application and pick up exactly where you left off anytime." },
            { icon: <FileCheck size={32} />, title: "Smart Validation", desc: "Real-time error checking ensures your application is perfect before submission." },
            { icon: <Calendar size={32} />, title: "Easy Booking", desc: "Schedule your appointment at a convenient location with just a few clicks." }
          ].map((feature, idx) => (
            <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary text-white py-24 rounded-3xl mx-4 sm:mx-8 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Simplified 5-Step <br/>
              <span className="text-primary italic">Success.</span>
            </h2>
            <div className="space-y-6">
              {[
                { step: "01", title: "Quick Signup", desc: "Create your account in seconds with your email or mobile." },
                { step: "02", title: "Fill Details", desc: "Our guided multi-step form makes it impossible to go wrong." },
                { step: "03", title: "Upload Documents", desc: "Securely upload and preview your required documents." },
                { step: "04", title: "Book Appointment", desc: "Choose a time slot that fits your busy schedule." },
                { step: "05", title: "Get Notified", desc: "Track your application status in real-time until delivery." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <span className="text-3xl font-black text-white/20 group-hover:text-primary transition-colors">{item.step}</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div data-aos="fade-left" className="relative">
            <div className="aspect-square bg-primary/20 rounded-full flex items-center justify-center">
              <div className="w-4/5 aspect-square bg-white/5 rounded-3xl backdrop-blur-3xl border border-white/10 p-8">
                 {/* Visual representation of a dashboard mock */}
                 <div className="h-6 w-3/4 bg-white/20 rounded mb-4" />
                 <div className="h-24 w-full bg-white/10 rounded mb-4" />
                 <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-primary/20 rounded" />
                    <div className="h-20 bg-white/10 rounded" />
                 </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-secondary py-24 rounded-3xl mx-4 sm:mx-8 px-6 overflow-hidden relative -mt-16"> {/* Added -mt-16 to overlap with previous section */}
        <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
            Ready to start your <br /> passport journey?
          </h2>
          <Link to={user ? "/dashboard" : "/signup"} className="btn-primary py-4 px-12 text-lg inline-flex items-center gap-2">
            {user ? "Go to Dashboard" : "Create Account & Apply"} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};
