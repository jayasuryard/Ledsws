import React, { useState } from 'react';
import { Plus, Search, Filter, User, Mail, Phone, Calendar, TrendingUp } from 'lucide-react';
import useStore from '../../store/useStore';

const CRMPipeline = () => {
  const { theme, leads, addLead, updateLead } = useStore();
  const [view, setView] = useState('pipeline'); // 'pipeline' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', stage: 'new' });

  const stages = [
    { id: 'new', label: 'New', color: 'blue', count: 12 },
    { id: 'contacted', label: 'Contacted', color: 'yellow', count: 8 },
    { id: 'qualified', label: 'Qualified', color: 'purple', count: 5 },
    { id: 'proposal', label: 'Proposal', color: 'orange', count: 3 },
    { id: 'converted', label: 'Converted', color: 'green', count: 15 }
  ];

  const handleAddLead = () => {
    if (newLead.name && newLead.email) {
      addLead(newLead);
      setNewLead({ name: '', email: '', phone: '', stage: 'new' });
      setShowAddLead(false);
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      blue: 'bg-blue-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500'
    };
    return colors[stage] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Lead CRM Pipeline
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track your leads through the sales funnel
          </p>
        </div>
        <button
          onClick={() => setShowAddLead(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('pipeline')}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              view === 'pipeline'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            List
          </button>
          <button className={`p-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
          }`}>
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Add New Lead
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <input
                type="email"
                placeholder="Email *"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleAddLead}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Add Lead
                </button>
                <button
                  onClick={() => setShowAddLead(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline View */}
      {view === 'pipeline' ? (
        <div className="grid grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-3">
              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } border border-gray-800`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stage.label}
                  </h3>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getStageColor(stage.color)}`}>
                    {stage.count}
                  </span>
                </div>
              </div>
              
              {/* Lead Cards */}
              <div className="space-y-2">
                {leads.filter(l => l.stage === stage.id).slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-lg border cursor-pointer hover:scale-105 transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-800 hover:border-blue-500'
                        : 'bg-white border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm truncate ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {lead.name}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className={`rounded-xl border overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No leads yet. Click "Add Lead" to get started.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.stage === 'converted' ? 'bg-green-500/20 text-green-500' :
                        lead.stage === 'contacted' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-blue-500/20 text-blue-500'
                      }`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-white font-semibold">{lead.score || 75}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CRMPipeline;
