import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch is replaced by Routes
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CodeVerificationPage from './pages/CodeVerificationPage';
import AdminDashboard from './pages/AdminDashboard';
import TenantDashboard from './pages/TenantDashboard';
import PropertyInformation from './pages/PropertyInformation';
import PaymentInformation from './pages/PaymentInformation';
import MaintenanceRequest from './pages/MaintenanceRequest';
import RoomDashboard from './pages/RoomDashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/code-verification" element={<CodeVerificationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/property-information" element={<PropertyInformation />} />
          <Route path="/payment-management" element={<PaymentInformation />} />
          <Route path="/maintenance-request" element={<MaintenanceRequest />} />
          <Route path="/room-dashboard" element={<RoomDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
