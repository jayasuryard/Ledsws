import React, { useState } from 'react';
import { Plus, ArrowLeft, User, Target } from 'lucide-react';
import useStore from '../../store/useStore';
import CampaignCard from '../../components/CRM/CampaignCard';
import AddCampaignModal from '../../components/CRM/AddCampaignModal';
import AddLeadModal from '../../components/CRM/AddLeadModal';
import LeadDetailModal from '../../components/CRM/LeadDetailModal';
import DealAmountDialog from '../../components/CRM/DealAmountDialog';
import LeadsTable from '../../components/CRM/LeadsTable';
import FilterPanel from '../../components/CRM/FilterPanel';
import SearchBar from '../../components/CRM/SearchBar';
import StatsOverview from '../../components/CRM/StatsOverview';

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

  // Manual Campaign Management
  const [customCampaigns, setCustomCampaigns] = useState([]);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [showAddLeadToCampaignModal, setShowAddLeadToCampaignModal] = useState(false);
  const [campaignFormData, setCampaignFormData] = useState({
    name: '',
    description: '',
    icon: '📊',
    color: 'blue',
    customFields: []
  });
  const [leadFormData, setLeadFormData] = useState({});

  // Mock campaigns data - would come from API/store in production
  const predefinedCampaigns = [
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
      color: 'blue',
      type: 'predefined'
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
      color: 'purple',
      type: 'predefined'
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
      color: 'pink',
      type: 'predefined'
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
      color: 'orange',
      type: 'predefined'
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
      color: 'green',
      type: 'predefined'
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
      color: 'indigo',
      type: 'predefined'
    }
  ];

  // Merge predefined and custom campaigns
  const campaigns = [...predefinedCampaigns, ...customCampaigns];

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

  // Handle custom campaign creation
  const handleAddCampaign = () => {
    if (!campaignFormData.name.trim()) return;
    
    const newCampaign = {
      id: `custom-${Date.now()}`,
      name: campaignFormData.name,
      description: campaignFormData.description,
      icon: campaignFormData.icon,
      color: campaignFormData.color,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      customFields: campaignFormData.customFields,
      leads: [],
      totalLeads: 0,
      newLeads: 0,
      qualified: 0,
      converted: 0,
      conversion: 0,
      type: 'custom'
    };
    
    setCustomCampaigns([...customCampaigns, newCampaign]);
    setShowAddCampaignModal(false);
    setCampaignFormData({
      name: '',
      description: '',
      icon: '📊',
      color: 'blue',
      customFields: []
    });
  };

  // Handle add custom field to campaign
  const addCustomFieldToCampaign = () => {
    setCampaignFormData({
      ...campaignFormData,
      customFields: [...campaignFormData.customFields, { 
        id: Date.now(), 
        name: '', 
        type: 'text', 
        required: false 
      }]
    });
  };

  // Handle update custom field
  const updateCustomField = (fieldId, updates) => {
    setCampaignFormData({
      ...campaignFormData,
      customFields: campaignFormData.customFields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    });
  };

  // Handle remove custom field
  const removeCustomField = (fieldId) => {
    setCampaignFormData({
      ...campaignFormData,
      customFields: campaignFormData.customFields.filter(field => field.id !== fieldId)
    });
  };

  // Handle add lead to campaign
  const handleAddLeadToCampaign = () => {
    if (!selectedCampaign || !leadFormData.name || !leadFormData.email) return;
    
    const newLead = {
      id: Date.now(),
      name: leadFormData.name,
      email: leadFormData.email,
      phone: leadFormData.phone || '',
      company: leadFormData.company || '',
      source: `Manual - ${selectedCampaign.name}`,
      status: 'New',
      leadScore: 50,
      campaignId: selectedCampaign.id,
      customFieldsData: {},
      metadata: {
        timestamp: new Date().toISOString(),
        addedManually: true,
        campaignName: selectedCampaign.name
      },
      createdAt: new Date().toISOString()
    };

    // Add custom field data
    if (selectedCampaign.customFields) {
      selectedCampaign.customFields.forEach(field => {
        if (leadFormData[field.name]) {
          newLead.customFieldsData[field.name] = leadFormData[field.name];
        }
      });
    }

    addLead(newLead);
    
    // Update campaign leads array
    if (selectedCampaign.type === 'custom') {
      setCustomCampaigns(customCampaigns.map(c => 
        c.id === selectedCampaign.id 
          ? { 
              ...c, 
              leads: [...(c.leads || []), newLead],
              totalLeads: (c.totalLeads || 0) + 1,
              newLeads: (c.newLeads || 0) + 1
            } 
          : c
      ));
    }
    
    setShowAddLeadToCampaignModal(false);
    setLeadFormData({});
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
          <StatsOverview campaigns={campaigns} leads={leads} theme={theme} />

          {/* Campaign Blocks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Your Campaigns
              </h2>
              <button
                onClick={() => setShowAddCampaignModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Campaign</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
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
                      setSelectedCampaign(campaign);
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
              onClick={() => {
                setLeadFormData({});
                setShowAddLeadToCampaignModal(true);
              }}
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
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        theme={theme}
        filters={filters}
      />

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          theme={theme}
          leadStatuses={leadStatuses}
          getUniqueValues={getUniqueValues}
        />
      )}

      {/* Leads Table */}
      <LeadsTable 
        leads={filteredLeads}
        theme={theme}
        onViewDetails={setSelectedLead}
      />

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          theme={theme}
          leadStatuses={leadStatuses}
          teamMembers={teamMembers}
          handleStatusChange={handleStatusChange}
        />
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

      {/* Add Campaign Modal */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modal Header */}
            <div className="relative h-32 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-t-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Campaign</h2>
                  <p className="text-cyan-100 mt-1">Define your campaign and custom fields</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="space-y-4">
                {/* Campaign Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    value={campaignFormData.name}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, name: e.target.value })}
                    placeholder="e.g., Trade Show 2025, Partner Outreach"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                </div>

                {/* Campaign Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={campaignFormData.description}
                    onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                    placeholder="Describe the campaign purpose and goals"
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                </div>

                {/* Icon & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Icon (Emoji)
                    </label>
                    <input
                      type="text"
                      value={campaignFormData.icon}
                      onChange={(e) => setCampaignFormData({ ...campaignFormData, icon: e.target.value })}
                      placeholder="📊"
                      maxLength={2}
                      className={`w-full px-4 py-3 rounded-lg border text-2xl text-center ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Color Theme
                    </label>
                    <select
                      value={campaignFormData.color}
                      onChange={(e) => setCampaignFormData({ ...campaignFormData, color: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    >
                      <option value="blue">Blue</option>
                      <option value="purple">Purple</option>
                      <option value="pink">Pink</option>
                      <option value="green">Green</option>
                      <option value="orange">Orange</option>
                      <option value="indigo">Indigo</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Custom Fields
                    </label>
                    <button
                      onClick={addCustomFieldToCampaign}
                      className="flex items-center space-x-1 text-sm text-cyan-500 hover:text-cyan-400"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Field</span>
                    </button>
                  </div>

                  {campaignFormData.customFields.length === 0 ? (
                    <p className={`text-sm text-center py-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      No custom fields added yet. Click "Add Field" to create one.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {campaignFormData.customFields.map((field) => (
                        <div key={field.id} className={`p-4 rounded-lg border ${
                          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="grid grid-cols-12 gap-3">
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateCustomField(field.id, { name: e.target.value })}
                              placeholder="Field name"
                              className={`col-span-5 px-3 py-2 rounded-lg border text-sm ${
                                theme === 'dark'
                                  ? 'bg-gray-900 border-gray-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-900'
                              } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                            />
                            <select
                              value={field.type}
                              onChange={(e) => updateCustomField(field.id, { type: e.target.value })}
                              className={`col-span-4 px-3 py-2 rounded-lg border text-sm ${
                                theme === 'dark'
                                  ? 'bg-gray-900 border-gray-600 text-white'
                                  : 'bg-white border-gray-300 text-gray-900'
                              } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="email">Email</option>
                              <option value="phone">Phone</option>
                              <option value="date">Date</option>
                              <option value="url">URL</option>
                            </select>
                            <label className="col-span-2 flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => updateCustomField(field.id, { required: e.target.checked })}
                                className="rounded"
                              />
                              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Required</span>
                            </label>
                            <button
                              onClick={() => removeCustomField(field.id)}
                              className="col-span-1 text-red-500 hover:text-red-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t flex items-center space-x-3 ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <button
                onClick={() => {
                  setShowAddCampaignModal(false);
                  setCampaignFormData({
                    name: '',
                    description: '',
                    icon: '📊',
                    color: 'blue',
                    customFields: []
                  });
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCampaign}
                disabled={!campaignFormData.name.trim()}
                className={`flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead to Campaign Modal */}
      {showAddLeadToCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modal Header */}
            <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Add Lead to {selectedCampaign.name}</h2>
                  <p className="text-purple-100 mt-1">Enter lead information and custom fields</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <div className="space-y-4">
                {/* Standard Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={leadFormData.name || ''}
                      onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={leadFormData.email || ''}
                      onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={leadFormData.phone || ''}
                      onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={leadFormData.company || ''}
                      onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                    />
                  </div>
                </div>

                {/* Custom Fields */}
                {selectedCampaign.customFields && selectedCampaign.customFields.length > 0 && (
                  <div className="border-t border-gray-700 pt-4">
                    <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Campaign Custom Fields
                    </h3>
                    <div className="space-y-3">
                      {selectedCampaign.customFields.map((field) => (
                        <div key={field.id}>
                          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {field.name} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            value={leadFormData[field.name] || ''}
                            onChange={(e) => setLeadFormData({ ...leadFormData, [field.name]: e.target.value })}
                            placeholder={`Enter ${field.name.toLowerCase()}`}
                            required={field.required}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              theme === 'dark'
                                ? 'bg-gray-800 border-gray-700 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`p-6 border-t flex items-center space-x-3 ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <button
                onClick={() => {
                  setShowAddLeadToCampaignModal(false);
                  setLeadFormData({});
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddLeadToCampaign}
                disabled={!leadFormData.name || !leadFormData.email}
                className={`flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMPipeline;
