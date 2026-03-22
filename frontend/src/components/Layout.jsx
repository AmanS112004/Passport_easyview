import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-100 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#ACC8A2] rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform duration-300">
              <span className="text-secondary font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">PassPort <span className="text-primary">Redesign</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/features" className="text-gray-600 hover:text-primary transition-colors font-medium">Features</Link>
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors font-medium">Help Center</Link>
            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                  <div className="text-right hidden lg:block">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Citizen</p>
                    <p className="text-sm font-bold text-secondary">{user.name}</p>
                  </div>
                  <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors font-medium">Login</Link>
                <Link to="/signup" className="btn-primary">Apply Now</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl">
            <Link to="/" className="block py-2 text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
             <Link to="/features" className="block py-2 text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="/" className="block py-2 text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Help</Link>
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <>
                  <Link to="/dashboard" className="block py-2 text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <button 
                    onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}
                    className="block w-full text-left py-2 text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="block py-2 text-[#ACC8A2] font-semibold" onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 bg-[#ACC8A2] rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight">PassPort Redesign</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Making passport applications simpler, faster, and more secure for every citizen. Experience the future of governmental services.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#ACC8A2]">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Application Guide</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Required Documents</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Fee Structure</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[#ACC8A2]">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Support: <a href="mailto:aman11202004@gmail.com" className="hover:text-white transition-colors">aman11202004@gmail.com</a></li>
              <li>Hotline: <a href="tel:7041532536" className="hover:text-white transition-colors">+91 7041532536</a></li>
              <li>Passport Seva Kendra, Lucknow</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © 2026 Passport Application Experience Redesign. All rights reserved. Built with ❤️ for citizen convenience.
        </div>
      </footer>
    </div>
  );
};
