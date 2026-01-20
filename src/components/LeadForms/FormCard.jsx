import React from 'react';
import { Eye, Send, TrendingUp, Calendar, MoreVertical } from 'lucide-react';

const FormCard = ({ form, theme, onEditForm, onViewResponses, onViewAnalytics, onEmbed, onShare }) => {
  return (
    <div className={`rounded-xl border overflow-hidden transition-all hover:shadow-lg ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {form.name}
              </h3>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                form.status === 'active' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {form.status}
              </span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {form.type === 'multi-step' ? `${form.steps} Steps` : 'Single Step'} · {form.fields} Fields
            </p>
          </div>
          <button className={`p-2 rounded-lg ${
            theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}>
            <MoreVertical className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Views
              </span>
            </div>
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {form.views.toLocaleString()}
            </p>
          </div>

          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <Send className="w-4 h-4 text-green-500" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Submissions
              </span>
            </div>
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {form.submissions}
            </p>
          </div>

          <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Conversion
              </span>
            </div>
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {form.conversionRate}%
            </p>
          </div>
        </div>

        {/* Last Submission */}
        <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2 text-xs">
            <Calendar className={`w-3 h-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>
              Last submission: {form.lastSubmission}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEditForm(form)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Edit Form
          </button>
          <button
            onClick={() => onViewResponses(form)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Responses
          </button>
          <button
            onClick={() => onViewAnalytics(form)}
            className={`px-4 py-2 rounded-lg transition-all ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Analytics"
          >
            <TrendingUp className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
