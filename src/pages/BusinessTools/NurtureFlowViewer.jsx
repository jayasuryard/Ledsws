import React, { useState } from 'react';
import { 
  Mail, Clock, Users, Eye, MousePointer, DollarSign,
  Play, Pause, Settings, Plus, ArrowRight, Check, X,
  Calendar, TrendingUp, BarChart3
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const NurtureFlowViewer = () => {
  const { businessId } = useParams();
  const { theme, businesses, nurtureFlows } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [selectedFlow, setSelectedFlow] = useState(nurtureFlows[0] || null);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Nurture Flow Sequences
        </h1>
        <p className="text-gray-500">
          Prebuilt email sequences to nurture and convert leads
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow List */}
        <div className="space-y-4">
          {nurtureFlows.map((flow) => (
            <div
              key={flow.id}
              onClick={() => setSelectedFlow(flow)}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${
                selectedFlow?.id === flow.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {flow.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  flow.status === 'active' 
                    ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                    : 'bg-gray-500/20 text-gray-500 border border-gray-500/30'
                }`}>
                  {flow.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{flow.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {flow.enrolled} enrolled
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {flow.steps.length} emails
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full p-6 rounded-xl border border-dashed border-gray-600 hover:border-gray-500 flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-400 transition-all">
            <Plus className="w-5 h-5" />
            <span>Create New Flow</span>
          </button>
        </div>

        {/* Timeline View */}
        {selectedFlow && (
          <div className={`lg:col-span-2 p-6 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-800'
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedFlow.name}
                </h2>
                <p className="text-gray-500">{selectedFlow.description}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Edit Flow</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-500">Enrolled</span>
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedFlow.enrolled}
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-500">Avg. Open Rate</span>
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {Math.round((selectedFlow.steps.reduce((acc, s) => acc + s.opens, 0) / selectedFlow.steps.reduce((acc, s) => acc + selectedFlow.enrolled, 0)) * 100)}%
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <MousePointer className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-500">Avg. Click Rate</span>
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {Math.round((selectedFlow.steps.reduce((acc, s) => acc + s.clicks, 0) / selectedFlow.steps.reduce((acc, s) => acc + s.opens, 0)) * 100)}%
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>

              <div className="space-y-8">
                {selectedFlow.steps.map((step, index) => {
                  const openRate = Math.round((step.opens / selectedFlow.enrolled) * 100);
                  const clickRate = Math.round((step.clicks / step.opens) * 100);

                  return (
                    <div key={index} className="relative pl-20">
                      {/* Day Badge */}
                      <div className="absolute left-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold border-4 border-gray-900">
                        <div className="text-center">
                          <div className="text-xs">Day</div>
                          <div className="text-lg">{step.day}</div>
                        </div>
                      </div>

                      {/* Step Card */}
                      <div className={`p-6 rounded-xl border ${
                        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-500" />
                            <h4 className={`font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {step.subject}
                            </h4>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {step.type}
                          </span>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Sent</div>
                            <div className={`font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {selectedFlow.enrolled}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Opens</div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {step.opens}
                              </span>
                              <span className="text-xs text-blue-500">({openRate}%)</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Clicks</div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-semibold ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>
                                {step.clicks}
                              </span>
                              <span className="text-xs text-purple-500">({clickRate}%)</span>
                            </div>
                          </div>
                        </div>

                        {/* Performance Bar */}
                        <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${openRate}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Arrow to next step */}
                      {index < selectedFlow.steps.length - 1 && (
                        <div className="absolute left-8 -bottom-4 transform -translate-x-1/2">
                          <ArrowRight className="w-5 h-5 text-blue-500 rotate-90" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurtureFlowViewer;
