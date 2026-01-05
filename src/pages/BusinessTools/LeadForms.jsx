import React, { useState } from 'react';
import { Plus, Eye, Copy, BarChart3, Edit, Trash2, Code } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const LeadForms = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const forms = [
    {
      id: 1,
      name: 'Contact Us Form',
      submissions: 234,
      conversionRate: 12.4,
      status: 'active',
      lastSubmission: '2 hours ago'
    },
    {
      id: 2,
      name: 'Free Consultation Request',
      submissions: 156,
      conversionRate: 18.2,
      status: 'active',
      lastSubmission: '5 hours ago'
    },
    {
      id: 3,
      name: 'Newsletter Signup',
      submissions: 789,
      conversionRate: 24.6,
      status: 'active',
      lastSubmission: '10 minutes ago'
    },
    {
      id: 4,
      name: 'Product Demo Request',
      submissions: 89,
      conversionRate: 8.3,
      status: 'draft',
      lastSubmission: 'Never'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Lead Forms
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Create and manage lead capture forms
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Create Form</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Forms', value: forms.length, color: 'blue' },
          { label: 'Total Submissions', value: '1,268', color: 'green' },
          { label: 'Avg Conversion', value: '15.9%', color: 'purple' },
          { label: 'Active Forms', value: forms.filter(f => f.status === 'active').length, color: 'orange' }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Forms List */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Your Forms
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {forms.map((form) => (
            <div key={form.id} className="p-6 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {form.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      form.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                    }`}>
                      {form.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Submissions
                      </div>
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {form.submissions}
                      </div>
                    </div>
                    <div>
                      <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Conversion Rate
                      </div>
                      <div className="text-2xl font-bold text-green-500">
                        {form.conversionRate}%
                      </div>
                    </div>
                    <div>
                      <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Last Submission
                      </div>
                      <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {form.lastSubmission}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 rounded-lg hover:bg-gray-800" title="View Form">
                    <Eye className="w-5 h-5 text-blue-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800" title="Get Embed Code">
                    <Code className="w-5 h-5 text-purple-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800" title="Analytics">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800" title="Edit Form">
                    <Edit className="w-5 h-5 text-orange-500" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-800" title="Delete">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Templates */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Form Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Basic Contact Form', fields: '4 fields', desc: 'Name, Email, Phone, Message' },
            { name: 'Newsletter Signup', fields: '2 fields', desc: 'Email, Consent Checkbox' },
            { name: 'Consultation Request', fields: '6 fields', desc: 'Full details capture' },
            { name: 'Product Demo', fields: '5 fields', desc: 'Company & interest details' },
            { name: 'Quote Request', fields: '7 fields', desc: 'Project specifications' },
            { name: 'Event Registration', fields: '6 fields', desc: 'Attendee information' }
          ].map((template, idx) => (
            <div key={idx} className={`p-6 rounded-lg border cursor-pointer transition-all hover:border-cyan-500 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {template.name}
              </h3>
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {template.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{template.fields}</span>
                <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create New Form
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Form Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Contact Us Form"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Form Type
                </label>
                <select className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}>
                  <option>Contact Form</option>
                  <option>Newsletter Signup</option>
                  <option>Consultation Request</option>
                  <option>Demo Request</option>
                  <option>Quote Request</option>
                  <option>Custom</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700">
                  Create Form
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadForms;
