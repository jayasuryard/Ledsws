import React, { useState } from 'react';
import { 
  Play, TrendingUp, Eye, MousePointer, FileText, Star, 
  Users, Plus, X, Check, AlertCircle, Zap, ArrowRight,
  Calendar, Tag, Mail, Phone, Settings, Save
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const LeadScoringSimulator = () => {
  const { businessId } = useParams();
  const { theme, businesses, leads, leadScoringRules, simulateEmailAction, updateLeadScoringRule } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [selectedLead, setSelectedLead] = useState(leads[0] || null);
  const [simulationLog, setSimulationLog] = useState([]);
  const [showRulesEditor, setShowRulesEditor] = useState(false);

  const handleSimulateAction = (actionType) => {
    if (!selectedLead) return;

    const result = simulateEmailAction(selectedLead.id, actionType);
    if (result) {
      const rule = leadScoringRules.find(r => r.action === actionType);
      setSimulationLog([
        {
          id: Date.now(),
          leadName: selectedLead.name,
          action: rule.name,
          points: result.newScore - selectedLead.leadScore,
          oldScore: selectedLead.leadScore,
          newScore: result.newScore,
          statusChange: result.updates.status !== selectedLead.status ? result.updates.status : null,
          timestamp: new Date().toLocaleTimeString()
        },
        ...simulationLog
      ]);

      // Update selected lead to reflect changes
      const updatedLead = leads.find(l => l.id === selectedLead.id);
      setSelectedLead(updatedLead);
    }
  };

  const runFullSimulation = () => {
    if (!selectedLead) return;

    const sequence = [
      { action: 'email_open', delay: 500 },
      { action: 'email_click', delay: 1000 },
      { action: 'page_visit', delay: 1500 },
      { action: 'form_submit', delay: 2000 },
      { action: 'demo_request', delay: 2500 }
    ];

    sequence.forEach(({ action, delay }) => {
      setTimeout(() => handleSimulateAction(action), delay);
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500 bg-green-500/20 border-green-500/30';
    if (score >= 50) return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-500 bg-red-500/20 border-red-500/30';
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'blue',
      'Engaged': 'yellow',
      'Qualified': 'green',
      'Cold': 'gray'
    };
    return colors[status] || 'blue';
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Lead Scoring Simulator
        </h1>
        <p className="text-gray-500">
          Simulate lead actions and watch scores update in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Scoring Rules */}
        <div className={`p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Scoring Rules
            </h2>
            <button
              onClick={() => setShowRulesEditor(!showRulesEditor)}
              className="text-blue-500 hover:text-blue-400"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {leadScoringRules.filter(r => r.enabled).map((rule) => {
              const icon = 
                rule.action === 'email_open' ? Eye :
                rule.action === 'email_click' ? MousePointer :
                rule.action === 'form_submit' ? FileText :
                rule.action === 'page_visit' ? Eye :
                rule.action === 'demo_request' ? Calendar :
                rule.action === 'proposal_open' ? FileText :
                rule.action === 'webinar_attend' ? Users :
                rule.action === 'social_follow' ? Star :
                AlertCircle;

              const Icon = icon;

              return (
                <div
                  key={rule.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-600'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-500'
                  }`}
                  onClick={() => handleSimulateAction(rule.action)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        rule.points > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          rule.points > 0 ? 'text-green-500' : 'text-red-500'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-medium text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {rule.name}
                        </div>
                        <div className="text-xs text-gray-500">Click to simulate</div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${
                      rule.points > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {rule.points > 0 ? '+' : ''}{rule.points}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={runFullSimulation}
            className="w-full mt-4 px-4 py-3 bg-navy-900 text-white rounded-lg hover:bg-navy-800 flex items-center justify-center space-x-2 font-semibold"
          >
            <Play className="w-5 h-5" />
            <span>Run Full Simulation</span>
          </button>
        </div>

        {/* Middle Panel - Lead Selector & Score Display */}
        <div className="space-y-6">
          {/* Lead Selector */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Select Lead
            </h3>
            <select
              value={selectedLead?.id || ''}
              onChange={(e) => {
                const lead = leads.find(l => l.id === parseInt(e.target.value));
                setSelectedLead(lead);
              }}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} ({lead.email})
                </option>
              ))}
            </select>
          </div>

          {/* Current Score Display */}
          {selectedLead && (
            <div className={`p-6 rounded-xl border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-navy-900 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedLead.name?.charAt(0)}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedLead.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{selectedLead.email}</p>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Current Score</div>
                  <div className={`text-6xl font-bold mb-2 ${
                    selectedLead.leadScore >= 80 ? 'text-green-500' :
                    selectedLead.leadScore >= 50 ? 'text-yellow-500' :
                    'text-red-500'
                  }`}>
                    {selectedLead.leadScore}
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getScoreColor(selectedLead.leadScore)}`}>
                      {selectedLead.leadScore >= 80 ? '🔥 Hot Lead' :
                       selectedLead.leadScore >= 50 ? '⚡ Warm Lead' :
                       '❄️ Cold Lead'}
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="text-xs text-gray-500 mb-1">Current Status</div>
                  <div className="flex items-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getStatusColor(selectedLead.status)}-500/20 text-${getStatusColor(selectedLead.status)}-500 border border-${getStatusColor(selectedLead.status)}-500/30`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className={`p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <h3 className={`font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSimulateAction('email_open')}
                className="px-4 py-3 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 flex items-center justify-center space-x-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Email Open</span>
              </button>
              <button
                onClick={() => handleSimulateAction('email_click')}
                className="px-4 py-3 bg-purple-500/20 text-purple-500 rounded-lg hover:bg-purple-500/30 flex items-center justify-center space-x-2 text-sm"
              >
                <MousePointer className="w-4 h-4" />
                <span>Click Link</span>
              </button>
              <button
                onClick={() => handleSimulateAction('form_submit')}
                className="px-4 py-3 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 flex items-center justify-center space-x-2 text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Form Submit</span>
              </button>
              <button
                onClick={() => handleSimulateAction('demo_request')}
                className="px-4 py-3 bg-orange-500/20 text-orange-500 rounded-lg hover:bg-orange-500/30 flex items-center justify-center space-x-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Demo Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Simulation Log */}
        <div className={`p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Simulation Log
          </h2>

          {simulationLog.length === 0 ? (
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-gray-500 opacity-50 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                Click on scoring rules or quick actions to simulate lead behavior
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {simulationLog.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {entry.action}
                    </span>
                    <span className="text-xs text-gray-500">{entry.timestamp}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      entry.points > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {entry.points > 0 ? '+' : ''}{entry.points} points
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {entry.oldScore} → <span className="font-bold text-white">{entry.newScore}</span>
                    </span>
                  </div>

                  {entry.statusChange && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-gray-400">
                          Status changed to{' '}
                          <span className="font-medium text-green-500">{entry.statusChange}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {simulationLog.length > 0 && (
            <button
              onClick={() => setSimulationLog([])}
              className={`w-full mt-4 px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white hover:border-gray-600'
                  : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
              }`}
            >
              Clear Log
            </button>
          )}
        </div>
      </div>

      {/* Score Thresholds Legend */}
      <div className={`mt-6 p-6 rounded-xl border ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Score Thresholds & Status Changes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <span className="text-2xl">❄️</span>
            </div>
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Cold Lead
              </div>
              <div className="text-sm text-gray-500">Score &lt; 50</div>
              <div className="text-xs text-gray-500">Status: Cold</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Warm Lead
              </div>
              <div className="text-sm text-gray-500">Score 50-79</div>
              <div className="text-xs text-gray-500">Status: Engaged</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Hot Lead
              </div>
              <div className="text-sm text-gray-500">Score ≥ 80</div>
              <div className="text-xs text-gray-500">Status: Qualified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadScoringSimulator;
