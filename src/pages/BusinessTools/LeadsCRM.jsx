import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Mail, Phone, Building, Tag,
  TrendingUp, Eye, X, Calendar, Activity, MousePointer, FileText,
  Star, ChevronDown, Download, MoreVertical, Edit, Trash2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

const LeadsCRM = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { theme, businesses, leads, emailEvents } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter leads
const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesScore = scoreFilter === 'all' ||
      (scoreFilter === 'hot' && lead.leadScore >= 80) ||
      (scoreFilter === 'warm' && lead.leadScore >= 50 && lead.leadScore < 80) ||
      (scoreFilter === 'cold' && lead.leadScore < 50);
    
    return matchesSearch && matchesStatus && matchesScore;
  });

  // Status colors
  const getStatusColor = (status) => {
    const colors = {
      'New': 'blue',
      'Contacted': 'purple',
      'Qualified': 'green',
      'Engaged': 'yellow',
      'Proposal Sent': 'orange',
      'Converted': 'green',
      'Cold': 'gray'
    };
    return colors[status] || 'blue';
  };

  // Score badge color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 bg-green-500/20';
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/20';
    return 'text-red-500 bg-red-500/20';
  };

  // Mock activity timeline for selected lead
  const getLeadActivity = (leadId) => {
    return [
      { id: 1, type: 'email_open', title: 'Opened: Summer Sale Email', time: '2 hours ago', icon: Eye, color: 'blue' },
      { id: 2, type: 'email_click', title: 'Clicked: Product Link', time: '5 hours ago', icon: MousePointer, color: 'purple' },
      { id: 3, type: 'form_submit', title: 'Submitted: Contact Form', time: '2 days ago', icon: FileText, color: 'green' },
      { id: 4, type: 'email_open', title: 'Opened: Welcome Email', time: '3 days ago', icon: Eye, color: 'blue' },
      { id: 5, type: 'page_visit', title: 'Visited: Pricing Page', time: '3 days ago', icon: Activity, color: 'orange' }
    ];
  };

  const LeadDetailDrawer = ({ lead, onClose }) => {
    const activity = getLeadActivity(lead.id);
    const statusColor = getStatusColor(lead.status);

    return (
      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-gray-900 border-l border-gray-800 shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{lead.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-500/20 text-${statusColor}-500 border border-${statusColor}-500/30`}>
              {lead.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.leadScore)}`}>
              Score: {lead.leadScore}
            </span>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="font-semibold text-white mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-gray-300">{lead.email}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-300">{lead.phone}</span>
              </div>
            )}
            {lead.company && (
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-gray-300">{lead.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {lead.tags && lead.tags.length > 0 && (
          <div className="p-6 border-b border-gray-800">
            <h3 className="font-semibold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {lead.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs border border-purple-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lead Score Breakdown */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="font-semibold text-white mb-4">Lead Score Breakdown</h3>
          <div className="space-y-3">
            <div
              className="flex items-center justify-between"
            >
              <span className="text-gray-400 text-sm">Email Engagement</span>
              <span className="text-green-400 font-medium">+25</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Form Submissions</span>
              <span className="text-green-400 font-medium">+15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Page Visits</span>
              <span className="text-green-400 font-medium">+10</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Company Size</span>
              <span className="text-yellow-400 font-medium">+20</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Budget Qualification</span>
              <span className="text-green-400 font-medium">+15</span>
            </div>
            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              <span className="text-white font-semibold">Total Score</span>
              <span className={`font-bold text-lg ${
                lead.leadScore >= 80 ? 'text-green-400' :
                lead.leadScore >= 50 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {lead.leadScore}
              </span>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="p-6">
          <h3 className="font-semibold text-white mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            {activity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.color === 'blue' ? 'bg-blue-500/20' :
                    item.color === 'purple' ? 'bg-purple-500/20' :
                    item.color === 'green' ? 'bg-green-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      item.color === 'blue' ? 'text-blue-500' :
                      item.color === 'purple' ? 'text-purple-500' :
                      item.color === 'green' ? 'text-green-500' :
                      'text-orange-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
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
              Leads & Contacts
            </h1>
            <p className="text-gray-500">
              {filteredLeads.length} leads • {business?.name || 'Your Business'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                  : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, or company..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className={`mt-4 p-4 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Converted">Converted</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Lead Score</label>
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="all">All Scores</option>
                  <option value="hot">Hot (80+)</option>
                  <option value="warm">Warm (50-79)</option>
                  <option value="cold">Cold (&lt;50)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} bg-gray-800/50`}>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Company</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Score</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Source</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Tags</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const statusColor = getStatusColor(lead.status);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`border-b ${
                      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    } hover:bg-gray-800/50 cursor-pointer transition-colors`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {lead.name?.charAt(0)}
                        </div>
                        <div>
                          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {lead.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">{lead.email}</td>
                    <td className="py-4 px-6 text-gray-400">{lead.company || '-'}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.leadScore)}`}>
                          {lead.leadScore}
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-500/20 text-${statusColor}-500 border border-${statusColor}-500/30`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400">{lead.source}</td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags?.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {lead.tags?.length > 2 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                            +{lead.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="text-blue-500 hover:text-blue-400"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-500 hover:text-gray-400"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <LeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
};

export default LeadsCRM;
