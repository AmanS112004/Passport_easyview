import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clipboard, Clock, Shield, ArrowRight } from 'lucide-react';

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Welcome to PassPort Redesign",
      desc: "Our platform is designed to make your passport application as smooth as possible. Here's a quick overview of what to expect.",
      icon: <Check className="text-primary" size={40} />
    },
    {
      title: "Keep Documents Ready",
      desc: "You'll need digital copies of your Identity Proof, Address Proof, and Date of Birth proof. Don't worry, we'll guide you on each.",
      icon: <Clipboard className="text-primary" size={40} />
    },
    {
      title: "Save Anytime",
      desc: "Your progress is automatically saved. You can leave the application and resume exactly where you left off from your dashboard.",
      icon: <Clock className="text-primary" size={40} />
    }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden" data-aos="zoom-in">
        <div className="bg-secondary p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
          <h2 className="text-2xl font-bold mb-2">Step {step} of 3</h2>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-8 bg-primary' : 'w-4 bg-white/20'}`} />
            ))}
          </div>
        </div>

        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
            {steps[step - 1].icon}
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-4">{steps[step - 1].title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            {steps[step - 1].desc}
          </p>

          <button 
            onClick={() => step < 3 ? setStep(step + 1) : navigate('/dashboard')}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 group"
          >
            {step < 3 ? 'Next' : 'Go to Dashboard'} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
