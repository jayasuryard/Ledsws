import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { 
  GoalSelector, 
  ContentGenerationSettings, 
  PlatformSelector, 
  SchedulingSettings,
  FormFieldBuilder,
  ReviewStep 
} from './WorkflowSteps';
import { Target, Users, TrendingUp, Zap } from 'lucide-react';

const CampaignLaunchWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    campaignName: '',
    goal: '',
    contentSettings: {
      days: 7,
      postsPerDay: 2,
      topics: ''
    },
    platforms: [],
    scheduling: {
      scheduleType: 'auto',
      postingTimes: []
    },
    formName: '',
    formFields: [
      { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Your name' },
      { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' }
    ],
    budget: '',
    trackConversions: true
  });

  const campaignGoals = [
    { 
      id: 'leads', 
      label: 'Generate Leads', 
      description: 'Collect contact info from interested prospects',
      icon: Target
    },
    { 
      id: 'awareness', 
      label: 'Build Awareness', 
      description: 'Get your brand in front of more people',
      icon: TrendingUp
    },
    { 
      id: 'engagement', 
      label: 'Drive Engagement', 
      description: 'Get likes, comments, and shares',
      icon: Users
    },
    { 
      id: 'conversions', 
      label: 'Drive Sales', 
      description: 'Convert followers into customers',
      icon: Zap
    }
  ];

  const steps = [
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Name Your Campaign
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Give your campaign a memorable name for tracking
            </p>
          </div>

          <div>
            <input
              type="text"
              value={workflowData.campaignName}
              onChange={(e) => setWorkflowData({ ...workflowData, campaignName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Spring Sale 2026, Product Launch, Lead Magnet Campaign"
            />
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              💡 <strong>Pro Tip:</strong> Use a name that clearly describes what this campaign is about. 
              You'll thank yourself later when reviewing analytics!
            </div>
          </div>
        </div>
      ),
      canProceed: () => workflowData.campaignName.trim().length > 0
    },
    {
      component: GoalSelector,
      props: {
        value: workflowData.goal,
        onChange: (goal) => setWorkflowData({ ...workflowData, goal }),
        theme,
        goals: campaignGoals
      },
      canProceed: () => !!workflowData.goal
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
      component: () => {
        // Auto-set form name based on campaign
        if (!workflowData.formName && workflowData.campaignName) {
          setWorkflowData({ 
            ...workflowData, 
            formName: `${workflowData.campaignName} - Lead Form` 
          });
        }

        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Campaign Landing Form
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Where should we send people who click your campaign posts?
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
                placeholder="Campaign Lead Form"
              />
            </div>

            <FormFieldBuilder
              fields={workflowData.formFields}
              onChange={(fields) => setWorkflowData({ ...workflowData, formFields: fields })}
              theme={theme}
            />
          </div>
        );
      },
      canProceed: () => workflowData.formName.trim() && workflowData.formFields.length >= 2
    },
    {
      component: () => {
        const totalPosts = workflowData.contentSettings.days * workflowData.contentSettings.postsPerDay;
        const goalLabel = campaignGoals.find(g => g.id === workflowData.goal)?.label;
        
        return (
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Launch Your Campaign
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Everything is ready to go live!
              </p>
            </div>

            <div className={`p-6 rounded-2xl border-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {workflowData.campaignName}
                </div>
                <div className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Goal: {goalLabel}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {totalPosts}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Posts
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    {workflowData.platforms.length}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Platforms
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    {workflowData.contentSettings.days}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Days
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`}>
                    {workflowData.formFields.length}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Form Fields
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  What Happens Next:
                </div>
                <ul className={`space-y-1.5 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✅ AI generates {totalPosts} campaign-optimized posts</li>
                  <li>✅ Posts scheduled across {workflowData.platforms.length} platforms</li>
                  <li>✅ Lead form "{workflowData.formName}" goes live</li>
                  <li>✅ Campaign tracking dashboard created</li>
                  <li>✅ Real-time analytics start collecting data</li>
                  <li>✅ You can edit posts before they go live</li>
                </ul>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                🎯 <strong>Success Tip:</strong> After launching, monitor the first 24-48 hours closely. 
                Adjust posting times and content based on early engagement patterns.
              </div>
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const totalPosts = workflowData.contentSettings.days * workflowData.contentSettings.postsPerDay;
      
      alert(`🚀 Campaign "${workflowData.campaignName}" Launched!\n\n✅ ${totalPosts} posts created and scheduled\n✅ Live across ${workflowData.platforms.length} platforms\n✅ Lead form "${workflowData.formName}" is active\n✅ Campaign tracking enabled\n✅ Analytics dashboard ready\n\nYour campaign is now running. Monitor results in the Analytics dashboard!`);
      
      onClose();
      navigate(`/business/${businessId}/analytics`);
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
      workflowName="Campaign Launch in 30 Minutes"
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

export default CampaignLaunchWorkflow;
