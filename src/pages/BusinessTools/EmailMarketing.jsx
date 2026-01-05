import React, { useState } from 'react';
import { Mail, Plus, Send, Users, BarChart3, Clock, Edit, Copy, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const EmailMarketing = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);

  const campaigns = [
    {
      id: 1,
      name: 'Summer Sale 2026',
      subject: '🔥 50% Off Everything This Weekend Only!',
      status: 'sent',
      sent: 2456,
      opened: 1234,
      clicked: 456,
      revenue: '$12,450',
      date: 'Jan 10, 2026'
    },
    {
      id: 2,
      name: 'Weekly Newsletter #42',
      subject: 'This Week\'s Top Updates & Tips',
      status: 'sent',
      sent: 2456,
      opened: 982,
      clicked: 234,
      revenue: '$3,200',
      date: 'Jan 8, 2026'
    },
    {
      id: 3,
      name: 'Product Launch Teaser',
      subject: 'Something Big Is Coming... 👀',
      status: 'scheduled',
      scheduledFor: 'Jan 20, 2026',
      recipients: 2456
    },
    {
      id: 4,
      name: 'Customer Survey',
      subject: 'We\'d Love Your Feedback!',
      status: 'draft',
      lastEdited: 'Jan 5, 2026'
    }
  ];

  const templates = [
    { id: 1, name: 'Welcome Email', category: 'Onboarding' },
    { id: 2, name: 'Product Launch', category: 'Announcement' },
    { id: 3, name: 'Weekly Newsletter', category: 'Content' },
    { id: 4, name: 'Abandoned Cart', category: 'E-commerce' },
    { id: 5, name: 'Re-engagement', category: 'Retention' },
    { id: 6, name: 'Event Invitation', category: 'Events' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Email Marketing
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Create and send email campaigns
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700">
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Subscribers', value: '2,456', icon: Users, color: 'blue' },
          { label: 'Open Rate', value: '48.2%', icon: Mail, color: 'green' },
          { label: 'Click Rate', value: '12.4%', icon: BarChart3, color: 'purple' },
          { label: 'Total Revenue', value: '$28,450', icon: BarChart3, color: 'orange' }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-3 rounded-lg w-fit mb-3 ${
              stat.color === 'blue' ? 'bg-blue-500/10' :
              stat.color === 'green' ? 'bg-green-500/10' :
              stat.color === 'purple' ? 'bg-purple-500/10' :
              'bg-orange-500/10'
            }`}>
              <stat.icon className={`w-6 h-6 ${
                stat.color === 'blue' ? 'text-blue-500' :
                stat.color === 'green' ? 'text-green-500' :
                stat.color === 'purple' ? 'text-purple-500' :
                'text-orange-500'
              }`} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns List */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Recent Campaigns
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaign.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'sent' ? 'bg-green-500/20 text-green-500' :
                      campaign.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {campaign.subject}
                  </p>

                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Sent
                        </div>
                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {campaign.sent.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Opened
                        </div>
                        <div className={`text-lg font-bold text-green-500`}>
                          {campaign.opened.toLocaleString()}
                          <span className="text-xs ml-1">
                            ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Clicked
                        </div>
                        <div className={`text-lg font-bold text-blue-500`}>
                          {campaign.clicked.toLocaleString()}
                          <span className="text-xs ml-1">
                            ({((campaign.clicked / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Revenue
                        </div>
                        <div className={`text-lg font-bold text-purple-500`}>
                          {campaign.revenue}
                        </div>
                      </div>
                    </div>
                  )}

                  {campaign.status === 'scheduled' && (
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Scheduled for {campaign.scheduledFor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{campaign.recipients} recipients</span>
                      </div>
                    </div>
                  )}

                  {campaign.status === 'draft' && (
                    <div className="text-sm text-gray-500">
                      Last edited {campaign.lastEdited}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 rounded-lg hover:bg-gray-800">
                    <Edit className="w-5 h-5 text-blue-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800">
                    <Copy className="w-5 h-5 text-green-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Templates */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Email Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className={`p-6 rounded-lg border cursor-pointer transition-all hover:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-blue-500/10`}>
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xs text-gray-500">{template.category}</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {template.name}
              </h3>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Subscriber Lists */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Subscriber Lists
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Create List
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'All Subscribers', count: 2456, active: 2389 },
            { name: 'VIP Customers', count: 234, active: 230 },
            { name: 'Newsletter Only', count: 1456, active: 1398 }
          ].map((list, idx) => (
            <div key={idx} className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {list.name}
              </h3>
              <div className="flex items-baseline space-x-2">
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {list.count.toLocaleString()}
                </span>
                <span className="text-sm text-green-500">
                  {list.active} active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailMarketing;
