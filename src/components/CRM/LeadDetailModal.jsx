import React from 'react';
import { X, User, Mail, Phone, Globe, BarChart3, Clock, AlertCircle, Tag, Building2, Calendar } from 'lucide-react';

const LeadDetailModal = ({ lead, onClose, theme, leadStatuses, teamMembers, handleStatusChange }) => {
  if (!lead) return null;

  // Helper to format field names nicely
  const formatFieldName = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Helper to render field value
  const renderFieldValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value || '-';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' 
            : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
        }`}>
          <div className="relative p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{lead.name}</h2>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{lead.email || 'No email'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{lead.phone || 'No phone'}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lead.status === 'Converted' ? 'bg-green-500/30 text-green-100 border border-green-400/30' :
                      lead.status === 'Qualified' ? 'bg-blue-500/30 text-blue-100 border border-blue-400/30' :
                      lead.status === 'Contacted' ? 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/30' :
                      'bg-white/20 text-white border border-white/30'
                    }`}>
                      {lead.status}
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-160px)] overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <InfoCard icon={Mail} label="Email" value={lead.email} theme={theme} />
            <InfoCard icon={Phone} label="Phone" value={lead.phone} theme={theme} />
            <InfoCard icon={Building2} label="Company" value={lead.company} theme={theme} />
            <InfoCard icon={BarChart3} label="Lead Score" value={lead.leadScore} theme={theme} />
            <InfoCard icon={Globe} label="Source" value={lead.source} theme={theme} />
            <InfoCard icon={Clock} label="Campaign ID" value={lead.campaignId} theme={theme} />
          </div>

          {/* Lead Metadata / Context */}
          {lead.metadata && Object.keys(lead.metadata).length > 0 && (
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
            }`}>
              <div className="flex items-start space-x-3 mb-4">
                <Globe className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Lead Context & Attribution
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Automatically captured submission details
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(lead.metadata).map(([key, value]) => (
                  <div key={key} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                    <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {formatFieldName(key)}
                    </div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {renderFieldValue(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Fields Section - Form Filled Details */}
          {lead.customFields && Object.keys(lead.customFields).length > 0 && (
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-800' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
            }`}>
              <div className="flex items-start space-x-3 mb-4">
                <BarChart3 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    📋 Form Submission Details
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    All custom fields filled by the user during form submission
                  </p>
                </div>
              </div>
              
              {/* Table view for custom fields */}
              <div className={`overflow-hidden rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                <table className="w-full">
                  <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Field Name
                      </th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        User Response
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {Object.entries(lead.customFields).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 
                        ? (theme === 'dark' ? 'bg-gray-800/30' : 'bg-white') 
                        : (theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50')
                      }>
                        <td className={`px-4 py-3 text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {formatFieldName(key)}
                        </td>
                        <td className={`px-4 py-3 text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          <div className="flex items-start">
                            <span className="break-words">{renderFieldValue(value)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tags */}
          {lead.tags && lead.tags.length > 0 && (
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-4 h-4 text-purple-500" />
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag, idx) => (
                  <span key={idx} className={`px-3 py-1 text-xs font-medium rounded-full ${
                    theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status History */}
          {lead.statusHistory && lead.statusHistory.length > 0 && (
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-800' : 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'
            }`}>
              <div className="flex items-start space-x-3 mb-4">
                <Clock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Status History
                  </h3>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Track the lead's journey through the pipeline
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {lead.statusHistory.map((history, index) => (
                  <div key={index} className={`flex items-start space-x-3 p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      history.status === 'Converted' ? 'bg-green-500' :
                      history.status === 'Qualified' ? 'bg-blue-500' :
                      history.status === 'Contacted' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {history.status}
                        </span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          {new Date(history.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {history.changedBy && (
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Changed by: {history.changedBy}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info Grid */}
          {(lead.createdAt || lead.lastContact || lead.dealAmount) && (
            <div className="grid grid-cols-3 gap-4">
              {lead.createdAt && (
                <InfoCard 
                  icon={Calendar} 
                  label="Created At" 
                  value={new Date(lead.createdAt).toLocaleDateString()} 
                  theme={theme} 
                />
              )}
              {lead.lastContact && (
                <InfoCard 
                  icon={Clock} 
                  label="Last Contact" 
                  value={lead.lastContact} 
                  theme={theme} 
                />
              )}
              {lead.dealAmount && (
                <InfoCard 
                  icon={BarChart3} 
                  label="Deal Amount" 
                  value={`$${lead.dealAmount}`} 
                  theme={theme} 
                />
              )}
            </div>
          )}

          {/* Status Change */}
          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Change Status
            </label>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(lead, e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-900 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {leadStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.icon} {status.label} - {status.description}
                </option>
              ))}
            </select>
          </div>

          {/* Lead Response Summary Table */}
          <div className={`p-5 rounded-xl border-2 ${
            theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-800' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'
          }`}>
            <div className="flex items-start space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  📊 Complete Lead Response
                </h3>
                <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  All information captured from this lead
                </p>
              </div>
            </div>
            
            <div className={`overflow-hidden rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}>
                  <tr>
                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Field
                    </th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Response
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {/* Basic Information */}
                  <tr className={theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lead.name}
                    </td>
                  </tr>
                  <tr className={theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lead.email}
                    </td>
                  </tr>
                  <tr className={theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lead.phone || '-'}
                    </td>
                  </tr>
                  {lead.company && (
                    <tr className={theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}>
                      <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Company
                      </td>
                      <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {lead.company}
                      </td>
                    </tr>
                  )}
                  
                  {/* Custom Fields Responses */}
                  {lead.customFields && Object.entries(lead.customFields).map(([key, value], index) => (
                    <tr key={key} className={index % 2 === 0 
                      ? (theme === 'dark' ? 'bg-gray-800/30' : 'bg-white') 
                      : (theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50')
                    }>
                      <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formatFieldName(key)}
                      </td>
                      <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {renderFieldValue(value)}
                      </td>
                    </tr>
                  ))}

                  {/* Lead Metadata */}
                  <tr className={theme === 'dark' ? 'bg-cyan-900/20' : 'bg-cyan-50'}>
                    <td colSpan={2} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>
                      Lead Source & Tracking
                    </td>
                  </tr>
                  <tr className={theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Source
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lead.source}
                    </td>
                  </tr>
                  <tr className={theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Campaign ID
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {lead.campaignId}
                    </td>
                  </tr>
                  <tr className={theme === 'dark' ? 'bg-gray-800/30' : 'bg-white'}>
                    <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Lead Score
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <span className="inline-flex items-center">
                        {lead.leadScore}
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                          lead.leadScore >= 80 ? 'bg-green-500/20 text-green-400' :
                          lead.leadScore >= 60 ? 'bg-blue-500/20 text-blue-400' :
                          lead.leadScore >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {lead.leadScore >= 80 ? 'Hot' :
                           lead.leadScore >= 60 ? 'Warm' :
                           lead.leadScore >= 40 ? 'Cold' : 'Very Cold'}
                        </span>
                      </span>
                    </td>
                  </tr>
                  {lead.assignedTo && (
                    <tr className={theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}>
                      <td className={`px-4 py-3 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Assigned To
                      </td>
                      <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {teamMembers?.find(m => m.id.toString() === lead.assignedTo?.toString())?.name || lead.assignedTo}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, theme }) => (
  <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
    <div className="flex items-center space-x-2 mb-2">
      <Icon className="w-4 h-4 text-blue-500" />
      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
    </div>
    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {value || '-'}
    </div>
  </div>
);

export default LeadDetailModal;
