import React from 'react';
import { X, Mail, TrendingUp, MousePointerClick, DollarSign, XCircle, Eye } from 'lucide-react';

const CampaignDetailModal = ({ theme, campaign, onClose }) => {
  if (!campaign) return null;

  const stats = [
    {
      label: 'Sent',
      value: campaign.sent?.toLocaleString() || '0',
      icon: Mail,
      color: 'blue',
      description: 'Total emails sent'
    },
    {
      label: 'Delivered',
      value: campaign.delivered?.toLocaleString() || campaign.sent?.toLocaleString() || '0',
      icon: TrendingUp,
      color: 'green',
      description: 'Successfully delivered',
      percentage: campaign.sent ? ((campaign.delivered || campaign.sent) / campaign.sent * 100).toFixed(1) : '100'
    },
    {
      label: 'Opened',
      value: campaign.opened?.toLocaleString() || '0',
      icon: Eye,
      color: 'purple',
      description: 'Unique opens',
      percentage: campaign.sent ? ((campaign.opened || 0) / campaign.sent * 100).toFixed(1) : '0'
    },
    {
      label: 'Clicked',
      value: campaign.clicked?.toLocaleString() || '0',
      icon: MousePointerClick,
      color: 'orange',
      description: 'Link clicks',
      percentage: campaign.sent ? ((campaign.clicked || 0) / campaign.sent * 100).toFixed(1) : '0'
    },
    {
      label: 'Bounced',
      value: campaign.bounced?.toLocaleString() || '0',
      icon: XCircle,
      color: 'red',
      description: 'Failed delivery',
      percentage: campaign.sent ? ((campaign.bounced || 0) / campaign.sent * 100).toFixed(1) : '0'
    },
    {
      label: 'Revenue',
      value: `$${campaign.revenue?.toLocaleString() || '0'}`,
      icon: DollarSign,
      color: 'green',
      description: 'Generated revenue'
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-500/10',
      green: 'text-green-500 bg-green-500/10',
      purple: 'text-purple-500 bg-purple-500/10',
      orange: 'text-orange-500 bg-orange-500/10',
      red: 'text-red-500 bg-red-500/10'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {campaign.name}
                </h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'sent' ? 'bg-green-500/20 text-green-500' :
                  campaign.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-gray-500/20 text-gray-500'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {campaign.subject}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {campaign.status === 'sent' && `Sent on ${campaign.date}`}
                {campaign.status === 'scheduled' && `Scheduled for ${campaign.scheduledFor}`}
                {campaign.status === 'draft' && `Last edited ${campaign.lastEdited}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Campaign Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`p-3 rounded-lg w-fit mb-3 ${getColorClass(stat.color)}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                    {stat.percentage && (
                      <span className={`text-sm ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        ({stat.percentage}%)
                      </span>
                    )}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Details */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Campaign Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  From
                </div>
                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {campaign.fromName} &lt;{campaign.fromEmail}&gt;
                </div>
              </div>
              <div>
                <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subject Line
                </div>
                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {campaign.subject}
                </div>
              </div>
              {campaign.previewText && (
                <div className="col-span-2">
                  <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Preview Text
                  </div>
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {campaign.previewText}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Email Content Preview */}
          {campaign.body && (
            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Email Content
              </h3>
              <div className={`p-4 rounded-lg border font-mono text-sm whitespace-pre-wrap ${
                theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
              }`}>
                {campaign.body}
              </div>
            </div>
          )}

          {/* Audience Info */}
          {campaign.filters && Object.keys(campaign.filters).length > 0 && (
            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Audience Filters
              </h3>
              <div className="space-y-2">
                {campaign.filters.statuses?.length > 0 && (
                  <div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Status:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {campaign.filters.statuses.map((status, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded text-sm">
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {campaign.filters.sources?.length > 0 && (
                  <div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Sources:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {campaign.filters.sources.map((source, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded text-sm">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {(campaign.filters.minScore || campaign.filters.maxScore) && (
                  <div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Lead Score:
                    </span>
                    <span className={`ml-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaign.filters.minScore || 0} - {campaign.filters.maxScore || '∞'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Engagement Metrics */}
          {campaign.status === 'sent' && (
            <div className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Engagement Insights
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Overall Engagement Rate:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {campaign.sent ? (((campaign.opened + campaign.clicked) / campaign.sent * 100) / 2).toFixed(1) : '0'}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Click-to-Open Rate:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {campaign.opened ? ((campaign.clicked / campaign.opened * 100).toFixed(1)) : '0'}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Revenue per Email:
                  </span>
                  <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${campaign.sent ? ((campaign.revenue || 0) / campaign.sent).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailModal;
