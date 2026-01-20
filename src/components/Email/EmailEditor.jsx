import React, { useState } from 'react';
import { Type, ChevronDown } from 'lucide-react';

const EmailEditor = ({ theme, formData, onChange }) => {
  const [showTokens, setShowTokens] = useState(false);

  const personalizationTokens = [
    { token: '{{first_name}}', description: 'Lead\'s first name' },
    { token: '{{last_name}}', description: 'Lead\'s last name' },
    { token: '{{email}}', description: 'Lead\'s email address' },
    { token: '{{company}}', description: 'Company name' },
    { token: '{{phone}}', description: 'Phone number' },
    { token: '{{source}}', description: 'Lead source' },
    { token: '{{form_name}}', description: 'Form submission name' },
    { token: '{{lead_score}}', description: 'Lead score value' },
    { token: '{{campaign_name}}', description: 'Campaign name' },
    { token: '{{assigned_to}}', description: 'Assigned team member' }
  ];

  const insertToken = (token) => {
    const textarea = document.getElementById('email-body');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.body || '';
    const newText = text.substring(0, start) + token + text.substring(end);
    
    onChange({ ...formData, body: newText });
    
    // Set cursor position after inserted token
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + token.length, start + token.length);
    }, 0);
    
    setShowTokens(false);
  };

  return (
    <div className="space-y-4">
      {/* Campaign Name */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Campaign Name *
        </label>
        <input
          type="text"
          value={formData.campaignName || ''}
          onChange={(e) => onChange({ ...formData, campaignName: e.target.value })}
          placeholder="e.g., New Lead Welcome Series"
          className={`w-full px-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
      </div>

      {/* From Name & Email */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            From Name *
          </label>
          <input
            type="text"
            value={formData.fromName || ''}
            onChange={(e) => onChange({ ...formData, fromName: e.target.value })}
            placeholder="Your Name"
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            From Email *
          </label>
          <input
            type="email"
            value={formData.fromEmail || ''}
            onChange={(e) => onChange({ ...formData, fromEmail: e.target.value })}
            placeholder="you@company.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>
      </div>

      {/* Subject Line */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Subject Line *
        </label>
        <input
          type="text"
          value={formData.subject || ''}
          onChange={(e) => onChange({ ...formData, subject: e.target.value })}
          placeholder="e.g., Hi {{first_name}}, welcome to our community!"
          className={`w-full px-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
      </div>

      {/* Preview Text */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Preview Text
        </label>
        <input
          type="text"
          value={formData.previewText || ''}
          onChange={(e) => onChange({ ...formData, previewText: e.target.value })}
          placeholder="This appears in email inbox preview"
          className={`w-full px-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {/* Email Body with Personalization */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={`block text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email Body *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTokens(!showTokens)}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Type className="w-4 h-4" />
              <span>Insert Token</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showTokens && (
              <div className={`absolute right-0 mt-2 w-72 rounded-lg border shadow-xl z-50 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="p-2 max-h-96 overflow-y-auto">
                  {personalizationTokens.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => insertToken(item.token)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-gray-700 text-white'
                          : 'hover:bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="font-mono text-sm text-blue-500">{item.token}</div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <textarea
          id="email-body"
          value={formData.body || ''}
          onChange={(e) => onChange({ ...formData, body: e.target.value })}
          placeholder="Write your email content here... Use tokens like {{first_name}} for personalization."
          rows={12}
          className={`w-full px-4 py-3 rounded-lg border font-mono text-sm ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required
        />
        <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          💡 Tip: Use personalization tokens to make your emails more engaging. Click "Insert Token" above.
        </p>
      </div>

      {/* Email Preview */}
      <div className={`p-4 rounded-lg border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Preview (with sample data)
        </h4>
        <div className={`p-4 rounded border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-300'
        }`}>
          <div className="mb-2">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              From: {formData.fromName || 'Your Name'} &lt;{formData.fromEmail || 'you@company.com'}&gt;
            </span>
          </div>
          <div className="mb-3">
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {formData.subject?.replace(/{{first_name}}/g, 'John').replace(/{{company}}/g, 'Acme Corp') || 'Subject Line'}
            </div>
            {formData.previewText && (
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {formData.previewText}
              </div>
            )}
          </div>
          <div className={`text-sm whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {formData.body
              ?.replace(/{{first_name}}/g, 'John')
              .replace(/{{last_name}}/g, 'Doe')
              .replace(/{{email}}/g, 'john@example.com')
              .replace(/{{company}}/g, 'Acme Corp')
              .replace(/{{phone}}/g, '+1234567890')
              .replace(/{{source}}/g, 'Website Form')
              .replace(/{{form_name}}/g, 'Contact Form')
              .replace(/{{lead_score}}/g, '85')
              || 'Email body preview will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailEditor;
