import React from 'react';
import { Building2, Target, Globe, Calendar, Clock, Zap, Plus, X } from 'lucide-react';

// Industry Selection Step
export const IndustrySelector = ({ value, onChange, theme }) => {
  const industries = [
    { id: 'saas', label: 'SaaS / Software', icon: '💻', description: 'Technology products & services' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒', description: 'Online retail & stores' },
    { id: 'consulting', label: 'Consulting', icon: '💼', description: 'Professional services' },
    { id: 'agency', label: 'Agency', icon: '🎨', description: 'Marketing & creative agencies' },
    { id: 'local', label: 'Local Business', icon: '🏪', description: 'Restaurants, salons, etc.' },
    { id: 'real-estate', label: 'Real Estate', icon: '🏠', description: 'Property & rentals' },
    { id: 'education', label: 'Education', icon: '📚', description: 'Schools & training' },
    { id: 'healthcare', label: 'Healthcare', icon: '⚕️', description: 'Medical & wellness' },
    { id: 'other', label: 'Other', icon: '✨', description: 'Something else' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          What industry are you in?
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          This helps us customize the form fields and messaging for your audience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {industries.map((industry) => (
          <button
            key={industry.id}
            onClick={() => onChange(industry.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              value === industry.id
                ? theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-500 bg-blue-50'
                : theme === 'dark'
                ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{industry.icon}</span>
              <div className="flex-1">
                <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {industry.label}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {industry.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Goal Selection Step
export const GoalSelector = ({ value, onChange, theme, goals }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          What's your main goal?
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose the primary outcome you want to achieve
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => onChange(goal.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              value === goal.id
                ? theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-500 bg-blue-50'
                : theme === 'dark'
                ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <goal.icon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {goal.label}
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {goal.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Form Field Builder
export const FormFieldBuilder = ({ fields, onChange, theme }) => {
  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: type === 'email' ? 'Email Address' : 
             type === 'phone' ? 'Phone Number' : 
             type === 'text' ? 'Full Name' : 
             type === 'textarea' ? 'Message' :
             type === 'select' ? 'Choose Option' : 'Field',
      required: type === 'email' || type === 'text',
      placeholder: '',
      options: type === 'select' ? ['Option 1', 'Option 2', 'Option 3'] : []
    };
    onChange([...fields, newField]);
  };

  const updateField = (id, updates) => {
    onChange(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id) => {
    onChange(fields.filter(f => f.id !== id));
  };

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '📝' },
    { type: 'email', label: 'Email', icon: '📧' },
    { type: 'phone', label: 'Phone', icon: '📱' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'select', label: 'Dropdown', icon: '📋' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Design Your Lead Form
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Add the fields you need to capture leads. We've included common fields to get you started.
        </p>
      </div>

      {/* Existing Fields */}
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className={`flex-1 px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Field Label"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(field.id, { required: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Required
                    </span>
                  </label>
                </div>
                <input
                  type="text"
                  value={field.placeholder}
                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Placeholder text (optional)"
                />
              </div>
              <button
                onClick={() => removeField(field.id)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-red-500/20 text-red-400'
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Field Buttons */}
      <div className="flex flex-wrap gap-2">
        {fieldTypes.map((ft) => (
          <button
            key={ft.type}
            onClick={() => addField(ft.type)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{ft.icon}</span>
            <span>{ft.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Content Generation Settings
export const ContentGenerationSettings = ({ settings, onChange, theme }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Content Generation Settings
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Configure how many posts to generate and for how long
        </p>
      </div>

      {/* Number of Days */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Generate content for how many days?
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[7, 14, 21, 30].map((days) => (
            <button
              key={days}
              onClick={() => onChange({ ...settings, days })}
              className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                settings.days === days
                  ? theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                  : theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      {/* Number of Posts Per Day */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Posts per day
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => onChange({ ...settings, postsPerDay: count })}
              className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                settings.postsPerDay === count
                  ? theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                  : theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {count}x
            </button>
          ))}
        </div>
      </div>

      {/* Content Topics */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          What topics should we cover? (Optional)
        </label>
        <textarea
          value={settings.topics}
          onChange={(e) => onChange({ ...settings, topics: e.target.value })}
          placeholder="e.g., Product tips, industry news, customer success stories..."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border ${
            theme === 'dark'
              ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-500'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>
    </div>
  );
};

// Platform Selector
export const PlatformSelector = ({ selected, onChange, theme }) => {
  const platforms = [
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: 'bg-black' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-500' }
  ];

  const togglePlatform = (platformId) => {
    if (selected.includes(platformId)) {
      onChange(selected.filter(p => p !== platformId));
    } else {
      onChange([...selected, platformId]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Select Social Platforms
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose where you want to post your content
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selected.includes(platform.id)
                ? theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-blue-500 bg-blue-50'
                : theme === 'dark'
                ? 'border-gray-700 hover:border-gray-600 bg-gray-800'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{platform.icon}</div>
              <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {platform.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Scheduling Settings
export const SchedulingSettings = ({ settings, onChange, theme }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Posting Schedule
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          When should we post your content?
        </p>
      </div>

      {/* Auto vs Manual */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange({ ...settings, scheduleType: 'auto' })}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            settings.scheduleType === 'auto'
              ? theme === 'dark'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-blue-500 bg-blue-50'
              : theme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
          }`}
        >
          <Zap className="w-6 h-6 text-blue-500 mb-2" />
          <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Auto-Optimize
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            We'll post at optimal times based on engagement
          </div>
        </button>

        <button
          onClick={() => onChange({ ...settings, scheduleType: 'manual' })}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            settings.scheduleType === 'manual'
              ? theme === 'dark'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-blue-500 bg-blue-50'
              : theme === 'dark'
              ? 'border-gray-700 bg-gray-800'
              : 'border-gray-200 bg-white'
          }`}
        >
          <Clock className="w-6 h-6 text-purple-500 mb-2" />
          <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Manual Times
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Choose specific times to post
          </div>
        </button>
      </div>

      {/* Manual Time Selection */}
      {settings.scheduleType === 'manual' && (
        <div className="space-y-3">
          <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Select posting times
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['9:00 AM', '12:00 PM', '3:00 PM', '5:00 PM', '7:00 PM', '9:00 PM'].map((time) => (
              <button
                key={time}
                onClick={() => {
                  const times = settings.postingTimes?.includes(time)
                    ? settings.postingTimes.filter(t => t !== time)
                    : [...(settings.postingTimes || []), time];
                  onChange({ ...settings, postingTimes: times });
                }}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  settings.postingTimes?.includes(time)
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-blue-500 bg-blue-50 text-blue-700'
                    : theme === 'dark'
                    ? 'border-gray-700 bg-gray-800 text-gray-300'
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Review & Confirm
export const ReviewStep = ({ data, theme }) => {
  const renderSection = (title, content) => (
    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
      <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {title}
      </h4>
      <div className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {content}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Review Your Setup
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Everything looks good? Let's make it live!
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            return renderSection(
              key.charAt(0).toUpperCase() + key.slice(1),
              <pre className="text-sm">{JSON.stringify(value, null, 2)}</pre>
            );
          }
          if (Array.isArray(value)) {
            return renderSection(
              key.charAt(0).toUpperCase() + key.slice(1),
              value.join(', ') || 'None'
            );
          }
          return renderSection(
            key.charAt(0).toUpperCase() + key.slice(1),
            String(value)
          );
        })}
      </div>
    </div>
  );
};
