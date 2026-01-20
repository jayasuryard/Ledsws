import React from 'react';
import { Plus, X } from 'lucide-react';

const FieldTypes = ({ fieldTypes, addField, theme }) => {
  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Field Types
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {fieldTypes.map((field) => (
          <button
            key={field.type}
            onClick={() => addField(field.type)}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 hover:border-blue-500 text-white'
                : 'bg-white border-gray-300 hover:border-blue-500 text-gray-900'
            }`}
          >
            <span className="text-2xl">{field.icon}</span>
            <span className="text-sm font-medium">{field.label}</span>
            <Plus className="w-4 h-4 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldTypes;
