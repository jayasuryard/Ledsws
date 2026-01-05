import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, Search, MoreVertical, TrendingUp, Users, DollarSign } from 'lucide-react';
import useStore from '../../store/useStore';

const BusinessWorkspace = () => {
  const { theme, businesses, selectBusiness } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Business Workspace
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage all your business profiles and operations
          </p>
        </div>
        <Link
          to="/businesses/new"
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>New Business</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search businesses..."
          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>

      {/* Businesses Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className={`p-12 rounded-xl border text-center ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {searchTerm ? 'No businesses found' : 'No businesses yet'}
          </h3>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {searchTerm ? 'Try adjusting your search' : 'Create your first business to get started'}
          </p>
          {!searchTerm && (
            <Link
              to="/businesses/new"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Business</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className={`p-6 rounded-xl border transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 hover:border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {business.name}
                    </h3>
                    <p className="text-xs text-gray-500">{business.industry}</p>
                  </div>
                </div>
                <button className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <TrendingUp className="w-4 h-4 text-blue-500 mb-1" />
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {Math.floor(Math.random() * 100)}
                  </div>
                  <div className="text-xs text-gray-500">Leads</div>
                </div>
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <Users className="w-4 h-4 text-purple-500 mb-1" />
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {Math.floor(Math.random() * 50)}
                  </div>
                  <div className="text-xs text-gray-500">Contacts</div>
                </div>
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <DollarSign className="w-4 h-4 text-green-500 mb-1" />
                  <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${Math.floor(Math.random() * 10000)}
                  </div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </div>

              {/* Goals & Channels */}
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-1">
                  {business.goals?.slice(0, 3).map((goal, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <Link
                to={`/business/${business.id}`}
                onClick={() => selectBusiness(business.id)}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Open Dashboard
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessWorkspace;
