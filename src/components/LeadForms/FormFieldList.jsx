import React from 'react';
import { GripVertical, Trash2, Settings } from 'lucide-react';

const FormFieldList = ({ fields, removeField, updateField, theme }) => {
  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className={`p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3">
            <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
            <div className="flex-1">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                placeholder="Field Label"
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
            }`}>
              {field.type}
            </span>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                className="rounded"
              />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Required
              </span>
            </label>
            <button
              onClick={() => removeField(field.id)}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Field Options for dropdown/radio */}
          {(field.type === 'dropdown' || field.type === 'radio') && (
            <div className="mt-3 pl-8">
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Options (comma-separated)
              </label>
              <input
                type="text"
                value={field.options?.join(', ') || ''}
                onChange={(e) => updateField(field.id, { 
                  options: e.target.value.split(',').map(o => o.trim()) 
                })}
                placeholder="Option 1, Option 2, Option 3"
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                }`}
              />
            </div>
          )}

          {/* Placeholder */}
          <div className="mt-3 pl-8">
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              placeholder="Placeholder text..."
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-700 text-white'
                  : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormFieldList;
