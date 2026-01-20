import React from 'react';

const CampaignTrackingConfig = ({ formConfig, setFormConfig, campaignTrackingFields, theme }) => {
  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Campaign Tracking Configuration
        </h3>
        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure UTM and marketing campaign tracking parameters
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formConfig.settings.campaignTracking.enabled}
            onChange={(e) => setFormConfig({
              ...formConfig,
              settings: {
                ...formConfig.settings,
                campaignTracking: {
                  ...formConfig.settings.campaignTracking,
                  enabled: e.target.checked
                }
              }
            })}
            className="rounded"
          />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Enable Campaign Tracking
          </span>
        </label>

        {formConfig.settings.campaignTracking.enabled && (
          <>
            {Object.entries(campaignTrackingFields).map(([key, config]) => (
              <div key={key} className="space-y-2">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {config.label} {config.required && <span className="text-red-500">*</span>}
                </label>
                {config.tooltip && (
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {config.tooltip}
                  </p>
                )}
                
                {config.type === 'dropdown' && (
                  <select
                    value={formConfig.settings.campaignTracking[key] || ''}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        campaignTracking: {
                          ...formConfig.settings.campaignTracking,
                          [key]: e.target.value
                        }
                      }
                    })}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select {config.label}</option>
                    {config.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}

                {config.type === 'text' && (
                  <input
                    type="text"
                    value={formConfig.settings.campaignTracking[key] || ''}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        campaignTracking: {
                          ...formConfig.settings.campaignTracking,
                          [key]: e.target.value
                        }
                      }
                    })}
                    placeholder={`Enter ${config.label.toLowerCase()}`}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                )}

                {config.type === 'auto' && (
                  <input
                    type="text"
                    value={config.autoPopulate ? formConfig.name : formConfig.settings.campaignTracking[key] || ''}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        campaignTracking: {
                          ...formConfig.settings.campaignTracking,
                          [key]: e.target.value
                        }
                      }
                    })}
                    placeholder={`Auto-filled: ${formConfig.name || 'Form name'}`}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                )}
              </div>
            ))}

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formConfig.settings.campaignTracking.autoDetectSource}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        autoDetectSource: e.target.checked
                      }
                    }
                  })}
                  className="rounded"
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Auto-detect source
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formConfig.settings.campaignTracking.requireChannel}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        requireChannel: e.target.checked
                      }
                    }
                  })}
                  className="rounded"
                />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Require channel
                </span>
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignTrackingConfig;
