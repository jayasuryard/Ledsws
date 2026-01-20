import React, { useState } from 'react';
import { Plus, Search, Filter, User, Mail, Phone, Calendar, TrendingUp, Tag, FileText, Globe, MapPin, Clock, Award, ChevronDown, X, ArrowLeft, BarChart3, Users, Target, Zap, Activity, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const CRMPipeline = () => {
  const { theme, leads, addLead, updateLead, teamMembers } = useStore();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDealAmountDialog, setShowDealAmountDialog] = useState(false);
  const [dealAmount, setDealAmount] = useState('');
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [view, setView] = useState('list'); // 'pipeline' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddLead, setShowAddLead] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    source: [],
    campaign: [],
    scoreRange: [0, 100],
    dateRange: 'all' // 'all', 'today', 'week', 'month', 'custom'
  });

  // Mock campaigns data - would come from API/store in production
  const campaigns = [
    {
      id: 1,
      name: 'Website Contact Forms',
      description: 'Leads from website contact forms',
      leads: leads.filter(l => l.source?.includes('Website') || l.source?.includes('Form')),
      status: 'active',
      startDate: '2024-01-01',
      conversion: 12.5,
      totalLeads: leads.filter(l => l.source?.includes('Website') || l.source?.includes('Form')).length,
      newLeads: leads.filter(l => l.source?.includes('Website') && l.status === 'New').length,
      qualified: leads.filter(l => l.source?.includes('Website') && l.status === 'Qualified').length,
      converted: leads.filter(l => l.source?.includes('Website') && l.status === 'Converted').length,
      icon: '🌐',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Email Marketing Campaign',
      description: 'Leads from email newsletters and campaigns',
      leads: leads.filter(l => l.source?.includes('Email') || l.source?.includes('Newsletter')),
      status: 'active',
      startDate: '2024-02-01',
      conversion: 8.3,
      totalLeads: leads.filter(l => l.source?.includes('Email') || l.source?.includes('Newsletter')).length,
      newLeads: leads.filter(l => l.source?.includes('Email') && l.status === 'New').length,
      qualified: leads.filter(l => l.source?.includes('Email') && l.status === 'Qualified').length,
      converted: leads.filter(l => l.source?.includes('Email') && l.status === 'Converted').length,
      icon: '📧',
      color: 'purple'
    },
    {
      id: 3,
      name: 'Social Media Outreach',
      description: 'Leads from social media platforms',
      leads: leads.filter(l => l.source?.includes('Social') || l.source?.includes('Facebook') || l.source?.includes('LinkedIn')),
      status: 'active',
      startDate: '2024-01-15',
      conversion: 15.7,
      totalLeads: leads.filter(l => l.source?.includes('Social') || l.source?.includes('Facebook') || l.source?.includes('LinkedIn')).length,
      newLeads: leads.filter(l => (l.source?.includes('Social') || l.source?.includes('Facebook')) && l.status === 'New').length,
      qualified: leads.filter(l => (l.source?.includes('Social') || l.source?.includes('LinkedIn')) && l.status === 'Qualified').length,
      converted: leads.filter(l => l.source?.includes('Social') && l.status === 'Converted').length,
      icon: '📱',
      color: 'pink'
    },
    {
      id: 4,
      name: 'Paid Advertising',
      description: 'Leads from Google Ads and paid campaigns',
      leads: leads.filter(l => l.source?.includes('Ads') || l.source?.includes('Google') || l.source?.includes('PPC')),
      status: 'active',
      startDate: '2024-03-01',
      conversion: 18.2,
      totalLeads: leads.filter(l => l.source?.includes('Ads') || l.source?.includes('Google') || l.source?.includes('PPC')).length,
      newLeads: leads.filter(l => (l.source?.includes('Ads') || l.source?.includes('Google')) && l.status === 'New').length,
      qualified: leads.filter(l => l.source?.includes('Ads') && l.status === 'Qualified').length,
      converted: leads.filter(l => l.source?.includes('Google') && l.status === 'Converted').length,
      icon: '🎯',
      color: 'orange'
    },
    {
      id: 5,
      name: 'Referral Program',
      description: 'Leads from customer referrals',
      leads: leads.filter(l => l.source?.includes('Referral') || l.source?.includes('Partner')),
      status: 'active',
      startDate: '2024-02-15',
      conversion: 25.4,
      totalLeads: leads.filter(l => l.source?.includes('Referral') || l.source?.includes('Partner')).length,
      newLeads: leads.filter(l => l.source?.includes('Referral') && l.status === 'New').length,
      qualified: leads.filter(l => l.source?.includes('Referral') && l.status === 'Qualified').length,
      converted: leads.filter(l => l.source?.includes('Partner') && l.status === 'Converted').length,
      icon: '🤝',
      color: 'green'
    },
    {
      id: 6,
      name: 'All Leads',
      description: 'View all leads from all sources',
      leads: leads,
      status: 'active',
      startDate: '2024-01-01',
      conversion: leads.filter(l => l.status === 'Converted').length / (leads.length || 1) * 100,
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'New').length,
      qualified: leads.filter(l => l.status === 'Qualified').length,
      converted: leads.filter(l => l.status === 'Converted').length,
      icon: '📊',
      color: 'indigo'
    }
  ];

  // Lead Status options with system logic
  const leadStatuses = [
    { 
      value: 'New', 
      label: 'New', 
      color: 'blue', 
      description: 'Just entered, no human action yet',
      icon: '🆕'
    },
    { 
      value: 'Contacted', 
      label: 'Contacted', 
      color: 'yellow', 
      description: 'At least one interaction recorded',
      icon: '📞'
    },
    { 
      value: 'Engaged', 
      label: 'Engaged', 
      color: 'purple', 
      description: 'Showing intent through replies/clicks',
      icon: '💬'
    },
    { 
      value: 'Qualified', 
      label: 'Qualified', 
      color: 'green', 
      description: 'Meets qualification criteria',
      icon: '✅'
    },
    { 
      value: 'Opportunity', 
      label: 'Opportunity', 
      color: 'orange', 
      description: 'Actively in sales conversation',
      icon: '💼'
    },
    { 
      value: 'Converted', 
      label: 'Converted', 
      color: 'emerald', 
      description: 'Successfully converted to customer',
      icon: '🎉'
    },
    { 
      value: 'Unqualified', 
      label: 'Unqualified', 
      color: 'gray', 
      description: 'Does not meet criteria',
      icon: '❌'
    },
    { 
      value: 'Lost', 
      label: 'Lost', 
      color: 'red', 
      description: 'Qualified but did not convert',
      icon: '😔'
    },
    { 
      value: 'Inactive', 
      label: 'Inactive', 
      color: 'slate', 
      description: 'No response after multiple attempts',
      icon: '💤'
    }
  ];

  const getStatusColor = (status) => {
    const statusObj = leadStatuses.find(s => s.value === status);
    return statusObj?.color || 'gray';
  };

  const getStatusIcon = (status) => {
    const statusObj = leadStatuses.find(s => s.value === status);
    return statusObj?.icon || '📋';
  };

  // Handle status change with deal amount prompt for Converted status
  const handleStatusChange = (lead, newStatus) => {
    if (newStatus === 'Converted') {
      // Show deal amount dialog before marking as converted
      setLeadToConvert({ ...lead, newStatus });
      setShowDealAmountDialog(true);
    } else {
      // Update status directly
      const updates = { status: newStatus };
      
      // Set firstContactTimestamp when status changes from New to Contacted
      if (lead.status === 'New' && newStatus === 'Contacted') {
        updates.metadata = {
          ...lead.metadata,
          firstContactTimestamp: new Date().toISOString()
        };
      }
      
      updateLead(lead.id, updates);
    }
  };

  // Confirm conversion with deal amount
  const confirmConversion = () => {
    if (leadToConvert && dealAmount) {
      updateLead(leadToConvert.id, {
        status: 'Converted',
        dealAmount: parseFloat(dealAmount),
        convertedAt: new Date().toISOString(),
        metadata: {
          ...leadToConvert.metadata,
          conversionDate: new Date().toLocaleString(),
          dealValue: parseFloat(dealAmount)
        }
      });
      setShowDealAmountDialog(false);
      setDealAmount('');
      setLeadToConvert(null);
    }
  };

  // Follow-up discipline tracking
  const getFollowUpStatus = (lead) => {
    // Only track for New leads that haven't been contacted
    if (lead.status !== 'New' || !lead.metadata?.timestamp) {
      return null;
    }

    const submissionTime = new Date(lead.metadata.timestamp);
    const now = new Date();
    const hoursSinceSubmission = (now - submissionTime) / (1000 * 60 * 60);
    const followUpThreshold = 24; // hours - should come from form config

    if (lead.metadata.firstContactTimestamp) {
      const contactTime = new Date(lead.metadata.firstContactTimestamp);
      const hoursToContact = (contactTime - submissionTime) / (1000 * 60 * 60);
      
      if (hoursToContact <= followUpThreshold) {
        return {
          status: 'on-time',
          icon: '✅',
          text: `Contacted within ${Math.round(hoursToContact)}h`,
          color: 'green'
        };
      } else {
        return {
          status: 'late',
          icon: '⚠️',
          text: `Contacted after ${Math.round(hoursToContact)}h`,
          color: 'yellow'
        };
      }
    }

    if (hoursSinceSubmission > followUpThreshold) {
      return {
        status: 'overdue',
        icon: '🚨',
        text: `No contact - ${Math.round(hoursSinceSubmission)}h ago`,
        color: 'red'
      };
    }

    return {
      status: 'pending',
      icon: '⏳',
      text: `${Math.round(hoursSinceSubmission)}h ago - ${Math.round(followUpThreshold - hoursSinceSubmission)}h left`,
      color: 'blue'
    };
  };

  // Dynamic column detection from leads
  const getDynamicColumns = () => {
    if (!leads || leads.length === 0) return [];
    
    const allKeys = new Set();
    const standardKeys = ['id', 'name', 'email', 'phone', 'company', 'source', 'status', 'stage', 'tags', 'leadScore', 'metadata', 'createdAt', 'updatedAt'];
    
    leads.forEach(lead => {
      Object.keys(lead).forEach(key => {
        if (!standardKeys.includes(key)) {
          allKeys.add(key);
        }
      });
    });
    
    return Array.from(allKeys);
  };

  const dynamicColumns = getDynamicColumns();

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch = 
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.company?.toLowerCase().includes(search) ||
        lead.phone?.includes(search);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(lead.status)) {
      return false;
    }

    // Source filter
    if (filters.source.length > 0 && !filters.source.includes(lead.source)) {
      return false;
    }

    // Score range filter
    if (lead.leadScore < filters.scoreRange[0] || lead.leadScore > filters.scoreRange[1]) {
      return false;
    }

    return true;
  });

  // Get unique values for filter options
  const getUniqueValues = (key) => {
    return [...new Set(leads.map(lead => lead[key]).filter(Boolean))];
  };

  return (
    <div className="space-y-6">
      {/* Campaign Selection View */}
      {!selectedCampaign ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Lead CRM Pipeline
              </h1>
              <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Select a campaign to view leads and analytics
              </p>
            </div>
          </div>

          {/* Campaign Stats Overview */}
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
                {(campaigns.reduce((sum, c) => sum + c.conversion, 0) / campaigns.length).toFixed(1)}%
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
                {leads.filter(l => l.status === 'New').length}
              </p>
              <p className="text-sm text-orange-500 mt-1">Needs attention</p>
            </div>
          </div>

          {/* Campaign Blocks */}
          <div>
            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Your Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
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
                    className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Campaign Details View - Existing Table & Analytics */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedCampaign(null)}
                className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedCampaign.icon}</span>
                  <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCampaign.name}
                  </h1>
                </div>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedCampaign.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAddLead(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Lead</span>
            </button>
          </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {leadStatuses.slice(0, 5).map((status) => {
          const count = leads.filter(l => l.status === status.value).length;
          return (
            <div key={status.value} className={`p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{status.icon}</span>
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {count}
                </span>
              </div>
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {status.label}
              </div>
            </div>
          );
        })}
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
            placeholder="Search leads by name, email, company..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
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

      {/* Filter Panel */}
      {showFilters && (
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
              <div className="space-y-2">
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
      )}

      {/* Leads Table */}
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
                  Company
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
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                {dynamicColumns.map((col) => (
                  <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredLeads.map((lead) => {
                const followUpStatus = getFollowUpStatus(lead);
                
                return (
                <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {lead.name?.charAt(0) || '?'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {lead.name}
                          </div>
                          {followUpStatus && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              followUpStatus.color === 'red' ? 'bg-red-600 text-white' :
                              followUpStatus.color === 'yellow' ? 'bg-yellow-600 text-white' :
                              followUpStatus.color === 'green' ? 'bg-green-600 text-white' :
                              'bg-blue-600 text-white'
                            }`}>
                              {followUpStatus.icon} {followUpStatus.text}
                            </span>
                          )}
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
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {lead.company || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {lead.source}
                    </div>
                    {lead.metadata?.formName && (
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        via {lead.metadata.formName}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead, e.target.value)}
                      className={`px-3 py-1 text-sm rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {leadStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.icon} {status.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${
                        lead.leadScore >= 80 ? 'text-green-500' :
                        lead.leadScore >= 60 ? 'text-yellow-500' :
                        lead.leadScore >= 40 ? 'text-orange-500' :
                        'text-red-500'
                      }`}>
                        {lead.leadScore || 0}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lead.tags?.map((tag, idx) => (
                        <span key={idx} className={`px-2 py-1 text-xs font-medium rounded-full ${
                          theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.assignedTo || ''}
                      onChange={(e) => updateLead(lead.id, { assignedTo: e.target.value })}
                      className={`px-3 py-1 text-sm rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">Unassigned</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  {dynamicColumns.map((col) => (
                    <td key={col} className={`px-6 py-4 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {Array.isArray(lead[col]) 
                        ? lead[col].join(', ') 
                        : lead[col] || '-'}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-sm text-blue-500 hover:text-blue-400 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4`}>🔍</div>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No leads found
            </p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your filters or add a new lead
            </p>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modern Header with Gradient */}
            <div className={`relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' 
                : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
            }`}>
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedLead.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-white/90">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{selectedLead.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{selectedLead.phone || 'No phone'}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedLead.status === 'Converted' ? 'bg-green-500/30 text-green-100 border border-green-400/30' :
                          selectedLead.status === 'Qualified' ? 'bg-blue-500/30 text-blue-100 border border-blue-400/30' :
                          selectedLead.status === 'Contacted' ? 'bg-yellow-500/30 text-yellow-100 border border-yellow-400/30' :
                          'bg-white/20 text-white border border-white/30'
                        }`}>
                          {selectedLead.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-160px)] overflow-y-auto">

            <div className="p-6 space-y-6">
              {/* Lead Context Section - Read Only */}
              {selectedLead.metadata && (
                <div className={`p-5 rounded-xl border-2 ${
                  theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Form Name
                      </div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {selectedLead.metadata.formName || (
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                            Contact Us Form
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Submission Channel
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedLead.metadata.submissionType === 'embedded' && (
                          <span className="text-xs px-2 py-1 bg-purple-600 text-white rounded-full">
                            🔗 Embedded
                          </span>
                        )}
                        {selectedLead.metadata.submissionType === 'shared' && (
                          <span className="text-xs px-2 py-1 bg-cyan-600 text-white rounded-full">
                            🔗 Shared Link
                          </span>
                        )}
                        {selectedLead.metadata.submissionType === 'hosted' && (
                          <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">
                            🌐 Hosted
                          </span>
                        )}
                        {!selectedLead.metadata.submissionType && (
                          <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
                            🌐 Website Form
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {selectedLead.metadata.resolvedDomain && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Resolved Domain
                        </div>
                        <div className={`text-sm font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                          {selectedLead.metadata.resolvedDomain}
                        </div>
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Page URL
                      </div>
                      <div className={`text-xs font-mono truncate ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        {selectedLead.metadata.pageUrl || 'https://yourwebsite.com/contact'}
                      </div>
                    </div>
                    
                    {selectedLead.metadata.referrer && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Referrer
                        </div>
                        <div className={`text-xs font-mono truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedLead.metadata.referrer}
                        </div>
                      </div>
                    )}
                    
                    {/* UTM Parameters */}
                    {(selectedLead.metadata.utm_source || selectedLead.metadata.utm_medium || selectedLead.metadata.utm_campaign) && (
                      <div className={`col-span-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          UTM Parameters
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.metadata.utm_source && (
                            <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded">
                              Source: {selectedLead.metadata.utm_source}
                            </span>
                          )}
                          {selectedLead.metadata.utm_medium && (
                            <span className="text-xs px-2 py-1 bg-purple-600 text-white rounded">
                              Medium: {selectedLead.metadata.utm_medium}
                            </span>
                          )}
                          {selectedLead.metadata.utm_campaign && (
                            <span className="text-xs px-2 py-1 bg-pink-600 text-white rounded">
                              Campaign: {selectedLead.metadata.utm_campaign}
                            </span>
                          )}
                          {selectedLead.metadata.utm_content && (
                            <span className="text-xs px-2 py-1 bg-orange-600 text-white rounded">
                              Content: {selectedLead.metadata.utm_content}
                            </span>
                          )}
                          {selectedLead.metadata.utm_term && (
                            <span className="text-xs px-2 py-1 bg-green-600 text-white rounded">
                              Term: {selectedLead.metadata.utm_term}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Submission Date
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedLead.metadata.submittedAt || 
                          (selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString() : 
                          'Monday, January 20, 2026 at 10:30:00 AM')}
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Device & IP Address
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="capitalize">{selectedLead.metadata.device || 'Desktop'}</span>
                        {' · '}
                        {(selectedLead.metadata.ipAddress === 'masked' || !selectedLead.metadata.ipAddress) ? (
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                            🔒 IP Masked (GDPR Protected)
                          </span>
                        ) : (
                          <span className="font-mono text-xs">
                            {selectedLead.metadata.ipAddress}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Campaign Tracking Section - Read Only */}
              {(selectedLead.metadata?.utm_source || selectedLead.metadata?.utm_medium || selectedLead.metadata?.utm_campaign) && (
                <div className={`p-5 rounded-xl border-2 ${
                  theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                }`}>
                  <div className="flex items-start space-x-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Campaign Tracking
                      </h3>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Marketing attribution and campaign performance data
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLead.metadata.utm_source && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Traffic Source
                        </div>
                        <div className={`text-sm font-medium flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs capitalize">
                            {selectedLead.metadata.utm_source}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {selectedLead.metadata.utm_medium && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Marketing Channel
                        </div>
                        <div className={`text-sm font-medium flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          <span className="px-2 py-1 rounded bg-purple-600 text-white text-xs capitalize">
                            {selectedLead.metadata.utm_medium}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {selectedLead.metadata.utm_campaign && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Campaign Name
                        </div>
                        <div className={`text-sm font-medium font-mono ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                          {selectedLead.metadata.utm_campaign}
                        </div>
                      </div>
                    )}
                    
                    {selectedLead.metadata.utm_content && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Creative Variant
                        </div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          <span className="px-2 py-1 rounded bg-pink-600 text-white text-xs capitalize">
                            {selectedLead.metadata.utm_content}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {selectedLead.metadata.utm_term && (
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Keyword / Term
                        </div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {selectedLead.metadata.utm_term}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Marketing Performance Insight */}
                  <div className={`mt-4 p-3 rounded-lg border ${
                    theme === 'dark' ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                        This lead came from {selectedLead.metadata.utm_source || 'unknown source'} via {selectedLead.metadata.utm_medium || 'unknown channel'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Duplicate Warning */}
              {selectedLead.metadata?.isDuplicate && (
                <div className={`p-4 rounded-lg border-2 ${
                  theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-300'
                }`}>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                        ⚠️ Possible Duplicate Lead
                      </div>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>
                        This email or phone number matches an existing lead in the system.
                      </p>
                      <button className="mt-2 text-xs px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">
                        View Related Leads
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead Assignment & Deal Amount */}
              <div className="grid grid-cols-2 gap-4">
                {/* Assign Lead */}
                <div className={`p-5 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <label className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    👤 Assign to Team Member
                  </label>
                  <select
                    value={selectedLead.assignedTo || ''}
                    onChange={(e) => {
                      updateLead(selectedLead.id, { assignedTo: e.target.value });
                      setSelectedLead({ ...selectedLead, assignedTo: e.target.value });
                    }}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Unassigned</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                  {selectedLead.assignedTo && (
                    <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Assigned to {teamMembers.find(m => m.id.toString() === selectedLead.assignedTo?.toString())?.name || 'Unknown'}
                    </p>
                  )}
                </div>

                {/* Deal Amount */}
                <div className={`p-5 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <label className={`block text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    💰 Deal Amount {selectedLead.status === 'Converted' && '(Closed)'}
                  </label>
                  {selectedLead.status === 'Converted' ? (
                    <div className={`px-4 py-3 rounded-lg border ${
                      theme === 'dark' ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="text-2xl font-bold text-green-600">
                        ${selectedLead.dealAmount?.toLocaleString() || '0'}
                      </div>
                      <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Converted on {selectedLead.metadata?.conversionDate || new Date(selectedLead.convertedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <div className={`px-4 py-3 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Deal amount will be entered when lead is marked as Converted
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* All lead data including dynamic fields */}
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(selectedLead).map(([key, value]) => {
                  if (key === 'id' || key === 'metadata') return null;
                  return (
                    <div key={key}>
                      <label className={`block text-sm font-medium mb-1 capitalize ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {Array.isArray(value) ? value.join(', ') : value?.toString() || '-'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tracking Metadata with Timeline */}
              {selectedLead.metadata && (
                <div className={`p-6 rounded-xl border-2 ${
                  theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
                    }`}>
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Tracking & Activity Timeline
                      </h3>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Complete history of status changes and metadata
                      </p>
                    </div>
                  </div>

                  {/* Status History Timeline */}
                  {selectedLead.metadata.statusHistory && selectedLead.metadata.statusHistory.length > 0 && (
                    <div className={`mb-6 p-5 rounded-xl ${
                      theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Status History
                        </h4>
                      </div>
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className={`absolute left-4 top-4 bottom-4 w-0.5 ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                        }`}></div>
                        
                        <div className="space-y-4">
                          {selectedLead.metadata.statusHistory.map((history, idx) => (
                            <div key={idx} className="relative flex items-start space-x-4 pl-2">
                              {/* Timeline Dot */}
                              <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                                history.to === 'Converted' ? 'bg-green-500' :
                                history.to === 'Qualified' ? 'bg-blue-500' :
                                history.to === 'Contacted' ? 'bg-yellow-500' :
                                history.to === 'Engaged' ? 'bg-purple-500' :
                                'bg-gray-500'
                              }`}>
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              
                              {/* Timeline Content */}
                              <div className={`flex-1 pb-4 pt-0.5`}>
                                <div className={`flex items-center justify-between mb-1`}>
                                  <div className="flex items-center space-x-2">
                                    {history.from && (
                                      <span className={`text-xs px-2 py-0.5 rounded ${
                                        theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                                      }`}>
                                        {history.from}
                                      </span>
                                    )}
                                    {history.from && <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>→</span>}
                                    <span className={`text-sm font-semibold px-2 py-0.5 rounded ${
                                      history.to === 'Converted' ? (theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700') :
                                      history.to === 'Qualified' ? (theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700') :
                                      history.to === 'Contacted' ? (theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
                                      history.to === 'Engaged' ? (theme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700') :
                                      (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')
                                    }`}>
                                      {history.to}
                                    </span>
                                  </div>
                                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {new Date(history.timestamp).toLocaleString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric', 
                                      hour: '2-digit', 
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                                <div className={`text-xs flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <User className="w-3 h-3" />
                                  <span>Changed by: {history.changedBy || 'System'}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Last Status Change */}
                  {selectedLead.metadata.lastStatusChange && (
                    <div className={`mb-6 p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                            Last Status Change
                          </span>
                        </div>
                        <span className={`text-sm font-mono ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                          {new Date(selectedLead.metadata.lastStatusChange).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Other Metadata */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedLead.metadata)
                      .filter(([key]) => key !== 'statusHistory' && key !== 'lastStatusChange' && 
                        key !== 'formName' && key !== 'submissionType' && key !== 'resolvedDomain' && 
                        key !== 'pageUrl' && key !== 'submittedAt' && key !== 'device' && 
                        key !== 'ipAddress' && key !== 'referrer' && !key.startsWith('utm_') &&
                        key !== 'isDuplicate' && key !== 'conversionDate' && key !== 'dealValue')
                      .map(([key, value]) => (
                      <div key={key} className={`p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
                      }`}>
                        <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {typeof value === 'object' ? (
                            <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
                          ) : (
                            value?.toString() || '-'
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      )}

      {/* Deal Amount Dialog */}
      {showDealAmountDialog && leadToConvert && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-full max-w-md rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl`}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    🎉 Mark as Converted
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Enter the deal value to close this lead
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Lead Name
                </label>
                <div className={`px-4 py-3 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}>
                  {leadToConvert.name}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Deal Amount (Revenue Earned) *
                </label>
                <div className="relative">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    $
                  </span>
                  <input
                    type="number"
                    value={dealAmount}
                    onChange={(e) => setDealAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-lg font-semibold ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                    autoFocus
                  />
                </div>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Enter the total revenue earned from this lead
                </p>
              </div>

              {leadToConvert.assignedTo && (
                <div className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    💰 This revenue will be credited to {teamMembers.find(m => m.id.toString() === leadToConvert.assignedTo?.toString())?.name || 'the assigned team member'}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-800 flex items-center space-x-3">
              <button
                onClick={() => {
                  setShowDealAmountDialog(false);
                  setDealAmount('');
                  setLeadToConvert(null);
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmConversion}
                disabled={!dealAmount || parseFloat(dealAmount) <= 0}
                className={`flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Confirm & Close Deal
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default CRMPipeline;
