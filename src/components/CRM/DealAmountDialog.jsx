import React from 'react';
import { TrendingUp } from 'lucide-react';

const DealAmountDialog = ({ 
  show, 
  leadToConvert, 
  dealAmount, 
  setDealAmount, 
  onConfirm, 
  onCancel, 
  theme,
  teamMembers 
}) => {
  if (!show || !leadToConvert) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className={`w-full max-w-md rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      } shadow-2xl`}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🎉 Mark as Converted
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter the deal value to close this lead
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Lead Name
            </label>
            <div className={`px-4 py-3 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}>
              {leadToConvert.name}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Deal Amount (Revenue Earned) *
            </label>
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                $
              </span>
              <input
                type="number"
                value={dealAmount}
                onChange={(e) => setDealAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border text-lg font-semibold ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                autoFocus
              />
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              Enter the total revenue earned from this lead
            </p>
          </div>

          {leadToConvert.assignedTo && (
            <div className={`p-3 rounded-lg ${
              theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className={`text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                💰 This revenue will be credited to {teamMembers.find(m => m.id.toString() === leadToConvert.assignedTo?.toString())?.name || 'the assigned team member'}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-800 flex items-center space-x-3">
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!dealAmount || parseFloat(dealAmount) <= 0}
            className={`flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Confirm & Close Deal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealAmountDialog;
