import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Target, Calendar, Download, Filter, Zap, Activity, MessageSquare, Sparkles, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useStore from '../../store/useStore';

const GlobalAnalytics = () => {
  const { theme, businesses, leads, activities } = useStore();
  const [timeframe, setTimeframe] = useState('30days');

  const weeklyData = [
    { week: 'Week 1', leads: 234, revenue: 45000, campaigns: 12, tokens: 15000, roi: 3.2 },
    { week: 'Week 2', leads: 287, revenue: 52000, campaigns: 15, tokens: 18500, roi: 3.5 },
    { week: 'Week 3', leads: 265, revenue: 48000, campaigns: 13, tokens: 16200, roi: 3.1 },
    { week: 'Week 4', leads: 321, revenue: 61000, campaigns: 18, tokens: 21000, roi: 3.8 }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 45000, leads: 234, conversions: 45 },
    { name: 'Feb', revenue: 52000, leads: 287, conversions: 52 },
    { name: 'Mar', revenue: 48000, leads: 265, conversions: 48 },
    { name: 'Apr', revenue: 61000, leads: 321, conversions: 61 },
    { name: 'May', revenue: 58000, leads: 298, conversions: 58 },
    { name: 'Jun', revenue: 67000, leads: 356, conversions: 67 }
  ];

  const businessPerformance = [
    { name: 'TechStart Inc', revenue: 28500, leads: 145, conversion: 23 },
    { name: 'Creative Co', revenue: 19200, leads: 98, conversion: 19 },
    { name: 'Local Shop', revenue: 12800, leads: 67, conversion: 13 },
    { name: 'Consulting Pro', revenue: 6500, leads: 34, conversion: 12 }
  ];

  const channelData = [
    { name: 'Email', value: 35, color: '#3B82F6' },
    { name: 'Social Media', value: 28, color: '#8B5CF6' },
    { name: 'Direct', value: 22, color: '#10B981' },
    { name: 'Referral', value: 15, color: '#F59E0B' }
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 10000, percentage: 100 },
    { stage: 'Leads', count: 2500, percentage: 25 },
    { stage: 'Qualified', count: 1000, percentage: 10 },
    { stage: 'Proposals', count: 400, percentage: 4 },
    { stage: 'Customers', count: 150, percentage: 1.5 }
  ];

  const liveActivities = [
    { id: 1, type: 'lead', message: 'New lead captured from Instagram', business: 'TechStart Inc', time: '2 min ago', icon: Users },
    { id: 2, type: 'campaign', message: 'Email campaign "Summer Sale" sent to 1,234 contacts', business: 'Creative Co', time: '5 min ago', icon: MessageSquare },
    { id: 3, type: 'revenue', message: 'New sale: $2,499 - Premium Plan', business: 'TechStart Inc', time: '8 min ago', icon: DollarSign },
    { id: 4, type: 'ai', message: 'AI generated 5 blog posts (8,500 tokens used)', business: 'Local Shop', time: '12 min ago', icon: Sparkles },
    { id: 5, type: 'conversion', message: 'Lead "John Smith" converted to customer', business: 'Consulting Pro', time: '15 min ago', icon: Target },
    { id: 6, type: 'campaign', message: 'Social media post scheduled for tomorrow', business: 'Creative Co', time: '18 min ago', icon: Calendar }
  ];

  const kpiCards = [
    {
      label: 'Weekly Leads',
      value: '1,107',
      change: '+18.3%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      subtitle: 'Across all businesses'
    },
    {
      label: 'Revenue Generated',
      value: '$206K',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      subtitle: 'Total this month'
    },
    {
      label: 'Campaigns Created',
      value: '58',
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'purple',
      subtitle: 'Active campaigns'
    },
    {
      label: 'Conversion Rate',
      value: '24.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'orange',
      subtitle: 'Average across all'
    },
    {
      label: 'AI Tokens Used',
      value: '70.7K',
      change: '+8.5%',
      trend: 'up',
      icon: Sparkles,
      color: 'pink',
      subtitle: 'Content generation'
    },
    {
      label: 'Average ROI',
      value: '3.4x',
      change: '+0.6x',
      trend: 'up',
      icon: TrendingUp,
      color: 'cyan',
      subtitle: 'Return on investment'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Global Analytics
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Comprehensive insights across all businesses
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className={`px-4 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="12months">Last 12 Months</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                kpi.color === 'green' ? 'bg-green-500/10' :
                kpi.color === 'blue' ? 'bg-blue-500/10' :
                kpi.color === 'purple' ? 'bg-purple-500/10' :
                kpi.color === 'orange' ? 'bg-orange-500/10' :
                kpi.color === 'pink' ? 'bg-pink-500/10' :
                'bg-cyan-500/10'
              }`}>
                <kpi.icon className={`w-6 h-6 ${
                  kpi.color === 'green' ? 'text-green-500' :
                  kpi.color === 'blue' ? 'text-blue-500' :
                  kpi.color === 'purple' ? 'text-purple-500' :
                  kpi.color === 'orange' ? 'text-orange-500' :
                  kpi.color === 'pink' ? 'text-pink-500' :
                  'text-cyan-500'
                }`} />
              </div>
              <span className={`text-sm font-semibold ${
                kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {kpi.change}
              </span>
            </div>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {kpi.value}
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {kpi.label}
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {kpi.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Leads Chart */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Revenue & Lead Trends
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
            <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                color: theme === 'dark' ? '#F9FAFB' : '#111827'
              }}
            />
            <Legend />
            <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
            <Area type="monotone" dataKey="leads" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Business Performance & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Performance */}
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Business Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={businessPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar dataKey="leads" fill="#8B5CF6" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Distribution */}
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Lead Sources
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Conversion Funnel
        </h2>
        <div className="space-y-4">
          {conversionFunnel.map((stage, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stage.stage}
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stage.count.toLocaleString()} ({stage.percentage}%)
                </span>
              </div>
              <div className={`w-full h-12 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div
                  className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold transition-all duration-500"
                  style={{ width: `${stage.percentage * 10}%` }}
                >
                  {stage.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Top Performing Campaigns
        </h2>
        <div className="space-y-4">
          {[
            { name: 'Summer Sale Email', conversions: 234, revenue: '$12,450', roi: '420%' },
            { name: 'Facebook Ads - Q2', conversions: 189, revenue: '$9,800', roi: '380%' },
            { name: 'LinkedIn Outreach', conversions: 156, revenue: '$8,200', roi: '340%' },
            { name: 'Instagram Stories', conversions: 134, revenue: '$6,900', roi: '290%' }
          ].map((campaign, idx) => (
            <div key={idx} className={`p-4 rounded-lg border flex items-center justify-between ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {campaign.name}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {campaign.conversions} conversions • {campaign.revenue} revenue
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-500 font-bold text-lg">{campaign.roi}</div>
                <div className="text-xs text-gray-500">ROI</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Live Activity Feed
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-500 font-medium">Live</span>
          </div>
        </div>
        <div className="space-y-4">
          {liveActivities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                activity.type === 'lead' ? 'bg-blue-500/10' :
                activity.type === 'campaign' ? 'bg-purple-500/10' :
                activity.type === 'revenue' ? 'bg-green-500/10' :
                activity.type === 'ai' ? 'bg-pink-500/10' :
                activity.type === 'conversion' ? 'bg-orange-500/10' :
                'bg-cyan-500/10'
              }`}>
                <activity.icon className={`w-5 h-5 ${
                  activity.type === 'lead' ? 'text-blue-500' :
                  activity.type === 'campaign' ? 'text-purple-500' :
                  activity.type === 'revenue' ? 'text-green-500' :
                  activity.type === 'ai' ? 'text-pink-500' :
                  activity.type === 'conversion' ? 'text-orange-500' :
                  'text-cyan-500'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {activity.message}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.business}
                  </span>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default GlobalAnalytics;
