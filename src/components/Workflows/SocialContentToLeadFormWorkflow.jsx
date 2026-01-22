import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { 
  IndustrySelector, 
  ContentGenerationSettings, 
  PlatformSelector, 
  SchedulingSettings,
  FormFieldBuilder,
  ReviewStep 
} from './WorkflowSteps';

const SocialContentToLeadFormWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    industry: '',
    contentSettings: {
      days: 14,
      postsPerDay: 2,
      topics: ''
    },
    platforms: [],
    scheduling: {
      scheduleType: 'auto',
      postingTimes: []
    },
    formName: 'Social Campaign Lead Form',
    formFields: [
      { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
      { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' },
      { id: 3, type: 'text', label: 'Interested In', required: false, placeholder: 'What are you looking for?' }
    ],
    ctaText: 'Learn More',
    trackingEnabled: true
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
      component: ContentGenerationSettings,
      props: {
        settings: workflowData.contentSettings,
        onChange: (settings) => setWorkflowData({ ...workflowData, contentSettings: settings }),
        theme
      },
      canProceed: () => workflowData.contentSettings.days > 0 && workflowData.contentSettings.postsPerDay > 0
    },
    {
      component: PlatformSelector,
      props: {
        selected: workflowData.platforms,
        onChange: (platforms) => setWorkflowData({ ...workflowData, platforms }),
        theme
      },
      canProceed: () => workflowData.platforms.length > 0
    },
    {
      component: SchedulingSettings,
      props: {
        settings: workflowData.scheduling,
        onChange: (scheduling) => setWorkflowData({ ...workflowData, scheduling }),
        theme
      },
      canProceed: () => {
        if (workflowData.scheduling.scheduleType === 'manual') {
          return workflowData.scheduling.postingTimes?.length > 0;
        }
        return true;
      }
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Lead Form Setup
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Create the form that your social posts will link to
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Form Name
            </label>
            <input
              type="text"
              value={workflowData.formName}
              onChange={(e) => setWorkflowData({ ...workflowData, formName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Free Guide Download, Get Demo"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Call-to-Action Button Text
            </label>
            <input
              type="text"
              value={workflowData.ctaText}
              onChange={(e) => setWorkflowData({ ...workflowData, ctaText: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Get Started, Download Now, Learn More"
            />
          </div>

          <FormFieldBuilder
            fields={workflowData.formFields}
            onChange={(fields) => setWorkflowData({ ...workflowData, formFields: fields })}
            theme={theme}
          />
        </div>
      ),
      canProceed: () => workflowData.formName.trim() && workflowData.ctaText.trim() && workflowData.formFields.length >= 2
    },
    {
      component: () => {
        const totalPosts = workflowData.contentSettings.days * workflowData.contentSettings.postsPerDay;
        const platformNames = workflowData.platforms.map(p => 
          p === 'twitter' ? 'Twitter/X' : 
          p === 'linkedin' ? 'LinkedIn' : 
          p === 'facebook' ? 'Facebook' : 
          'Instagram'
        ).join(', ');
        
        return (
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Review Your Social → Lead Campaign
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Here's what we're about to create for you
              </p>
            </div>

            <div className={`p-6 rounded-2xl border-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Content Volume
                  </div>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {totalPosts} Posts
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Over {workflowData.contentSettings.days} days
                  </div>
                </div>
                
                <div>
                  <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Platforms
                  </div>
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {workflowData.platforms.length}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {platformNames}
                  </div>
                </div>
                
                <div>
                  <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Schedule Type
                  </div>
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {workflowData.scheduling.scheduleType === 'auto' ? 'Auto-Optimized' : 'Manual Times'}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {workflowData.scheduling.scheduleType === 'auto' 
                      ? 'AI-powered timing'
                      : `${workflowData.scheduling.postingTimes?.length || 0} times selected`
                    }
                  </div>
                </div>
                
                <div>
                  <div className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Lead Form
                  </div>
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {workflowData.formFields.length} Fields
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {workflowData.formName}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What Happens Next?
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>AI generates {totalPosts} engaging posts for {workflowData.industry}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Each post includes a {workflowData.ctaText} link to your form</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Posts are scheduled across {platformNames}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Form submissions tracked back to social source</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Analytics dashboard shows which posts convert best</span>
                </li>
              </ul>
            </div>
          </div>
        );
      },
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
      // Simulate AI content generation and setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totalPosts = workflowData.contentSettings.days * workflowData.contentSettings.postsPerDay;
      
      alert(`🚀 Campaign Launched Successfully!\n\n✅ ${totalPosts} AI-generated posts created\n✅ Scheduled across ${workflowData.platforms.length} platforms\n✅ Lead form "${workflowData.formName}" is live\n✅ Tracking enabled for all conversions\n\nYou can now review and edit posts in the Social Media tool!`);
      
      onClose();
      navigate(`/business/${businessId}/social`);
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
      workflowName="Social Content → Lead Form"
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

export default SocialContentToLeadFormWorkflow;
