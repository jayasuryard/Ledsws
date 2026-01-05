import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Target, MessageSquare, Mail, Facebook, 
  Instagram, Linkedin, ArrowRight, ArrowLeft, Check, Sparkles 
} from 'lucide-react';
import useStore from '../../store/useStore';

const Onboarding = () => {
  const navigate = useNavigate();
  const { addBusiness, completeOnboarding, theme, user } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    website: '',
    goals: [],
    channels: [],
    description: ''
  });

  const totalSteps = 4;

  const industries = [
    'E-commerce', 'SaaS', 'Consulting', 'Real Estate', 'Healthcare',
    'Education', 'Marketing Agency', 'Finance', 'Other'
  ];

  const goals = [
    { id: 'lead-gen', icon: Target, label: 'Lead Generation', description: 'Capture & qualify leads' },
    { id: 'nurturing', icon: MessageSquare, label: 'Lead Nurturing', description: 'Build relationships' },
    { id: 'revenue', icon: Sparkles, label: 'Revenue Growth', description: 'Increase conversions' }
  ];

  const channels = [
    { id: 'email', icon: Mail, label: 'Email Marketing' },
    { id: 'facebook', icon: Facebook, label: 'Facebook' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' }
  ];

  const toggleSelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleComplete = () => {
    addBusiness({
      name: formData.businessName,
      industry: formData.industry,
      website: formData.website,
      goals: formData.goals,
      channels: formData.channels,
      description: formData.description,
      createdAt: new Date().toISOString()
    });
    completeOnboarding();
    navigate('/dashboard');
  };

  const canProceed = () => {
    switch(step) {
      case 1: return formData.businessName && formData.industry;
      case 2: return formData.goals.length > 0;
      case 3: return formData.channels.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} flex items-center justify-center p-6`}>
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  s <= step
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < totalSteps && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    s < step
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : theme === 'dark'
                      ? 'bg-gray-800'
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Welcome, {user?.name}! 👋
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className={`rounded-2xl shadow-xl p-8 ${
          theme === 'dark' 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-white border border-gray-200'
        }`}>
          {/* Step 1: Business Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Briefcase className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Tell us about your business
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  This helps us personalize your experience
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="">Select your industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="https://acme.com"
                />
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  What are your main goals?
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Select all that apply
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleSelection('goals', goal.id)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      formData.goals.includes(goal.id)
                        ? 'border-blue-500 bg-blue-500/10'
                        : theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        formData.goals.includes(goal.id)
                          ? 'bg-blue-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-800 text-gray-400'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <goal.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {goal.label}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {goal.description}
                        </p>
                      </div>
                      {formData.goals.includes(goal.id) && (
                        <Check className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Channels */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Which channels will you use?
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  We'll help you automate these platforms
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => toggleSelection('channels', channel.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      formData.channels.includes(channel.id)
                        ? 'border-blue-500 bg-blue-500/10'
                        : theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <channel.icon className={`w-8 h-8 mx-auto mb-3 ${
                      formData.channels.includes(channel.id)
                        ? 'text-blue-500'
                        : theme === 'dark'
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }`} />
                    <div className={`font-semibold text-center ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {channel.label}
                    </div>
                    {formData.channels.includes(channel.id) && (
                      <Check className="w-5 h-5 mx-auto mt-2 text-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary & Launch */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  You're all set! 🎉
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Here's what we're setting up for you
                </p>
              </div>

              <div className={`p-6 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="space-y-4">
                  <div>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Business
                    </div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {formData.businessName} • {formData.industry}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Goals ({formData.goals.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.goals.map(goalId => (
                        <span key={goalId} className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                          {goals.find(g => g.id === goalId)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Channels ({formData.channels.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.channels.map(channelId => (
                        <span key={channelId} className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm">
                          {channels.find(c => c.id === channelId)?.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-green-50 border-green-200'
              }`}>
                <p className="text-sm text-green-600">
                  <strong>✨ Your workspace is ready!</strong> We've created your first business profile, 
                  configured AI tools based on your goals, and connected your channels. Let's go!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                step === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                <span>Launch Dashboard</span>
                <Sparkles className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
