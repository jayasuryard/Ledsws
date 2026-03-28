import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, DollarSign, Briefcase, Users, Activity, 
  Zap, ArrowRight, Plus, Crown, Calendar, X, Sparkles
} from 'lucide-react';
import useStore from '../../store/useStore';

const GlobalDashboard = () => {
  const { theme, businesses, subscription, globalAnalytics, user, activities, addBusiness } = useStore();
  const navigate = useNavigate();
  const [showNewBusinessModal, setShowNewBusinessModal] = useState(false);
  const [newBusinessForm, setNewBusinessForm] = useState({
    name: '',
    industry: '',
    website: '',
    description: '',
    goals: [],
    channels: []
  });

  const industries = [
    'Technology', 'E-commerce', 'Healthcare', 'Finance', 'Education',
    'Real Estate', 'Marketing', 'Consulting', 'Restaurant', 'Retail', 'Other'
  ];

  const goalOptions = [
    'Generate Leads', 'Increase Sales', 'Build Brand Awareness',
    'Customer Retention', 'Market Expansion', 'Product Launch'
  ];

  const channelOptions = [
    'Email Marketing', 'Social Media', 'SEO', 'Paid Ads',
    'Content Marketing', 'Referral Program', 'Events'
  ];

  const handleCreateBusiness = () => {
    if (!newBusinessForm.name || !newBusinessForm.industry) return;
    
    const newBusiness = {
      id: Date.now().toString(),
      ...newBusinessForm,
      createdAt: new Date().toISOString(),
      status: 'active',
      metrics: {
        revenue: 0,
        leads: 0,
        conversionRate: 0
      }
    };

    addBusiness(newBusiness);
    setShowNewBusinessModal(false);
    setNewBusinessForm({
      name: '',
      industry: '',
      website: '',
      description: '',
      goals: [],
      channels: []
    });
    navigate(`/app/business/${newBusiness.id}`);
  };

  const toggleArrayItem = (array, item) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${globalAnalytics.totalRevenue.toLocaleString()}`,
      change: '+23.5%',
      positive: true,
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Active Businesses',
      value: businesses.length,
      subtext: `of ${subscription.usageLimits.businesses} limit`,
      icon: Briefcase,
      color: 'blue'
    },
    {
      label: 'Weekly Leads',
      value: globalAnalytics.weeklyLeads,
      change: '+12.3%',
      positive: true,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      label: 'Conversion Rate',
      value: `${globalAnalytics.conversionRate}%`,
      change: '+5.2%',
      positive: true,
      icon: Activity,
      color: 'orange'
    }
  ];

  // Bento Box Layout
  return (
    <div className="min-h-screen w-full px-2 md:px-6 py-6 flex flex-col gap-6">
      {/* Welcome + New Business Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome back, {user?.name}! 👋</h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Here's what's happening across your businesses</p>
        </div>
        <button
          onClick={() => setShowNewBusinessModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>New Business</span>
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 md:grid-rows-4 gap-6 auto-rows-fr">
        {/* AI Setup CTA - Large Bento Block */}
        <div className="relative overflow-hidden rounded-2xl border col-span-1 md:col-span-2 row-span-2 flex flex-col justify-between shadow-lg
          ${theme === 'dark' ? 'bg-navy-900/20 border-navy-500/30' : 'bg-navy-50 border-navy-200'}">
          <div className="relative p-8 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-navy-900">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme === 'dark' ? 'bg-navy-500/20 text-navy-300 border border-navy-500/30' : 'bg-navy-100 text-navy-900 border border-navy-200'}`}>🚀 NEW: AI-Powered Setup</span>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Launch Your Business in 60 Seconds</h2>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Just enter your website URL. Our AI analyzes it and instantly creates your complete marketing system—business profile, lead forms, email workflows, and ready-to-use content.</p>
            <div className={`flex flex-wrap gap-4 text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}> 
              <div className="flex items-center space-x-2"><Zap className="w-4 h-4 text-yellow-500" /><span>Instant Analysis</span></div>
              <div className="flex items-center space-x-2"><Briefcase className="w-4 h-4 text-navy-900" /><span>Auto Brand Detection</span></div>
              <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-navy-900" /><span>Lead Forms & Email Sequences</span></div>
            </div>
            <button
              onClick={() => navigate('/app/ai-setup')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-navy-900 text-white rounded-xl font-bold hover:bg-navy-800 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-navy-900/20"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start AI Setup Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* Decorative elements */}
            <div className="hidden lg:block absolute right-0 bottom-0 w-40 h-40">
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${theme === 'dark' ? 'bg-navy-500/10' : 'bg-navy-200/50'} blur-xl`}></div>
              <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full ${theme === 'dark' ? 'bg-navy-500/10' : 'bg-navy-200/50'} blur-xl`}></div>
            </div>
          </div>
        </div>

        {/* KPI Cards - 4 Bento Blocks */}
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl border flex flex-col justify-between shadow-md transition-all hover:scale-[1.03] cursor-pointer
              ${theme === 'dark' ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'}
            `}
            style={{ gridColumn: `span 1 / span 1`, gridRow: `span 1 / span 1` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                kpi.color === 'green' ? 'bg-green-500/10 text-green-500' :
                kpi.color === 'blue' ? 'bg-navy-100 text-navy-900' :
                kpi.color === 'purple' ? 'bg-navy-100 text-navy-900' :
                'bg-orange-500/10 text-orange-500'
              }`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              {kpi.change && (
                <span className={`text-sm font-semibold ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>{kpi.change}</span>
              )}
            </div>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{kpi.value}</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{kpi.subtext || kpi.label}</div>
          </div>
        ))}

        {/* Businesses Overview - Large Bento Block */}
        <div className={`p-6 rounded-xl border col-span-1 md:col-span-2 row-span-2 flex flex-col shadow-lg
          ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your Businesses</h3>
            <Link to="/businesses" className="text-navy-900 hover:text-navy-800 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {businesses.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>No businesses yet</p>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Create your first business to start generating leads</p>
              <Link to="/businesses/new" className="inline-flex items-center space-x-2 px-6 py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-all">
                <Plus className="w-5 h-5" />
                <span>Create Business</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businesses.map((business) => (
                <Link
                  key={business.id}
                  to={`/business/${business.id}`}
                  className={`p-4 rounded-lg border transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-navy-500' : 'bg-gray-50 border-gray-200 hover:border-navy-900'}`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{business.name}</h4>
                      <p className="text-xs text-gray-500">{business.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{business.goals?.length || 0} goals</span>
                    <ArrowRight className="w-4 h-4 text-navy-900" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions - 3 Bento Blocks */}
        <Link
          to="/ai-studio"
          className={`p-6 rounded-xl border flex flex-col justify-between shadow-md transition-all hover:scale-[1.03] cursor-pointer
            ${theme === 'dark' ? 'bg-gray-900 border-gray-800 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'}`}
        >
          <Zap className="w-8 h-8 text-navy-900 mb-3" />
          <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI Content Studio</h4>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Generate blogs, posts, and content</p>
        </Link>
        <Link
          to="/team"
          className={`p-6 rounded-xl border flex flex-col justify-between shadow-md transition-all hover:scale-[1.03] cursor-pointer
            ${theme === 'dark' ? 'bg-gray-900 border-gray-800 hover:border-navy-500' : 'bg-white border-gray-200 hover:border-navy-900'}`}
        >
          <Users className="w-8 h-8 text-navy-900 mb-3" />
          <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Team Management</h4>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Add members and assign roles</p>
        </Link>
        <Link
          to="/analytics"
          className={`p-6 rounded-xl border flex flex-col justify-between shadow-md transition-all hover:scale-[1.03] cursor-pointer
            ${theme === 'dark' ? 'bg-gray-900 border-gray-800 hover:border-green-500' : 'bg-white border-gray-200 hover:border-green-500'}`}
        >
          <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
          <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Analytics Reports</h4>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>View consolidated insights</p>
        </Link>

        {/* Subscription Status - Small Bento Block */}
        <div className={`p-6 rounded-xl border flex flex-col justify-between shadow-md
          ${theme === 'dark' ? 'bg-navy-900/10 border-navy-500/20' : 'bg-navy-50 border-navy-200'}`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-6 h-6 text-navy-900" />
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Current Plan</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{subscription.plan === 'free' ? 'Free Plan' : 'Pro Plan'}</div>
              <div className="text-sm text-gray-500">{subscription.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'} billing</div>
            </div>
            <div className="space-y-2 pt-3 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Leads Used</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{subscription.currentUsage.leads} / {subscription.usageLimits.leads}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-navy-900 h-2 rounded-full" style={{ width: `${(subscription.currentUsage.leads / subscription.usageLimits.leads) * 100}%` }} />
              </div>
            </div>
            <Link to="/subscription" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4">Upgrade Plan</Link>
          </div>
        </div>

        {/* Live Activity Feed - Large Bento Block */}
        <div className={`col-span-1 md:col-span-2 row-span-2 p-6 rounded-xl border flex flex-col shadow-lg
          ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Live Activity Feed</h3>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 mx-auto mb-2 text-gray-500 opacity-50" />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No recent activity yet</p>
              </div>
            ) : (
              activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-navy-100 rounded-lg"><Zap className="w-4 h-4 text-navy-900" /></div>
                    <div className="flex-1">
                      <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* New Business Modal (unchanged) */}
      {showNewBusinessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-navy-900 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Business</h2>
                  <p className="text-gray-200 mt-1">Set up a new business to start generating leads</p>
                </div>
                <button
                  onClick={() => setShowNewBusinessModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Business Name <span className="text-red-500">*</span></label>
                    <input type="text" value={newBusinessForm.name} onChange={(e) => setNewBusinessForm({ ...newBusinessForm, name: e.target.value })} placeholder="e.g., Acme Marketing Agency" className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Industry <span className="text-red-500">*</span></label>
                    <select value={newBusinessForm.industry} onChange={(e) => setNewBusinessForm({ ...newBusinessForm, industry: e.target.value })} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Website (Optional)</label>
                    <input type="url" value={newBusinessForm.website} onChange={(e) => setNewBusinessForm({ ...newBusinessForm, website: e.target.value })} placeholder="https://example.com" className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Description (Optional)</label>
                    <textarea value={newBusinessForm.description} onChange={(e) => setNewBusinessForm({ ...newBusinessForm, description: e.target.value })} placeholder="Brief description of your business..." rows={3} className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} />
                  </div>
                </div>
              </div>
              {/* Goals */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Business Goals</h3>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Select your primary objectives</p>
                <div className="grid grid-cols-2 gap-3">
                  {goalOptions.map((goal) => (
                    <button key={goal} onClick={() => setNewBusinessForm({ ...newBusinessForm, goals: toggleArrayItem(newBusinessForm.goals, goal) })} className={`p-3 rounded-lg border text-left transition-all ${newBusinessForm.goals.includes(goal) ? 'bg-blue-600 border-blue-600 text-white' : theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}>{goal}</button>
                  ))}
                </div>
              </div>
              {/* Channels */}
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Marketing Channels</h3>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Which channels will you use?</p>
                <div className="grid grid-cols-2 gap-3">
                  {channelOptions.map((channel) => (
                    <button key={channel} onClick={() => setNewBusinessForm({ ...newBusinessForm, channels: toggleArrayItem(newBusinessForm.channels, channel) })} className={`p-3 rounded-lg border text-left transition-all ${newBusinessForm.channels.includes(channel) ? 'bg-purple-600 border-purple-600 text-white' : theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'}`}>{channel}</button>
                  ))}
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className={`sticky bottom-0 p-6 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} rounded-b-xl`}>
              <div className="flex items-center justify-end space-x-3">
                <button onClick={() => setShowNewBusinessModal(false)} className={`px-6 py-3 rounded-lg border font-medium ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}>Cancel</button>
                <button onClick={handleCreateBusiness} disabled={!newBusinessForm.name || !newBusinessForm.industry} className={`px-6 py-3 rounded-lg font-medium ${!newBusinessForm.name || !newBusinessForm.industry ? 'bg-gray-600 cursor-not-allowed' : 'bg-navy-900 hover:bg-navy-800'} text-white`}>Create Business</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalDashboard;
