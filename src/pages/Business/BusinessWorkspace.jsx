import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, Search, MoreVertical, TrendingUp, Users, DollarSign, Grid, List, Trophy, Info, Edit2, Trash2, X, HardDrive, Target, CheckCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const BusinessWorkspace = () => {
  const { theme, businesses, selectBusiness, addBusiness, updateBusiness, deleteBusiness, leads } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    goals: '',
    channels: ''
  });

  // Calculate business metrics
  const calculateBusinessMetrics = (business) => {
    // Filter leads for this business (in production, leads would be associated with businessId)
    const businessLeads = leads.filter(lead => 
      lead.company?.toLowerCase().includes(business.name.toLowerCase()) ||
      lead.metadata?.businessId === business.id
    );
    
    const totalLeads = businessLeads.length;
    const convertedLeads = businessLeads.filter(lead => lead.status === 'Converted').length;
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : 0;
    
    // Revenue calculation: Sum of all converted lead deal amounts
    const revenue = businessLeads
      .filter(lead => lead.status === 'Converted' && lead.dealAmount)
      .reduce((sum, lead) => sum + lead.dealAmount, 0);
    
    // Storage calculation (KB): Estimate based on data points
    // Each lead ~5KB, each campaign ~2KB, each form ~3KB
    const leadsStorage = totalLeads * 5;
    const campaignsStorage = (business.campaigns?.length || 0) * 2;
    const formsStorage = (business.forms?.length || 0) * 3;
    const totalStorage = leadsStorage + campaignsStorage + formsStorage;
    
    return {
      totalLeads,
      convertedLeads,
      conversionRate,
      revenue,
      storageKB: totalStorage,
      storageMB: (totalStorage / 1024).toFixed(2)
    };
  };

  // Get leaderboard data
  const getLeaderboardData = () => {
    return businesses
      .map(business => ({
        ...business,
        metrics: calculateBusinessMetrics(business)
      }))
      .sort((a, b) => b.metrics.revenue - a.metrics.revenue);
  };

  const filteredBusinesses = businesses.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBusiness = (e) => {
    e.preventDefault();
    if (formData.name && formData.industry) {
      const businessData = {
        ...formData,
        goals: typeof formData.goals === 'string' 
          ? formData.goals.split(',').map(g => g.trim()).filter(Boolean)
          : formData.goals,
        channels: typeof formData.channels === 'string'
          ? formData.channels.split(',').map(c => c.trim()).filter(Boolean)
          : formData.channels
      };
      addBusiness(businessData);
      closeModal();
    }
  };

  const handleEditBusiness = (e) => {
    e.preventDefault();
    if (selectedBusiness && formData.name && formData.industry) {
      const businessData = {
        ...formData,
        goals: typeof formData.goals === 'string' 
          ? formData.goals.split(',').map(g => g.trim()).filter(Boolean)
          : formData.goals,
        channels: typeof formData.channels === 'string'
          ? formData.channels.split(',').map(c => c.trim()).filter(Boolean)
          : formData.channels
      };
      updateBusiness(selectedBusiness.id, businessData);
      closeModal();
    }
  };

  const handleDeleteBusiness = () => {
    if (selectedBusiness) {
      deleteBusiness(selectedBusiness.id);
      closeModal();
    }
  };

  const openEditModal = (business) => {
    setSelectedBusiness(business);
    setFormData({
      name: business.name,
      industry: business.industry,
      website: business.website || '',
      goals: Array.isArray(business.goals) ? business.goals.join(', ') : (business.goals || ''),
      channels: Array.isArray(business.channels) ? business.channels.join(', ') : (business.channels || '')
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (business) => {
    setSelectedBusiness(business);
    setShowDeleteConfirm(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteConfirm(false);
    setSelectedBusiness(null);
    setFormData({ name: '', industry: '', website: '', goals: '', channels: '' });
  };

  const Tooltip = ({ text }) => (
    <div className="group relative inline-block">
      <Info className={`w-4 h-4 cursor-help ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
      <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
      }`}>
        {text}
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
          theme === 'dark' ? 'border-t-gray-700' : 'border-t-gray-900'
        }`}></div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Business Workspace
            </h1>
            <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage all your business profiles and operations
            </p>
          </div>
          <Tooltip text="Manage multiple businesses from one dashboard. Track leads, revenue, and storage for each business." />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>New Business</span>
        </button>
      </div>

      {/* Business Leaderboard */}
      {businesses.length > 0 && (
        <div className={`p-6 rounded-xl border-2 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800' 
            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Business Leaderboard
              </h2>
              <Tooltip text="Rankings based on total revenue generated. Formula: Sum of all converted lead deal amounts." />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getLeaderboardData().slice(0, 3).map((business, index) => (
              <div key={business.id} className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      'bg-orange-600 text-white'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {business.name}
                      </h3>
                      <p className="text-xs text-gray-500">{business.industry}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500 text-xs">Leads</div>
                    <div className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {business.metrics.totalLeads}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Converted</div>
                    <div className={`font-bold text-green-500`}>
                      {business.metrics.convertedLeads}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Revenue</div>
                    <div className={`font-bold text-blue-500`}>
                      ${business.metrics.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Storage</div>
                    <div className={`font-bold text-purple-500`}>
                      {business.metrics.storageMB} MB
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and View Toggle */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
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
        
        <div className={`flex items-center space-x-2 p-1 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Businesses Display */}
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
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Business</span>
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => {
            const metrics = calculateBusinessMetrics(business);
            return (
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
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => openEditModal(business)}
                      className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Edit2 className="w-4 h-4 text-blue-500" />
                    </button>
                    <button 
                      onClick={() => openDeleteConfirm(business)}
                      className={`p-2 rounded-lg ${
                        theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Stats with Tooltips */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <Tooltip text="Total number of leads associated with this business" />
                    </div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.totalLeads}
                    </div>
                    <div className="text-xs text-gray-500">Leads</div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Tooltip text={`Conversion rate: ${metrics.conversionRate}%`} />
                    </div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.convertedLeads}
                    </div>
                    <div className="text-xs text-gray-500">Converted</div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <Tooltip text="Sum of all converted lead deal amounts" />
                    </div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${metrics.revenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <HardDrive className="w-4 h-4 text-purple-500" />
                      <Tooltip text="Storage: Leads (5KB each) + Campaigns (2KB) + Forms (3KB)" />
                    </div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.storageMB}
                    </div>
                    <div className="text-xs text-gray-500">MB Used</div>
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
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBusinesses.map((business) => {
            const metrics = calculateBusinessMetrics(business);
            return (
              <div
                key={business.id}
                className={`p-6 rounded-xl border flex items-center justify-between ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-500'
                } transition-all`}
              >
                <div className="flex items-center space-x-4 flex-1">
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

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.totalLeads}
                    </span>
                    <Tooltip text="Total leads" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.convertedLeads}
                    </span>
                    <Tooltip text={`${metrics.conversionRate}% conversion rate`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      ${metrics.revenue.toLocaleString()}
                    </span>
                    <Tooltip text="Total revenue" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <HardDrive className="w-4 h-4 text-purple-500" />
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {metrics.storageMB} MB
                    </span>
                    <Tooltip text="Storage used" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/business/${business.id}`}
                    onClick={() => selectBusiness(business.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Open
                  </Link>
                  <button 
                    onClick={() => openEditModal(business)}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Edit2 className="w-4 h-4 text-blue-500" />
                  </button>
                  <button 
                    onClick={() => openDeleteConfirm(business)}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Business Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {showEditModal ? 'Edit Business' : 'Add New Business'}
              </h2>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={showEditModal ? handleEditBusiness : handleAddBusiness} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Industry *
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Technology, Healthcare, Retail"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Goals (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Lead Generation, Brand Awareness, Sales"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Marketing Channels (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.channels}
                  onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Email, Social Media, SEO, PPC"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {showEditModal ? 'Update Business' : 'Create Business'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Delete Business
              </h2>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Are you sure you want to delete <span className="font-semibold">{selectedBusiness?.name}</span>? 
                This action cannot be undone.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDeleteBusiness}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessWorkspace;
