import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch is replaced by Routes
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CodeVerificationPage from './pages/CodeVerificationPage';
import AdminDashboard from './pages/AdminDashboard';
import AddTenantPage from './pages/AddTenantPage';
import PropertyInformation from './pages/PropertyInformation';
import PaymentInformation from './pages/PaymentInformation';
import MaintenanceRequest from './pages/MaintenanceRequest';
import RoomInformation from './pages/RoomInformation';
import TenantInformation from './pages/TenantInformation';
import TenantPaymentMethod from './pages/TenantPaymentMethod';
import TenantMaintenanceRequest from './pages/TenantMaintenanceRequest';
import TenantDashboard from './pages/TenantDashboard';
import FeedbackPage from './pages/FeedbackPage';
import TenantFeedback from './pages/TenantFeedback';
import TenantPropertyInformation from './pages/TenantPropertyInformation';
import Chatbot from './components/Chatbot';
import LandingPage from './pages/LandingPage';
import './styles/App.css';
import './styles/TenantSide.css';
import './styles/LoginPage.css';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/code-verification" element={<CodeVerificationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-tenant" element={<AddTenantPage />} />
          <Route path="/property-information" element={<PropertyInformation />} />
          <Route path="/payment-information" element={<PaymentInformation />} />
          <Route path="/maintenance-request" element={<MaintenanceRequest />} />
          <Route path="/room-information" element={<RoomInformation />} />
          <Route path="/tenant-information" element={<TenantInformation />} />
          <Route path="/tenant-payment-method" element={<TenantPaymentMethod />} />
          <Route path="/tenant-maintenance-request" element={<TenantMaintenanceRequest />} />
          <Route path="/tenant-dashboard" element={<TenantDashboard />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/tenant-feedback" element={<TenantFeedback />} />
          <Route path="/tenant-property-information" element={<TenantPropertyInformation />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
