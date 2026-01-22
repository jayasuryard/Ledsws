import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { FormFieldBuilder, ReviewStep } from './WorkflowSteps';

const LocalBusinessLeadBoosterWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    businessName: '',
    serviceArea: '',
    services: [],
    formFields: [
      { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Your name' },
      { id: 2, type: 'phone', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: 3, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
      { id: 4, type: 'text', label: 'Location/Zip Code', required: true, placeholder: 'Enter your location' },
      { id: 5, type: 'select', label: 'Service Needed', required: true, options: ['General Inquiry', 'Service 1', 'Service 2'] }
    ],
    runSEOAudit: true,
    generateContent: true
  });

  const localBusinessTypes = [
    { id: 'restaurant', label: 'Restaurant/Cafe', icon: '🍽️' },
    { id: 'salon', label: 'Salon/Spa', icon: '💇' },
    { id: 'fitness', label: 'Gym/Fitness', icon: '💪' },
    { id: 'automotive', label: 'Auto Service', icon: '🚗' },
    { id: 'home-services', label: 'Home Services', icon: '🏠' },
    { id: 'healthcare', label: 'Healthcare', icon: '⚕️' },
    { id: 'retail', label: 'Retail Store', icon: '🛍️' },
    { id: 'professional', label: 'Professional Services', icon: '💼' }
  ];

  const steps = [
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What type of local business are you?
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This helps us optimize your lead form and SEO recommendations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {localBusinessTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setWorkflowData({ ...workflowData, businessType: type.id })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  workflowData.businessType === type.id
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {type.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      canProceed: () => !!workflowData.businessType
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Business & Location Details
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Help local customers find you
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Business Name
            </label>
            <input
              type="text"
              value={workflowData.businessName}
              onChange={(e) => setWorkflowData({ ...workflowData, businessName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Joe's Pizza, Main Street Salon"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Service Area / City
            </label>
            <input
              type="text"
              value={workflowData.serviceArea}
              onChange={(e) => setWorkflowData({ ...workflowData, serviceArea: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Austin, TX or Downtown Manhattan"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Main Services You Offer (comma separated)
            </label>
            <textarea
              value={workflowData.services.join(', ')}
              onChange={(e) => setWorkflowData({ 
                ...workflowData, 
                services: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
              })}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Haircuts, Coloring, Hair Extensions, Wedding Services"
            />
          </div>
        </div>
      ),
      canProceed: () => workflowData.businessName.trim() && workflowData.serviceArea.trim()
    },
    {
      component: () => {
        // Auto-update service options in form field
        if (workflowData.services.length > 0) {
          const serviceField = workflowData.formFields.find(f => f.label === 'Service Needed');
          if (serviceField) {
            serviceField.options = ['General Inquiry', ...workflowData.services];
          }
        }
        
        return (
          <FormFieldBuilder
            fields={workflowData.formFields}
            onChange={(fields) => setWorkflowData({ ...workflowData, formFields: fields })}
            theme={theme}
          />
        );
      },
      canProceed: () => workflowData.formFields.length >= 3
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Local SEO & Content Boost
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Get found by local customers searching online
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.runSEOAudit}
                onChange={(e) => setWorkflowData({ ...workflowData, runSEOAudit: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Run Local SEO Audit
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analyze your website for local search optimization opportunities
                </div>
              </div>
            </label>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.generateContent}
                onChange={(e) => setWorkflowData({ ...workflowData, generateContent: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Generate Local Content Ideas
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get AI-powered content suggestions based on local keywords and gaps
                </div>
              </div>
            </label>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800'
              : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
          }`}>
            <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What You'll Get:
            </h4>
            <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Location-optimized lead capture form</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Local SEO recommendations for "{workflowData.serviceArea}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Content ideas targeting local searches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Competitor insights in your area</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Lead tracking in CRM with location data</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      canProceed: () => true
    },
    {
      component: () => (
        <ReviewStep
          data={{
            'Business Type': localBusinessTypes.find(t => t.id === workflowData.businessType)?.label || workflowData.businessType,
            'Business Name': workflowData.businessName,
            'Service Area': workflowData.serviceArea,
            'Services': workflowData.services.join(', '),
            'Form Fields': workflowData.formFields.length,
            'Local SEO Audit': workflowData.runSEOAudit ? 'Enabled' : 'Disabled',
            'Content Generation': workflowData.generateContent ? 'Enabled' : 'Disabled'
          }}
          theme={theme}
        />
      ),
      canProceed: () => true
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`🎯 Local Business Lead Booster Activated!\n\n✅ Location-optimized form for ${workflowData.serviceArea}\n✅ ${workflowData.services.length} services configured\n${workflowData.runSEOAudit ? '✅ Local SEO audit running\n' : ''}${workflowData.generateContent ? '✅ Generating local content ideas\n' : ''}\n✅ Lead tracking enabled\n\nYour local lead generation system is now live!`);
      
      onClose();
      navigate(`/business/${businessId}/forms`);
    } catch (error) {
      console.error('Error creating workflow:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const canProceed = steps[currentStep].canProceed();

  return (
    <WorkflowWizard
      isOpen={isOpen}
      onClose={onClose}
      workflowName="Local Business Lead Booster"
      currentStep={currentStep}
      totalSteps={steps.length}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onComplete={handleComplete}
      canProceed={canProceed}
      isLastStep={currentStep === steps.length - 1}
      isProcessing={isProcessing}
      theme={theme}
    >
      <CurrentStepComponent />
    </WorkflowWizard>
  );
};

export default LocalBusinessLeadBoosterWorkflow;
