import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const [email, setEmail] = useState('hire-me@anshumat.org');
  const [password, setPassword] = useState('HireMe@2025!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side - Visual */}
      <div className="hidden md:flex md:w-1/2 bg-secondary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="z-10 text-white max-w-md">
           <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-12 h-12 bg-[#ACC8A2] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-secondary font-bold text-2xl">P</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">PassPort Redesign</span>
          </Link>
          <h2 className="text-4xl font-bold mb-6 leading-tight">Welcome Back to the Future of Applications.</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Access your dashboard to track your application, resume drafts, and book appointments with ease.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
              Demo Account Available
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[#fcfcfc]">
        <div className="w-full max-w-md" data-aos="fade-left">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-secondary">Sign In</h1>
            <p className="text-gray-500">Please enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm animate-shake">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block mx-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mx-1">
                <label className="text-sm font-semibold text-gray-700 block">Password</label>
                <Link to="/forgot" className="text-xs font-semibold text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-4 mt-2 flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500">
              Don't have an account? {' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
             <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Demo Credentials</p>
                <div className="space-y-1 text-sm text-gray-600">
                   <p>Email: <span className="font-mono font-medium">hire-me@anshumat.org</span></p>
                   <p>Passw: <span className="font-mono font-medium">HireMe@2025!</span></p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
