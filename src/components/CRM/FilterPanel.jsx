import React from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, theme, leadStatuses, getUniqueValues }) => {
  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Status Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Lead Status
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {leadStatuses.map((status) => (
              <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status.value)}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      status: e.target.checked
                        ? [...filters.status, status.value]
                        : filters.status.filter(s => s !== status.value)
                    });
                  }}
                  className="rounded"
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {status.icon} {status.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Source Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Lead Source
          </label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {getUniqueValues('source').map((source) => (
              <label key={source} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.source.includes(source)}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      source: e.target.checked
                        ? [...filters.source, source]
                        : filters.source.filter(s => s !== source)
                    });
                  }}
                  className="rounded"
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {source}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Score Range Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Lead Score Range
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.scoreRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                scoreRange: [filters.scoreRange[0], parseInt(e.target.value)]
              })}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {filters.scoreRange[0]}
              </span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {filters.scoreRange[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.status.length > 0 || filters.source.length > 0) && (
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={() => setFilters({
              status: [],
              source: [],
              campaign: [],
              scoreRange: [0, 100],
              dateRange: 'all'
            })}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-500 hover:text-red-400"
          >
            <X className="w-4 h-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
