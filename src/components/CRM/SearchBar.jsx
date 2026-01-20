import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, showFilters, setShowFilters, theme, filters }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search leads by name, email, company..."
          className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
        {(filters.status.length > 0 || filters.source.length > 0) && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500 text-white rounded-full">
            {filters.status.length + filters.source.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
