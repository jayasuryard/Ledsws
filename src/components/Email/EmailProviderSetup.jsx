import React, { useState } from 'react';
import { X, Check, AlertCircle, Mail, Server, Shield, Key, Globe, Copy, ExternalLink, Activity } from 'lucide-react';

const EmailProviderSetup = ({ isOpen, onClose, theme, onSave, currentConfig }) => {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState(currentConfig?.provider || 'smtp');
  const [config, setConfig] = useState(currentConfig || {
    provider: 'smtp',
    fromName: '',
    fromEmail: '',
    replyToEmail: '',
    smtp: {
      host: '',
      port: 587,
      username: '',
      password: '',
      secure: false
    },
    dkim: {
      domain: '',
      selector: '',
      privateKey: ''
    },
    tracking: {
      enableOpen: true,
      enableClick: true,
      customDomain: ''
    }
  });

  const [testStatus, setTestStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  // Provider options
  const providers = [
    {
      id: 'smtp',
      name: 'Custom SMTP',
      description: 'Use your own SMTP server',
      icon: Server,
      recommended: false
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Popular email service with great deliverability',
      icon: Mail,
      recommended: true
    },
    {
      id: 'mailgun',
      name: 'Mailgun',
      description: 'Developer-friendly email API',
      icon: Globe,
      recommended: true
    },
    {
      id: 'ses',
      name: 'Amazon SES',
      description: 'Cost-effective & scalable',
      icon: Shield,
      recommended: false
    }
  ];

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestStatus(null);

    // Simulate testing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock success (in production, this would call your backend)
    setTestStatus({
      success: true,
      message: 'Connection successful! Test email sent to ' + config.fromEmail
    });

    setIsTesting(false);
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return provider;
    if (step === 2) {
      return config.fromName && config.fromEmail && config.replyToEmail;
    }
    if (step === 3) {
      if (provider === 'smtp') {
        return config.smtp.host && config.smtp.port && config.smtp.username && config.smtp.password;
      }
      return true; // API key providers
    }
    if (step === 4) {
      return true; // DKIM is optional
    }
    return false;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900' 
            : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
        }`}>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Email Provider Setup</h2>
                <p className="text-white/80 text-sm">
                  Step {step} of 4 - Configure your email sending provider
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-240px)] overflow-y-auto p-6">
          {/* Step 1: Choose Provider */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Choose Your Email Provider
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select how you want to send emails. We recommend using a professional email service for better deliverability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((p) => {
                  const Icon = p.icon;
                  const isSelected = provider === p.id;
                  
                  return (
                    <button
                      key={p.id}
                      onClick={() => setProvider(p.id)}
                      className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? theme === 'dark'
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-blue-600 bg-blue-50'
                          : theme === 'dark'
                          ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {p.recommended && (
                        <div className="absolute top-4 right-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            theme === 'dark'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            Recommended
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {p.name}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {p.description}
                          </p>
                        </div>
                        
                        {isSelected && (
                          <div className="text-blue-500">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`p-4 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-blue-900/20 border-blue-800/30'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <strong>Need help choosing?</strong> SendGrid and Mailgun offer generous free tiers and excellent deliverability. Custom SMTP is best if you already have a mail server configured.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Sender Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Sender Information
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  This is how your emails will appear to recipients
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    From Name *
                  </label>
                  <input
                    type="text"
                    value={config.fromName}
                    onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
                    placeholder="Your Company Name"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    This appears as the sender name in the inbox
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    From Email Address *
                  </label>
                  <input
                    type="email"
                    value={config.fromEmail}
                    onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
                    placeholder="noreply@yourdomain.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Must be a verified email address on your domain
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Reply-To Email Address *
                  </label>
                  <input
                    type="email"
                    value={config.replyToEmail}
                    onChange={(e) => setConfig({ ...config, replyToEmail: e.target.value })}
                    placeholder="support@yourdomain.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <p className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Where replies will be sent
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  <Mail className={`w-5 h-5 mt-0.5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className={`font-medium mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Example Preview
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      From: <strong>{config.fromName || 'Your Company'}</strong> &lt;{config.fromEmail || 'email@domain.com'}&gt;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: SMTP/API Configuration */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {provider === 'smtp' ? 'SMTP Configuration' : `${providers.find(p => p.id === provider)?.name} Configuration`}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enter your {provider === 'smtp' ? 'SMTP server' : 'API'} credentials
                </p>
              </div>

              {provider === 'smtp' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        SMTP Host *
                      </label>
                      <input
                        type="text"
                        value={config.smtp.host}
                        onChange={(e) => setConfig({ 
                          ...config, 
                          smtp: { ...config.smtp, host: e.target.value }
                        })}
                        placeholder="smtp.gmail.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Port *
                      </label>
                      <select
                        value={config.smtp.port}
                        onChange={(e) => setConfig({ 
                          ...config, 
                          smtp: { ...config.smtp, port: parseInt(e.target.value) }
                        })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        <option value="25">25 (Standard)</option>
                        <option value="587">587 (TLS - Recommended)</option>
                        <option value="465">465 (SSL)</option>
                        <option value="2525">2525 (Alternative)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Username *
                    </label>
                    <input
                      type="text"
                      value={config.smtp.username}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        smtp: { ...config.smtp, username: e.target.value }
                      })}
                      placeholder="your-email@domain.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password *
                    </label>
                    <input
                      type="password"
                      value={config.smtp.password}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        smtp: { ...config.smtp, password: e.target.value }
                      })}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.smtp.secure}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        smtp: { ...config.smtp, secure: e.target.checked }
                      })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Use SSL/TLS (Recommended for port 465)
                    </span>
                  </label>
                </div>
              )}

              {provider !== 'smtp' && (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      API Key *
                    </label>
                    <input
                      type="password"
                      placeholder="sk_live_xxxxxxxxxxxx"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>

                  <div className={`p-4 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className={`font-medium mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      How to get your API key:
                    </h4>
                    <ol className={`text-sm space-y-1 list-decimal list-inside ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <li>Sign up for {providers.find(p => p.id === provider)?.name}</li>
                      <li>Navigate to Settings → API Keys</li>
                      <li>Create a new API key with "Mail Send" permission</li>
                      <li>Copy and paste it here</li>
                    </ol>
                    <a
                      href={
                        provider === 'sendgrid' ? 'https://app.sendgrid.com/settings/api_keys' :
                        provider === 'mailgun' ? 'https://app.mailgun.com/app/account/security/api_keys' :
                        'https://console.aws.amazon.com/ses'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open {providers.find(p => p.id === provider)?.name} Dashboard
                    </a>
                  </div>
                </div>
              )}

              {/* Test Connection */}
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Test Connection
                  </h4>
                  <button
                    onClick={handleTestConnection}
                    disabled={!canProceed() || isTesting}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      !canProceed() || isTesting
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isTesting ? 'Testing...' : 'Test Now'}
                  </button>
                </div>
                
                {testStatus && (
                  <div className={`mt-3 p-3 rounded-lg ${
                    testStatus.success
                      ? theme === 'dark'
                        ? 'bg-green-900/20 border border-green-800/30'
                        : 'bg-green-50 border border-green-200'
                      : theme === 'dark'
                      ? 'bg-red-900/20 border border-red-800/30'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-sm ${
                      testStatus.success
                        ? theme === 'dark' ? 'text-green-400' : 'text-green-700'
                        : theme === 'dark' ? 'text-red-400' : 'text-red-700'
                    }`}>
                      {testStatus.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: DKIM & Tracking */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Advanced Settings (Optional)
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Configure DKIM authentication and email tracking
                </p>
              </div>

              {/* DKIM Configuration */}
              <div className={`p-5 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      DKIM Authentication
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Improve email deliverability by authenticating your domain
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Domain
                    </label>
                    <input
                      type="text"
                      value={config.dkim.domain}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        dkim: { ...config.dkim, domain: e.target.value }
                      })}
                      placeholder="yourdomain.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      DKIM Selector
                    </label>
                    <input
                      type="text"
                      value={config.dkim.selector}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        dkim: { ...config.dkim, selector: e.target.value }
                      })}
                      placeholder="default"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>

                  <div className={`p-3 rounded-lg text-xs ${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
                  }`}>
                    <p className={`font-mono ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Add this TXT record to your DNS:
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <code className={`flex-1 p-2 rounded ${
                        theme === 'dark' ? 'bg-black/50 text-gray-300' : 'bg-white text-gray-700'
                      }`}>
                        {config.dkim.selector || 'default'}._domainkey.{config.dkim.domain || 'yourdomain.com'}
                      </code>
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Options */}
              <div className={`p-5 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  <Activity className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Email Tracking
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Track email opens and link clicks
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.tracking.enableOpen}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        tracking: { ...config.tracking, enableOpen: e.target.checked }
                      })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Track Email Opens
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Know when recipients open your emails
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.tracking.enableClick}
                      onChange={(e) => setConfig({ 
                        ...config, 
                        tracking: { ...config.tracking, enableClick: e.target.checked }
                      })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Track Link Clicks
                      </div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        See which links recipients click
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${
                theme === 'dark'
                  ? 'bg-green-900/20 border border-green-800/30'
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-start gap-3">
                  <Check className={`w-5 h-5 mt-0.5 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Almost Done!
                    </h4>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Click "Save Configuration" to finish setup. You can always change these settings later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        } flex items-center justify-between`}>
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              step === 1
                ? theme === 'dark'
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : theme === 'dark'
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i <= step
                    ? 'bg-blue-500 w-3'
                    : theme === 'dark'
                    ? 'bg-gray-700'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {step === 4 ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
            >
              Save Configuration
            </button>
          ) : (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !canProceed()
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : theme === 'dark'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailProviderSetup;
