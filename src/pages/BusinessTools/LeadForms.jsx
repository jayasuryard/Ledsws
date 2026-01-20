import React, { useState } from 'react';
import { Plus, Eye, Copy, BarChart3, Edit, Trash2, Code, GripVertical, X, Settings, Link, Download, TrendingUp, Users, MousePointerClick, ChevronRight, ChevronDown, Sparkles, Save, ExternalLink, Zap, Share2, Facebook, Twitter, Linkedin, Mail, MessageCircle, Send, Upload } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const LeadForms = () => {
  const { businessId } = useParams();
  const { theme, businesses, addLead } = useStore();
  const business = businesses.find(b => b.id === businessId);
  
  // Environment-aware base URL
  const BASE_URL = import.meta.env.MODE === 'development' 
    ? 'http://localhost:5173' 
    : 'https://ledsws.vercel.app';
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [showEmbedPreview, setShowEmbedPreview] = useState(false);
  const [embedType, setEmbedType] = useState('iframe'); // 'iframe', 'javascript'
  const [utmParams, setUtmParams] = useState({
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: ''
  });
  
  // Form Builder State
  const [formConfig, setFormConfig] = useState({
    name: '',
    description: '',
    type: 'single-step',
    steps: [{ title: 'Step 1', fields: [] }],
    fields: [],
    theme: {
      headerColor: '#6366f1',
      headerImage: '',
      accentColor: '#6366f1',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter'
    },
    settings: {
      submitText: 'Submit',
      successType: 'message', // 'message', 'custom', 'redirect'
      successMessage: 'Thank you for your submission! We will get back to you shortly.',
      customMessage: '',
      redirectUrl: '',
      notificationEmail: '',
      captureMetadata: true,
      gdprCompliant: true,
      autoScore: true,
      resolveDomain: true,
      enableDuplicateDetection: true,
      followUpThreshold: 24, // hours before lead is flagged as untouched
      pipelineStage: 'new',
      leadTag: 'form-lead',
      sourceConfig: {
        sourceType: 'Website',
        domainDetection: true,
        allowUtmOverride: true,
        trackSubmissionType: true // hosted/embedded/shared
      },
      autoTagRules: [
        { id: 1, type: 'form', condition: 'formName', operator: 'contains', value: '', tag: 'form-submission', enabled: true },
        { id: 2, type: 'field', condition: '', operator: 'equals', value: '', tag: '', enabled: false },
        { id: 3, type: 'domain', condition: 'domain', operator: 'contains', value: '', tag: '', enabled: false },
        { id: 4, type: 'utm', condition: 'utm_source', operator: 'equals', value: '', tag: '', enabled: false },
        { id: 5, type: 'channel', condition: 'submissionType', operator: 'equals', value: 'embedded', tag: 'embedded-form', enabled: false }
      ],
      campaignTracking: {
        enabled: true,
        trafficSource: '', // Maps to utm_source
        marketingChannel: '', // Maps to utm_medium
        campaignName: '', // Maps to utm_campaign (auto-populated from form name)
        creativeVariant: '', // Maps to utm_content
        keywordTerm: '', // Maps to utm_term
        autoDetectSource: true,
        requireChannel: true
      }
    }
  });

  // Campaign Tracking field definitions with marketing-friendly labels
  const campaignTrackingFields = {
    trafficSource: {
      label: 'Traffic Source',
      utmKey: 'utm_source',
      tooltip: 'Traffic Source tells you where visitors came from, like Facebook or Email. This helps you understand which platforms bring the most leads.',
      type: 'dropdown',
      required: false,
      options: [
        { value: 'google', label: 'Google' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'twitter', label: 'Twitter / X' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tiktok', label: 'TikTok' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'newsletter', label: 'Newsletter' },
        { value: 'website', label: 'Website' },
        { value: 'referral', label: 'Referral' },
        { value: 'influencer', label: 'Influencer' },
        { value: 'paid_ads', label: 'Paid Ads' },
        { value: 'organic', label: 'Organic' },
        { value: 'direct', label: 'Direct' },
        { value: 'other', label: 'Other' }
      ]
    },
    marketingChannel: {
      label: 'Marketing Channel',
      utmKey: 'utm_medium',
      tooltip: 'Marketing Channel describes how you reached your audience - through social posts, email campaigns, paid ads, etc. This helps you compare which methods work best.',
      type: 'dropdown',
      required: true,
      options: [
        { value: 'social', label: 'Social Media' },
        { value: 'email', label: 'Email Marketing' },
        { value: 'cpc', label: 'Cost Per Click (CPC)' },
        { value: 'paid_social', label: 'Paid Social' },
        { value: 'organic', label: 'Organic / SEO' },
        { value: 'referral', label: 'Referral' },
        { value: 'display', label: 'Display Ads' },
        { value: 'affiliate', label: 'Affiliate' },
        { value: 'influencer', label: 'Influencer Marketing' },
        { value: 'sms', label: 'SMS' },
        { value: 'push', label: 'Push Notification' },
        { value: 'offline', label: 'Offline' },
        { value: 'other', label: 'Other' }
      ]
    },
    campaignName: {
      label: 'Campaign Name',
      utmKey: 'utm_campaign',
      tooltip: 'Campaign Name identifies this specific marketing campaign. It auto-fills with your form name to keep tracking consistent across all reports.',
      type: 'auto',
      required: true,
      autoPopulate: true
    },
    creativeVariant: {
      label: 'Creative Variant',
      utmKey: 'utm_content',
      tooltip: 'Creative Variant helps you test different versions of your ads or content. Use this to compare which button placement, image, or message gets more leads.',
      type: 'dropdown',
      required: false,
      options: [
        { value: 'header-cta', label: 'Header CTA' },
        { value: 'footer-cta', label: 'Footer CTA' },
        { value: 'sidebar-banner', label: 'Sidebar Banner' },
        { value: 'hero-section', label: 'Hero Section' },
        { value: 'popup', label: 'Popup / Modal' },
        { value: 'in-feed', label: 'In-Feed Ad' },
        { value: 'story-ad', label: 'Story Ad' },
        { value: 'video-ad', label: 'Video Ad' },
        { value: 'text-link', label: 'Text Link' },
        { value: 'custom', label: 'Custom' }
      ]
    },
    keywordTerm: {
      label: 'Keyword / Targeting Term',
      utmKey: 'utm_term',
      tooltip: 'Keyword or Targeting Term is mainly used for paid ads to track which search terms or audience targeting brought visitors. Great for optimizing ad spend.',
      type: 'text',
      required: false,
      contextualRecommendation: ['cpc', 'paid_social', 'paid_ads']
    }
  };

  const [draggedField, setDraggedField] = useState(null);
  const [showSourceConfig, setShowSourceConfig] = useState(false);
  const [showCampaignTracking, setShowCampaignTracking] = useState(false);
  const [showPostSubmissionConfig, setShowPostSubmissionConfig] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [activeTab, setActiveTab] = useState('questions'); // 'questions', 'responses', 'settings'

  // Available Field Types
  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '📝', validation: ['required', 'minLength', 'maxLength'] },
    { type: 'email', label: 'Email', icon: '✉️', validation: ['required', 'email'] },
    { type: 'phone', label: 'Phone', icon: '📞', validation: ['required', 'phone'] },
    { type: 'number', label: 'Number', icon: '🔢', validation: ['required', 'min', 'max'] },
    { type: 'textarea', label: 'Text Area', icon: '📄', validation: ['required', 'minLength', 'maxLength'] },
    { type: 'dropdown', label: 'Dropdown', icon: '▼', validation: ['required'], options: true },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️', validation: ['required'] },
    { type: 'radio', label: 'Radio Buttons', icon: '🔘', validation: ['required'], options: true },
    { type: 'file', label: 'File Upload', icon: '📎', validation: ['required', 'fileType', 'maxSize'] },
    { type: 'hidden', label: 'Hidden Field', icon: '🔒', validation: [] }
  ];

  // Source types for lead attribution
  const sourceTypes = [
    'Website',
    'Social Media',
    'Email Campaign',
    'Influencer Campaign',
    'Paid Ads',
    'Referral',
    'Manual Entry',
    'API',
    'Shared Form Link'
  ];

  // Predefined theme colors (Google Forms style)
  const themeColors = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Teal', color: '#14b8a6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Purple', color: '#a855f7' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Yellow', color: '#eab308' },
  ];

  const forms = [
    {
      id: 1,
      name: 'Contact Us Form',
      type: 'single-step',
      submissions: 234,
      views: 1887,
      conversionRate: 12.4,
      status: 'active',
      lastSubmission: '2 hours ago',
      fields: 4,
      analytics: {
        daily: [12, 15, 8, 22, 18, 25, 19],
        avgCompletionTime: '45s',
        topSource: 'Organic Search',
        deviceBreakdown: { desktop: 65, mobile: 30, tablet: 5 }
      }
    },
    {
      id: 2,
      name: 'Free Consultation Request',
      type: 'multi-step',
      submissions: 156,
      views: 857,
      conversionRate: 18.2,
      status: 'active',
      lastSubmission: '5 hours ago',
      fields: 8,
      steps: 3,
      dropoff: [100, 78, 65],
      analytics: {
        daily: [8, 12, 10, 15, 14, 18, 16],
        avgCompletionTime: '2m 15s',
        topSource: 'Paid Ads',
        deviceBreakdown: { desktop: 80, mobile: 15, tablet: 5 }
      }
    },
    {
      id: 3,
      name: 'Newsletter Signup',
      type: 'single-step',
      submissions: 789,
      views: 3204,
      conversionRate: 24.6,
      status: 'active',
      lastSubmission: '10 minutes ago',
      fields: 2,
      analytics: {
        daily: [45, 52, 48, 67, 58, 72, 65],
        avgCompletionTime: '18s',
        topSource: 'Social Media',
        deviceBreakdown: { desktop: 45, mobile: 50, tablet: 5 }
      }
    },
    {
      id: 4,
      name: 'Product Demo Request',
      type: 'multi-step',
      submissions: 89,
      views: 1072,
      conversionRate: 8.3,
      status: 'draft',
      lastSubmission: 'Never',
      fields: 10,
      steps: 4,
      dropoff: [100, 85, 62, 45],
      analytics: {
        daily: [0, 0, 0, 0, 0, 0, 0],
        avgCompletionTime: '-',
        topSource: '-',
        deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 }
      }
    }
  ];

  // Add field to form
  const addField = (fieldType) => {
    const newField = {
      id: Date.now(),
      type: fieldType.type,
      label: fieldType.label,
      placeholder: '',
      required: false,
      validation: {},
      options: fieldType.options ? ['Option 1', 'Option 2'] : null,
      step: activeStep
    };
    setFormConfig({
      ...formConfig,
      fields: [...formConfig.fields, newField]
    });
  };

  // Remove field
  const removeField = (fieldId) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.filter(f => f.id !== fieldId)
    });
  };

  // Update field
  const updateField = (fieldId, updates) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.map(f => f.id === fieldId ? { ...f, ...updates } : f)
    });
  };

  // Generate embed code with advanced options
  const generateEmbedCode = (form, type) => {
    const baseUrl = `${BASE_URL}/forms/${form.id}`;
    
    if (type === 'iframe') {
      return `<!-- LedsWS Form Embed - Responsive -->
<div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto;">
  <iframe 
    src="${baseUrl}" 
    style="width: 100%; height: 800px; border: none; border-radius: 8px;"
    title="${form.name}"
    loading="lazy">
  </iframe>
</div>`;
    } else if (type === 'javascript') {
      return `<!-- LedsWS Form Embed - JavaScript -->
<div id="ledsws-form-${form.id}"></div>
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = '${baseUrl}';
    iframe.style.width = '100%';
    iframe.style.height = '800px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.title = '${form.name}';
    document.getElementById('ledsws-form-${form.id}').appendChild(iframe);
    
    // Auto-resize based on content
    window.addEventListener('message', function(e) {
      if (e.data.formId === '${form.id}' && e.data.height) {
        iframe.style.height = e.data.height + 'px';
      }
    });
  })();
</script>`;
    } else if (type === 'wordpress') {
      return `<!-- WordPress Embed -->
[iframe src="${baseUrl}" width="100%" height="800"]

<!-- OR use HTML block -->
<div style="max-width: 800px; margin: 0 auto;">
  <iframe src="${baseUrl}" width="100%" height="800" frameborder="0" style="border-radius: 8px;"></iframe>
</div>`;
    } else if (type === 'react') {
      return `// React Component
import React from 'react';

const LedsWSForm = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <iframe
        src="${baseUrl}"
        width="100%"
        height="800"
        frameBorder="0"
        title="${form.name}"
        loading="lazy"
        style={{ borderRadius: '8px' }}
      />
    </div>
  );
};

export default LedsWSForm;`;
    } else {
      return baseUrl;
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  // Generate shareable URL with UTM params (supports both direct UTM and campaign tracking fields)
  const generateShareableUrl = (form, utmParams) => {
    const baseUrl = `${BASE_URL}/forms/${form.id}`;
    const params = new URLSearchParams();
    
    // Map campaign tracking fields to UTM parameters if configured
    const campaignTracking = formConfig.settings?.campaignTracking;
    
    // Priority: URL params > Campaign Tracking config
    const finalSource = utmParams.source || campaignTracking?.trafficSource;
    const finalMedium = utmParams.medium || campaignTracking?.marketingChannel;
    const finalCampaign = utmParams.campaign || campaignTracking?.campaignName || formConfig.name?.toLowerCase().replace(/\s+/g, '-');
    const finalContent = utmParams.content || campaignTracking?.creativeVariant;
    const finalTerm = utmParams.term || campaignTracking?.keywordTerm;
    
    if (finalSource) params.append('utm_source', finalSource);
    if (finalMedium) params.append('utm_medium', finalMedium);
    if (finalCampaign) params.append('utm_campaign', finalCampaign);
    if (finalTerm) params.append('utm_term', finalTerm);
    if (finalContent) params.append('utm_content', finalContent);
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  // Share to social platforms
  const shareToSocial = (platform, url, formName) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(`Check out this form: ${formName}`);
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      email: `mailto:?subject=${encodedText}&body=${encodedUrl}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Handle form submission simulation
  const handleFormSubmit = (formId, data, urlParams = {}) => {
    // Extract UTM parameters from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlSearchParams.get('utm_source') || urlParams.utm_source,
      utm_medium: urlSearchParams.get('utm_medium') || urlParams.utm_medium,
      utm_campaign: urlSearchParams.get('utm_campaign') || urlParams.utm_campaign,
      utm_term: urlSearchParams.get('utm_term') || urlParams.utm_term,
      utm_content: urlSearchParams.get('utm_content') || urlParams.utm_content
    };

    // Get user IP (in production, this would be done server-side)
    const getUserIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (error) {
        return 'unknown';
      }
    };

    getUserIP().then(ipAddress => {
      // Add lead to CRM with complete tracking data
      addLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        source: utmData.utm_source || `Form: ${forms.find(f => f.id === formId)?.name}`,
        status: 'New',
        stage: formConfig.settings.pipelineStage,
        tags: [formConfig.settings.leadTag],
        metadata: {
          formId,
          formName: forms.find(f => f.id === formId)?.name,
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'long' 
          }),
          pageUrl: window.location.href,
          referrer: document.referrer,
          device: /Mobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: navigator.userAgent,
          ipAddress: formConfig.settings.gdprCompliant ? 'masked' : ipAddress,
          // UTM Tracking Parameters
          utm_source: utmData.utm_source,
          utm_medium: utmData.utm_medium,
          utm_campaign: utmData.utm_campaign,
          utm_term: utmData.utm_term,
          utm_content: utmData.utm_content,
          // Geographic data (would be enhanced server-side)
          country: 'Unknown',
          region: 'Unknown',
          city: 'Unknown',
          ...data.metadata
        }
      });
    });
  };

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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Forms', value: forms.length, icon: BarChart3, color: 'blue' },
          { label: 'Total Views', value: '7,020', icon: Eye, color: 'purple' },
          { label: 'Total Submissions', value: '1,268', icon: Users, color: 'green' },
          { label: 'Avg Conversion', value: '15.9%', icon: TrendingUp, color: 'orange' },
          { label: 'Active Forms', value: forms.filter(f => f.status === 'active').length, icon: Zap, color: 'cyan' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`p-6 rounded-xl border ${
              theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          );
        })}
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark' ? 'bg-blue-500/20 text-blue-500' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {form.type === 'single-step' ? 'Single Step' : `${form.steps} Steps`}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-6">
                    <div>
                      <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Views
                      </div>
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {form.views?.toLocaleString()}
                      </div>
                    </div>
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
                        Fields
                      </div>
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {form.fields}
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

                  {/* Multi-step dropoff indicator */}
                  {form.type === 'multi-step' && form.dropoff && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Step Completion:
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {form.dropoff.map((rate, idx) => (
                          <div key={idx} className="flex-1">
                            <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                            <div className="text-xs text-center mt-1 text-gray-500">
                              Step {idx + 1}: {rate}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => {
                      setSelectedForm(form);
                      setUtmParams({
                        source: '',
                        medium: 'social',
                        campaign: form.name.toLowerCase().replace(/\s+/g, '-'),
                        term: '',
                        content: ''
                      });
                      setShowShareModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-800" 
                    title="Share Form"
                  >
                    <Share2 className="w-5 h-5 text-cyan-500" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedForm(form);
                      setShowAnalyticsModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-800" 
                    title="View Analytics"
                  >
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedForm(form);
                      setShowEmbedModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-800" 
                    title="Get Embed Code"
                  >
                    <Code className="w-5 h-5 text-blue-500" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedForm(form);
                      setShowBuilderModal(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-800" 
                    title="Edit Form"
                  >
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
                  value={formConfig.name}
                  onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
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
                <select 
                  value={formConfig.type}
                  onChange={(e) => setFormConfig({ ...formConfig, type: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                >
                  <option value="single-step">Single Step Form</option>
                  <option value="multi-step">Multi-Step Form</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Lead Source
                </label>
                <select 
                  value={formConfig.settings.sourceConfig.sourceType}
                  onChange={(e) => setFormConfig({ 
                    ...formConfig, 
                    settings: {
                      ...formConfig.settings,
                      sourceConfig: {
                        ...formConfig.settings.sourceConfig,
                        sourceType: e.target.value
                      }
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                >
                  {sourceTypes.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Default attribution for leads from this form
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowBuilderModal(true);
                  }}
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700"
                >
                  Open Form Builder
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

      {/* Form Builder Modal - Google Forms Style */}
      {showBuilderModal && (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-hidden">
          {/* Top Navigation Bar */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowBuilderModal(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                  <input
                    type="text"
                    value={formConfig.name}
                    onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
                    placeholder="Untitled form"
                    className="text-lg font-medium text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none px-2 py-1"
                  />
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => setActiveTab('questions')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'questions'
                          ? 'text-purple-700 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Questions
                    </button>
                    <button 
                      onClick={() => setActiveTab('responses')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'responses'
                          ? 'text-purple-700 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Responses
                    </button>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === 'settings'
                          ? 'text-purple-700 bg-purple-50'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Settings
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowThemeCustomizer(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: formConfig.theme.headerColor }}
                    />
                    <span className="text-sm font-medium">Customize theme</span>
                  </button>
                  <button 
                    onClick={() => window.open(`${BASE_URL}/forms/${forms.length + 1}`, '_blank')}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">Preview</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-medium">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-4xl mx-auto py-8 px-4">
            {activeTab === 'questions' && (
              <div className="space-y-3">
                {/* Form Header Card */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div 
                    className="h-2.5" 
                    style={{ backgroundColor: formConfig.theme.headerColor }}
                  />
                  <div className="p-6">
                    <input
                      type="text"
                      value={formConfig.name}
                      onChange={(e) => setFormConfig({ ...formConfig, name: e.target.value })}
                      placeholder="Untitled form"
                      className="text-3xl font-normal text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none w-full mb-2"
                    />
                    <input
                      type="text"
                      value={formConfig.description}
                      onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value })}
                      placeholder="Form description"
                      className="text-sm text-gray-600 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Question Cards */}
                {formConfig.fields.map((field, idx) => (
                  <div key={field.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            placeholder="Question"
                            className="text-base text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none w-full mb-4 pb-1"
                          />
                          
                          {/* Field Preview */}
                          {field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'phone' ? (
                            <input
                              type="text"
                              placeholder={field.placeholder || 'Your answer'}
                              disabled
                              className="w-full max-w-md px-0 py-2 border-b border-gray-300 text-gray-600 text-sm bg-transparent focus:outline-none"
                            />
                          ) : field.type === 'textarea' ? (
                            <textarea
                              placeholder={field.placeholder || 'Your answer'}
                              disabled
                              rows={3}
                              className="w-full px-0 py-2 border-b border-gray-300 text-gray-600 text-sm bg-transparent resize-none focus:outline-none"
                            />
                          ) : field.type === 'dropdown' ? (
                            <div className="space-y-2">
                              {field.options?.map((option, optIdx) => (
                                <div key={optIdx} className="flex items-center space-x-3">
                                  <div className="w-4 h-4 rounded border border-gray-300 flex-shrink-0" />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...field.options];
                                      newOptions[optIdx] = e.target.value;
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    className="flex-1 text-sm text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none"
                                  />
                                </div>
                              ))}
                              <button
                                onClick={() => updateField(field.id, { 
                                  options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] 
                                })}
                                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 mt-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add option</span>
                              </button>
                            </div>
                          ) : field.type === 'checkbox' ? (
                            <div className="space-y-2">
                              {field.options?.map((option, optIdx) => (
                                <div key={optIdx} className="flex items-center space-x-3">
                                  <input type="checkbox" disabled className="w-4 h-4 rounded border-gray-300" />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...field.options];
                                      newOptions[optIdx] = e.target.value;
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    className="flex-1 text-sm text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none"
                                  />
                                </div>
                              ))}
                              <button
                                onClick={() => updateField(field.id, { 
                                  options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] 
                                })}
                                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 mt-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add option</span>
                              </button>
                            </div>
                          ) : field.type === 'radio' ? (
                            <div className="space-y-2">
                              {field.options?.map((option, optIdx) => (
                                <div key={optIdx} className="flex items-center space-x-3">
                                  <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...field.options];
                                      newOptions[optIdx] = e.target.value;
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    className="flex-1 text-sm text-gray-700 border-b border-transparent hover:border-gray-300 focus:border-purple-600 focus:outline-none"
                                  />
                                </div>
                              ))}
                              <button
                                onClick={() => updateField(field.id, { 
                                  options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`] 
                                })}
                                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-purple-600 mt-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add option</span>
                              </button>
                            </div>
                          ) : field.type === 'file' ? (
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                              <Upload className="w-5 h-5" />
                              <span>File upload</span>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => removeField(field.id)}
                            className="p-2 rounded hover:bg-gray-100"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded hover:bg-gray-100" title="Duplicate">
                            <Copy className="w-4 h-4 text-gray-600" />
                          </button>
                          <label className="flex items-center space-x-2 px-3 py-1.5">
                            <span className="text-xs text-gray-600">Required</span>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                              className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                                before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                                before:transition-transform checked:before:translate-x-5"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Question Button */}
                <div className="flex justify-center">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                    <div className="flex items-center space-x-2">
                      {fieldTypes.map((field) => (
                        <button
                          key={field.type}
                          onClick={() => addField(field)}
                          className="p-3 rounded hover:bg-gray-100 transition-colors"
                          title={field.label}
                        >
                          <span className="text-xl">{field.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-3">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Form Settings</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Capture Metadata</span>
                      <input 
                        type="checkbox" 
                        checked={formConfig.settings.captureMetadata}
                        onChange={(e) => setFormConfig({
                          ...formConfig,
                          settings: { ...formConfig.settings, captureMetadata: e.target.checked }
                        })}
                        className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                          before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                          before:transition-transform checked:before:translate-x-5"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">GDPR Compliant</span>
                      <input 
                        type="checkbox"
                        checked={formConfig.settings.gdprCompliant}
                        onChange={(e) => setFormConfig({
                          ...formConfig,
                          settings: { ...formConfig.settings, gdprCompliant: e.target.checked }
                        })}
                        className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                          before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                          before:transition-transform checked:before:translate-x-5"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-700">Auto Score Leads</span>
                      <input 
                        type="checkbox"
                        checked={formConfig.settings.autoScore}
                        onChange={(e) => setFormConfig({
                          ...formConfig,
                          settings: { ...formConfig.settings, autoScore: e.target.checked }
                        })}
                        className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                          before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                          before:transition-transform checked:before:translate-x-5"
                      />
                    </label>
                  </div>
                </div>

                {/* Hidden Fields & UTM Configuration */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center space-x-2">
                    <span>🔒</span>
                    <span>Hidden Fields & Tracking</span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    These fields are automatically captured but not visible to form submitters
                  </p>
                  <div className="space-y-3">
                    {[
                      { key: 'utm_source', label: 'UTM Source', description: 'Traffic source identifier' },
                      { key: 'utm_medium', label: 'UTM Medium', description: 'Marketing medium (email, social, etc.)' },
                      { key: 'utm_campaign', label: 'UTM Campaign', description: 'Campaign name' },
                      { key: 'utm_content', label: 'UTM Content', description: 'Ad content variation' },
                      { key: 'utm_term', label: 'UTM Term', description: 'Paid search keywords' },
                      { key: 'referrer', label: 'Referrer URL', description: 'Page that linked to the form' },
                      { key: 'pageUrl', label: 'Page URL', description: 'URL where form was filled' },
                      { key: 'device', label: 'Device Type', description: 'Desktop, mobile, or tablet' },
                      { key: 'country', label: 'Location (Country)', description: 'Geographic location' }
                    ].map((field) => {
                      const hiddenFields = formConfig.hiddenFields || [
                        'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
                        'referrer', 'pageUrl', 'device', 'country'
                      ];
                      const isEnabled = hiddenFields.includes(field.key);
                      
                      return (
                        <label key={field.key} className="flex items-start justify-between cursor-pointer group">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                              {field.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {field.description}
                            </div>
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isEnabled}
                            onChange={(e) => {
                              const currentHiddenFields = formConfig.hiddenFields || [];
                              const newHiddenFields = e.target.checked
                                ? [...currentHiddenFields, field.key]
                                : currentHiddenFields.filter(f => f !== field.key);
                              setFormConfig({
                                ...formConfig,
                                hiddenFields: newHiddenFields
                              });
                            }}
                            className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                              before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                              before:transition-transform checked:before:translate-x-5"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setShowSourceConfig(true)}
                  className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Source Configuration</div>
                      <div className="text-sm text-gray-600 mt-1">{formConfig.settings.sourceConfig.sourceType}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>

                <button
                  onClick={() => setShowCampaignTracking(true)}
                  className="w-full bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200 shadow-sm p-4 text-left hover:border-purple-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <div className="font-medium text-gray-900">Campaign Tracking</div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {formConfig.settings.campaignTracking?.enabled 
                          ? `${formConfig.settings.campaignTracking.trafficSource || 'Not set'} • ${formConfig.settings.campaignTracking.marketingChannel || 'Not set'}`
                          : 'Configure marketing attribution'}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>

                <button
                  onClick={() => setShowPostSubmissionConfig(true)}
                  className="w-full bg-white rounded-lg border border-gray-200 shadow-sm p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Post-Submission Behavior</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {formConfig.settings.successType === 'redirect' ? 'Redirect to URL' : 'Show Message'}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>

                {/* Auto-Tagging Rules */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                        <Tag className="w-5 h-5 text-purple-600" />
                        <span>Auto-Tagging Rules</span>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Automatically assign tags to leads based on conditions
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newRule = {
                          id: Date.now(),
                          type: 'field',
                          condition: '',
                          operator: 'equals',
                          value: '',
                          tag: '',
                          enabled: true
                        };
                        setFormConfig({
                          ...formConfig,
                          settings: {
                            ...formConfig.settings,
                            autoTagRules: [...formConfig.settings.autoTagRules, newRule]
                          }
                        });
                      }}
                      className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Rule</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formConfig.settings.autoTagRules.map((rule, index) => (
                      <div key={rule.id} className={`p-4 rounded-lg border ${
                        rule.enabled ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={rule.enabled}
                            onChange={(e) => {
                              const updatedRules = [...formConfig.settings.autoTagRules];
                              updatedRules[index].enabled = e.target.checked;
                              setFormConfig({
                                ...formConfig,
                                settings: {
                                  ...formConfig.settings,
                                  autoTagRules: updatedRules
                                }
                              });
                            }}
                            className="mt-1 w-4 h-4 rounded text-purple-600"
                          />
                          
                          <div className="flex-1 grid grid-cols-5 gap-2">
                            <select
                              value={rule.type}
                              onChange={(e) => {
                                const updatedRules = [...formConfig.settings.autoTagRules];
                                updatedRules[index].type = e.target.value;
                                setFormConfig({
                                  ...formConfig,
                                  settings: {
                                    ...formConfig.settings,
                                    autoTagRules: updatedRules
                                  }
                                });
                              }}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="form">Form Name</option>
                              <option value="field">Field Value</option>
                              <option value="domain">Domain</option>
                              <option value="utm">UTM Parameter</option>
                              <option value="channel">Channel</option>
                            </select>

                            <input
                              type="text"
                              value={rule.condition}
                              onChange={(e) => {
                                const updatedRules = [...formConfig.settings.autoTagRules];
                                updatedRules[index].condition = e.target.value;
                                setFormConfig({
                                  ...formConfig,
                                  settings: {
                                    ...formConfig.settings,
                                    autoTagRules: updatedRules
                                  }
                                });
                              }}
                              placeholder={
                                rule.type === 'form' ? 'formName' :
                                rule.type === 'field' ? 'field name' :
                                rule.type === 'domain' ? 'domain' :
                                rule.type === 'utm' ? 'utm_source' :
                                'submissionType'
                              }
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            />

                            <select
                              value={rule.operator}
                              onChange={(e) => {
                                const updatedRules = [...formConfig.settings.autoTagRules];
                                updatedRules[index].operator = e.target.value;
                                setFormConfig({
                                  ...formConfig,
                                  settings: {
                                    ...formConfig.settings,
                                    autoTagRules: updatedRules
                                  }
                                });
                              }}
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            >
                              <option value="equals">equals</option>
                              <option value="contains">contains</option>
                            </select>

                            <input
                              type="text"
                              value={rule.value}
                              onChange={(e) => {
                                const updatedRules = [...formConfig.settings.autoTagRules];
                                updatedRules[index].value = e.target.value;
                                setFormConfig({
                                  ...formConfig,
                                  settings: {
                                    ...formConfig.settings,
                                    autoTagRules: updatedRules
                                  }
                                });
                              }}
                              placeholder="value to match"
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            />

                            <input
                              type="text"
                              value={rule.tag}
                              onChange={(e) => {
                                const updatedRules = [...formConfig.settings.autoTagRules];
                                updatedRules[index].tag = e.target.value;
                                setFormConfig({
                                  ...formConfig,
                                  settings: {
                                    ...formConfig.settings,
                                    autoTagRules: updatedRules
                                  }
                                });
                              }}
                              placeholder="Tag name"
                              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
                            />
                          </div>

                          <button
                            onClick={() => {
                              const updatedRules = formConfig.settings.autoTagRules.filter((_, i) => i !== index);
                              setFormConfig({
                                ...formConfig,
                                settings: {
                                  ...formConfig.settings,
                                  autoTagRules: updatedRules
                                }
                              });
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {formConfig.settings.autoTagRules.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        No auto-tagging rules configured. Click "Add Rule" to create one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'responses' && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Waiting for responses</h3>
                <p className="text-sm text-gray-600">
                  When people respond to this form, you'll see the data here.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Theme Customizer Modal */}
      {showThemeCustomizer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Customize theme</h2>
                <button 
                  onClick={() => setShowThemeCustomizer(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Header Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Header color</label>
                  <div className="grid grid-cols-5 gap-3">
                    {themeColors.map((themeColor) => (
                      <button
                        key={themeColor.name}
                        onClick={() => setFormConfig({
                          ...formConfig,
                          theme: { ...formConfig.theme, headerColor: themeColor.color, accentColor: themeColor.color }
                        })}
                        className={`relative h-12 rounded-lg border-2 transition-all ${
                          formConfig.theme.headerColor === themeColor.color
                            ? 'border-gray-900 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: themeColor.color }}
                        title={themeColor.name}
                      >
                        {formConfig.theme.headerColor === themeColor.color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Color Input */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Custom color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formConfig.theme.headerColor}
                        onChange={(e) => setFormConfig({
                          ...formConfig,
                          theme: { ...formConfig.theme, headerColor: e.target.value, accentColor: e.target.value }
                        })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formConfig.theme.headerColor}
                        onChange={(e) => setFormConfig({
                          ...formConfig,
                          theme: { ...formConfig.theme, headerColor: e.target.value, accentColor: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Background color</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={formConfig.theme.backgroundColor}
                      onChange={(e) => setFormConfig({
                        ...formConfig,
                        theme: { ...formConfig.theme, backgroundColor: e.target.value }
                      })}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formConfig.theme.backgroundColor}
                      onChange={(e) => setFormConfig({
                        ...formConfig,
                        theme: { ...formConfig.theme, backgroundColor: e.target.value }
                      })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Font</label>
                  <select
                    value={formConfig.theme.fontFamily}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      theme: { ...formConfig.theme, fontFamily: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Preview</label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="h-3"
                      style={{ backgroundColor: formConfig.theme.headerColor }}
                    />
                    <div 
                      className="p-6"
                      style={{ 
                        backgroundColor: formConfig.theme.backgroundColor,
                        fontFamily: formConfig.theme.fontFamily
                      }}
                    >
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Form Title</h3>
                      <p className="text-sm text-gray-600 mb-4">Form description goes here</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Question 1"
                          disabled
                          className="w-full px-3 py-2 border-b border-gray-300 bg-transparent text-sm"
                        />
                        <button 
                          className="px-4 py-2 rounded text-white text-sm font-medium"
                          style={{ backgroundColor: formConfig.theme.accentColor }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowThemeCustomizer(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && selectedForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modern Header with Gradient */}
            <div className={`relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900' 
                : 'bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600'
            }`}>
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedForm.name}
                      </h2>
                      <p className="text-sm text-white/90">
                        Comprehensive form performance and conversion insights
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAnalyticsModal(false)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Views', value: selectedForm.views?.toLocaleString(), icon: Eye, color: 'blue' },
                  { label: 'Submissions', value: selectedForm.submissions, icon: Users, color: 'green' },
                  { label: 'Conversion Rate', value: `${selectedForm.conversionRate}%`, icon: TrendingUp, color: 'purple' },
                  { label: 'Avg. Completion', value: selectedForm.analytics?.avgCompletionTime, icon: MousePointerClick, color: 'orange' }
                ].map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx} className={`p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {metric.label}
                        </span>
                        <Icon className={`w-4 h-4 text-${metric.color}-500`} />
                      </div>
                      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {metric.value}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submissions Over Time */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Submissions Over Time (Last 7 Days)
                </h3>
                <div className="flex items-end space-x-2 h-48">
                  {selectedForm.analytics?.daily.map((count, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t"
                        style={{ height: `${(count / Math.max(...selectedForm.analytics.daily)) * 100}%` }}
                      />
                      <span className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Day {idx + 1}
                      </span>
                      <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-step Drop-off Analysis */}
              {selectedForm.type === 'multi-step' && selectedForm.dropoff && (
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Step-by-Step Drop-off Analysis
                  </h3>
                  <div className="space-y-4">
                    {selectedForm.dropoff.map((rate, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Step {idx + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {rate}%
                            </span>
                            {idx > 0 && (
                              <span className={`text-sm ${
                                selectedForm.dropoff[idx] < selectedForm.dropoff[idx - 1] 
                                  ? 'text-red-500' 
                                  : 'text-green-500'
                              }`}>
                                ({selectedForm.dropoff[idx] - selectedForm.dropoff[idx - 1]}%)
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className={`h-3 rounded-full ${
                              rate >= 80 ? 'bg-green-500' :
                              rate >= 60 ? 'bg-yellow-500' :
                              rate >= 40 ? 'bg-orange-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Traffic Sources & Device Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Top Traffic Source
                  </h3>
                  <div className="text-center py-6">
                    <div className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {selectedForm.analytics?.topSource}
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Primary lead source for this form
                    </p>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Device Breakdown
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(selectedForm.analytics?.deviceBreakdown || {}).map(([device, percentage]) => (
                      <div key={device}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {device}
                          </span>
                          <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {percentage}%
                          </span>
                        </div>
                        <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CRM Integration Stats */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-800' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      CRM & Revenue Attribution
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {Math.floor(selectedForm.submissions * 0.65)}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Leads Created
                        </div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {Math.floor(selectedForm.submissions * 0.18)}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Qualified Leads
                        </div>
                      </div>
                      <div>
                        <div className={`text-2xl font-bold mb-1 text-green-500`}>
                          ${Math.floor(selectedForm.submissions * 145).toLocaleString()}
                        </div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Revenue Generated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modern Header with Gradient */}
            <div className={`relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900' 
                : 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600'
            }`}>
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <Share2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Share Form
                      </h2>
                      <p className="text-sm text-white/90">
                        {selectedForm.name} - Create trackable shareable links with campaign tracking
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6 space-y-6">
              {/* UTM Parameters Builder */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span>UTM Parameters (Campaign Tracking)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Source *</span>
                      <div className="group relative">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                        }`}>
                          <span className="text-[10px] font-bold">i</span>
                        </div>
                        <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {campaignTrackingFields.trafficSource.tooltip}
                          </p>
                        </div>
                      </div>
                    </label>
                    <select
                      value={utmParams.source}
                      onChange={(e) => setUtmParams({ ...utmParams, source: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    >
                      <option value="">Select traffic source...</option>
                      {campaignTrackingFields.trafficSource.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Medium</span>
                      <div className="group relative">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                        }`}>
                          <span className="text-[10px] font-bold">i</span>
                        </div>
                        <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {campaignTrackingFields.marketingChannel.tooltip}
                          </p>
                        </div>
                      </div>
                    </label>
                    <select
                      value={utmParams.medium}
                      onChange={(e) => setUtmParams({ ...utmParams, medium: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    >
                      <option value="">Select marketing channel...</option>
                      {campaignTrackingFields.marketingChannel.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Campaign</span>
                      <div className="group relative">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                        }`}>
                          <span className="text-[10px] font-bold">i</span>
                        </div>
                        <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {campaignTrackingFields.campaignName.tooltip}
                          </p>
                        </div>
                      </div>
                    </label>
                    <input
                      type="text"
                      value={utmParams.campaign}
                      onChange={(e) => setUtmParams({ ...utmParams, campaign: e.target.value })}
                      placeholder="e.g., spring-sale-2026"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    />
                  </div>
                  <div>
                    <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Content</span>
                      <div className="group relative">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                        }`}>
                          <span className="text-[10px] font-bold">i</span>
                        </div>
                        <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {campaignTrackingFields.creativeVariant.tooltip}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        Optional
                      </span>
                    </label>
                    <select
                      value={utmParams.content}
                      onChange={(e) => setUtmParams({ ...utmParams, content: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    >
                      <option value="">None selected</option>
                      {campaignTrackingFields.creativeVariant.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Term</span>
                      <div className="group relative">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                          theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                        }`}>
                          <span className="text-[10px] font-bold">i</span>
                        </div>
                        <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        }`}>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {campaignTrackingFields.keywordTerm.tooltip}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                      }`}>
                        Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      value={utmParams.term}
                      onChange={(e) => setUtmParams({ ...utmParams, term: e.target.value })}
                      placeholder="e.g., lead generation software"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-900 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                    />
                  </div>
                </div>
              </div>

              {/* Embed Code Options */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <Code className="w-5 h-5 text-purple-500" />
                  <span>Embed Form on Your Website</span>
                </h3>
                
                {/* Embed Type Tabs */}
                <div className="flex items-center space-x-2 mb-4 border-b border-gray-700">
                  {[
                    { type: 'iframe', label: 'HTML / iframe', icon: '🌐' },
                    { type: 'javascript', label: 'JavaScript', icon: '⚡' },
                    { type: 'wordpress', label: 'WordPress', icon: '📦' },
                    { type: 'react', label: 'React', icon: '⚛️' }
                  ].map((tab) => (
                    <button
                      key={tab.type}
                      onClick={() => setEmbedType(tab.type)}
                      className={`px-4 py-2 text-sm font-medium transition-all ${
                        embedType === tab.type
                          ? 'border-b-2 border-cyan-500 text-cyan-500'
                          : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-1.5">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Embed Code Display */}
                <div className="relative">
                  <pre className={`p-4 rounded-lg border font-mono text-xs overflow-x-auto ${
                    theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
                  }`} style={{ maxHeight: '300px' }}>
                    <code>{generateEmbedCode(selectedForm, embedType)}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(generateEmbedCode(selectedForm, embedType))}
                    className="absolute top-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 bg-cyan-600 text-white text-xs rounded hover:bg-cyan-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </button>
                </div>

                {/* Embed Instructions */}
                <div className={`mt-4 p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'
                }`}>
                  <p className="text-xs">
                    {embedType === 'iframe' && '📋 Paste this code anywhere in your HTML to embed the form. The iframe is fully responsive.'}
                    {embedType === 'javascript' && '⚡ Add this script to your page. It automatically adjusts height as users fill the form.'}
                    {embedType === 'wordpress' && '📦 Copy and paste this shortcode into any WordPress page or post.'}
                    {embedType === 'react' && '⚛️ Import this component into your React app. Install axios if not already present.'}
                  </p>
                </div>

                {/* Live Embed Preview */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowEmbedPreview(!showEmbedPreview)}
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{showEmbedPreview ? 'Hide' : 'Show'} Live Preview</span>
                  </button>
                  
                  {showEmbedPreview && (
                    <div className={`mt-3 p-4 rounded-lg border ${
                      theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'
                    }`}>
                      <p className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        This is how your form will appear when embedded:
                      </p>
                      <iframe
                        src={`${BASE_URL}/forms/${selectedForm.id}${generateShareableUrl(selectedForm, utmParams).split('?')[1] ? '?' + generateShareableUrl(selectedForm, utmParams).split('?')[1] : ''}`}
                        className="w-full rounded border border-gray-700"
                        style={{ height: '600px' }}
                        title="Form Preview"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Generated URL Preview */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-800' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  📎 Shareable URL
                </h3>
                <div className={`p-4 rounded-lg border font-mono text-sm break-all ${
                  theme === 'dark' ? 'bg-gray-900 border-gray-700 text-cyan-400' : 'bg-white border-gray-300 text-cyan-600'
                }`}>
                  {generateShareableUrl(selectedForm, utmParams)}
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <button
                    onClick={() => copyToClipboard(generateShareableUrl(selectedForm, utmParams))}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy URL</span>
                  </button>
                  <button
                    onClick={() => window.open(generateShareableUrl(selectedForm, utmParams), '_blank')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open</span>
                  </button>
                </div>
              </div>

              {/* Share to Social Platforms */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  🚀 Share On
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => shareToSocial('facebook', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-blue-500 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Facebook
                    </span>
                  </button>
                  <button
                    onClick={() => shareToSocial('twitter', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-sky-500 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Twitter className="w-5 h-5 text-sky-500" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Twitter
                    </span>
                  </button>
                  <button
                    onClick={() => shareToSocial('linkedin', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-blue-700 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      LinkedIn
                    </span>
                  </button>
                  <button
                    onClick={() => shareToSocial('whatsapp', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-green-500 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      WhatsApp
                    </span>
                  </button>
                  <button
                    onClick={() => shareToSocial('telegram', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-blue-400 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Send className="w-5 h-5 text-blue-400" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Telegram
                    </span>
                  </button>
                  <button
                    onClick={() => shareToSocial('email', generateShareableUrl(selectedForm, utmParams), selectedForm.name)}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all hover:border-orange-500 ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-white'
                    }`}
                  >
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Email
                    </span>
                  </button>
                </div>
              </div>

              {/* Tracking Information */}
              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      What Gets Tracked?
                    </h4>
                    <ul className={`space-y-1 text-sm ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li>✅ UTM Parameters (source, medium, campaign, term, content)</li>
                      <li>✅ Submission Timestamp (date & time)</li>
                      <li>✅ IP Address {formConfig.settings.gdprCompliant && '(GDPR-compliant, masked)'}</li>
                      <li>✅ Device Type (desktop, mobile, tablet)</li>
                      <li>✅ Browser & User Agent</li>
                      <li>✅ Referrer URL</li>
                      <li>✅ Geographic Location (country-level)</li>
                      <li>✅ Form Completion Time</li>
                    </ul>
                    <p className={`mt-3 text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      All tracking data is automatically captured and stored in the CRM for complete form-to-revenue attribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source Configuration Modal */}
      {showSourceConfig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Source Configuration
                </h2>
                <button 
                  onClick={() => setShowSourceConfig(false)}
                  className="p-2 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Default Lead Source
                </label>
                <select
                  value={formConfig.settings.sourceConfig.sourceType}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      sourceConfig: {
                        ...formConfig.settings.sourceConfig,
                        sourceType: e.target.value
                      }
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                >
                  {sourceTypes.map((source) => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  This will be the default source unless overridden by UTM parameters
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formConfig.settings.sourceConfig.domainDetection}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        sourceConfig: {
                          ...formConfig.settings.sourceConfig,
                          domainDetection: e.target.checked
                        }
                      }
                    })}
                    className="rounded"
                  />
                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Automatic Domain Detection
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Captures the domain name from embedded form pages
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formConfig.settings.sourceConfig.allowUtmOverride}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        sourceConfig: {
                          ...formConfig.settings.sourceConfig,
                          allowUtmOverride: e.target.checked
                        }
                      }
                    })}
                    className="rounded"
                  />
                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Allow UTM Override
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      UTM source parameters will override the default source
                    </div>
                  </div>
                </label>
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Source Attribution Priority
                    </p>
                    <ol className={`text-xs space-y-1 list-decimal list-inside ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li>UTM Source (if present and override enabled)</li>
                      <li>Shared Form Link (for public URLs)</li>
                      <li>Domain Detection (if enabled)</li>
                      <li>Default Source (configured above)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => setShowSourceConfig(false)}
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700"
                >
                  Save Configuration
                </button>
                <button
                  onClick={() => setShowSourceConfig(false)}
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Tracking Configuration Modal */}
      {showCampaignTracking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Header */}
            <div className={`sticky top-0 z-10 p-6 border-b ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-900 to-blue-900 border-gray-800' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Campaign Tracking Setup
                    </h2>
                    <p className="text-sm text-white/80 mt-1">
                      Configure marketing attribution for this form
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCampaignTracking(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Info Banner */}
              <div className={`p-4 rounded-xl border-2 ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Smart Attribution Tracking
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Track where your leads come from and which marketing efforts work best. All data is automatically captured and available in your CRM and analytics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Traffic Source */}
              <div>
                <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{campaignTrackingFields.trafficSource.label}</span>
                  <div className="group relative">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                    }`}>
                      <span className="text-[10px] font-bold">i</span>
                    </div>
                    <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {campaignTrackingFields.trafficSource.tooltip}
                      </p>
                    </div>
                  </div>
                </label>
                <select
                  value={formConfig.settings.campaignTracking?.trafficSource || ''}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        trafficSource: e.target.value
                      }
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option value="">Select traffic source...</option>
                  {campaignTrackingFields.trafficSource.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Marketing Channel */}
              <div>
                <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{campaignTrackingFields.marketingChannel.label} *</span>
                  <div className="group relative">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                    }`}>
                      <span className="text-[10px] font-bold">i</span>
                    </div>
                    <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {campaignTrackingFields.marketingChannel.tooltip}
                      </p>
                    </div>
                  </div>
                </label>
                <select
                  value={formConfig.settings.campaignTracking?.marketingChannel || ''}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        marketingChannel: e.target.value
                      }
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  required
                >
                  <option value="">Select marketing channel...</option>
                  {campaignTrackingFields.marketingChannel.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Campaign Name - Auto-populated */}
              <div>
                <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{campaignTrackingFields.campaignName.label} *</span>
                  <div className="group relative">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                    }`}>
                      <span className="text-[10px] font-bold">i</span>
                    </div>
                    <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {campaignTrackingFields.campaignName.tooltip}
                      </p>
                    </div>
                  </div>
                </label>
                <div className={`px-4 py-3 rounded-lg border-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-400' 
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">
                      {formConfig.name ? formConfig.name.toLowerCase().replace(/\s+/g, '-') : 'form-campaign'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}>
                      Auto-filled
                    </span>
                  </div>
                </div>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Campaign name is automatically generated from your form name for consistent tracking.
                </p>
              </div>

              {/* Creative Variant */}
              <div>
                <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{campaignTrackingFields.creativeVariant.label}</span>
                  <div className="group relative">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                    }`}>
                      <span className="text-[10px] font-bold">i</span>
                    </div>
                    <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {campaignTrackingFields.creativeVariant.tooltip}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}>
                    Optional
                  </span>
                </label>
                <select
                  value={formConfig.settings.campaignTracking?.creativeVariant || ''}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        creativeVariant: e.target.value
                      }
                    }
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                >
                  <option value="">None selected</option>
                  {campaignTrackingFields.creativeVariant.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Keyword/Term */}
              <div>
                <label className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{campaignTrackingFields.keywordTerm.label}</span>
                  <div className="group relative">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-help ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-400 bg-gray-100'
                    }`}>
                      <span className="text-[10px] font-bold">i</span>
                    </div>
                    <div className={`absolute left-6 top-0 w-64 p-3 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 ${
                      theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {campaignTrackingFields.keywordTerm.tooltip}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}>
                    Optional
                  </span>
                </label>
                <input
                  type="text"
                  value={formConfig.settings.campaignTracking?.keywordTerm || ''}
                  onChange={(e) => setFormConfig({
                    ...formConfig,
                    settings: {
                      ...formConfig.settings,
                      campaignTracking: {
                        ...formConfig.settings.campaignTracking,
                        keywordTerm: e.target.value
                      }
                    }
                  })}
                  placeholder="e.g., summer-sale, homepage-banner, ceo-webinar"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                {['cpc', 'paid_social', 'paid_ads'].includes(formConfig.settings.campaignTracking?.marketingChannel) && (
                  <div className={`mt-2 p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      💡 Recommended for paid campaigns - helps optimize ad spend
                    </p>
                  </div>
                )}
              </div>

              {/* Auto-detection Settings */}
              <div className={`p-4 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Auto-detect Traffic Source from Referrer
                    </div>
                    <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Automatically detect source when possible (manual settings override this)
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formConfig.settings.campaignTracking?.autoDetectSource !== false}
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
                    className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-purple-600 relative cursor-pointer transition-colors
                      before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 
                      before:transition-transform checked:before:translate-x-5"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    // Auto-populate campaign name from form name
                    setFormConfig({
                      ...formConfig,
                      settings: {
                        ...formConfig.settings,
                        campaignTracking: {
                          ...formConfig.settings.campaignTracking,
                          campaignName: formConfig.name.toLowerCase().replace(/\s+/g, '-')
                        }
                      }
                    });
                    setShowCampaignTracking(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Save Campaign Tracking
                </button>
                <button
                  onClick={() => setShowCampaignTracking(false)}
                  className={`px-6 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                      : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post-Submission Configuration Modal */}
      {showPostSubmissionConfig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Post-Submission Behavior
                </h2>
                <button 
                  onClick={() => setShowPostSubmissionConfig(false)}
                  className="p-2 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Choose What Happens After Form Submission
                </label>
                <div className="space-y-3">
                  <label className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    formConfig.settings.successType === 'message'
                      ? theme === 'dark' ? 'border-cyan-500 bg-cyan-900/20' : 'border-cyan-500 bg-cyan-50'
                      : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="successType"
                      value="message"
                      checked={formConfig.settings.successType === 'message'}
                      onChange={(e) => setFormConfig({
                        ...formConfig,
                        settings: { ...formConfig.settings, successType: e.target.value }
                      })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Default Thank You Message
                      </div>
                      <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Show a system-generated success message
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    formConfig.settings.successType === 'custom'
                      ? theme === 'dark' ? 'border-cyan-500 bg-cyan-900/20' : 'border-cyan-500 bg-cyan-50'
                      : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="successType"
                      value="custom"
                      checked={formConfig.settings.successType === 'custom'}
                      onChange={(e) => setFormConfig({
                        ...formConfig,
                        settings: { ...formConfig.settings, successType: e.target.value }
                      })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Custom Thank You Message
                      </div>
                      <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Write your own personalized success message
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    formConfig.settings.successType === 'redirect'
                      ? theme === 'dark' ? 'border-cyan-500 bg-cyan-900/20' : 'border-cyan-500 bg-cyan-50'
                      : theme === 'dark' ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="successType"
                      value="redirect"
                      checked={formConfig.settings.successType === 'redirect'}
                      onChange={(e) => setFormConfig({
                        ...formConfig,
                        settings: { ...formConfig.settings, successType: e.target.value }
                      })}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Redirect to External URL
                      </div>
                      <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Send users to a custom page after submission
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom Message Input */}
              {formConfig.settings.successType === 'custom' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Custom Success Message
                  </label>
                  <textarea
                    value={formConfig.settings.customMessage}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: { ...formConfig.settings, customMessage: e.target.value }
                    })}
                    placeholder="Thank you! Your submission has been received and our team will review it shortly..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                </div>
              )}

              {/* Redirect URL Input */}
              {formConfig.settings.successType === 'redirect' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Redirect URL
                  </label>
                  <input
                    type="url"
                    value={formConfig.settings.redirectUrl}
                    onChange={(e) => setFormConfig({
                      ...formConfig,
                      settings: { ...formConfig.settings, redirectUrl: e.target.value }
                    })}
                    placeholder="https://example.com/thank-you"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                  />
                  <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Users will be redirected to this URL immediately after successful submission
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => setShowPostSubmissionConfig(false)}
                  className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700"
                >
                  Save Configuration
                </button>
                <button
                  onClick={() => setShowPostSubmissionConfig(false)}
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embed Code Modal */}
      {showEmbedModal && selectedForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            {/* Modern Header with Gradient */}
            <div className={`relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900' 
                : 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600'
            }`}>
              <div className="absolute inset-0 bg-grid-white/10"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Publish & Embed Form
                      </h2>
                      <p className="text-sm text-white/90">
                        {selectedForm.name}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowEmbedModal(false)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-140px)] overflow-y-auto p-6 space-y-6">
              {/* Hosted URL */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    🔗 Hosted Form URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(generateEmbedCode(selectedForm, 'url'))}
                      className="flex items-center space-x-1 text-xs text-cyan-500 hover:text-cyan-400"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      className="flex items-center space-x-1 text-xs text-blue-500 hover:text-blue-400"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open</span>
                    </button>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border font-mono text-sm ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}>
                  {generateEmbedCode(selectedForm, 'url')}
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <button
                    onClick={() => window.open(generateEmbedCode(selectedForm, 'url'), '_blank')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Form</span>
                  </button>
                  <button
                    onClick={() => setShowEmbedPreview(true)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                    <span>Preview Embedded</span>
                  </button>
                </div>
              </div>

              {/* iFrame Embed */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    📦 iFrame Embed Code
                  </label>
                  <button
                    onClick={() => copyToClipboard(generateEmbedCode(selectedForm, 'iframe'))}
                    className="flex items-center space-x-1 text-xs text-cyan-500 hover:text-cyan-400"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className={`p-4 rounded-lg border font-mono text-xs overflow-x-auto ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}>
                  {generateEmbedCode(selectedForm, 'iframe')}
                </div>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Works with: Static HTML, Webflow, WordPress, and most website builders
                </p>
              </div>

              {/* JavaScript Embed */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ⚡ JavaScript Embed Code
                  </label>
                  <button
                    onClick={() => copyToClipboard(generateEmbedCode(selectedForm, 'javascript'))}
                    className="flex items-center space-x-1 text-xs text-cyan-500 hover:text-cyan-400"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <div className={`p-4 rounded-lg border font-mono text-xs overflow-x-auto ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}>
                  <pre className="whitespace-pre-wrap">{generateEmbedCode(selectedForm, 'javascript')}</pre>
                </div>
                <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Works with: React, Vue, Angular, Next.js, and modern JavaScript frameworks
                </p>
              </div>

              {/* Platform-specific guides */}
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Platform-Specific Integration Guides
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['WordPress', 'Webflow', 'React', 'Next.js', 'Shopify', 'Squarespace'].map((platform) => (
                        <button
                          key={platform}
                          className={`px-3 py-1 text-xs rounded-lg border ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500'
                          }`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Embed Preview Modal */}
      {showEmbedPreview && selectedForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-6xl max-h-[90vh] flex flex-col rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Embedded Form Preview
                </h2>
                <button 
                  onClick={() => setShowEmbedPreview(false)}
                  className="p-2 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className={`max-w-4xl mx-auto p-8 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
              }`}>
                <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  This is how your form will appear when embedded
                </p>
                <div className={`bg-white rounded-lg shadow-lg overflow-hidden`}>
                  <iframe 
                    src={generateEmbedCode(selectedForm, 'url')}
                    className="w-full"
                    style={{ height: '600px', border: 'none' }}
                    title="Form Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadForms;
