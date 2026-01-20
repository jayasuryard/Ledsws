import React from 'react';

const LeadsTable = ({ leads, theme, onViewDetails }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getStatusStyle = (status) => {
    const styles = {
      'New': 'bg-blue-500/20 text-blue-400',
      'Contacted': 'bg-yellow-500/20 text-yellow-400',
      'Engaged': 'bg-purple-500/20 text-purple-400',
      'Qualified': 'bg-green-500/20 text-green-400',
      'Opportunity': 'bg-orange-500/20 text-orange-400',
      'Converted': 'bg-emerald-500/20 text-emerald-400',
      'Unqualified': 'bg-gray-500/20 text-gray-400',
      'Lost': 'bg-red-500/20 text-red-400',
      'Inactive': 'bg-slate-500/20 text-slate-400'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-gray-200'}`}>
            {leads.map((lead) => (
              <tr key={lead.id} className={`transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
              }`}>
                {/* Lead Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {lead.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {lead.name}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          {lead.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Source */}
                <td className="px-6 py-4">
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {lead.source || '-'}
                  </div>
                  {lead.metadata?.formName && (
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      via {lead.metadata.formName}
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>

                {/* Score */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={`text-2xl font-bold ${getScoreColor(lead.leadScore)}`}>
                      {lead.leadScore || 0}
                    </div>
                  </div>
                </td>

                {/* Assigned To */}
                <td className="px-6 py-4">
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {lead.assignedTo || 'Unassigned'}
                  </div>
                </td>

                {/* Campaign ID */}
                <td className="px-6 py-4">
                  <div className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {lead.campaignId || '-'}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(lead)}
                    className="text-sm text-blue-500 hover:text-blue-400 font-medium transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            No leads found
          </p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Try adjusting your filters or add a new lead
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
