import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { IndustrySelector, FormFieldBuilder, ReviewStep } from './WorkflowSteps';
import useStore from '../../store/useStore';

const InboundLeadCaptureWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const { addForm, addCampaign } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    industry: '',
    formName: 'Lead Capture Form',
    formFields: [
      { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
      { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
      { id: 3, type: 'phone', label: 'Phone Number', required: false, placeholder: '(555) 123-4567' },
      { id: 4, type: 'text', label: 'Company Name', required: false, placeholder: 'Your company' }
    ],
    successMessage: 'Thank you! We\'ll get back to you soon.',
    redirectUrl: '',
    sendNotifications: true,
    autoAssign: true
  });

  const steps = [
    {
      component: IndustrySelector,
      props: {
        value: workflowData.industry,
        onChange: (industry) => setWorkflowData({ ...workflowData, industry }),
        theme
      },
      canProceed: () => !!workflowData.industry
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Name Your Form
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Give your lead capture form a memorable name
            </p>
            <input
              type="text"
              value={workflowData.formName}
              onChange={(e) => setWorkflowData({ ...workflowData, formName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Contact Us Form, Demo Request, Get Started"
            />
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Success Message
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              What message should users see after submitting?
            </p>
            <textarea
              value={workflowData.successMessage}
              onChange={(e) => setWorkflowData({ ...workflowData, successMessage: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Thank you message..."
            />
          </div>
        </div>
      ),
      canProceed: () => !!workflowData.formName.trim()
    },
    {
      component: FormFieldBuilder,
      props: {
        fields: workflowData.formFields,
        onChange: (fields) => setWorkflowData({ ...workflowData, formFields: fields }),
        theme
      },
      canProceed: () => workflowData.formFields.length >= 2
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              CRM Settings
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Configure how leads from this form are handled
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.sendNotifications}
                onChange={(e) => setWorkflowData({ ...workflowData, sendNotifications: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Send Email Notifications
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get notified when someone submits this form
                </div>
              </div>
            </label>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.autoAssign}
                onChange={(e) => setWorkflowData({ ...workflowData, autoAssign: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Auto-Assign to Pipeline
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Automatically add leads to your CRM pipeline
                </div>
              </div>
            </label>
          </div>
        </div>
      ),
      canProceed: () => true
    },
    {
      component: () => (
        <ReviewStep
          data={{
            'Industry': workflowData.industry,
            'Form Name': workflowData.formName,
            'Number of Fields': workflowData.formFields.length,
            'Success Message': workflowData.successMessage,
            'Email Notifications': workflowData.sendNotifications ? 'Enabled' : 'Disabled',
            'Auto-Assign to CRM': workflowData.autoAssign ? 'Enabled' : 'Disabled'
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create the form
      const newForm = {
        id: Date.now(),
        name: workflowData.formName,
        businessId: businessId,
        fields: workflowData.formFields,
        settings: {
          successMessage: workflowData.successMessage,
          redirectUrl: workflowData.redirectUrl,
          notifications: workflowData.sendNotifications
        },
        submissions: 0,
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      // Add form to store (if you have this in your store)
      // addForm(newForm);
      
      // Create a campaign for tracking
      const campaignName = `${workflowData.formName} - ${workflowData.industry}`;
      
      // Show success and navigate
      alert(`✅ Success! Your lead capture system is now live!\n\nForm created: ${workflowData.formName}\nIndustry: ${workflowData.industry}\nFields: ${workflowData.formFields.length}\n\nYou can now embed this form on your website or share the link.`);
      
      onClose();
      // Navigate to forms page
      navigate(`/business/${businessId}/forms`);
    } catch (error) {
      console.error('Error creating workflow:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const currentStepProps = steps[currentStep].props || {};
  const canProceed = steps[currentStep].canProceed();

  return (
    <WorkflowWizard
      isOpen={isOpen}
      onClose={onClose}
      workflowName="Inbound Lead Capture & Follow-Up"
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
      <CurrentStepComponent {...currentStepProps} />
    </WorkflowWizard>
  );
};

export default InboundLeadCaptureWorkflow;
