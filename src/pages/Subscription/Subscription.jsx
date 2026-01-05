import React, { useState } from 'react';
import { Check, Crown, Zap, ArrowRight, CreditCard, Download } from 'lucide-react';
import useStore from '../../store/useStore';

const Subscription = () => {
  const { theme, subscription, updateSubscription } = useStore();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '1 Business',
        '100 Leads/month',
        '1 Team Member',
        '10,000 AI Tokens',
        'Email Support',
        'Basic Analytics'
      ],
      limitations: ['No Social Media', 'No Integrations'],
      color: 'gray',
      cta: 'Current Plan'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: { monthly: 49, yearly: 490 },
      description: 'For growing businesses',
      features: [
        '5 Businesses',
        '10,000 Leads/month',
        '10 Team Members',
        '100,000 AI Tokens',
        'Priority Support',
        'Advanced Analytics',
        'Social Media Automation',
        'Email Marketing',
        'All Integrations',
        'Custom Branding'
      ],
      popular: true,
      color: 'blue',
      cta: 'Upgrade to Pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'For large organizations',
      features: [
        'Unlimited Businesses',
        'Unlimited Leads',
        'Unlimited Team Members',
        'Unlimited AI Tokens',
        'Dedicated Support',
        'Custom Analytics',
        'White Label',
        'API Access',
        'Custom Integrations',
        'SLA Guarantee',
        'Training & Onboarding',
        'Advanced Security'
      ],
      color: 'purple',
      cta: 'Contact Sales'
    }
  ];

  const invoices = [
    { id: 1, date: 'Dec 1, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Monthly' },
    { id: 2, date: 'Nov 1, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Monthly' },
    { id: 3, date: 'Oct 1, 2025', amount: '$49.00', status: 'Paid', plan: 'Pro Monthly' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Choose Your Plan
        </h1>
        <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Scale your business with the right tools
        </p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            billingCycle === 'monthly'
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-800 text-gray-300'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('yearly')}
          className={`px-6 py-2 rounded-lg font-medium transition-all relative ${
            billingCycle === 'yearly'
              ? 'bg-blue-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-800 text-gray-300'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Yearly
          <span className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            Save 16%
          </span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-8 rounded-2xl border-2 transition-all hover:scale-105 relative ${
              plan.popular
                ? 'border-blue-500 shadow-xl shadow-blue-500/20'
                : theme === 'dark'
                ? 'border-gray-800'
                : 'border-gray-200'
            } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className={`p-3 rounded-lg w-fit mb-4 ${
              plan.color === 'gray' ? 'bg-gray-500/10' :
              plan.color === 'blue' ? 'bg-blue-500/10' :
              'bg-purple-500/10'
            }`}>
              {plan.color === 'purple' ? <Crown className="w-8 h-8 text-purple-500" /> : <Zap className="w-8 h-8 text-blue-500" />}
            </div>

            <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {plan.name}
            </h3>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {plan.description}
            </p>

            <div className="mb-6">
              {typeof plan.price[billingCycle] === 'number' ? (
                <>
                  <span className={`text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price[billingCycle]}
                  </span>
                  <span className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </>
              ) : (
                <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price[billingCycle]}
                </span>
              )}
            </div>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition-all mb-6 ${
                plan.id === subscription.plan
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={plan.id === subscription.plan}
            >
              {plan.cta}
            </button>

            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
              {plan.limitations?.map((limitation, idx) => (
                <div key={idx} className="flex items-start space-x-3 opacity-50">
                  <span className="text-sm">❌</span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {limitation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Current Usage */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Current Usage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Leads', used: subscription.currentUsage.leads, limit: subscription.usageLimits.leads },
            { label: 'Businesses', used: subscription.currentUsage.businesses, limit: subscription.usageLimits.businesses },
            { label: 'AI Tokens', used: subscription.currentUsage.aiTokens, limit: subscription.usageLimits.aiTokens },
            { label: 'Team Members', used: subscription.currentUsage.teamMembers, limit: subscription.usageLimits.teamMembers }
          ].map((usage, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {usage.label}
                </span>
                <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {usage.used} / {usage.limit}
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${(usage.used / usage.limit) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Payment Method
          </h2>
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Add Card
          </button>
        </div>
        <div className={`p-4 rounded-lg border flex items-center justify-between ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                •••• •••• •••• 4242
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Expires 12/2027
              </div>
            </div>
          </div>
          <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
            Edit
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Billing History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{invoice.plan}</td>
                  <td className={`px-6 py-4 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-400 flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
