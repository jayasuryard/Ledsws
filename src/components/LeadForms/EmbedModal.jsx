import React from 'react';
import { X, Copy, Check } from 'lucide-react';

const EmbedModal = ({ 
  show, 
  onClose, 
  theme, 
  form, 
  embedType, 
  setEmbedType, 
  embedCode,
  copyToClipboard,
  copiedEmbed,
  BASE_URL 
}) => {
  if (!show || !form) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                📎 Embed Form
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Copy and paste this code into your website
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <X className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Embed Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Choose Embed Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setEmbedType('iframe')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  embedType === 'iframe'
                    ? 'border-blue-500 bg-blue-500/10'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  📦 iFrame Embed
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Simple, works everywhere
                </p>
              </button>
              <button
                onClick={() => setEmbedType('javascript')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  embedType === 'javascript'
                    ? 'border-blue-500 bg-blue-500/10'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  ⚡ JavaScript Embed
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  More flexible, requires JS
                </p>
              </button>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Embed Code
              </label>
              <button
                onClick={() => copyToClipboard(embedCode, 'embed')}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
              >
                {copiedEmbed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <div className={`rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <pre className={`p-4 text-sm overflow-x-auto ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <code>{embedCode}</code>
              </pre>
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Preview
            </label>
            <div className={`rounded-lg border p-4 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{form.name}</h3>
                <p className="text-sm text-gray-600 mb-4">Form will appear here on your website</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your email" />
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`w-full px-4 py-3 rounded-lg font-semibold ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmbedModal;
