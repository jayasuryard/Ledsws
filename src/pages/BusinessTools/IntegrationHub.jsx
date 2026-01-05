import React, { useState } from 'react';
import { Zap, Plus, Check, ExternalLink, Settings, Trash2, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const IntegrationHub = () => {
  const { theme } = useStore();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [connectionForm, setConnectionForm] = useState({ apiKey: '', accountId: '', webhookUrl: '' });

  const availableIntegrations = [
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps and automate workflows',
      icon: '⚡',
      category: 'Automation',
      status: 'available',
      color: 'orange',
      features: ['Custom workflows', 'Triggers & Actions', 'Multi-step zaps']
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept payments and manage subscriptions',
      icon: '💳',
      category: 'Payment',
      status: 'connected',
      color: 'purple',
      features: ['Payment processing', 'Subscription billing', 'Invoicing']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync contacts and email campaigns',
      icon: '🐵',
      category: 'Marketing',
      status: 'available',
      color: 'yellow',
      features: ['Email automation', 'Audience sync', 'Campaign tracking']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in your workspace',
      icon: '💬',
      category: 'Communication',
      status: 'connected',
      color: 'purple',
      features: ['Real-time notifications', 'Team collaboration', 'Bot commands']
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: '📊',
      category: 'Analytics',
      status: 'available',
      color: 'orange',
      features: ['Website tracking', 'Custom events', 'Conversion goals']
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Manage ads and sync leads from Facebook',
      icon: '📘',
      category: 'Social Media',
      status: 'connected',
      color: 'blue',
      features: ['Lead ads sync', 'Ad management', 'Page insights']
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Export data and sync with spreadsheets',
      icon: '📑',
      category: 'Productivity',
      status: 'available',
      color: 'green',
      features: ['Auto export', 'Real-time sync', 'Custom formulas']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync CRM contacts and marketing campaigns',
      icon: '🎯',
      category: 'CRM',
      status: 'available',
      color: 'orange',
      features: ['Contact sync', 'Deal tracking', 'Email integration']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Integrate with your Salesforce CRM',
      icon: '☁️',
      category: 'CRM',
      status: 'available',
      color: 'blue',
      features: ['Bi-directional sync', 'Custom fields', 'Workflow automation']
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'Send SMS notifications and make calls',
      icon: '📱',
      category: 'Communication',
      status: 'available',
      color: 'red',
      features: ['SMS automation', 'Voice calls', 'Number masking']
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      description: 'Create custom integrations with webhooks',
      icon: '🔗',
      category: 'Developer',
      status: 'available',
      color: 'gray',
      features: ['Custom endpoints', 'Real-time events', 'JSON payloads']
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: 'Embed forms and track leads from your site',
      icon: '✏️',
      category: 'Website',
      status: 'available',
      color: 'blue',
      features: ['Form embedding', 'Lead tracking', 'Popup integration']
    }
  ];

  const connectedIntegrations = availableIntegrations.filter(i => i.status === 'connected');
  const availableOnly = availableIntegrations.filter(i => i.status === 'available');

  const categories = ['All', 'Automation', 'Payment', 'Marketing', 'Communication', 'Analytics', 'Social Media', 'CRM', 'Productivity', 'Developer', 'Website'];
  const [activeCategory, setActiveCategory] = useState('All');

  const handleConnect = (integration) => {
    setSelectedIntegration(integration);
    setShowConnectModal(true);
    setConnectionForm({ apiKey: '', accountId: '', webhookUrl: '' });
  };

  const handleSubmitConnection = () => {
    // Add connection logic here
    console.log('Connecting:', selectedIntegration, connectionForm);
    setShowConnectModal(false);
  };

  const filteredIntegrations = activeCategory === 'All'
    ? availableOnly
    : availableOnly.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Integration Hub
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Connect your favorite tools and automate your workflow
          </p>
        </div>
        <button
          onClick={() => handleConnect({ id: 'custom', name: 'Custom Webhook' })}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Custom Integration</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Integrations', value: connectedIntegrations.length, color: 'blue' },
          { label: 'Total Available', value: availableIntegrations.length, color: 'purple' },
          { label: 'Data Synced', value: '12.4K', color: 'green' },
          { label: 'Automation Runs', value: '1,284', color: 'orange' }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Connected Integrations */}
      {connectedIntegrations.length > 0 && (
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Connected Integrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedIntegrations.map((integration) => (
              <div key={integration.id} className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {integration.name}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1 text-xs text-green-500">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Connected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}>
                    <Settings className="w-4 h-4 mx-auto" />
                  </button>
                  <button className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-700 text-red-400 hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-red-600 hover:bg-gray-50'
                  }`}>
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Available Integrations */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Available Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{integration.icon}</div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  {integration.category}
                </span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {integration.name}
              </h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {integration.description}
              </p>
              <div className="space-y-2 mb-4">
                {integration.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Connect</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } p-6`}>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connect {selectedIntegration.name}
            </h2>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter your credentials to connect this integration
            </p>

            {/* Connection Form */}
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  API Key <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={connectionForm.apiKey}
                  onChange={(e) => setConnectionForm({ ...connectionForm, apiKey: e.target.value })}
                  placeholder="sk_live_xxxxxxxxxxxxx"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Account ID (Optional)
                </label>
                <input
                  type="text"
                  value={connectionForm.accountId}
                  onChange={(e) => setConnectionForm({ ...connectionForm, accountId: e.target.value })}
                  placeholder="acct_xxxxxxxxx"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Webhook URL (Optional)
                </label>
                <input
                  type="url"
                  value={connectionForm.webhookUrl}
                  onChange={(e) => setConnectionForm({ ...connectionForm, webhookUrl: e.target.value })}
                  placeholder="https://yourdomain.com/webhook"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              {/* Info Box */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className={`font-medium mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      How to get your API Key:
                    </p>
                    <p className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}>
                      Go to {selectedIntegration.name} Dashboard → Settings → API Keys → Create new key
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowConnectModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitConnection}
                disabled={!connectionForm.apiKey}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  !connectionForm.apiKey
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationHub;
