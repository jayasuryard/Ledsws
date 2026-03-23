import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Mail, Eye, MousePointer, Users,
  DollarSign, Calendar, Download, Filter, ArrowUpRight,
  ArrowDownRight, Activity
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const EmailAnalytics = () => {
  const { businessId } = useParams();
  const { theme, businesses, emailCampaigns } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [timeRange, setTimeRange] = useState('30d');
  const [metric, setMetric] = useState('opens');

  // Mock funnel data
  const funnelData = [
    { stage: 'Sent', count: 15420, percentage: 100, color: 'blue' },
    { stage: 'Delivered', count: 15180, percentage: 98.4, color: 'purple' },
    { stage: 'Opened', count: 6827, percentage: 44.8, color: 'green' },
    { stage: 'Clicked', count: 1892, percentage: 12.4, color: 'yellow' },
    { stage: 'Converted', count: 234, percentage: 1.5, color: 'orange' }
  ];

  // Mock performance data
  const performanceData = [
    { date: 'Week 1', sent: 3200, opens: 1450, clicks: 412, conversions: 45 },
    { date: 'Week 2', sent: 3850, opens: 1720, clicks: 498, conversions: 58 },
    { date: 'Week 3', sent: 4120, opens: 1890, clicks: 567, conversions: 67 },
    { date: 'Week 4', sent: 4250, opens: 1767, clicks: 415, conversions: 64 }
  ];

  const maxValue = Math.max(...performanceData.map(d => d.sent));

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Email Analytics
            </h1>
            <p className="text-gray-500">
              Deep dive into email performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-3">
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
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
            <button className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}>
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <div className={`text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            15.4K
          </div>
          <div className="text-sm text-gray-500">Emails Sent</div>
          <div className="mt-2 text-xs text-green-500">+22.5% from last period</div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-500" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <div className={`text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            44.3%
          </div>
          <div className="text-sm text-gray-500">Open Rate</div>
          <div className="mt-2 text-xs text-green-500">+5.2% from last period</div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <MousePointer className="w-6 h-6 text-green-500" />
            </div>
            <ArrowDownRight className="w-5 h-5 text-red-500" />
          </div>
          <div className={`text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            12.3%
          </div>
          <div className="text-sm text-gray-500">Click-Through Rate</div>
          <div className="mt-2 text-xs text-red-500">-2.1% from last period</div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-500" />
          </div>
          <div className={`text-3xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            $24.5K
          </div>
          <div className="text-sm text-gray-500">Revenue Generated</div>
          <div className="mt-2 text-xs text-green-500">+15.7% from last period</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className={`p-6 rounded-xl border mb-8 ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Performance Over Time
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMetric('opens')}
              className={`px-3 py-1 rounded-lg text-sm ${
                metric === 'opens'
                  ? 'bg-purple-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              Opens
            </button>
            <button
              onClick={() => setMetric('clicks')}
              className={`px-3 py-1 rounded-lg text-sm ${
                metric === 'clicks'
                  ? 'bg-green-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              Clicks
            </button>
            <button
              onClick={() => setMetric('conversions')}
              className={`px-3 py-1 rounded-lg text-sm ${
                metric === 'conversions'
                  ? 'bg-orange-500 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              Conversions
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between space-x-2 h-64">
          {performanceData.map((data, index) => {
            const value = data[metric === 'opens' ? 'opens' : metric === 'clicks' ? 'clicks' : 'conversions'];
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col justify-end flex-1">
                  <div
                    className={`w-full rounded-t transition-all cursor-pointer hover:opacity-80 ${
                      metric === 'opens' ? 'bg-purple-500' :
                      metric === 'clicks' ? 'bg-green-500' :
                      'bg-orange-500'
                    }`}
                    style={{ height: `${(value / maxValue) * 200}px` }}
                    title={`${data.date}: ${value}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Conversion Funnel
        </h2>

        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stage.stage}
                  </span>
                  <span className="text-sm text-gray-500">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  stage.color === 'blue' ? 'text-blue-500' :
                  stage.color === 'purple' ? 'text-purple-500' :
                  stage.color === 'green' ? 'text-green-500' :
                  stage.color === 'yellow' ? 'text-yellow-500' :
                  'text-orange-500'
                }`}>
                  {stage.percentage}%
                </span>
              </div>
              <div className={`h-12 rounded-lg overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div
                  className={`h-full flex items-center px-4 transition-all ${
                    stage.color === 'blue' ? 'bg-blue-500' :
                    stage.color === 'purple' ? 'bg-purple-500' :
                    stage.color === 'green' ? 'bg-green-500' :
                    stage.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-orange-500'
                  }`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-white font-semibold text-sm">
                    {stage.count.toLocaleString()}
                  </span>
                </div>
              </div>
              {index < funnelData.length - 1 && (
                <div className="flex items-center justify-center py-2">
                  <Activity className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailAnalytics;
