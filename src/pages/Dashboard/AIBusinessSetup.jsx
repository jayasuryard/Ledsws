import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Send, Loader2, CheckCircle2, Globe, 
  Palette, FileText, Mail, FormInput, Zap, ArrowRight,
  Target, TrendingUp, Users, MessageSquare
} from 'lucide-react';
import useStore from '../../store/useStore';

const AIBusinessSetup = () => {
  const { theme, addBusiness, selectBusiness } = useStore();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'system',
      content: "👋 Welcome! I'll help you set up your complete marketing system in seconds. Just enter your website URL and I'll analyze it to create your business profile, lead forms, email campaigns, and all essential marketing assets automatically.",
      timestamp: new Date()
    }
  ]);
  const [currentStep, setCurrentStep] = useState('input'); // input, analyzing, generating, complete
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type, content, data = null) => {
    setMessages(prev => [...prev, {
      type,
      content,
      data,
      timestamp: new Date()
    }]);
  };

  // Simulated website analysis - In production, this would call your backend API
  const analyzeWebsite = async (url) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock analysis results - In production, this would come from your AI/scraping service
    return {
      businessName: extractBusinessName(url),
      industry: detectIndustry(url),
      description: 'We provide innovative solutions to help businesses grow and succeed in the digital age.',
      branding: {
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        logoDetected: true,
        logoUrl: 'https://via.placeholder.com/150'
      },
      content: {
        tagline: 'Transform Your Business with Smart Solutions',
        valuePropositions: [
          'Increase your revenue by 10x',
          'Automate your marketing workflows',
          'Generate quality leads on autopilot',
          'Scale without hiring more staff'
        ]
      },
      targetAudience: {
        segments: ['Small Business Owners', 'Entrepreneurs', 'Marketing Managers'],
        painPoints: ['Limited time', 'Budget constraints', 'Need for automation']
      }
    };
  };

  const extractBusinessName = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      const name = domain.split('.')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
      return 'Your Business';
    }
  };

  const detectIndustry = (url) => {
    // Simple mock detection - in production, this would use AI
    const industries = ['Technology', 'E-commerce', 'Consulting', 'Marketing', 'Healthcare'];
    return industries[Math.floor(Math.random() * industries.length)];
  };

  const generateLeadForm = (businessData) => {
    return {
      id: `form-${Date.now()}`,
      name: `${businessData.businessName} Contact Form`,
      fields: [
        { id: 'name', label: 'Full Name', type: 'text', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { id: 'company', label: 'Company Name', type: 'text', required: false },
        { id: 'message', label: 'How can we help?', type: 'textarea', required: true }
      ],
      theme: {
        primaryColor: businessData.branding.primaryColor,
        secondaryColor: businessData.branding.secondaryColor
      },
      settings: {
        submitText: 'Get Started',
        successMessage: "Thanks! We'll be in touch soon.",
        redirectUrl: ''
      }
    };
  };

  const generateEmailCampaigns = (businessData) => {
    return [
      {
        id: `campaign-${Date.now()}`,
        name: 'Welcome Series',
        type: 'sequence',
        emails: [
          {
            subject: `Welcome to ${businessData.businessName}! 🎉`,
            preview: "We're excited to have you here",
            body: `Hi there!\n\nWelcome to ${businessData.businessName}! ${businessData.content.tagline}\n\nWe're here to help you ${businessData.content.valuePropositions[0].toLowerCase()}.\n\nBest regards,\nThe ${businessData.businessName} Team`
          },
          {
            subject: `Here's how we can help you grow`,
            preview: 'Discover our solutions',
            body: `Hi again!\n\nAt ${businessData.businessName}, we specialize in:\n\n${businessData.content.valuePropositions.map(vp => `• ${vp}`).join('\n')}\n\nReady to get started? Reply to this email!\n\nBest,\nThe Team`
          }
        ],
        trigger: 'form_submission',
        delay: { sequence: [0, 24] } // hours
      },
      {
        id: `campaign-${Date.now() + 1}`,
        name: 'Lead Nurture Campaign',
        type: 'drip',
        emails: [
          {
            subject: `Check out what ${businessData.businessName} can do for you`,
            preview: 'Your success story starts here',
            body: `Hi,\n\nWe noticed you're interested in growing your business. Here's how we've helped companies like yours:\n\n✅ ${businessData.content.valuePropositions[0]}\n✅ ${businessData.content.valuePropositions[1]}\n\nLet's chat about your goals!\n\nBest,\nThe Team`
          }
        ],
        trigger: 'lead_score',
        threshold: 50
      }
    ];
  };

  const generateMarketingAssets = (businessData) => {
    return {
      socialMediaPosts: [
        {
          platform: 'LinkedIn',
          content: `🚀 ${businessData.content.tagline}\n\n${businessData.content.valuePropositions[0]}\n\nLearn more: [Your Website]\n\n#Business #Growth #Success`
        },
        {
          platform: 'Twitter',
          content: `${businessData.content.tagline} 🎯\n\n${businessData.content.valuePropositions[1]}\n\nGet started today 👉 [Link]`
        }
      ],
      adCopy: [
        {
          headline: businessData.content.tagline,
          description: businessData.content.valuePropositions[0],
          cta: 'Get Started Free'
        }
      ]
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!websiteUrl) return;
    
    try {
      setAnalyzing(true);
      setCurrentStep('analyzing');
      
      // Add user message
      addMessage('user', websiteUrl);
      
      // Step 1: Analyzing website
      addMessage('system', '🔍 Analyzing your website...');
      const analysis = await analyzeWebsite(websiteUrl);
      
      // Step 2: Show analysis results
      addMessage('system', `✅ Found: ${analysis.businessName} in the ${analysis.industry} industry`, analysis);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 3: Extracting branding
      setCurrentStep('generating');
      addMessage('system', '🎨 Extracting branding elements...');
      await new Promise(resolve => setTimeout(resolve, 1200));
      addMessage('system', `✅ Detected brand colors: ${analysis.branding.primaryColor}, ${analysis.branding.secondaryColor}`);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 4: Generating lead forms
      addMessage('system', '📝 Creating lead generation forms...');
      const leadForm = generateLeadForm(analysis);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage('system', `✅ Created ${leadForm.fields.length}-field contact form`, leadForm);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 5: Setting up email campaigns
      addMessage('system', '📧 Setting up email workflows...');
      const emailCampaigns = generateEmailCampaigns(analysis);
      await new Promise(resolve => setTimeout(resolve, 1200));
      addMessage('system', `✅ Created ${emailCampaigns.length} automated email campaigns`, emailCampaigns);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 6: Generating content
      addMessage('system', '✨ Generating marketing content...');
      const marketingAssets = generateMarketingAssets(analysis);
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage('system', `✅ Created ${marketingAssets.socialMediaPosts.length} social posts and ad copy`, marketingAssets);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 7: Complete
      setCurrentStep('complete');
      addMessage('system', '🎉 Your complete marketing system is ready! Creating your business profile...');
      
      // Create the business in the store
      const newBusiness = {
        id: Date.now().toString(),
        name: analysis.businessName,
        industry: analysis.industry,
        website: websiteUrl,
        description: analysis.description,
        branding: analysis.branding,
        content: analysis.content,
        targetAudience: analysis.targetAudience,
        leadForms: [leadForm],
        emailCampaigns: emailCampaigns,
        marketingAssets: marketingAssets,
        createdAt: new Date().toISOString(),
        status: 'active',
        setupMethod: 'ai-automated',
        metrics: {
          revenue: 0,
          leads: 0,
          conversionRate: 0
        }
      };
      
      addBusiness(newBusiness);
      selectBusiness(newBusiness.id);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to the new business dashboard
      navigate(`/app/business/${newBusiness.id}`);
      
    } catch (error) {
      console.error('Analysis error:', error);
      addMessage('system', '❌ Oops! Something went wrong. Please try again or enter the URL in a different format.');
      setCurrentStep('input');
    } finally {
      setAnalyzing(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-navy-900">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                AI Business Setup
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Powered by intelligent website analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className={`rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        } shadow-xl`}>
          
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            {messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.type === 'system' && (
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className={`rounded-2xl rounded-tl-sm px-4 py-3 ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <p className={`text-sm leading-relaxed ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {message.content}
                          </p>
                          
                          {/* Show structured data if available */}
                          {message.data && message.data.businessName && (
                            <div className={`mt-3 p-3 rounded-lg border ${
                              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                            }`}>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Target className="w-4 h-4 text-blue-500" />
                                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                    <strong>Business:</strong> {message.data.businessName}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <TrendingUp className="w-4 h-4 text-purple-500" />
                                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                                    <strong>Industry:</strong> {message.data.industry}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <span className={`text-xs mt-1 ml-1 ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {message.type === 'user' && (
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="text-right">
                        <div className="inline-block rounded-2xl rounded-tr-sm px-4 py-3 bg-navy-900">
                          <p className="text-sm text-white leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <span className={`text-xs mt-1 mr-1 ${
                          theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {analyzing && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <div className={`rounded-2xl rounded-tl-sm px-4 py-3 ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
                        }`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
                        }`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
                        }`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`border-t p-4 ${
            theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'
          }`}>
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="Enter your website URL (e.g., https://yourwebsite.com)"
                  disabled={analyzing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={analyzing || !websiteUrl}
                className="px-6 py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transform hover:scale-105 active:scale-95"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
            </form>
            
            {/* Quick Examples */}
            {!analyzing && messages.length === 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Try:
                </span>
                {['https://example.com', 'https://mystore.com', 'https://mybusiness.io'].map((example) => (
                  <button
                    key={example}
                    onClick={() => setWebsiteUrl(example)}
                    className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                      theme === 'dark'
                        ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        {!analyzing && messages.length === 1 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Globe, title: 'Website Analysis', desc: 'Extract business details & positioning' },
              { icon: Palette, title: 'Brand Detection', desc: 'Identify colors, logos & style' },
              { icon: FormInput, title: 'Lead Forms', desc: 'Auto-generated capture forms' },
              { icon: Mail, title: 'Email Workflows', desc: 'Pre-built nurture sequences' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <feature.icon className="w-8 h-8 mb-3 text-blue-500" />
                <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIBusinessSetup;
