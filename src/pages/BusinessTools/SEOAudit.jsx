import React, { useState } from 'react';
import { Search, Globe, TrendingUp, AlertCircle, CheckCircle, XCircle, Zap, RefreshCw } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const SEOAudit = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [isAuditing, setIsAuditing] = useState(false);

  const seoScore = 78;

  const metrics = [
    { category: 'Performance', score: 85, status: 'good', icon: Zap },
    { category: 'SEO', score: 78, status: 'warning', icon: Search },
    { category: 'Accessibility', score: 92, status: 'good', icon: CheckCircle },
    { category: 'Best Practices', score: 81, status: 'good', icon: TrendingUp }
  ];

  const issues = [
    { 
      severity: 'critical', 
      title: 'Missing Meta Description', 
      description: '5 pages are missing meta descriptions', 
      impact: 'High',
      fix: 'Add unique meta descriptions to each page'
    },
    {
      severity: 'warning',
      title: 'Slow Page Load Time',
      description: 'Homepage loads in 3.2s (target: <2s)',
      impact: 'Medium',
      fix: 'Optimize images and enable caching'
    },
    {
      severity: 'warning',
      title: 'Missing Alt Text',
      description: '12 images without alt text',
      impact: 'Medium',
      fix: 'Add descriptive alt text to all images'
    },
    {
      severity: 'info',
      title: 'Mobile Responsiveness',
      description: 'Some elements overflow on mobile',
      impact: 'Low',
      fix: 'Update CSS for mobile viewport'
    }
  ];

  const keywords = [
    { keyword: 'digital marketing', position: 12, volume: 8900, difficulty: 'Medium' },
    { keyword: 'lead generation', position: 8, volume: 5400, difficulty: 'High' },
    { keyword: 'crm software', position: 24, volume: 12000, difficulty: 'Hard' },
    { keyword: 'email automation', position: 6, volume: 3200, difficulty: 'Low' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Website SEO Audit
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - {business?.website || 'No website set'}
          </p>
        </div>
        <button
          onClick={() => setIsAuditing(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-700 hover:to-orange-700"
        >
          <RefreshCw className={`w-5 h-5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>Run Full Audit</span>
        </button>
      </div>

      {/* Overall Score */}
      <div className={`p-8 rounded-xl border text-center ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="relative inline-block">
          <svg className="w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={seoScore >= 80 ? '#10B981' : seoScore >= 60 ? '#F59E0B' : '#EF4444'}
              strokeWidth="12"
              strokeDasharray={`${(seoScore / 100) * 553} 553`}
              strokeLinecap="round"
              transform="rotate(-90 96 96)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {seoScore}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              SEO Score
            </div>
          </div>
        </div>
        <div className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Good - Room for improvement
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                metric.status === 'good' ? 'bg-green-500/10' : 'bg-yellow-500/10'
              }`}>
                <metric.icon className={`w-6 h-6 ${
                  metric.status === 'good' ? 'text-green-500' : 'text-yellow-500'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                metric.status === 'good' ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {metric.score}
              </span>
            </div>
            <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {metric.category}
            </div>
          </div>
        ))}
      </div>

      {/* Issues */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Issues Found
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {issues.map((issue, idx) => (
            <div key={idx} className="p-6 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  issue.severity === 'critical' ? 'bg-red-500/10' :
                  issue.severity === 'warning' ? 'bg-yellow-500/10' :
                  'bg-blue-500/10'
                }`}>
                  {issue.severity === 'critical' ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : issue.severity === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {issue.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.severity === 'critical' ? 'bg-red-500/20 text-red-500' :
                      issue.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {issue.impact} Impact
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {issue.description}
                  </p>
                  <div className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    💡 {issue.fix}
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Fix Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword Rankings */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Keyword Rankings
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keyword</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {keywords.map((kw, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                  <td className={`px-6 py-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {kw.keyword}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      kw.position <= 10 ? 'bg-green-500/20 text-green-500' :
                      kw.position <= 20 ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      #{kw.position}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {kw.volume.toLocaleString()}/mo
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      kw.difficulty === 'Low' ? 'text-green-500' :
                      kw.difficulty === 'Medium' ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {kw.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
                      Optimize
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Quick Wins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Add Schema Markup', impact: '+15 SEO' },
            { title: 'Optimize Images', impact: '+12 Speed' },
            { title: 'Fix Broken Links', impact: '+8 SEO' }
          ].map((rec, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {rec.title}
                  </div>
                  <div className="text-sm text-green-500">{rec.impact}</div>
                </div>
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SEOAudit;
