import React from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

const WorkflowWizard = ({ 
  isOpen, 
  onClose, 
  workflowName,
  workflowDescription,
  steps = [],
  currentStep = 0,
  setCurrentStep,
  onComplete,
  canProceed = true,
  isProcessing = false,
  theme,
  children 
}) => {
  if (!isOpen) return null;

  // Calculate total steps and other derived values
  const totalSteps = steps.length || 1;
  const isLastStep = currentStep === totalSteps - 1;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render current step content
  const CurrentStepComponent = steps[currentStep]?.component;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-navy-900' 
            : 'bg-navy-900'
        }`}>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{workflowName}</h2>
                {workflowDescription && (
                  <p className="text-white/80 text-sm">{workflowDescription}</p>
                )}
                <p className="text-white/60 text-sm mt-1">
                  Step {currentStep + 1} of {totalSteps}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-240px)] overflow-y-auto p-6">
          {CurrentStepComponent ? <CurrentStepComponent /> : children}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between`}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? theme === 'dark'
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i <= currentStep
                    ? 'bg-blue-500 w-3'
                    : theme === 'dark'
                    ? 'bg-gray-700'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {isLastStep ? (
            <button
              onClick={onComplete}
              disabled={!canProceed || isProcessing}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                !canProceed || isProcessing
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : theme === 'dark'
                  ? 'bg-navy-900 text-white hover:bg-navy-800'
                  : 'bg-navy-900 text-white hover:bg-navy-800'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Complete Setup
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                !canProceed
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : theme === 'dark'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowWizard;
