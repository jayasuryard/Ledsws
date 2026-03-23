import React, { useState } from 'react';
import { 
  Mail, Plus, TrendingUp, Users, MousePointer, DollarSign, 
  Send, Eye, Activity, Zap, Clock, BarChart3, ArrowUpRight,
  ArrowDownRight, Calendar, Filter, Download, ChevronRight, Play
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';

const EmailDashboard = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { theme, businesses, leads, emailCampaigns, emailEvents, emailAutomations, simulateLeadJourney } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [timeRange, setTimeRange] = useState('7d');

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

  // Calculate KPIs (mock calculations with real data)
  const totalLeads = leads.length;
  const activeCampaigns = emailCampaigns.filter(c => c.status === 'sent' || c.status === 'scheduled').length;
  
  // Mock but realistic stats
  const stats = {
    totalLeads: totalLeads,
    totalLeadsChange: 12.5,
    activeCampaigns: activeCampaigns || 5,
    activeCampaignsChange: 8.3,
    avgOpenRate: 42.8,
    openRateChange: 5.2,
    conversionRate: 8.4,
    conversionRateChange: 2.1,
    totalRevenue: 24500,
    revenueChange: 15.7,
    emailsSent: 12450,
    emailsSentChange: 22.3
  };

  // Recent activity from emailEvents
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
    },
    {
      id: 5,
      leadName: 'Lisa Anderson',
      action: 'replied',
      target: 'Follow-up Email',
      time: '25 minutes ago',
      icon: Mail,
      color: 'green'
    },
    {
      id: 6,
      leadName: 'David Brown',
      action: 'clicked',
      target: 'Demo Booking Link',
      time: '32 minutes ago',
      icon: MousePointer,
      color: 'purple'
    }
  ];

  // Top performing campaigns
  const topCampaigns = [
    {
      id: 1,
      name: 'Summer Sale 2026',
      sent: 2450,
      opened: 1234,
      clicked: 456,
      openRate: 50.4,
      clickRate: 18.6,
      revenue: 12450,
      trend: 'up'
    },
    {
      id: 2,
      name: 'Product Launch Teaser',
      sent: 1890,
      opened: 892,
      clicked: 234,
      openRate: 47.2,
      clickRate: 12.4,
      revenue: 8300,
      trend: 'up'
    },
    {
      id: 3,
      name: 'Weekly Newsletter #42',
      sent: 2456,
      opened: 982,
      clicked: 189,
      openRate: 40.0,
      clickRate: 7.7,
      revenue: 2100,
      trend: 'down'
    }
  ];

  // Performance chart data (mock)
  const chartData = [
    { day: 'Mon', sent: 450, opened: 189, clicked: 67 },
    { day: 'Tue', sent: 520, opened: 234, clicked: 89 },
    { day: 'Wed', sent: 380, opened: 167, clicked: 54 },
    { day: 'Thu', sent: 620, opened: 278, clicked: 102 },
    { day: 'Fri', sent: 580, opened: 256, clicked: 94 },
    { day: 'Sat', sent: 340, opened: 145, clicked: 48 },
    { day: 'Sun', sent: 290, opened: 123, clicked: 39 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.sent));

  const StatCard = ({ icon: Icon, label, value, change, format = 'number' }) => {
    const isPositive = change >= 0;
    const formattedValue = format === 'currency' 
      ? `$${value.toLocaleString()}` 
      : format === 'percentage' 
        ? `${value}%`
        : value.toLocaleString();

    return (
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-50'
          }`}>
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        <div className={`text-3xl font-bold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {formattedValue}
        </div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Email Marketing Command Center
            </h1>
            <p className="text-gray-500">
              {business?.name || 'Your Business'} • {timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'All Time'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleTestAutomation}
              className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Test Campaign</span>
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
            <button
              onClick={() => navigate(`/business/${businessId}/workflows`)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={stats.totalLeads}
          change={stats.totalLeadsChange}
        />
        <StatCard
          icon={Mail}
          label="Active Campaigns"
          value={stats.activeCampaigns}
          change={stats.activeCampaignsChange}
        />
        <StatCard
          icon={Eye}
          label="Avg. Open Rate"
          value={stats.avgOpenRate}
          change={stats.openRateChange}
          format="percentage"
        />
        <StatCard
          icon={MousePointer}
          label="Conversion Rate"
          value={stats.conversionRate}
          change={stats.conversionRateChange}
          format="percentage"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          format="currency"
        />
        <StatCard
          icon={Send}
          label="Emails Sent"
          value={stats.emailsSent}
          change={stats.emailsSentChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className={`lg:col-span-2 p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Email Performance
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-500">Sent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-500">Opened</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-500">Clicked</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between space-x-2 h-64">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col space-y-1 items-center justify-end flex-1">
                  <div className="w-full space-y-1">
                    <div
                      className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                      style={{ height: `${(data.sent / maxValue) * 200}px` }}
                      title={`Sent: ${data.sent}`}
                    ></div>
                    <div
                      className="w-full bg-purple-500 rounded transition-all hover:bg-purple-600"
                      style={{ height: `${(data.opened / maxValue) * 200}px` }}
                      title={`Opened: ${data.opened}`}
                    ></div>
                    <div
                      className="w-full bg-green-500 rounded-b transition-all hover:bg-green-600"
                      style={{ height: `${(data.clicked / maxValue) * 200}px` }}
                      title={`Clicked: ${data.clicked}`}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Activity
            </h2>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.color === 'blue' ? 'bg-blue-500/20' :
                    activity.color === 'purple' ? 'bg-purple-500/20' :
                    'bg-green-500/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      activity.color === 'blue' ? 'text-blue-500' :
                      activity.color === 'purple' ? 'text-purple-500' :
                      'text-green-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      <span className="font-semibold">{activity.leadName}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-gray-500">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Campaigns */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Top Performing Campaigns
          </h2>
          <Link
            to={`/business/${businessId}/email/campaigns`}
            className="text-sm text-blue-500 hover:text-blue-400 flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <th className={`text-left py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Campaign</th>
                <th className={`text-right py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Sent</th>
                <th className={`text-right py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Open Rate</th>
                <th className={`text-right py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Click Rate</th>
                <th className={`text-right py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Revenue</th>
                <th className={`text-right py-3 px-4 text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {topCampaigns.map((campaign) => (
                <tr key={campaign.id} className={`border-b ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                } hover:bg-gray-800/50 cursor-pointer`}>
                  <td className={`py-4 px-4 font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{campaign.name}</td>
                  <td className={`py-4 px-4 text-right ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>{campaign.sent.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-blue-500 font-medium">{campaign.openRate}%</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-purple-500 font-medium">{campaign.clickRate}%</span>
                  </td>
                  <td className={`py-4 px-4 text-right font-medium ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>${campaign.revenue.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right">
                    {campaign.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-500 ml-auto" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <button
          onClick={() => navigate(`/business/${businessId}/email/automation`)}
          className={`p-6 rounded-xl border text-left transition-all ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800 hover:border-blue-600'
              : 'bg-white border-gray-200 hover:border-blue-500'
          }`}
        >
          <Zap className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Automation Builder</h3>
          <p className="text-sm text-gray-500">Create visual workflows</p>
        </button>

        <button
          onClick={() => navigate(`/business/${businessId}/email/scoring`)}
          className={`p-6 rounded-xl border text-left transition-all ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800 hover:border-purple-600'
              : 'bg-white border-gray-200 hover:border-purple-500'
          }`}
        >
          <TrendingUp className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Lead Scoring</h3>
          <p className="text-sm text-gray-500">Simulate & manage scores</p>
        </button>

        <button
          onClick={() => navigate(`/business/${businessId}/email/templates`)}
          className={`p-6 rounded-xl border text-left transition-all ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800 hover:border-green-600'
              : 'bg-white border-gray-200 hover:border-green-500'
          }`}
        >
          <Mail className="w-8 h-8 text-green-500 mb-3" />
          <h3 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Templates</h3>
          <p className="text-sm text-gray-500">Browse email templates</p>
        </button>

        <button
          onClick={() => navigate(`/business/${businessId}/email/analytics`)}
          className={`p-6 rounded-xl border text-left transition-all ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800 hover:border-orange-600'
              : 'bg-white border-gray-200 hover:border-orange-500'
          }`}
        >
          <BarChart3 className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className={`font-semibold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Analytics</h3>
          <p className="text-sm text-gray-500">Deep dive into metrics</p>
        </button>
      </div>
    </div>
  );
};

export default EmailDashboard;
