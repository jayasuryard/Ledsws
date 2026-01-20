import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Platform Analytics
import { Analytics } from "@vercel/analytics/react";

// Layouts
import MainLayout from './components/Layout/MainLayout';

// Public Pages
import PublicCardView from './components/DigitalCard/PublicCardView';

// Auth Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Onboarding
import Onboarding from './pages/Onboarding/Onboarding';

// Dashboard Pages
import GlobalDashboard from './pages/Dashboard/GlobalDashboard';

// Business Pages
import BusinessWorkspace from './pages/Business/BusinessWorkspace';
import BusinessDashboard from './pages/Business/BusinessDashboard';

// AI Studio
import AIContentStudio from './pages/AIStudio/AIContentStudio';

// CRM
import CRMPipelineEnhanced from './pages/CRM/CRMPipelineEnhanced';

// Analytics
import GlobalAnalytics from './pages/Analytics/GlobalAnalytics';

// Team
import TeamManagement from './pages/Team/TeamManagement';

// Subscription
import Subscription from './pages/Subscription/Subscription';

// Profile
import Profile from './pages/Profile/Profile';

// Business Tools
import UnifiedInbox from './pages/BusinessTools/UnifiedInbox';
import SocialMedia from './pages/BusinessTools/SocialMedia';
import EmailMarketing from './pages/BusinessTools/EmailMarketing';
import BrandKit from './pages/BusinessTools/BrandKit';
import SEOAudit from './pages/BusinessTools/SEOAudit';
import LeadForms from './pages/BusinessTools/LeadForms';
import FormViewer from './pages/BusinessTools/FormViewer';
import BusinessSettings from './pages/BusinessTools/BusinessSettings';
import DigitalCards from './pages/BusinessTools/DigitalCards';
import BusinessAnalytics from './pages/BusinessTools/BusinessAnalytics';
import IntegrationHub from './pages/BusinessTools/IntegrationHub';
import LeadScorer from './pages/BusinessTools/LeadScorer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Onboarding Check
const OnboardingCheck = ({ children }) => {
  const { hasCompletedOnboarding } = useStore();
  return hasCompletedOnboarding ? children : <Navigate to="/onboarding" />;
};

function App() {
  const { isAuthenticated, theme } = useStore();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Public Form Viewer Route */}
          <Route path="/forms/:formId" element={<FormViewer />} />
          
          {/* Public Digital Card Route */}
          <Route path="/card/:cardId" element={<PublicCardView />} />

          {/* Onboarding */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes with Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <OnboardingCheck>
                  <MainLayout />
                </OnboardingCheck>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<GlobalDashboard />} />
            
            {/* Business Routes */}
            <Route path="businesses" element={<BusinessWorkspace />} />
            <Route path="business/:businessId" element={<BusinessDashboard />} />
            <Route path="business/:businessId/crm" element={<CRMPipelineEnhanced />} />
            
            {/* AI Studio */}
            <Route path="ai-studio" element={<AIContentStudio />} />
            
            {/* Main Features */}
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="profile" element={<Profile />} />
            
            {/* Business Tools */}
            <Route path="business/:businessId/inbox" element={<UnifiedInbox />} />
            <Route path="business/:businessId/social" element={<SocialMedia />} />
            <Route path="business/:businessId/email" element={<EmailMarketing />} />
            <Route path="business/:businessId/brand" element={<BrandKit />} />
            <Route path="business/:businessId/seo" element={<SEOAudit />} />
            <Route path="business/:businessId/forms" element={<LeadForms />} />
            <Route path="business/:businessId/settings" element={<BusinessSettings />} />
            <Route path="business/:businessId/cards" element={<DigitalCards />} />
            <Route path="business/:businessId/analytics" element={<BusinessAnalytics />} />
            <Route path="business/:businessId/integrations" element={<IntegrationHub />} />
            <Route path="business/:businessId/scorer" element={<LeadScorer />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
