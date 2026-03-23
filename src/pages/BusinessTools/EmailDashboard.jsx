import React, { useState } from 'react';
import { 
  Mail, Plus, TrendingUp, Users, MousePointer, DollarSign, 
  Send, Eye, Activity, Zap, Clock, BarChart3, ArrowUpRight,
  ArrowDownRight, Calendar, Filter, Download, ChevronRight, Play,
  Settings, AlertCircle, CheckCircle, Edit, Trash2, Copy, ExternalLink,
  Target, Inbox, MessageSquare
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import EmailProviderSetup from '../../components/Email/EmailProviderSetup';
import ManualEmailComposer from '../../components/Email/ManualEmailComposer';
import CreateCampaignModal from '../../components/Email/CreateCampaignModal';
import CreateSequenceModal from '../../components/Email/CreateSequenceModal';

const EmailDashboard = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { theme, businesses, leads, emailCampaigns, emailEvents, emailAutomations, simulateLeadJourney, addEmailCampaign } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [timeRange, setTimeRange] = useState('7d');
  const [showProviderSetup, setShowProviderSetup] = useState(false);
  const [showManualComposer, setShowManualComposer] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateSequence, setShowCreateSequence] = useState(false);
  const [emailProvider, setEmailProvider] = useState(null); // Will be loaded from business settings

  // Check if email is configured
  const isEmailConfigured = emailProvider !== null;

  // Test automation simulation
  const handleTestAutomation = () => {
    const activeAutomations = emailAutomations.filter(a => a.status === 'active' && a.type === 'lead_qualification');
    
    if (activeAutomations.length === 0) {
      alert('No active Lead Qualification campaigns found.\n\nGo to Workflows → Launch "Lead Qualification Campaign" first!');
      navigate(`/business/${businessId}/workflows`);
      return;
    }

    const automation = activeAutomations[0];
    
    alert(`🧪 Testing Automation: ${automation.name}\n\nSimulating a lead going through the entire journey:\n\n1. Form submission (Step-1)\n2. Email sent & opened (+5 points)\n3. Email clicked (+10 points)\n4. Qualification form submitted (+20 points)\n5. Auto-qualified & Deal created\n\nWatch the CRM for results in ~45 seconds!`);
    
    simulateLeadJourney(automation.id);
    
    setTimeout(() => {
      alert('✅ Test Complete!\n\nCheck your CRM Pipeline to see:\n• New lead created\n• Lead score increased to 45+\n• Status changed to "Qualified"\n• Deal automatically created\n\nThis is exactly what happens with real leads!');
    }, 45000);
  };

  const handleSaveProvider = (config) => {
    setEmailProvider(config);
    // In production, save to backend/store
    alert('✅ Email provider configured successfully!\n\nYou can now send campaigns and manual emails.');
  };

  const handleSendManualEmail = (emailData) => {
    console.log('Sending manual email:', emailData);
    alert(`📧 Email sent to ${emailData.recipients.length} recipient(s)!\n\nSubject: ${emailData.subject}\n\nIn production, this would send via your configured email provider.`);
  };

  const handleSaveCampaign = (campaign) => {
    addEmailCampaign(campaign);
    alert(`✅ Campaign "${campaign.name}" ${campaign.status === 'sent' ? 'sent' : 'scheduled'} successfully!`);
  };

  const handleSaveSequence = (sequence) => {
    // In production, save sequence to separate store
    console.log('Sequence created:', sequence);
    alert(`✅ Newsletter sequence "${sequence.name}" created successfully!\n\n${sequence.steps.length} emails scheduled.`);
  };

  // Calculate KPIs
  const totalLeads = leads.length;
  const activeCampaigns = emailCampaigns.filter(c => c.status === 'sent' || c.status === 'scheduled').length;
  const activeAutomationsCount = emailAutomations.filter(a => a.status === 'active').length;
  
  // Mock but realistic stats
  const stats = {
    totalLeads: totalLeads,
    totalLeadsChange: 12.5,
    activeCampaigns: activeCampaigns || 5,
    activeCampaignsChange: 8.3,
    activeAutomations: activeAutomationsCount || 3,
    automationsChange: 15.0,
    avgOpenRate: 42.8,
    openRateChange: 5.2,
    conversionRate: 8.4,
    conversionRateChange: 2.1,
    totalRevenue: 24500,
    revenueChange: 15.7,
    emailsSent: 12450,
    emailsSentChange: 22.3
  };

  // Get real campaigns from store
  const recentCampaigns = emailCampaigns
    .map(c => ({
      id: c.id,
      name: c.name,
      status: c.status,
      sent: c.stats?.sent || 0,
      opened: c.stats?.opened || 0,
      clicked: c.stats?.clicked || 0,
      openRate: c.stats?.sent > 0 ? ((c.stats?.opened || 0) / c.stats.sent * 100).toFixed(1) : 0,
      clickRate: c.stats?.sent > 0 ? ((c.stats?.clicked || 0) / c.stats.sent * 100).toFixed(1) : 0,
      revenue: c.stats?.revenue || 0,
      sentAt: new Date(c.createdAt).toLocaleDateString()
    }))
    .slice(0, 5);

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      leadName: 'Sarah Johnson',
      action: 'opened',
      target: 'Summer Sale Email',
      time: '2 minutes ago',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 2,
      leadName: 'Michael Chen',
      action: 'clicked',
      target: 'Product Launch CTA',
      time: '5 minutes ago',
      icon: MousePointer,
      color: 'purple'
    },
    {
      id: 3,
      leadName: 'Emma Davis',
      action: 'submitted',
      target: 'Contact Form',
      time: '12 minutes ago',
      icon: Send,
      color: 'green'
    },
    {
      id: 4,
      leadName: 'James Wilson',
      action: 'opened',
      target: 'Newsletter #42',
      time: '18 minutes ago',
      icon: Eye,
      color: 'blue'
    }
  ];

  const StatCard = ({ icon: Icon, label, value, change, format = 'number', color = 'blue' }) => {
    const isPositive = change >= 0;
    const formattedValue = format === 'currency' 
      ? `$${value.toLocaleString()}` 
      : format === 'percentage' 
        ? `${value}%`
        : value.toLocaleString();

    const colorClasses = {
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      green: 'from-green-500 to-emerald-500',
      orange: 'from-orange-500 to-red-500',
      indigo: 'from-indigo-500 to-purple-500',
      yellow: 'from-yellow-500 to-orange-500'
    };

    return (
      <div className={`relative overflow-hidden p-6 rounded-2xl border ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      } hover:shadow-xl transition-all group`}>
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${colorClasses[color]}`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
          <div className={`text-4xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {formattedValue}
          </div>
          <div className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {label}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <div className="p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                Email Marketing
              </h1>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {business?.name || 'Your Business'} • {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'All Time'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={`px-4 py-2.5 rounded-xl border font-medium ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>

              <button
                onClick={() => setShowProviderSetup(true)}
                className={`px-4 py-2.5 rounded-xl border font-medium flex items-center gap-2 transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Email Settings</span>
              </button>
            </div>
          </div>

          {/* Email Setup Warning */}
          {!isEmailConfigured && (
            <div className={`p-5 rounded-2xl border-2 mb-6 ${
              theme === 'dark'
                ? 'bg-yellow-900/10 border-yellow-800/30'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-100'
                }`}>
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Email Provider Not Configured
                  </h3>
                  <p className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Set up your email provider (SMTP, SendGrid, Mailgun, etc.) and configure DKIM for better deliverability before sending campaigns.
                  </p>
                  <button
                    onClick={() => setShowProviderSetup(true)}
                    className="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Configure Email Provider Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEmailConfigured && (
            <div className={`p-4 rounded-xl border mb-6 ${
              theme === 'dark'
                ? 'bg-green-900/10 border-green-800/30'
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email provider configured • Ready to send campaigns
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => isEmailConfigured ? setShowManualComposer(true) : setShowProviderSetup(true)}
            className={`p-6 rounded-2xl border-2 text-left group transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30 hover:border-blue-700/50'
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 group-hover:scale-110 transition-transform`}>
                <Send className="w-7 h-7 text-white" />
              </div>
              <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Write Email
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Compose & send one-time email
            </p>
          </button>

          <button
            onClick={() => isEmailConfigured ? setShowCreateCampaign(true) : setShowProviderSetup(true)}
            className={`p-6 rounded-2xl border-2 text-left group transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/30 hover:border-green-700/50'
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600 group-hover:scale-110 transition-transform`}>
                <Mail className="w-7 h-7 text-white" />
              </div>
              <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Create Campaign
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Setup campaign & send/schedule
            </p>
          </button>

          <button
            onClick={() => isEmailConfigured ? setShowCreateSequence(true) : setShowProviderSetup(true)}
            className={`p-6 rounded-2xl border-2 text-left group transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-800/30 hover:border-indigo-700/50'
                : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 group-hover:scale-110 transition-transform`}>
                <Zap className="w-7 h-7 text-white" />
              </div>
              <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Newsletter Sequence
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Create automated drip campaigns
            </p>
          </button>

          <button
            onClick={() => navigate(`/business/${businessId}/workflows`)}
            className={`p-6 rounded-2xl border-2 text-left group transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-800/30 hover:border-orange-700/50'
                : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-600 group-hover:scale-110 transition-transform`}>
                <Play className="w-7 h-7 text-white" />
              </div>
              <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Automation Workflows
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Advanced lead qualification flows
            </p>
          </button>
        </div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="Total Leads"
            value={stats.totalLeads}
            change={stats.totalLeadsChange}
            color="blue"
          />
          <StatCard
            icon={Mail}
            label="Active Campaigns"
            value={stats.activeCampaigns}
            change={stats.activeCampaignsChange}
            color="purple"
          />
          <StatCard
            icon={Zap}
            label="Automations"
            value={stats.activeAutomations}
            change={stats.automationsChange}
            color="indigo"  
          />
          <StatCard
            icon={Eye}
            label="Avg. Open Rate"
            value={stats.avgOpenRate}
            change={stats.openRateChange}
            format="percentage"
            color="green"
          />
          <StatCard
            icon={MousePointer}
            label="Click Rate"
            value={stats.conversionRate}
            change={stats.conversionRateChange}
            format="percentage"
            color="orange"
          />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={stats.totalRevenue}
            change={stats.revenueChange}
            format="currency"
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <div className={`lg:col-span-2 rounded-2xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Recent Campaigns
                </h2>
                <Link
                  to={`/business/${businessId}/email/templates`}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {recentCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`p-6 hover:bg-gray-800/50 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`font-semibold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {campaign.name}
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Sent {campaign.sentAt}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      campaign.status === 'sent'
                        ? theme === 'dark'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-100 text-green-700'
                        : theme === 'dark'
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {campaign.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {campaign.sent.toLocaleString()}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Sent
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-blue-500`}>
                        {campaign.openRate}%
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Open Rate
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-purple-500`}>
                        {campaign.clickRate}%
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Click Rate
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold text-green-500`}>
                        ${campaign.revenue.toLocaleString()}
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Revenue
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {recentCampaigns.length === 0 && (
              <div className="p-12 text-center">
                <Mail className={`w-16 h-16 mx-auto mb-4 ${
                  theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
                }`} />
                <p className={`text-lg font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No campaigns yet
                </p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Create your first campaign to get started
                </p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className={`rounded-2xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 border-b border-gray-800">
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Recent Activity
              </h2>
            </div>

            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                const colorClasses = {
                  blue: 'bg-blue-500/10 text-blue-500',
                  purple: 'bg-purple-500/10 text-purple-500',
                  green: 'bg-green-500/10 text-green-500',
                  orange: 'bg-orange-500/10 text-orange-500'
                };

                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[activity.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {activity.leadName}
                      </p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                      }`}>
                        {activity.action} <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EmailProviderSetup
        isOpen={showProviderSetup}
        onClose={() => setShowProviderSetup(false)}
        theme={theme}
        onSave={handleSaveProvider}
        currentConfig={emailProvider}
      />

      <ManualEmailComposer
        isOpen={showManualComposer}
        onClose={() => setShowManualComposer(false)}
        theme={theme}
        leads={leads}
        onSend={handleSendManualEmail}
      />

      {showCreateCampaign && (
        <CreateCampaignModal
          theme={theme}
          leads={leads}
          onClose={() => setShowCreateCampaign(false)}
          onSave={handleSaveCampaign}
        />
      )}

      {showCreateSequence && (
        <CreateSequenceModal
          theme={theme}
          onClose={() => setShowCreateSequence(false)}
          onSave={handleSaveSequence}
        />
      )}
    </div>
  );
};

export default EmailDashboard;
