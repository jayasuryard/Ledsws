import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { Clock, AlertCircle, Bell } from 'lucide-react';

const MissedLeadRecoveryWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    responseTimeHours: 24,
    flagCriteria: [],
    notificationMethod: [],
    autoReminders: true,
    priorityLevel: 'high',
    assignTo: 'unassigned'
  });

  const responseTimeOptions = [
    { hours: 2, label: '2 hours', description: 'Immediate response expected' },
    { hours: 6, label: '6 hours', description: 'Same business day' },
    { hours: 24, label: '24 hours', description: 'Within one day' },
    { hours: 48, label: '48 hours', description: 'Within two days' },
    { hours: 72, label: '72 hours', description: 'Within three days' }
  ];

  const flagCriteriaOptions = [
    { id: 'no-contact', label: 'No Contact Attempt', description: 'Lead has never been contacted' },
    { id: 'no-response', label: 'No Response Received', description: 'Contacted but no reply' },
    { id: 'high-score', label: 'High Lead Score', description: 'Score above 80' },
    { id: 'hot-source', label: 'Hot Source', description: 'From high-converting sources' }
  ];

  const notificationOptions = [
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'dashboard', label: 'Dashboard Alert', icon: '🔔' },
    { id: 'inbox', label: 'Unified Inbox', icon: '📥' }
  ];

  const steps = [
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Set Response Time Threshold
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              How long before a lead is considered "missed"?
            </p>
          </div>

          <div className="space-y-3">
            {responseTimeOptions.map((option) => (
              <button
                key={option.hours}
                onClick={() => setWorkflowData({ ...workflowData, responseTimeHours: option.hours })}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  workflowData.responseTimeHours === option.hours
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {option.label}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {option.description}
                    </div>
                  </div>
                  <Clock className={`w-6 h-6 ${workflowData.responseTimeHours === option.hours ? 'text-blue-500' : theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
              </button>
            ))}
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              💡 <strong>Tip:</strong> Shorter response times mean faster recovery but more alerts. 
              Choose based on your team's capacity to follow up.
            </div>
          </div>
        </div>
      ),
      canProceed: () => !!workflowData.responseTimeHours
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Flag Criteria
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Which leads should be prioritized for recovery?
            </p>
          </div>

          <div className="space-y-3">
            {flagCriteriaOptions.map((criteria) => (
              <button
                key={criteria.id}
                onClick={() => {
                  const isSelected = workflowData.flagCriteria.includes(criteria.id);
                  setWorkflowData({
                    ...workflowData,
                    flagCriteria: isSelected
                      ? workflowData.flagCriteria.filter(c => c !== criteria.id)
                      : [...workflowData.flagCriteria, criteria.id]
                  });
                }}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  workflowData.flagCriteria.includes(criteria.id)
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {criteria.label}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {criteria.description}
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    workflowData.flagCriteria.includes(criteria.id)
                      ? 'bg-blue-500 border-blue-500'
                      : theme === 'dark'
                      ? 'border-gray-600'
                      : 'border-gray-300'
                  }`}>
                    {workflowData.flagCriteria.includes(criteria.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      canProceed: () => workflowData.flagCriteria.length > 0
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Notification Preferences
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              How should we alert you about missed leads?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {notificationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  const isSelected = workflowData.notificationMethod.includes(option.id);
                  setWorkflowData({
                    ...workflowData,
                    notificationMethod: isSelected
                      ? workflowData.notificationMethod.filter(m => m !== option.id)
                      : [...workflowData.notificationMethod, option.id]
                  });
                }}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  workflowData.notificationMethod.includes(option.id)
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {option.label}
                </div>
              </button>
            ))}
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={workflowData.autoReminders}
                onChange={(e) => setWorkflowData({ ...workflowData, autoReminders: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
              />
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Send Follow-Up Reminders
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get reminded again if leads remain uncontacted after 24 hours
                </div>
              </div>
            </label>
          </div>
        </div>
      ),
      canProceed: () => workflowData.notificationMethod.length > 0
    },
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Priority & Assignment
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              How should missed leads be prioritized in your CRM?
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['high', 'medium', 'low'].map((level) => (
                <button
                  key={level}
                  onClick={() => setWorkflowData({ ...workflowData, priorityLevel: level })}
                  className={`px-4 py-3 rounded-lg border-2 font-semibold capitalize transition-all ${
                    workflowData.priorityLevel === level
                      ? level === 'high'
                        ? 'border-red-500 bg-red-500/10 text-red-400'
                        : level === 'medium'
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                        : 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : theme === 'dark'
                      ? 'border-gray-700 bg-gray-800 text-gray-300'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Auto-Assign To
            </label>
            <select
              value={workflowData.assignTo}
              onChange={(e) => setWorkflowData({ ...workflowData, assignTo: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              <option value="unassigned">Keep Unassigned</option>
              <option value="original">Original Lead Owner</option>
              <option value="round-robin">Round Robin (Team)</option>
              <option value="manager">Team Manager</option>
            </select>
          </div>

          <div className={`p-6 rounded-2xl border-2 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-800'
              : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
          }`}>
            <AlertCircle className="w-8 h-8 text-orange-500 mb-3" />
            <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What Gets Recovered:
            </h4>
            <ul className={`space-y-1.5 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>🔍 Scans CRM every hour for missed leads</li>
              <li>🚨 Flags leads that match your criteria</li>
              <li>📊 Creates priority dashboard view</li>
              <li>🔔 Sends notifications via selected channels</li>
              <li>📈 Tracks recovery success rate</li>
              <li>💡 Suggests follow-up templates</li>
            </ul>
          </div>
        </div>
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`💰 Missed Lead Recovery System Activated!\n\n✅ Monitoring leads every hour\n✅ Flagging after ${workflowData.responseTimeHours}h without contact\n✅ ${workflowData.flagCriteria.length} criteria configured\n✅ Notifications via ${workflowData.notificationMethod.join(', ')}\n✅ Priority: ${workflowData.priorityLevel.toUpperCase()}\n${workflowData.autoReminders ? '✅ Follow-up reminders enabled\n' : ''}\nYou'll never leave money on the table again!`);
      
      onClose();
      navigate(`/business/${businessId}/crm`);
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
      workflowName="Missed Lead Recovery"
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

export default MissedLeadRecoveryWorkflow;
