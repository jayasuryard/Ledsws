import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { PlatformSelector, FormFieldBuilder } from './WorkflowSteps';
import { Sparkles } from 'lucide-react';

const ContentThatConvertsWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    targetAudience: '',
    audiencePainPoints: '',
    offer: '',
    destination: 'form',
    destinationUrl: '',
    platforms: [],
    contentType: [],
    formFields: [
      { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'Your name' },
      { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'your@email.com' }
    ],
    formHeadline: '',
    ctaText: 'Get Started',
    generateVariations: true
  });

  const contentTypes = [
    { id: 'educational', label: 'Educational', icon: '📚', description: 'Tips, guides, how-tos' },
    { id: 'promotional', label: 'Promotional', icon: '🎁', description: 'Offers, discounts, deals' },
    { id: 'social-proof', label: 'Social Proof', icon: '⭐', description: 'Testimonials, case studies' },
    { id: 'announcement', label: 'Announcement', icon: '📢', description: 'News, updates, launches' },
    { id: 'engaging', label: 'Engaging', icon: '💬', description: 'Questions, polls, discussions' },
    { id: 'storytelling', label: 'Storytelling', icon: '📖', description: 'Behind-the-scenes, stories' }
  ];

  const steps = [
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Who is this content for?
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Be specific about your target audience
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Target Audience
            </label>
            <input
              type="text"
              value={workflowData.targetAudience}
              onChange={(e) => setWorkflowData({ ...workflowData, targetAudience: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Small business owners, Marketing managers, Fitness enthusiasts"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              What problem are you solving for them?
            </label>
            <textarea
              value={workflowData.audiencePainPoints}
              onChange={(e) => setWorkflowData({ ...workflowData, audiencePainPoints: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., They struggle with generating leads, they don't have time to create content, they need to track ROI..."
            />
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              💡 <strong>Why this matters:</strong> AI will craft content that speaks directly to these pain points, 
              making your message more relevant and compelling.
            </div>
          </div>
        </div>
      ),
      canProceed: () => workflowData.targetAudience.trim() && workflowData.audiencePainPoints.trim()
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What's your offer?
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              What specific value are you providing?
            </p>
          </div>

          <div>
            <textarea
              value={workflowData.offer}
              onChange={(e) => setWorkflowData({ ...workflowData, offer: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Free 30-day trial, Downloadable guide, Free consultation, Product demo, Early access..."
            />
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.generateVariations}
                onChange={(e) => setWorkflowData({ ...workflowData, generateVariations: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Generate Multiple Variations
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Create 3-5 different versions of each content piece for A/B testing
                </div>
              </div>
            </label>
          </div>
        </div>
      ),
      canProceed: () => workflowData.offer.trim()
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Where should they go?
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose the destination for your call-to-action
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setWorkflowData({ ...workflowData, destination: 'form' })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                workflowData.destination === 'form'
                  ? theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-blue-500 bg-blue-50'
                  : theme === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-3xl mb-2">📋</div>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Lead Form
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Create a custom form
              </div>
            </button>

            <button
              onClick={() => setWorkflowData({ ...workflowData, destination: 'url' })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                workflowData.destination === 'url'
                  ? theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-blue-500 bg-blue-50'
                  : theme === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-3xl mb-2">🔗</div>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                External URL
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Link to your website
              </div>
            </button>
          </div>

          {workflowData.destination === 'url' && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Destination URL
              </label>
              <input
                type="url"
                value={workflowData.destinationUrl}
                onChange={(e) => setWorkflowData({ ...workflowData, destinationUrl: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="https://yourwebsite.com/landing-page"
              />
            </div>
          )}
        </div>
      ),
      canProceed: () => {
        if (workflowData.destination === 'url') {
          return workflowData.destinationUrl.trim();
        }
        return true;
      }
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Content Types
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              What types of content should we generate?
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  const isSelected = workflowData.contentType.includes(type.id);
                  setWorkflowData({
                    ...workflowData,
                    contentType: isSelected
                      ? workflowData.contentType.filter(t => t !== type.id)
                      : [...workflowData.contentType, type.id]
                  });
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  workflowData.contentType.includes(type.id)
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {type.label}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {type.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      canProceed: () => workflowData.contentType.length > 0
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
    ...(workflowData.destination === 'form' ? [{
      component: () => {
        // Auto-generate form headline based on offer
        if (!workflowData.formHeadline && workflowData.offer) {
          const headline = `Get ${workflowData.offer.split(',')[0].trim()}`;
          setWorkflowData({ ...workflowData, formHeadline: headline });
        }

        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Design Your Landing Form
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Create the form that matches your content
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Form Headline
              </label>
              <input
                type="text"
                value={workflowData.formHeadline}
                onChange={(e) => setWorkflowData({ ...workflowData, formHeadline: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="e.g., Get Your Free Guide"
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Button Text
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
                placeholder="e.g., Download Now, Get Started, Claim Offer"
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
      canProceed: () => workflowData.formHeadline.trim() && workflowData.ctaText.trim() && workflowData.formFields.length >= 2
    }] : []),
    {
      component: () => {
        const contentPieces = workflowData.contentType.length * (workflowData.generateVariations ? 4 : 1);
        
        return (
          <div className="space-y-4">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Ready to Generate
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                AI-powered content optimized for conversion
              </p>
            </div>

            <div className={`p-6 rounded-2xl border-2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <Sparkles className="w-8 h-8 text-purple-500 mb-3" />
              <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What You're Getting:
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    {contentPieces}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Content Pieces
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    {workflowData.platforms.length}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Platforms
                  </div>
                </div>
              </div>

              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Content tailored for <strong>{workflowData.targetAudience}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Clear CTA: <strong>{workflowData.ctaText}</strong></span>
                </li>
                {workflowData.destination === 'form' && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Matching form headline: <strong>{workflowData.formHeadline}</strong></span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Optimized for {workflowData.platforms.map(p => 
                    p === 'twitter' ? 'Twitter/X' : 
                    p === 'linkedin' ? 'LinkedIn' : 
                    p === 'facebook' ? 'Facebook' : 'Instagram'
                  ).join(', ')}</span>
                </li>
                {workflowData.generateVariations && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Multiple variations for A/B testing</span>
                  </li>
                )}
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const contentPieces = workflowData.contentType.length * (workflowData.generateVariations ? 4 : 1);
      
      alert(`✨ Conversion-Focused Content Generated!\n\n✅ ${contentPieces} content pieces created\n✅ Optimized for ${workflowData.platforms.length} platforms\n✅ Tailored for ${workflowData.targetAudience}\n${workflowData.destination === 'form' ? `✅ Landing form "${workflowData.formHeadline}" created\n` : `✅ Links to ${workflowData.destinationUrl}\n`}✅ Clear CTAs included\n\nYour content is ready to convert!`);
      
      onClose();
      navigate(`/business/${businessId}/ai-studio`);
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
      workflowName="Content That Converts (AI-Guided)"
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

export default ContentThatConvertsWorkflow;
