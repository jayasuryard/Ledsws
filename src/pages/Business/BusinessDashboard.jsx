import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageSquare, Mail, Share2, Palette, Search, 
  FileText, CreditCard, BarChart3, Plug, Settings, Inbox,
  TrendingUp, Users, DollarSign, Activity, Zap
} from 'lucide-react';
import useStore from '../../store/useStore';

const BusinessDashboard = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  if (!business) {
    return (
      <div className="text-center py-12">
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Business not found
        </p>
      </div>
    );
  }

  const tools = [
    {
      title: 'Unified Inbox',
      description: 'All messages in one place',
      icon: Inbox,
      color: 'blue',
      path: `/business/${businessId}/inbox`,
      stats: '12 new'
    },
    {
      title: 'Social Media Automation',
      description: 'Schedule & automate posts',
      icon: Share2,
      color: 'purple',
      path: `/business/${businessId}/social`,
      stats: '5 scheduled'
    },
    {
      title: 'Email Marketing',
      description: 'Campaigns & sequences',
      icon: Mail,
      color: 'green',
      path: `/business/${businessId}/email`,
      stats: '3 active'
    },
    {
      title: 'Lead CRM Pipeline',
      description: 'Manage your leads',
      icon: Users,
      color: 'orange',
      path: `/business/${businessId}/crm`,
      stats: '45 leads'
    },
    {
      title: 'Brand Kit & AI Persona',
      description: 'Colors, logos, voice',
      icon: Palette,
      color: 'pink',
      path: `/business/${businessId}/brand`,
      stats: 'Setup'
    },
    {
      title: 'Website SEO Audit',
      description: 'Optimize your site',
      icon: Search,
      color: 'yellow',
      path: `/business/${businessId}/seo`,
      stats: 'Run audit'
    },
    {
      title: 'Lead Forms',
      description: 'Create & embed forms',
      icon: FileText,
      color: 'cyan',
      path: `/business/${businessId}/forms`,
      stats: '2 forms'
    },
    {
      title: 'Digital Business Cards',
      description: 'Share instantly',
      icon: CreditCard,
      color: 'indigo',
      path: `/business/${businessId}/cards`,
      stats: '1 card'
    },
    {
      title: 'Business Analytics',
      description: 'Unified insights',
      icon: BarChart3,
      color: 'green',
      path: `/business/${businessId}/analytics`,
      stats: 'View'
    },
    {
      title: 'Integrations Hub',
      description: 'Connect platforms',
      icon: Plug,
      color: 'blue',
      path: `/business/${businessId}/integrations`,
      stats: '0 connected'
    },
    {
      title: 'Lead Scorer',
      description: 'Auto-score leads',
      icon: Zap,
      color: 'yellow',
      path: `/business/${businessId}/scorer`,
      stats: 'Active'
    },
    {
      title: 'Settings',
      description: 'Business configuration',
      icon: Settings,
      color: 'gray',
      path: `/business/${businessId}/settings`,
      stats: 'Configure'
    }
  ];

  const kpis = [
    { label: 'Total Leads', value: '124', change: '+12%', icon: TrendingUp, color: 'blue' },
    { label: 'Conversion Rate', value: '24%', change: '+5%', icon: Activity, color: 'green' },
    { label: 'Revenue', value: '$12.5K', change: '+23%', icon: DollarSign, color: 'purple' },
    { label: 'Active Campaigns', value: '8', change: '+2', icon: Zap, color: 'orange' }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 text-blue-500',
      purple: 'bg-purple-500/10 text-purple-500',
      green: 'bg-green-500/10 text-green-500',
      orange: 'bg-orange-500/10 text-orange-500',
      pink: 'bg-pink-500/10 text-pink-500',
      yellow: 'bg-yellow-500/10 text-yellow-500',
      cyan: 'bg-cyan-500/10 text-cyan-500',
      indigo: 'bg-indigo-500/10 text-indigo-500',
      gray: 'bg-gray-500/10 text-gray-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/businesses"
        className={`inline-flex items-center space-x-2 text-sm ${
          theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Businesses</span>
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {business.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {business.name}
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {business.industry} • {business.website || 'No website'}
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${getColorClass(kpi.color)}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-green-500">{kpi.change}</span>
            </div>
            <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {kpi.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {kpi.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Business Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              to={tool.path}
              className={`p-6 rounded-xl border transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 hover:border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className={`p-3 rounded-lg mb-4 ${getColorClass(tool.color)} w-fit`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {tool.title}
              </h3>
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {tool.description}
              </p>
              <div className={`text-xs font-medium ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {tool.stats}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
