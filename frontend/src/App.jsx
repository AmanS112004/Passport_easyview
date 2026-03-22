import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { CreateApplication } from './pages/CreateApplication';
import { Confirmation } from './pages/Confirmation';
import { Features } from './pages/Features';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Layout><Onboarding /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/application" element={<Layout><CreateApplication /></Layout>} />
          <Route path="/confirmation" element={<Layout><Confirmation /></Layout>} />
          {/* Further routes will be added here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
