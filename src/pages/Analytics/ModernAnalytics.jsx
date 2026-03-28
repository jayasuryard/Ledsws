import React, { useState } from 'react';
import { 
  TrendingUp, Users, Mail, DollarSign, Calendar,
  Download, Filter, BarChart3, PieChart, Activity
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
import useStore from '../../store/useStore';

const ModernAnalytics = () => {
  const { globalAnalytics, businesses } = useStore();
  const [timeRange, setTimeRange] = useState('30d');

  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${(globalAnalytics.totalRevenue || 45230).toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      label: 'Total Leads',
      value: (globalAnalytics.weeklyLeads || 1247).toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Email Sent',
      value: '12,458',
      change: '+15.3%',
      trend: 'up',
      icon: Mail,
    },
    {
      label: 'Conversion Rate',
      value: `${globalAnalytics.conversionRate || 24}%`,
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const leadSources = [
    { source: 'Website Forms', count: 456, percentage: 36 },
    { source: 'Social Media', count: 328, percentage: 26 },
    { source: 'Email Campaigns', count: 287, percentage: 23 },
    { source: 'Referrals', count: 176, percentage: 15 },
  ];

  const topBusinesses = [
    { name: 'TechCorp Solutions', revenue: '$12,450', leads: 234, conversion: '28%' },
    { name: 'StartupX', revenue: '$9,870', leads: 189, conversion: '25%' },
    { name: 'E-Store Pro', revenue: '$8,230', leads: 156, conversion: '22%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Analytics</h1>
          <p className="text-gray-600">Track your performance across all businesses</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-white border-2 border-gray-200 rounded-lg p-1">
            {['7d', '30d', '90d', '1y'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-navy-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-navy-50 rounded-lg">
                <kpi.icon className="w-5 h-5 text-navy-900" />
              </div>
              <Badge variant="success">{kpi.change}</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-600">{kpi.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Lead Sources</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {leadSources.map((source, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{source.source}</span>
                  <span className="text-sm text-gray-600">{source.count} leads</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-navy-900 h-2 rounded-full transition-all"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[45, 52, 48, 65, 58, 72, 68, 75, 82, 78, 88, 92].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-navy-900 rounded-t-lg hover:bg-navy-800 transition-all cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performing Businesses */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Businesses</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Business</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Leads</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topBusinesses.map((business, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-navy-900 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {business.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{business.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-gray-900">
                      {business.revenue}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-600">{business.leads}</td>
                    <td className="py-4 px-4 text-right">
                      <Badge variant="success">{business.conversion}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ModernAnalytics;
