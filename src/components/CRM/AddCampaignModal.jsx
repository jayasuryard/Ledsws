import React from 'react';
import { Plus, X, Target } from 'lucide-react';

const AddCampaignModal = ({ 
  show, 
  onClose, 
  theme, 
  campaignFormData, 
  setCampaignFormData,
  addCustomFieldToCampaign,
  updateCustomField,
  removeCustomField,
  handleAddCampaign 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Modal Header */}
        <div className="relative h-32 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-t-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Create Campaign</h2>
              <p className="text-cyan-100 mt-1">Define your campaign and custom fields</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="space-y-4">
            {/* Campaign Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Campaign Name *
              </label>
              <input
                type="text"
                value={campaignFormData.name}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, name: e.target.value })}
                placeholder="e.g., Trade Show 2025, Partner Outreach"
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
              />
            </div>

            {/* Campaign Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={campaignFormData.description}
                onChange={(e) => setCampaignFormData({ ...campaignFormData, description: e.target.value })}
                placeholder="Describe the campaign purpose and goals"
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
              />
            </div>

            {/* Icon & Color */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={campaignFormData.icon}
                  onChange={(e) => setCampaignFormData({ ...campaignFormData, icon: e.target.value })}
                  placeholder="📊"
                  maxLength={2}
                  className={`w-full px-4 py-3 rounded-lg border text-2xl text-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Color Theme
                </label>
                <select
                  value={campaignFormData.color}
                  onChange={(e) => setCampaignFormData({ ...campaignFormData, color: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                >
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="green">Green</option>
                  <option value="orange">Orange</option>
                  <option value="indigo">Indigo</option>
                  <option value="cyan">Cyan</option>
                </select>
              </div>
            </div>

            {/* Custom Fields */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Custom Fields
                </label>
                <button
                  onClick={addCustomFieldToCampaign}
                  className="flex items-center space-x-1 text-sm text-cyan-500 hover:text-cyan-400"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Field</span>
                </button>
              </div>

              {campaignFormData.customFields.length === 0 ? (
                <p className={`text-sm text-center py-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  No custom fields added yet. Click "Add Field" to create one.
                </p>
              ) : (
                <div className="space-y-3">
                  {campaignFormData.customFields.map((field) => (
                    <div key={field.id} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="grid grid-cols-12 gap-3">
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) => updateCustomField(field.id, { name: e.target.value })}
                          placeholder="Field name"
                          className={`col-span-5 px-3 py-2 rounded-lg border text-sm ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        />
                        <select
                          value={field.type}
                          onChange={(e) => updateCustomField(field.id, { type: e.target.value })}
                          className={`col-span-4 px-3 py-2 rounded-lg border text-sm ${
                            theme === 'dark'
                              ? 'bg-gray-900 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="date">Date</option>
                          <option value="url">URL</option>
                        </select>
                        <label className="col-span-2 flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateCustomField(field.id, { required: e.target.checked })}
                            className="rounded"
                          />
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Required</span>
                        </label>
                        <button
                          onClick={() => removeCustomField(field.id)}
                          className="col-span-1 text-red-500 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-6 border-t flex items-center space-x-3 ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={() => {
              onClose();
              setCampaignFormData({
                name: '',
                description: '',
                icon: '📊',
                color: 'blue',
                customFields: []
              });
            }}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddCampaign}
            disabled={!campaignFormData.name.trim()}
            className={`flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignModal;
