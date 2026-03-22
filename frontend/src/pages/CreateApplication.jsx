import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, BadgeCheck, FileUp, Calendar, ChevronRight, ChevronLeft, Save, AlertCircle } from 'lucide-react';
import api from '../services/api';

export const CreateApplication = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    personalDetails: { firstName: '', lastName: '', dob: '', gender: '', birthCity: '', maritalStatus: '' },
    addressDetails: { currentAddress: '', city: '', state: '', pincode: '', isPermanentSameAsCurrent: true, permanentAddress: '' },
    identityDetails: { panNumber: '', voterId: '', aadharNumber: '' }
  });

  // Fetch existing draft on mount
  useEffect(() => {
    const fetchDraft = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/applications');
        const draft = data.find(app => app.status === 'DRAFT');
        if (draft) {
          setFormData({
            personalDetails: draft.personalDetails || formData.personalDetails,
            addressDetails: draft.addressDetails || formData.addressDetails,
            identityDetails: draft.identityDetails || formData.identityDetails
          });
          setStep(draft.currentStep || 1);
        }
      } catch (err) {
        console.error('Error fetching draft:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDraft();
  }, []);

  // Autosave Logic
  const timerRef = useRef(null);

  const autosave = async (data, currentStep) => {
    setSaving(true);
    try {
      await api.post('/applications/autosave', { applicationData: { ...data, currentStep } });
      setLastSaved(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Autosave failed:', err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      autosave(formData, step);
    }, 5000); // 5 seconds debounce
    return () => clearTimeout(timerRef.current);
  }, [formData, step]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const steps = [
    { id: 1, name: 'Personal', icon: <User size={20} /> },
    { id: 2, name: 'Address', icon: <MapPin size={20} /> },
    { id: 3, name: 'Identity', icon: <BadgeCheck size={20} /> },
    { id: 4, name: 'Documents', icon: <FileUp size={20} /> },
    { id: 5, name: 'Appointment', icon: <Calendar size={20} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header & Progress */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-secondary">New Application</h1>
          <p className="text-gray-500">Please provide accurate information for quick processing.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 italic text-sm text-gray-400">
          {saving ? 'Saving changes...' : lastSaved ? `Last saved at ${lastSaved}` : 'Ready to save'}
          <Save size={16} className={saving ? 'animate-pulse text-primary' : ''} />
        </div>
      </div>

      {/* Stepper */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />
        <div className="flex justify-between items-center">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${
                step === s.id ? 'bg-primary border-primary text-secondary shadow-lg shadow-primary/20 scale-110' : 
                step > s.id ? 'bg-secondary border-secondary text-white' : 'bg-white border-gray-100 text-gray-300'
              }`}>
                {step > s.id ? <Check size={20} /> : s.icon}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${step === s.id ? 'text-secondary' : 'text-gray-400'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12" data-aos="fade-up">
        {step === 1 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><User className="text-primary" /> Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                <input 
                  type="text" 
                  value={formData.personalDetails.firstName}
                  onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="Aman"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                <input 
                  type="text" 
                  value={formData.personalDetails.lastName}
                  onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="Srivastava"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.personalDetails.dob}
                  onChange={(e) => handleInputChange('personalDetails', 'dob', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
                <select 
                   value={formData.personalDetails.gender}
                   onChange={(e) => handleInputChange('personalDetails', 'gender', e.target.value)}
                   className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><MapPin className="text-primary" /> Address Details</h2>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Current Residential Address</label>
                <textarea 
                  value={formData.addressDetails.currentAddress}
                  onChange={(e) => handleInputChange('addressDetails', 'currentAddress', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all h-32"
                  placeholder="Your full address..."
                />
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                <input 
                  type="text" 
                  value={formData.addressDetails.city}
                  onChange={(e) => handleInputChange('addressDetails', 'city', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="Lucknow"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">State</label>
                <input 
                  type="text" 
                  value={formData.addressDetails.state}
                  onChange={(e) => handleInputChange('addressDetails', 'state', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="Uttar Pradesh"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Pincode</label>
                <input 
                  type="text" 
                  value={formData.addressDetails.pincode}
                  onChange={(e) => handleInputChange('addressDetails', 'pincode', e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="226001"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Identity Info */}
        {step === 3 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><BadgeCheck className="text-primary" /> Identity Info</h2>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Aadhar Card Number</label>
                  <input 
                    type="text" 
                    value={formData.identityDetails.aadharNumber}
                    onChange={(e) => handleInputChange('identityDetails', 'aadharNumber', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="XXXX-XXXX-XXXX"
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">PAN Card Number</label>
                    <input 
                      type="text" 
                      value={formData.identityDetails.panNumber}
                      onChange={(e) => handleInputChange('identityDetails', 'panNumber', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Voter ID Number</label>
                    <input 
                      type="text" 
                      value={formData.identityDetails.voterId}
                      onChange={(e) => handleInputChange('identityDetails', 'voterId', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="EPIC1234567"
                    />
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {step === 4 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><FileUp className="text-primary" /> Document Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { id: 'id_proof', label: 'Identity Proof', sub: 'Aadhar / PAN / Voter ID' },
                 { id: 'addr_proof', label: 'Address Proof', sub: 'Utility Bill / Bank Statement' },
                 { id: 'dob_proof', label: 'Date of Birth Proof', sub: 'Birth Certificate / 10th Certificate' },
                 { id: 'photo', label: 'Recent Photograph', sub: 'Passport size (White background)' }
               ].map((doc) => (
                 <div key={doc.id} className="p-6 border-2 border-dashed border-gray-100 rounded-2xl hover:border-primary/50 transition-colors group relative">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <FileUp size={24} />
                       </div>
                       <div>
                          <h4 className="font-bold text-secondary">{doc.label}</h4>
                          <p className="text-xs text-gray-400">{doc.sub}</p>
                       </div>
                    </div>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                    <div className="flex justify-between items-center text-xs font-bold text-primary italic">
                       <span>Upload File</span>
                       <span className="text-gray-300">Max 5MB (PDF/JPG)</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Step 5: Appointment */}
        {step === 5 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-3"><Calendar className="text-primary" /> Appointment Booking</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Select Passport Center</label>
                    <select className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all">
                      <option>Lucknow (Regional Office)</option>
                      <option>Kanpur (PSK)</option>
                      <option>Varanasi (PSK)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Preferred Date</label>
                    <input type="date" className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary outline-none transition-all" />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700 ml-1">Available Time Slots</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {['09:00 AM', '10:30 AM', '12:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                       <button key={slot} className="py-3 px-2 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:border-primary hover:text-primary transition-all active:scale-95">
                         {slot}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 font-bold text-gray-400 hover:text-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} /> Previous Section
          </button>
          <button 
            onClick={() => step < 5 ? setStep(step + 1) : navigate('/confirmation')}
            className="btn-primary flex items-center gap-2 py-4 px-10"
          >
            {step === 5 ? 'Confirm & Submit' : 'Save & Continue'} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Contextual Help */}
      <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 flex gap-4 items-start">
         <AlertCircle className="text-primary flex-shrink-0 mt-1" size={20} />
         <div>
            <h4 className="font-bold text-secondary text-sm mb-1">PassPort Pro-Tip</h4>
            <p className="text-gray-500 text-xs leading-relaxed">
              Make sure your name matches exactly as per your Aadhaar card to avoid verification delays. 
              Our system will show a green checkmark once your name is verified with the database.
            </p>
         </div>
      </div>
    </div>
  );
};

// Check icon for stepper success state
const Check = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
