import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Target, Calendar, Download, Filter, ArrowUp, ArrowDown, X, FileText, FileSpreadsheet, ArrowLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParams, Link } from 'react-router-dom';
import useStore from '../../store/useStore';

const BusinessAnalytics = () => {
  const { businessId } = useParams();
  const { theme, businesses, leads } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [timeframe, setTimeframe] = useState('30days');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    include: ['revenue', 'leads', 'customers', 'products']
  });

  const revenueData = [
    { month: 'Jul', revenue: 12500, leads: 45, customers: 12 },
    { month: 'Aug', revenue: 15200, leads: 56, customers: 15 },
    { month: 'Sep', revenue: 18900, leads: 67, customers: 19 },
    { month: 'Oct', revenue: 22100, leads: 78, customers: 22 },
    { month: 'Nov', revenue: 19800, leads: 72, customers: 20 },
    { month: 'Dec', revenue: 28500, leads: 95, customers: 29 }
  ];

  const channelData = [
    { name: 'Email', value: 35, color: '#3B82F6' },
    { name: 'Social', value: 28, color: '#8B5CF6' },
    { name: 'Direct', value: 22, color: '#10B981' },
    { name: 'Referral', value: 15, color: '#F59E0B' }
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 5000, rate: 100 },
    { stage: 'Leads', count: 1250, rate: 25 },
    { stage: 'Qualified', count: 500, rate: 10 },
    { stage: 'Customers', count: 150, rate: 3 }
  ];

  const topProducts = [
    { name: 'Premium Plan', revenue: 45000, sales: 150, growth: 12.5 },
    { name: 'Basic Plan', revenue: 28000, sales: 280, growth: 8.3 },
    { name: 'Enterprise', revenue: 85000, sales: 17, growth: 24.1 },
    { name: 'Consulting', revenue: 32000, sales: 64, growth: -3.2 }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <Link
          to={`/business/${businessId}`}
          className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Business Workspace</span>
        </Link>
        <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Analytics</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Business Analytics
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Detailed performance insights
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
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$28,500', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'green' },
          { label: 'New Leads', value: '95', change: '+8.3%', trend: 'up', icon: Users, color: 'blue' },
          { label: 'Conversion Rate', value: '18.4%', change: '+2.1%', trend: 'up', icon: Target, color: 'purple' },
          { label: 'Avg Deal Size', value: '$983', change: '-3.2%', trend: 'down', icon: TrendingUp, color: 'orange' }
        ].map((kpi, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                kpi.color === 'green' ? 'bg-green-500/10' :
                kpi.color === 'blue' ? 'bg-blue-500/10' :
                kpi.color === 'purple' ? 'bg-purple-500/10' :
                'bg-orange-500/10'
              }`}>
                <kpi.icon className={`w-6 h-6 ${
                  kpi.color === 'green' ? 'text-green-500' :
                  kpi.color === 'blue' ? 'text-blue-500' :
                  kpi.color === 'purple' ? 'text-purple-500' :
                  'text-orange-500'
                }`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{kpi.change}</span>
              </div>
            </div>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {kpi.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {kpi.label}
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
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
            <XAxis dataKey="month" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
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
            <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#colorRev)" name="Revenue ($)" />
            <Area type="monotone" dataKey="leads" stroke="#3B82F6" fillOpacity={1} fill="url(#colorLeads)" name="Leads" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Distribution & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
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
                    {stage.count.toLocaleString()} ({stage.rate}%)
                  </span>
                </div>
                <div className={`w-full h-10 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <div
                    className="h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold"
                    style={{ width: `${stage.rate * 3}%` }}
                  >
                    {stage.rate}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products/Services */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Top Products/Services
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {topProducts.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                  <td className={`px-6 py-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {product.name}
                  </td>
                  <td className={`px-6 py-4 font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                    ${product.revenue.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.sales} sales
                  </td>
                  <td className={`px-6 py-4`}>
                    <div className={`flex items-center space-x-1 ${
                      product.growth > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {product.growth > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      <span className="font-semibold">{Math.abs(product.growth)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Time-based Performance */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Performance by Time
        </h2>
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const value = Math.floor(Math.random() * 50) + 30;
            return (
              <div key={day} className="text-center">
                <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {day}
                </div>
                <div className={`h-32 rounded-lg flex flex-col justify-end ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div
                    className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-lg"
                    style={{ height: `${value}%` }}
                  />
                </div>
                <div className={`text-xs mt-2 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Export Analytics
              </h2>
              <button
                onClick={() => setShowExportModal(false)}
                className={`p-2 rounded-lg hover:bg-gray-800`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[{format: 'csv', label: 'CSV', icon: FileText}, {format: 'xlsx', label: 'Excel', icon: FileSpreadsheet}].map((opt) => (
                    <button
                      key={opt.format}
                      onClick={() => setExportConfig({...exportConfig, format: opt.format})}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        exportConfig.format === opt.format
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <opt.icon className="w-5 h-5 mb-2" />
                      <div className="font-medium">{opt.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Include Data
                </label>
                <div className="space-y-2">
                  {['revenue', 'leads', 'customers', 'products', 'channels'].map((item) => (
                    <label key={item} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportConfig.include.includes(item)}
                        onChange={(e) => {
                          setExportConfig({
                            ...exportConfig,
                            include: e.target.checked
                              ? [...exportConfig.include, item]
                              : exportConfig.include.filter(i => i !== item)
                          });
                        }}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className={`capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item} Data
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Exporting:', exportConfig);
                  setShowExportModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Export Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessAnalytics;
