import React from 'react';
import { X, Copy, Check, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const ShareModal = ({ 
  show, 
  onClose, 
  theme, 
  form, 
  shareUrl,
  utmParams,
  setUtmParams,
  generateShareableUrl,
  shareToSocial,
  copyToClipboard,
  copiedUrl
}) => {
  if (!show || !form) return null;

  const handleGenerateUrl = () => {
    const url = generateShareableUrl(form, utmParams);
    // URL is already generated in shareUrl state
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-3xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800 sticky top-0 bg-inherit">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🔗 Share Form
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Generate a shareable link with tracking parameters
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
          {/* UTM Parameters */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              📊 Campaign Tracking (UTM Parameters)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Source (utm_source)
                </label>
                <input
                  type="text"
                  value={utmParams.source}
                  onChange={(e) => setUtmParams({ ...utmParams, source: e.target.value })}
                  placeholder="e.g., newsletter"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Medium (utm_medium)
                </label>
                <input
                  type="text"
                  value={utmParams.medium}
                  onChange={(e) => setUtmParams({ ...utmParams, medium: e.target.value })}
                  placeholder="e.g., email"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Campaign (utm_campaign)
                </label>
                <input
                  type="text"
                  value={utmParams.campaign}
                  onChange={(e) => setUtmParams({ ...utmParams, campaign: e.target.value })}
                  placeholder="e.g., spring_sale"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Term (utm_term)
                </label>
                <input
                  type="text"
                  value={utmParams.term}
                  onChange={(e) => setUtmParams({ ...utmParams, term: e.target.value })}
                  placeholder="Optional"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div className="col-span-2">
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Content (utm_content)
                </label>
                <input
                  type="text"
                  value={utmParams.content}
                  onChange={(e) => setUtmParams({ ...utmParams, content: e.target.value })}
                  placeholder="Optional"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Generated URL */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Shareable URL
              </label>
              <button
                onClick={() => copyToClipboard(shareUrl, 'url')}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
            <div className={`p-3 rounded-lg border font-mono text-sm break-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-cyan-400' : 'bg-gray-50 border-gray-200 text-cyan-600'
            }`}>
              {shareUrl}
            </div>
          </div>

          {/* Social Share */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              📱 Share on Social Media
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => shareToSocial('facebook', shareUrl, form.name)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-blue-600 hover:bg-blue-600/10 transition-all"
              >
                <Facebook className="w-6 h-6 text-blue-600 mb-2" />
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Facebook
                </span>
              </button>
              <button
                onClick={() => shareToSocial('twitter', shareUrl, form.name)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-cyan-500 hover:bg-cyan-500/10 transition-all"
              >
                <Twitter className="w-6 h-6 text-cyan-500 mb-2" />
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Twitter
                </span>
              </button>
              <button
                onClick={() => shareToSocial('linkedin', shareUrl, form.name)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-blue-700 hover:bg-blue-700/10 transition-all"
              >
                <Linkedin className="w-6 h-6 text-blue-700 mb-2" />
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  LinkedIn
                </span>
              </button>
              <button
                onClick={() => shareToSocial('email', shareUrl, form.name)}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-purple-600 hover:bg-purple-600/10 transition-all"
              >
                <Mail className="w-6 h-6 text-purple-600 mb-2" />
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </span>
              </button>
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

export default ShareModal;
