import React from 'react';
import { User } from 'lucide-react';

const AddLeadModal = ({ 
  show, 
  onClose, 
  theme, 
  selectedCampaign,
  leadFormData, 
  setLeadFormData,
  handleAddLeadToCampaign 
}) => {
  if (!show || !selectedCampaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Modal Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Add Lead to {selectedCampaign.name}</h2>
              <p className="text-purple-100 mt-1">Enter lead information and custom fields</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          <div className="space-y-4">
            {/* Standard Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={leadFormData.name || ''}
                  onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  value={leadFormData.email || ''}
                  onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={leadFormData.phone || ''}
                  onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Company
                </label>
                <input
                  type="text"
                  value={leadFormData.company || ''}
                  onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
                  placeholder="Acme Inc."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              </div>
            </div>

            {/* Custom Fields */}
            {selectedCampaign.customFields && selectedCampaign.customFields.length > 0 && (
              <div className="border-t border-gray-700 pt-4">
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Campaign Custom Fields
                </h3>
                <div className="space-y-3">
                  {selectedCampaign.customFields.map((field) => (
                    <div key={field.id}>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {field.name} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        value={leadFormData[field.name] || ''}
                        onChange={(e) => setLeadFormData({ ...leadFormData, [field.name]: e.target.value })}
                        placeholder={`Enter ${field.name.toLowerCase()}`}
                        required={field.required}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-6 border-t flex items-center space-x-3 ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={() => {
              onClose();
              setLeadFormData({});
            }}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
              theme === 'dark' ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleAddLeadToCampaign}
            disabled={!leadFormData.name || !leadFormData.email}
            className={`flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Add Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
