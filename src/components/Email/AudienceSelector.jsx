import React, { useState } from 'react';
import { Users, Filter, X, Plus } from 'lucide-react';

const AudienceSelector = ({ theme, leads, selectedFilters, onFiltersChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const leadStatuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Inactive'];
  const sources = [...new Set(leads.map(l => l.source).filter(Boolean))];
  const tags = [...new Set(leads.flatMap(l => l.tags || []))];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...selectedFilters,
      [filterType]: value
    });
  };

  const handleArrayFilterToggle = (filterType, value) => {
    const current = selectedFilters[filterType] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({
      ...selectedFilters,
      [filterType]: updated
    });
  };

  const calculateAudienceSize = () => {
    return leads.filter(lead => {
      // Apply status filter
      if (selectedFilters.statuses?.length && !selectedFilters.statuses.includes(lead.status)) {
        return false;
      }

      // Apply source filter
      if (selectedFilters.sources?.length && !selectedFilters.sources.includes(lead.source)) {
        return false;
      }

      // Apply tags filter
      if (selectedFilters.tags?.length) {
        const hasTag = selectedFilters.tags.some(tag => lead.tags?.includes(tag));
        if (!hasTag) return false;
      }

      // Apply lead score filter
      if (selectedFilters.minScore && lead.leadScore < selectedFilters.minScore) {
        return false;
      }
      if (selectedFilters.maxScore && lead.leadScore > selectedFilters.maxScore) {
        return false;
      }

      // Apply exclude filters
      if (selectedFilters.excludeConverted && lead.status === 'Converted') {
        return false;
      }
      if (selectedFilters.excludeUnsubscribed && lead.unsubscribed) {
        return false;
      }

      return true;
    }).length;
  };

  const audienceSize = calculateAudienceSize();

  return (
    <div className="space-y-4">
      {/* Audience Size Display */}
      <div className={`p-4 rounded-lg border ${
        theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Audience Size
              </div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {audienceSize.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Filter className="w-4 h-4" />
            <span>{showAdvanced ? 'Hide' : 'Show'} Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showAdvanced && (
        <div className={`p-6 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Audience Filters
          </h3>

          {/* Lead Status Filter */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Lead Status
            </label>
            <div className="flex flex-wrap gap-2">
              {leadStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => handleArrayFilterToggle('statuses', status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFilters.statuses?.includes(status)
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Lead Source
            </label>
            <div className="flex flex-wrap gap-2">
              {sources.map(source => (
                <button
                  key={source}
                  onClick={() => handleArrayFilterToggle('sources', source)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFilters.sources?.includes(source)
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleArrayFilterToggle('tags', tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilters.tags?.includes(tag)
                        ? 'bg-green-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lead Score Range */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Lead Score Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min Score"
                value={selectedFilters.minScore || ''}
                onChange={(e) => handleFilterChange('minScore', e.target.value ? parseInt(e.target.value) : null)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <input
                type="number"
                placeholder="Max Score"
                value={selectedFilters.maxScore || ''}
                onChange={(e) => handleFilterChange('maxScore', e.target.value ? parseInt(e.target.value) : null)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Exclude Options */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Exclude
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.excludeConverted || false}
                  onChange={(e) => handleFilterChange('excludeConverted', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Converted Leads
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.excludeUnsubscribed || false}
                  onChange={(e) => handleFilterChange('excludeUnsubscribed', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Unsubscribed
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.excludeDoNotContact || false}
                  onChange={(e) => handleFilterChange('excludeDoNotContact', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Do-Not-Contact
                </span>
              </label>
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={() => onFiltersChange({})}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
