import React, { useState } from 'react';
import { Palette, Wand2, Download, Upload, Eye, Save, ArrowLeft, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../../store/useStore';

const BrandKit = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);

  const brandColors = [
    { name: 'Primary', hex: '#3B82F6', usage: 'Main brand color' },
    { name: 'Secondary', hex: '#8B5CF6', usage: 'Accent color' },
    { name: 'Success', hex: '#10B981', usage: 'Positive actions' },
    { name: 'Warning', hex: '#F59E0B', usage: 'Alerts' },
    { name: 'Danger', hex: '#EF4444', usage: 'Errors' },
    { name: 'Dark', hex: '#1F2937', usage: 'Text & backgrounds' }
  ];

  const fonts = [
    { name: 'Inter', usage: 'Headings', weight: 'Bold', size: '32-48px' },
    { name: 'Inter', usage: 'Body Text', weight: 'Regular', size: '16px' },
    { name: 'Inter', usage: 'Captions', weight: 'Medium', size: '12-14px' }
  ];

  const aiPersona = {
    tone: 'Professional yet friendly',
    voice: 'Confident, helpful, and approachable',
    style: 'Clear, concise, and action-oriented',
    keywords: ['innovative', 'reliable', 'customer-focused', 'results-driven']
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <Link
          to={`/business/${businessId}`}
          className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Business Workspace</span>
        </Link>
        <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Brand Kit</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Brand Kit & AI Persona
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Define your brand identity
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700">
          <Download className="w-5 h-5" />
          <span>Export Brand Kit</span>
        </button>
      </div>

      {/* Logo Section */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Logo & Assets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Primary Logo', 'Secondary Logo', 'Icon'].map((type, idx) => (
            <div key={idx} className={`p-8 rounded-lg border-2 border-dashed text-center ${
              theme === 'dark' ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
              <div className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {type}
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Upload
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Colors */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Brand Colors
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <Wand2 className="w-4 h-4" />
            <span>AI Generate</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandColors.map((color, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div
                className="w-full h-24 rounded-lg mb-3 cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color.hex }}
              />
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {color.name}
              </div>
              <div className="font-mono text-sm text-gray-500 mb-2">
                {color.hex}
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {color.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Typography
        </h2>
        <div className="space-y-6">
          {fonts.map((font, idx) => (
            <div key={idx} className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {font.name} - {font.weight}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {font.usage} • {font.size}
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Download Font
                </button>
              </div>
              <div className={`text-4xl ${font.weight === 'Bold' ? 'font-bold' : font.weight === 'Medium' ? 'font-medium' : 'font-normal'} ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                The quick brown fox jumps
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Persona */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            AI Brand Persona
          </h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Brand Tone
            </label>
            <textarea
              defaultValue={aiPersona.tone}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Brand Voice
            </label>
            <textarea
              defaultValue={aiPersona.voice}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Writing Style
            </label>
            <textarea
              defaultValue={aiPersona.style}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Key Brand Keywords
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {aiPersona.keywords.map((keyword, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add new keyword..."
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>
        </div>

        <div className={`mt-6 p-4 rounded-lg ${
          theme === 'dark' ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
        }`}>
          <div className="flex items-start space-x-3">
            <Wand2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>
                AI-Powered Content Generation
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>
                Your brand persona will be used by the AI to generate content that matches your brand voice, tone, and style across all marketing channels.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Brand Preview
        </h2>
        <div className={`p-8 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">{business?.name?.charAt(0)}</span>
            </div>
            <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {business?.name}
            </h1>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {aiPersona.tone} - {aiPersona.voice}
            </p>
            <div className="flex items-center justify-center space-x-2">
              {brandColors.slice(0, 5).map((color, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandKit;
