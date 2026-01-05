import React, { useState } from 'react';
import { Sparkles, FileText, MessageSquare, ShoppingCart, Wand2 } from 'lucide-react';
import useStore from '../../store/useStore';

const AIContentStudio = () => {
  const { theme, businesses, activeBusiness } = useStore();
  const [selectedBusiness, setSelectedBusiness] = useState(activeBusiness?.id || '');
  const [contentType, setContentType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { id: 'blog', label: 'Blog Post', icon: FileText, description: 'Long-form articles' },
    { id: 'social', label: 'Social Post', icon: MessageSquare, description: 'Instagram, Facebook, LinkedIn' },
    { id: 'ecommerce', label: 'Product Description', icon: ShoppingCart, description: 'E-commerce copy' }
  ];

  const handleGenerate = () => {
    if (!selectedBusiness || !contentType || !prompt) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`Generated ${contentType} content for: ${prompt}\n\nThis is a sample AI-generated content that would appear here. In production, this would call your AI API using the brand voice and guidelines from the selected business profile.`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          AI Content Studio
        </h1>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Generate content using your brand voice and AI
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className={`lg:col-span-1 p-6 rounded-xl border h-fit ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Configuration
          </h2>

          {/* Business Selection */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Select Business *
              </label>
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="">Choose business...</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Brand voice and guidelines will be applied
              </p>
            </div>

            {/* Content Type */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Content Type *
              </label>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      contentType === type.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className={`w-5 h-5 ${
                        contentType === type.id ? 'text-blue-500' : 'text-gray-500'
                      }`} />
                      <div>
                        <div className={`font-medium text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Generation */}
        <div className={`lg:col-span-2 p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Generate Content
          </h2>

          {/* Prompt Input */}
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              What do you want to create?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder="E.g., Write a blog post about benefits of lead automation for SMBs..."
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedBusiness || !contentType || !prompt || isGenerating}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              !selectedBusiness || !contentType || !prompt || isGenerating
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>

          {/* Generated Content */}
          {generatedContent && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Generated Content
                </h3>
                <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">
                  Copy
                </button>
              </div>
              <div className={`p-4 rounded-lg border whitespace-pre-wrap ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                {generatedContent}
              </div>
            </div>
          )}

          {!generatedContent && !isGenerating && (
            <div className="mt-8 text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Select a business, content type, and enter your prompt to generate AI content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIContentStudio;
