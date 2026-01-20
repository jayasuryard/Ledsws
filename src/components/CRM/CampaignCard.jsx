import React from 'react';

const CampaignCard = ({ campaign, theme, onSelectCampaign }) => {
  return (
    <div
      className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Campaign Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`text-4xl p-3 rounded-lg bg-${campaign.color}-500/10`}>
            {campaign.icon}
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {campaign.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
              theme === 'dark' ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-800'
            }`}>
              Active
            </span>
          </div>
        </div>
      </div>

      <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {campaign.description}
      </p>

      {/* Campaign Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Leads
          </span>
          <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {campaign.totalLeads}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            New Leads
          </span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {campaign.newLeads}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Qualified
          </span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
            {campaign.qualified}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Converted
          </span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
            {campaign.converted}
          </span>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Conversion Rate
          </span>
          <span className={`text-lg font-bold ${
            campaign.conversion > 15 
              ? 'text-green-500' 
              : campaign.conversion > 10 
              ? 'text-yellow-500' 
              : 'text-orange-500'
          }`}>
            {campaign.conversion.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              campaign.conversion > 15 
                ? 'bg-green-500' 
                : campaign.conversion > 10 
                ? 'bg-yellow-500' 
                : 'bg-orange-500'
            }`}
            style={{ width: `${Math.min(campaign.conversion * 4, 100)}%` }}
          />
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelectCampaign(campaign);
        }}
        className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
          theme === 'dark'
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        View Details →
      </button>
    </div>
  );
};

export default CampaignCard;
