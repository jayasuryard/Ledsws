import React from 'react';

const ThemeCustomizer = ({ formConfig, setFormConfig, themeColors, theme }) => {
  return (
    <div className={`p-6 rounded-xl border ${
      theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Theme Customization
      </h3>

      {/* Header Color */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Header Color
        </label>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {themeColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setFormConfig({
                ...formConfig,
                theme: { ...formConfig.theme, headerColor: color.color, accentColor: color.color }
              })}
              className={`w-10 h-10 rounded-lg border-2 transition-all ${
                formConfig.theme.headerColor === color.color
                  ? 'border-white ring-2 ring-blue-500 scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Background Color
        </label>
        <select
          value={formConfig.theme.backgroundColor}
          onChange={(e) => setFormConfig({
            ...formConfig,
            theme: { ...formConfig.theme, backgroundColor: e.target.value }
          })}
          className={`w-full px-3 py-2 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="#ffffff">White</option>
          <option value="#f9fafb">Light Gray</option>
          <option value="#f3f4f6">Gray</option>
          <option value="#1f2937">Dark Gray</option>
          <option value="#111827">Almost Black</option>
        </select>
      </div>

      {/* Font Family */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Font Family
        </label>
        <select
          value={formConfig.theme.fontFamily}
          onChange={(e) => setFormConfig({
            ...formConfig,
            theme: { ...formConfig.theme, fontFamily: e.target.value }
          })}
          className={`w-full px-3 py-2 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Poppins">Poppins</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Lato">Lato</option>
        </select>
      </div>

      {/* Header Image URL */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Header Image URL (optional)
        </label>
        <input
          type="text"
          value={formConfig.theme.headerImage}
          onChange={(e) => setFormConfig({
            ...formConfig,
            theme: { ...formConfig.theme, headerImage: e.target.value }
          })}
          placeholder="https://example.com/logo.png"
          className={`w-full px-3 py-2 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        />
      </div>
    </div>
  );
};

export default ThemeCustomizer;
