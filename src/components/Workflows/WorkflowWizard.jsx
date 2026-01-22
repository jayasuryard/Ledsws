import React from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

const WorkflowWizard = ({ 
  isOpen, 
  onClose, 
  workflowName, 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious,
  onComplete,
  canProceed = true,
  isLastStep = false,
  isProcessing = false,
  theme,
  children 
}) => {
  if (!isOpen) return null;

  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' 
            : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
        }`}>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{workflowName}</h2>
                <p className="text-white/80 text-sm">
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
          {children}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between`}>
          <button
            onClick={onPrevious}
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
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50'
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
              onClick={onNext}
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
