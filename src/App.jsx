import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Platform Analytics
import { Analytics } from "@vercel/analytics/react";

// Layouts
import MainLayout from './components/Layout/MainLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import PublicCardView from './components/DigitalCard/PublicCardView';

// Auth Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';

// Onboarding
import Onboarding from './pages/Onboarding/Onboarding';

// Dashboard Pages
import ModernDashboard from './pages/Dashboard/ModernDashboard';
import AIBusinessSetup from './pages/Dashboard/AIBusinessSetup';

// Business Pages
import ModernBusinessWorkspace from './pages/Business/ModernBusinessWorkspace';
import BusinessDashboard from './pages/Business/BusinessDashboard';

// AI Studio
import ModernAIStudio from './pages/AIStudio/ModernAIStudio';
import AIContentStudio from './pages/AIStudio/AIContentStudio';
import BrandKit from './pages/AIStudio/BrandKit';

// CRM
import CRMPipelineEnhanced from './pages/CRM/CRMPipelineEnhanced';

// Analytics
import ModernAnalytics from './pages/Analytics/ModernAnalytics';

// Team
import TeamManagement from './pages/Team/TeamManagement';

// Subscription
import Subscription from './pages/Subscription/Subscription';

// Profile
import Profile from './pages/Profile/Profile';

// Business Tools
import UnifiedInbox from './pages/BusinessTools/UnifiedInbox';
import SocialMedia from './pages/BusinessTools/SocialMedia';
import EmailDashboard from './pages/BusinessTools/EmailDashboard';
import LeadsCRM from './pages/BusinessTools/LeadsCRM';
import LeadScoringSimulator from './pages/BusinessTools/LeadScoringSimulator';
import NurtureFlowViewer from './pages/BusinessTools/NurtureFlowViewer';
import EmailAnalytics from './pages/BusinessTools/EmailAnalytics';
import TemplateLibrary from './pages/BusinessTools/TemplateLibrary';
import Workflows from './pages/BusinessTools/Workflows';
import SEOAudit from './pages/BusinessTools/SEOAudit';
import LeadForms from './pages/BusinessTools/LeadForms';
import FormViewer from './pages/BusinessTools/FormViewer';
import BusinessSettings from './pages/BusinessTools/BusinessSettings';
import DigitalCards from './pages/BusinessTools/DigitalCards';
import BusinessAnalytics from './pages/BusinessTools/BusinessAnalytics';
import IntegrationHub from './pages/BusinessTools/IntegrationHub';
import ImageDesigner from './pages/BusinessTools/ImageDesigner';
import VideoEditor from './pages/BusinessTools/VideoEditor';
import MediaLibrary from './pages/BusinessTools/MediaLibrary';
import CreatorPipeline from './pages/BusinessTools/CreatorPipeline';

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
  const { isAuthenticated } = useStore();

  return (
    <div>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
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
            path="/app"
            element={
              <ProtectedRoute>
                <OnboardingCheck>
                  <MainLayout />
                </OnboardingCheck>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" />} />
            <Route path="dashboard" element={<ModernDashboard />} />
            <Route path="ai-setup" element={<AIBusinessSetup />} />
            
            {/* Business Routes */}
            <Route path="businesses" element={<ModernBusinessWorkspace />} />
            <Route path="business/:businessId" element={<BusinessDashboard />} />
            <Route path="business/:businessId/crm" element={<CRMPipelineEnhanced />} />
            
            {/* AI Studio */}
            <Route path="ai-studio" element={<ModernAIStudio />} />
            <Route path="ai-studio/text" element={<AIContentStudio />} />
            <Route path="ai-studio/brand-kit" element={<BrandKit />} />
            
            {/* Main Features */}
            <Route path="analytics" element={<ModernAnalytics />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="profile" element={<Profile />} />
            
            {/* Business Tools */}
            <Route path="business/:businessId/inbox" element={<UnifiedInbox />} />
            <Route path="business/:businessId/social" element={<SocialMedia />} />
            <Route path="business/:businessId/email" element={<EmailDashboard />} />
            <Route path="business/:businessId/email/leads" element={<LeadsCRM />} />
            <Route path="business/:businessId/email/scoring" element={<LeadScoringSimulator />} />
            <Route path="business/:businessId/email/nurture" element={<NurtureFlowViewer />} />
            <Route path="business/:businessId/email/analytics" element={<EmailAnalytics />} />
            <Route path="business/:businessId/email/templates" element={<TemplateLibrary />} />
            <Route path="business/:businessId/workflows" element={<Workflows />} />
            <Route path="business/:businessId/seo" element={<SEOAudit />} />
            <Route path="business/:businessId/forms" element={<LeadForms />} />
            <Route path="business/:businessId/settings" element={<BusinessSettings />} />
            <Route path="business/:businessId/cards" element={<DigitalCards />} />
            <Route path="business/:businessId/analytics" element={<BusinessAnalytics />} />
            <Route path="business/:businessId/integrations" element={<IntegrationHub />} />
            
            {/* Creator Tools */}
            <Route path="business/:businessId/design" element={<ImageDesigner />} />
            <Route path="business/:businessId/video" element={<VideoEditor />} />
            <Route path="business/:businessId/media" element={<MediaLibrary />} />
            <Route path="business/:businessId/creator" element={<CreatorPipeline />} />
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
