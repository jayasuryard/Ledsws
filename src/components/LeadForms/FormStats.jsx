import React from 'react';
import { TrendingUp, Eye, MousePointerClick } from 'lucide-react';

const FormStats = ({ forms, theme }) => {
  const totalSubmissions = forms.reduce((sum, form) => sum + form.submissions, 0);
  const totalViews = forms.reduce((sum, form) => sum + form.views, 0);
  const avgConversion = forms.length > 0 
    ? (forms.reduce((sum, form) => sum + form.conversionRate, 0) / forms.length).toFixed(1)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Submissions
          </span>
          <MousePointerClick className="w-5 h-5 text-green-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {totalSubmissions}
        </p>
        <p className="text-sm text-green-500 mt-1">+12.5% this month</p>
      </div>

      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Views
          </span>
          <Eye className="w-5 h-5 text-blue-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {totalViews}
        </p>
        <p className="text-sm text-blue-500 mt-1">+8.2% this month</p>
      </div>

      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Avg Conversion
          </span>
          <TrendingUp className="w-5 h-5 text-purple-500" />
        </div>
        <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {avgConversion}%
        </p>
        <p className="text-sm text-purple-500 mt-1">Above industry avg</p>
      </div>
    </div>
  );
};

export default FormStats;
