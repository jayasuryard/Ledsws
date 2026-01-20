import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, ChevronDown, ChevronUp, Save } from 'lucide-react';
import EmailEditor from './EmailEditor';

const CreateSequenceModal = ({ theme, onClose, onSave }) => {
  const [sequenceData, setSequenceData] = useState({
    name: '',
    trigger: { type: '', value: '' },
    steps: [],
    stopConditions: {
      leadReplies: true,
      leadConverts: true,
      statusChanges: false
    }
  });

  const [currentStep, setCurrentStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  const triggerTypes = [
    { value: 'form_submission', label: 'Form Submission', description: 'When a lead submits any form' },
    { value: 'status_change', label: 'Lead Status Change', description: 'When lead status changes to...' },
    { value: 'score_threshold', label: 'Lead Score Threshold', description: 'When lead score reaches...' },
    { value: 'tag_added', label: 'Tag Added', description: 'When a specific tag is added' },
    { value: 'inactivity', label: 'Inactivity Period', description: 'After X days of no activity' }
  ];

  const statusOptions = ['New', 'Contacted', 'Qualified', 'Converted', 'Inactive'];

  const addStep = () => {
    const newStep = {
      id: Date.now(),
      type: 'email',
      delay: { value: 1, unit: 'days' },
      emailContent: {}
    };
    setSequenceData({
      ...sequenceData,
      steps: [...sequenceData.steps, newStep]
    });
    setCurrentStep(newStep.id);
    setExpandedStep(newStep.id);
  };

  const removeStep = (stepId) => {
    setSequenceData({
      ...sequenceData,
      steps: sequenceData.steps.filter(s => s.id !== stepId)
    });
    if (currentStep === stepId) setCurrentStep(null);
  };

  const updateStep = (stepId, updates) => {
    setSequenceData({
      ...sequenceData,
      steps: sequenceData.steps.map(s => 
        s.id === stepId ? { ...s, ...updates } : s
      )
    });
  };

  const handleSave = () => {
    const sequence = {
      id: Date.now(),
      name: sequenceData.name,
      trigger: sequenceData.trigger,
      steps: sequenceData.steps,
      stopConditions: sequenceData.stopConditions,
      status: 'active',
      createdAt: new Date().toISOString(),
      enrolledLeads: 0,
      completedLeads: 0
    };

    onSave(sequence);
    onClose();
  };

  const canSave = () => {
    return sequenceData.name &&
           sequenceData.trigger.type &&
           sequenceData.steps.length > 0 &&
           sequenceData.steps.every(s => 
             s.emailContent.subject &&
             s.emailContent.body &&
             s.emailContent.fromName &&
             s.emailContent.fromEmail
           );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create Automated Sequence
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Build a drip campaign with triggered emails and delays
              </p>
            </div>
            <button onClick={onClose} className={`p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Sequence Name */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Sequence Name *
            </label>
            <input
              type="text"
              value={sequenceData.name}
              onChange={(e) => setSequenceData({ ...sequenceData, name: e.target.value })}
              placeholder="e.g., New Lead Follow-Up Sequence"
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Entry Trigger */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Entry Trigger
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Trigger Type *
                </label>
                <select
                  value={sequenceData.trigger.type}
                  onChange={(e) => setSequenceData({
                    ...sequenceData,
                    trigger: { type: e.target.value, value: '' }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select a trigger...</option>
                  {triggerTypes.map(trigger => (
                    <option key={trigger.value} value={trigger.value}>
                      {trigger.label} - {trigger.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional trigger value inputs */}
              {sequenceData.trigger.type === 'status_change' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    When status changes to:
                  </label>
                  <select
                    value={sequenceData.trigger.value}
                    onChange={(e) => setSequenceData({
                      ...sequenceData,
                      trigger: { ...sequenceData.trigger, value: e.target.value }
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select status...</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}

              {sequenceData.trigger.type === 'score_threshold' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Minimum Score:
                  </label>
                  <input
                    type="number"
                    value={sequenceData.trigger.value}
                    onChange={(e) => setSequenceData({
                      ...sequenceData,
                      trigger: { ...sequenceData.trigger, value: e.target.value }
                    })}
                    placeholder="e.g., 75"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              )}

              {sequenceData.trigger.type === 'inactivity' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Days of Inactivity:
                  </label>
                  <input
                    type="number"
                    value={sequenceData.trigger.value}
                    onChange={(e) => setSequenceData({
                      ...sequenceData,
                      trigger: { ...sequenceData.trigger, value: e.target.value }
                    })}
                    placeholder="e.g., 7"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              )}

              {sequenceData.trigger.type === 'tag_added' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tag Name:
                  </label>
                  <input
                    type="text"
                    value={sequenceData.trigger.value}
                    onChange={(e) => setSequenceData({
                      ...sequenceData,
                      trigger: { ...sequenceData.trigger, value: e.target.value }
                    })}
                    placeholder="e.g., VIP"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sequence Steps */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Sequence Steps ({sequenceData.steps.length})
              </h3>
              <button
                onClick={addStep}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Email Step</span>
              </button>
            </div>

            {sequenceData.steps.length === 0 ? (
              <div className="text-center py-8">
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  No steps yet. Click "Add Email Step" to start building your sequence.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sequenceData.steps.map((step, idx) => (
                  <div key={step.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Email #{idx + 1}
                          </div>
                          {step.emailContent.subject && (
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {step.emailContent.subject}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                          className={`p-2 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                          }`}
                        >
                          {expandedStep === step.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => removeStep(step.id)}
                          className={`p-2 rounded-lg ${
                            theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                          }`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>

                    {/* Delay Configuration */}
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Wait
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={step.delay.value}
                        onChange={(e) => updateStep(step.id, {
                          delay: { ...step.delay, value: parseInt(e.target.value) || 0 }
                        })}
                        className={`w-20 px-2 py-1 rounded border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <select
                        value={step.delay.unit}
                        onChange={(e) => updateStep(step.id, {
                          delay: { ...step.delay, unit: e.target.value }
                        })}
                        className={`px-2 py-1 rounded border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                      </select>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {idx === 0 ? 'after trigger' : 'after previous email'}
                      </span>
                    </div>

                    {/* Email Content (Expanded) */}
                    {expandedStep === step.id && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <EmailEditor
                          theme={theme}
                          formData={step.emailContent}
                          onChange={(emailContent) => updateStep(step.id, { emailContent })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stop Conditions */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Stop Conditions
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sequenceData.stopConditions.leadReplies}
                  onChange={(e) => setSequenceData({
                    ...sequenceData,
                    stopConditions: { ...sequenceData.stopConditions, leadReplies: e.target.checked }
                  })}
                  className="w-4 h-4 rounded"
                />
                <div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Lead Replies
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stop sequence when lead replies to any email
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sequenceData.stopConditions.leadConverts}
                  onChange={(e) => setSequenceData({
                    ...sequenceData,
                    stopConditions: { ...sequenceData.stopConditions, leadConverts: e.target.checked }
                  })}
                  className="w-4 h-4 rounded"
                />
                <div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Lead Converts
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stop sequence when lead status changes to Converted
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sequenceData.stopConditions.statusChanges}
                  onChange={(e) => setSequenceData({
                    ...sequenceData,
                    stopConditions: { ...sequenceData.stopConditions, statusChanges: e.target.checked }
                  })}
                  className="w-4 h-4 rounded"
                />
                <div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Status Changes
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Stop sequence when lead status changes to any other value
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex items-center justify-between ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!canSave()}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>Save Sequence</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSequenceModal;
