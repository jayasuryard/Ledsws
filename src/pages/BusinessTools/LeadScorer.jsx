import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, DollarSign, Clock, Zap, Settings, Brain, ChevronRight } from 'lucide-react';
import useStore from '../../store/useStore';

const LeadScorer = () => {
  const { theme, leads } = useStore();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [scoringConfig, setScoringConfig] = useState({
    demographics: 20,
    behavior: 30,
    engagement: 25,
    company: 25
  });

  // Calculate lead scores based on various factors
  const calculateScore = (lead) => {
    let score = 0;
    
    // Demographics (max 20)
    if (lead.industry) score += 5;
    if (lead.location) score += 5;
    if (lead.position) score += 10;
    
    // Behavior (max 30)
    if (lead.emailOpens > 5) score += 10;
    if (lead.linkClicks > 3) score += 10;
    if (lead.formSubmissions > 1) score += 10;
    
    // Engagement (max 25)
    if (lead.lastEngagement === 'recent') score += 15;
    if (lead.websiteVisits > 5) score += 10;
    
    // Company (max 25)
    if (lead.companySize === 'large') score += 15;
    if (lead.revenue === 'high') score += 10;
    
    return Math.min(score, 100);
  };

  const scoredLeads = leads.map(lead => ({
    ...lead,
    score: calculateScore(lead),
    grade: calculateScore(lead) >= 80 ? 'A' : calculateScore(lead) >= 60 ? 'B' : calculateScore(lead) >= 40 ? 'C' : 'D'
  })).sort((a, b) => b.score - a.score);

  const hotLeads = scoredLeads.filter(l => l.score >= 80);
  const warmLeads = scoredLeads.filter(l => l.score >= 60 && l.score < 80);
  const coldLeads = scoredLeads.filter(l => l.score < 60);

  const scoringFactors = [
    {
      name: 'Demographics',
      weight: scoringConfig.demographics,
      factors: ['Job Title', 'Industry', 'Location', 'Company Size'],
      icon: Target,
      color: 'blue'
    },
    {
      name: 'Behavior',
      weight: scoringConfig.behavior,
      factors: ['Email Opens', 'Link Clicks', 'Content Downloads', 'Form Submissions'],
      icon: TrendingUp,
      color: 'purple'
    },
    {
      name: 'Engagement',
      weight: scoringConfig.engagement,
      factors: ['Website Visits', 'Time on Site', 'Pages Viewed', 'Last Activity'],
      icon: Zap,
      color: 'orange'
    },
    {
      name: 'Company Fit',
      weight: scoringConfig.company,
      factors: ['Revenue', 'Employee Count', 'Tech Stack', 'Budget'],
      icon: DollarSign,
      color: 'green'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getGradeBadge = (grade) => {
    const colors = {
      'A': 'bg-green-500/10 text-green-500 border-green-500',
      'B': 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
      'C': 'bg-orange-500/10 text-orange-500 border-orange-500',
      'D': 'bg-red-500/10 text-red-500 border-red-500'
    };
    return colors[grade] || colors['D'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Lead Scorer
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            AI-powered lead scoring and prioritization
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowConfigModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configure</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Brain className="w-4 h-4" />
            <span>Train Model</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Hot Leads', value: hotLeads.length, color: 'green', subtitle: 'Score 80+' },
          { label: 'Warm Leads', value: warmLeads.length, color: 'yellow', subtitle: 'Score 60-79' },
          { label: 'Cold Leads', value: coldLeads.length, color: 'blue', subtitle: 'Score <60' },
          { label: 'Avg Score', value: Math.round(scoredLeads.reduce((sum, l) => sum + l.score, 0) / scoredLeads.length), color: 'purple', subtitle: 'All Leads' }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {stat.label}
            </div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {stat.subtitle}
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Factors */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Scoring Factors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoringFactors.map((factor, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    factor.color === 'blue' ? 'bg-blue-500/10' :
                    factor.color === 'purple' ? 'bg-purple-500/10' :
                    factor.color === 'orange' ? 'bg-orange-500/10' :
                    'bg-green-500/10'
                  }`}>
                    <factor.icon className={`w-5 h-5 ${
                      factor.color === 'blue' ? 'text-blue-500' :
                      factor.color === 'purple' ? 'text-purple-500' :
                      factor.color === 'orange' ? 'text-orange-500' :
                      'text-green-500'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {factor.name}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Weight: {factor.weight}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                {factor.factors.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      factor.color === 'blue' ? 'bg-blue-500' :
                      factor.color === 'purple' ? 'bg-purple-500' :
                      factor.color === 'orange' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Scored Leads */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Prioritized Leads
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {scoredLeads.slice(0, 10).map((lead, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {lead.name}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lead.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {lead.company}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </div>
                      <Sparkles className={`w-4 h-4 ${getScoreColor(lead.score)}`} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-sm font-bold rounded-lg border ${getGradeBadge(lead.grade)}`}>
                      {lead.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      lead.status === 'New' ? 'bg-blue-500/10 text-blue-500' :
                      lead.status === 'Contacted' ? 'bg-purple-500/10 text-purple-500' :
                      lead.status === 'Qualified' ? 'bg-green-500/10 text-green-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    2 hours ago
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-400">
                      <span className="text-sm font-medium">View</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-800' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
      }`}>
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              AI Insights
            </h3>
            <ul className="space-y-2">
              {[
                'Top 5 leads have similar engagement patterns - consider creating a targeted campaign',
                '12 warm leads haven\'t been contacted in 7+ days - follow-up recommended',
                'Leads from Tech industry have 3x higher conversion rate',
                'Email open rates peak on Tuesday mornings - optimize send times'
              ].map((insight, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {insight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Configure Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-lg rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } p-6`}>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Configure Scoring
            </h2>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Adjust the weight of each scoring factor (must total 100%)
            </p>

            <div className="space-y-6">
              {Object.keys(scoringConfig).map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={`text-sm font-medium capitalize ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {key}
                    </label>
                    <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {scoringConfig[key]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scoringConfig[key]}
                    onChange={(e) => setScoringConfig({ ...scoringConfig, [key]: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              ))}

              {/* Total */}
              <div className={`p-4 rounded-lg border ${
                Object.values(scoringConfig).reduce((a, b) => a + b, 0) === 100
                  ? theme === 'dark' ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'
                  : theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    Object.values(scoringConfig).reduce((a, b) => a + b, 0) === 100
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-700'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-700'
                  }`}>
                    Total Weight
                  </span>
                  <span className={`text-lg font-bold ${
                    Object.values(scoringConfig).reduce((a, b) => a + b, 0) === 100
                      ? theme === 'dark' ? 'text-green-400' : 'text-green-700'
                      : theme === 'dark' ? 'text-red-400' : 'text-red-700'
                  }`}>
                    {Object.values(scoringConfig).reduce((a, b) => a + b, 0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowConfigModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
                disabled={Object.values(scoringConfig).reduce((a, b) => a + b, 0) !== 100}
                className={`flex-1 px-4 py-2 rounded-lg ${
                  Object.values(scoringConfig).reduce((a, b) => a + b, 0) !== 100
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadScorer;
