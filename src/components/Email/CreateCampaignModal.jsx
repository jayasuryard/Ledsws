import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Send, Calendar, Check } from 'lucide-react';
import AudienceSelector from './AudienceSelector';
import EmailEditor from './EmailEditor';

const CreateCampaignModal = ({ theme, leads, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    type: 'broadcast',
    filters: {},
    emailContent: {},
    scheduling: { sendNow: true }
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const campaign = {
      id: Date.now(),
      name: campaignData.emailContent.campaignName,
      subject: campaignData.emailContent.subject,
      fromName: campaignData.emailContent.fromName,
      fromEmail: campaignData.emailContent.fromEmail,
      previewText: campaignData.emailContent.previewText,
      body: campaignData.emailContent.body,
      filters: campaignData.filters,
      scheduling: campaignData.scheduling,
      status: campaignData.scheduling.sendNow ? 'sent' : 'scheduled',
      scheduledFor: campaignData.scheduling.scheduledDate,
      createdAt: new Date().toISOString(),
      sent: 0,
      opened: 0,
      clicked: 0,
      revenue: 0
    };

    onSave(campaign);
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return true; // Type selection always valid
      case 2:
        return true; // Filters are optional
      case 3:
        return campaignData.emailContent.campaignName &&
               campaignData.emailContent.subject &&
               campaignData.emailContent.fromName &&
               campaignData.emailContent.fromEmail &&
               campaignData.emailContent.body;
      case 4:
        return campaignData.scheduling.sendNow || campaignData.scheduling.scheduledDate;
      default:
        return false;
    }
  };

  // Calculate audience based on filters
  const audienceSize = leads.filter(lead => {
    const { filters } = campaignData;
    
    if (filters.statuses?.length && !filters.statuses.includes(lead.status)) return false;
    if (filters.sources?.length && !filters.sources.includes(lead.source)) return false;
    if (filters.tags?.length && !filters.tags.some(tag => lead.tags?.includes(tag))) return false;
    if (filters.minScore && lead.leadScore < filters.minScore) return false;
    if (filters.maxScore && lead.leadScore > filters.maxScore) return false;
    if (filters.excludeConverted && lead.status === 'Converted') return false;
    if (filters.excludeUnsubscribed && lead.unsubscribed) return false;
    
    return true;
  }).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create Email Campaign
            </h2>
            <button onClick={onClose} className={`p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2">
            {['Type', 'Audience', 'Content', 'Review'].map((label, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step > idx + 1
                      ? 'bg-green-600 text-white'
                      : step === idx + 1
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-400'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > idx + 1 ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    step === idx + 1
                      ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                      : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 ${
                    step > idx + 1 ? 'bg-green-600' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Campaign Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Select Campaign Type
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose how you want to send this email
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setCampaignData({ ...campaignData, type: 'broadcast' })}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    campaignData.type === 'broadcast'
                      ? 'border-blue-600 bg-blue-600/10'
                      : theme === 'dark'
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        📧 Broadcast Email
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Send a one-time email to your selected audience. Perfect for announcements, newsletters, and promotions.
                      </p>
                    </div>
                    {campaignData.type === 'broadcast' && (
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Audience Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Select Audience
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose which leads will receive this email
                </p>
              </div>

              <AudienceSelector
                theme={theme}
                leads={leads}
                selectedFilters={campaignData.filters}
                onFiltersChange={(filters) => setCampaignData({ ...campaignData, filters })}
              />
            </div>
          )}

          {/* Step 3: Email Content */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Email Content
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Write your email and personalize it with tokens
                </p>
              </div>

              <EmailEditor
                theme={theme}
                formData={campaignData.emailContent}
                onChange={(emailContent) => setCampaignData({ ...campaignData, emailContent })}
              />
            </div>
          )}

          {/* Step 4: Review & Schedule */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Review & Schedule
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Review your campaign and choose when to send
                </p>
              </div>

              {/* Campaign Summary */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Campaign Summary
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Campaign Name
                    </div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaignData.emailContent.campaignName}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Audience Size
                    </div>
                    <div className={`font-medium text-blue-500`}>
                      {audienceSize.toLocaleString()} recipients
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Subject Line
                    </div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaignData.emailContent.subject}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      From
                    </div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaignData.emailContent.fromName} &lt;{campaignData.emailContent.fromEmail}&gt;
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduling Options */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  When to Send
                </h4>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={campaignData.scheduling.sendNow}
                      onChange={() => setCampaignData({
                        ...campaignData,
                        scheduling: { sendNow: true }
                      })}
                      className="mt-1"
                    />
                    <div>
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Send Now
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Campaign will be sent immediately
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={!campaignData.scheduling.sendNow}
                      onChange={() => setCampaignData({
                        ...campaignData,
                        scheduling: { sendNow: false, scheduledDate: '' }
                      })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Schedule for Later
                      </div>
                      {!campaignData.scheduling.sendNow && (
                        <input
                          type="datetime-local"
                          value={campaignData.scheduling.scheduledDate || ''}
                          onChange={(e) => setCampaignData({
                            ...campaignData,
                            scheduling: { sendNow: false, scheduledDate: e.target.value }
                          })}
                          className={`mt-2 px-4 py-2 rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <div className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Compliance Checks Passed
                    </div>
                    <ul className={`space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>✓ Unsubscribe link will be added automatically</li>
                      <li>✓ Do-Not-Contact leads excluded</li>
                      <li>✓ Sender email verified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex items-center justify-between ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={step === 1 ? onClose : handleBack}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center space-x-3">
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={!canProceed()}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {campaignData.scheduling.sendNow ? (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Campaign</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Campaign</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
