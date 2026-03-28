import React, { useState } from 'react';
import { 
  Mail, Search, Filter, Plus, Eye, Copy, Edit, Trash2,
  Star, TrendingUp, Users, ChevronDown, X, Check
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

const TemplateLibrary = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { theme, businesses, emailTemplates } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const categories = [
    'all',
    'Onboarding',
    'Promotion',
    'Newsletter',
    'E-commerce',
    'Re-engagement',
    'Event'
  ];

  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const TemplatePreviewModal = ({ template, onClose, onUse }) => {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className={`max-w-3xl w-full max-h-[90vh] rounded-xl overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`p-6 border-b ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500">{template.category}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Subject Line */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Subject Line
              </label>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <p className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {template.subject}
                </p>
              </div>
            </div>

            {/* Preview Text */}
            {template.previewText && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Preview Text
                </label>
                <div className={`p-4 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <p className="text-gray-400 text-sm">{template.previewText}</p>
                </div>
              </div>
            )}

            {/* Email Body */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Body
              </label>
              <div className={`p-6 rounded-lg border whitespace-pre-wrap ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                {template.body}
              </div>
            </div>

            {/* Usage Stats */}
            <div className={`mt-6 p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    Used {template.usage} times
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-500">
                    Popular template
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-6 border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className={`flex-1 px-6 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                    : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUse(template);
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-navy-900 text-white rounded-lg hover:bg-navy-800 font-semibold"
              >
                Use Template
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleUseTemplate = (template) => {
    // Navigate to campaign builder with template
    navigate(`/business/${businessId}/email/campaign/new?template=${template.id}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Email Template Library
            </h1>
            <p className="text-gray-500">
              {filteredTemplates.length} templates • {business?.name || 'Your Business'}
            </p>
          </div>
          <button className="px-6 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-4 py-3 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 text-white'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className={`p-6 rounded-xl border cursor-pointer transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 hover:border-blue-600'
                : 'bg-white border-gray-200 hover:border-blue-500'
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            {/* Template Icon/Emoji */}
            <div className="w-16 h-16 rounded-xl bg-navy-900 flex items-center justify-center text-3xl mb-4">
              {template.thumbnail}
            </div>

            {/* Category Badge */}
            <div className="mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
              }`}>
                {template.category}
              </span>
            </div>

            {/* Template Name */}
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {template.name}
            </h3>

            {/* Subject Preview */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {template.subject}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-500">
                <Users className="w-4 h-4" />
                <span>{template.usage} uses</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template);
                  }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseTemplate(template);
                  }}
                  className="text-green-500 hover:text-green-400"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-500 opacity-50 mx-auto mb-4" />
          <h3 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            No templates found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onUse={handleUseTemplate}
        />
      )}
    </div>
  );
};

export default TemplateLibrary;
