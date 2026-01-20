import React from 'react';
import { Target, Users, TrendingUp, Zap } from 'lucide-react';

const StatsOverview = ({ campaigns, leads, theme }) => {
  const avgConversion = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length).toFixed(1)
    : 0;

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Campaigns
          </span>
          <Target className="w-5 h-5 text-blue-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {campaigns.length}
        </p>
        <p className="text-sm text-green-500 mt-1">All active</p>
      </div>

      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Leads
          </span>
          <Users className="w-5 h-5 text-purple-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {leads.length}
        </p>
        <p className="text-sm text-blue-500 mt-1">Across all campaigns</p>
      </div>

      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg Conversion
          </span>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {avgConversion}%
        </p>
        <p className="text-sm text-green-500 mt-1">+2.4% this month</p>
      </div>

      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            New This Week
          </span>
          <Zap className="w-5 h-5 text-orange-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {newLeadsCount}
        </p>
        <p className="text-sm text-orange-500 mt-1">Needs attention</p>
      </div>
    </div>
  );
};

export default StatsOverview;
