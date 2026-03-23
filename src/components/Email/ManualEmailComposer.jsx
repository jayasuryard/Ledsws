import React, { useState } from 'react';
import { X, Send, Users, Eye, Paperclip, Smile, Bold, Italic, Link as LinkIcon, Image as ImageIcon, AtSign } from 'lucide-react';
import AudienceSelector from './AudienceSelector';

const ManualEmailComposer = ({ isOpen, onClose, theme, leads, onSend }) => {
  const [step, setStep] = useState(1);
  const [emailData, setEmailData] = useState({
    to: [],
    subject: '',
    previewText: '',
    body: '',
    attachments: []
  });
  const [sendType, setSendType] = useState('selected'); // 'selected' or 'all'
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [filters, setFilters] = useState({});

  if (!isOpen) return null;

  const handleSend = () => {
    const recipients = sendType === 'all' 
      ? leads.filter(lead => {
          // Apply filters
          if (filters.statuses?.length && !filters.statuses.includes(lead.status)) return false;
          if (filters.sources?.length && !filters.sources.includes(lead.source)) return false;
          return true;
        })
      : selectedLeads;

    onSend({
      ...emailData,
      recipients: recipients.map(l => ({ id: l.id, email: l.email, name: l.name })),
      sentAt: new Date().toISOString(),
      status: 'sent'
    });

    onClose();
  };

  const audienceCount = sendType === 'all' 
    ? leads.filter(lead => {
        if (filters.statuses?.length && !filters.statuses.includes(lead.status)) return false;
        if (filters.sources?.length && !filters.sources.includes(lead.source)) return false;
        return true;
      }).length
    : selectedLeads.length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Compose Manual Email
              </h2>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Send a one-time email to your leads
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                step === 1
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Recipients
            </button>
            <button
              onClick={() => setStep(2)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                step === 2
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Compose
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-240px)] overflow-y-auto p-6">
          {/* Step 1: Select Recipients */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Who should receive this email?
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setSendType('selected')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      sendType === 'selected'
                        ? theme === 'dark'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-blue-600 bg-blue-50'
                        : theme === 'dark'
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Select Specific Leads
                      </h4>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        sendType === 'selected'
                          ? 'bg-blue-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Choose individual leads from your list
                    </p>
                  </button>

                  <button
                    onClick={() => setSendType('all')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      sendType === 'all'
                        ? theme === 'dark'
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-blue-600 bg-blue-50'
                        : theme === 'dark'
                        ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        All Leads (Filtered)
                      </h4>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        sendType === 'all'
                          ? 'bg-blue-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Send to leads matching criteria
                    </p>
                  </button>
                </div>
              </div>

              {sendType === 'selected' && (
                <div>
                  <h4 className={`font-medium mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Select Leads ({selectedLeads.length} selected)
                  </h4>
                  
                  <div className={`max-h-96 overflow-y-auto rounded-xl border ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    {leads.slice(0, 20).map((lead) => {
                      const isSelected = selectedLeads.some(l => l.id === lead.id);
                      
                      return (
                        <label
                          key={lead.id}
                          className={`flex items-center gap-3 p-4 border-b cursor-pointer transition-colors ${
                            theme === 'dark'
                              ? 'border-gray-800 hover:bg-gray-800/50'
                              : 'border-gray-100 hover:bg-gray-50'
                          } ${isSelected ? (theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50') : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLeads([...selectedLeads, lead]);
                              } else {
                                setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <div className={`font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {lead.name}
                            </div>
                            <div className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {lead.email}
                            </div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {lead.status}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {sendType === 'all' && (
                <div>
                  <AudienceSelector
                    theme={theme}
                    leads={leads}
                    selectedFilters={filters}
                    onFiltersChange={setFilters}
                  />
                </div>
              )}

              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Total Recipients
                    </div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Email will be sent to {audienceCount} {audienceCount === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {audienceCount}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Compose Email */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder="Enter your email subject"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Preview Text (Optional)
                </label>
                <input
                  type="text"
                  value={emailData.previewText}
                  onChange={(e) => setEmailData({ ...emailData, previewText: e.target.value })}
                  placeholder="This appears next to the subject in inbox"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              {/* Formatting Toolbar */}
              <div className={`flex items-center gap-2 p-2 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Bold className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Italic className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <LinkIcon className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-600"></div>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <AtSign className="w-4 h-4" />
                </button>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Smile className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-600"></div>
                <button className={`p-2 rounded hover:bg-gray-700 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Paperclip className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Body *
                </label>
                <textarea
                  value={emailData.body}
                  onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                  placeholder="Write your email message here..."
                  rows={12}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
                <p className={`text-xs mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {'Use variables: {{name}}, {{email}}, {{company}} to personalize'}
                </p>
              </div>

              {/* Preview */}
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Preview
                  </span>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                }`}>
                  <div className={`font-semibold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {emailData.subject || 'Subject will appear here'}
                  </div>
                  {emailData.previewText && (
                    <div className={`text-sm mb-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {emailData.previewText}
                    </div>
                  )}
                  <div className={`text-sm whitespace-pre-wrap ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {emailData.body || 'Your email content will appear here'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        } flex items-center justify-between`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {step === 1 && `${audienceCount} recipient${audienceCount !== 1 ? 's' : ''} selected`}
            {step === 2 && `Ready to send to ${audienceCount} recipient${audienceCount !== 1 ? 's' : ''}`}
          </div>

          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Back
              </button>
            )}
            
            {step === 1 ? (
              <button
                onClick={() => audienceCount > 0 && setStep(2)}
                disabled={audienceCount === 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  audienceCount === 0
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : theme === 'dark'
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next: Compose Email
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!emailData.subject || !emailData.body}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  !emailData.subject || !emailData.body
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50'
                }`}
              >
                <Send className="w-4 h-4" />
                Send Email Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEmailComposer;
