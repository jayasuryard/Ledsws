import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Mail, Target, Plus, ArrowRight,
  BarChart3, Sparkles, Building2, Calendar, Clock
} from 'lucide-react';
import useStore from '../../store/useStore';
import { Card, Button, Badge, Avatar } from '../../components/ui';

const ModernDashboard = () => {
  const { user, businesses, globalAnalytics } = useStore();
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${(globalAnalytics.totalRevenue || 0).toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      label: 'Active Leads',
      value: globalAnalytics.weeklyLeads || 0,
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Campaigns',
      value: globalAnalytics.campaignsCreated || 0,
      change: '+5 this week',
      trend: 'up',
      icon: Mail,
    },
    {
      label: 'Conversion',
      value: `${globalAnalytics.conversionRate || 0}%`,
      change: '+2.3%',
      trend: 'up',
      icon: Target,
    },
  ];

  const quickActions = [
    {
      title: 'AI Business Setup',
      description: 'Create business from URL in 60s',
      icon: Sparkles,
      action: () => navigate('/app/ai-setup'),
      color: 'navy',
    },
    {
      title: 'View Analytics',
      description: 'See detailed insights',
      icon: BarChart3,
      action: () => navigate('/app/analytics'),
      color: 'blue',
    },
    {
      title: 'AI Content Studio',
      description: 'Generate content with AI',
      icon: Sparkles,
      action: () => navigate('/app/ai-studio'),
      color: 'purple',
    },
  ];

  const recentActivity = [
    { type: 'lead', message: 'New lead from Website Form', time: '2 min ago', user: 'Sarah J.' },
    { type: 'campaign', message: 'Email campaign sent successfully', time: '15 min ago', user: 'System' },
    { type: 'conversion', message: 'Lead converted to customer', time: '1 hour ago', user: 'Michael C.' },
    { type: 'lead', message: 'New lead from LinkedIn', time: '2 hours ago', user: 'Emma R.' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your businesses today
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => navigate('/app/ai-setup')}
        >
          New Business
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-navy-50 rounded-lg">
                <stat.icon className="w-5 h-5 text-navy-900" />
              </div>
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.action}
              className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-navy-900 hover:bg-navy-50 transition-all group"
            >
              <action.icon className="w-6 h-6 text-navy-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Businesses */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Businesses</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/businesses')}
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          {businesses && businesses.length > 0 ? (
            <div className="space-y-3">
              {businesses.slice(0, 3).map((business) => (
                <div
                  key={business.id}
                  onClick={() => navigate(`/app/business/${business.id}`)}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-navy-900 hover:bg-navy-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-white font-bold">
                      {business.name?.charAt(0) || 'B'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{business.name}</h3>
                      <p className="text-sm text-gray-600">{business.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-right">
                      <div className="text-gray-900 font-medium">
                        {business.metrics?.leads || 0} leads
                      </div>
                      <div className="text-gray-600">This month</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses yet</h3>
              <p className="text-gray-600 mb-4">Create your first business in 60 seconds</p>
              <Button onClick={() => navigate('/app/ai-setup')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Business
              </Button>
            </div>
          )}
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-navy-900 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {activity.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-600">{activity.time}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModernDashboard;
