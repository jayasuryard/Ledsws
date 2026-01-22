import React, { useState } from 'react';
import { ArrowLeft, Zap, Clock, TrendingUp, Users, Target, MessageSquare, Search, BarChart3, Play, CheckCircle, Sparkles, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../store/useStore';
import InboundLeadCaptureWorkflow from '../../components/Workflows/InboundLeadCaptureWorkflow';
import SocialContentToLeadFormWorkflow from '../../components/Workflows/SocialContentToLeadFormWorkflow';
import LocalBusinessLeadBoosterWorkflow from '../../components/Workflows/LocalBusinessLeadBoosterWorkflow';
import CampaignLaunchWorkflow from '../../components/Workflows/CampaignLaunchWorkflow';
import MissedLeadRecoveryWorkflow from '../../components/Workflows/MissedLeadRecoveryWorkflow';
import ContentThatConvertsWorkflow from '../../components/Workflows/ContentThatConvertsWorkflow';

const Workflows = () => {
  const { businessId } = useParams();
  const { theme } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [activeWorkflowId, setActiveWorkflowId] = useState(null);

  const launchWorkflow = (workflowId) => {
    setActiveWorkflowId(workflowId);
    setSelectedWorkflow(null); // Close detail modal if open
  };

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Workflows', icon: Zap },
    { id: 'leads', label: 'Get Leads', icon: TrendingUp },
    { id: 'followup', label: 'Follow Up', icon: Users },
    { id: 'analyze', label: 'Analyze & Improve', icon: BarChart3 }
  ];

  // Ready-to-use workflows
  const workflows = [
    {
      id: 1,
      name: 'Inbound Lead Capture & Follow-Up',
      category: 'leads',
      description: 'Never lose an inbound lead again',
      fullDescription: 'Complete system for capturing leads from your website and following up systematically. Get a pre-built form, CRM pipeline, and tracking dashboard.',
      timeToLaunch: '15 minutes',
      tools: ['Lead Forms', 'CRM', 'Analytics'],
      toolIcons: ['📋', '🎯', '📊'],
      outcome: 'Never lose an inbound lead again',
      isPremium: false,
      badge: '🔥 Most Popular',
      features: [
        'Optimized lead capture form template',
        'Automatic lead source tagging',
        'Pre-configured CRM pipeline stages',
        'Follow-up reminder system',
        'Unified analytics tracking'
      ],
      steps: [
        'Select your industry type',
        'Customize form fields (optional)',
        'Get your form link & embed code',
        'Start tracking leads in CRM',
        'Monitor performance in analytics'
      ]
    },
    {
      id: 2,
      name: 'Social Content → Lead Form',
      category: 'leads',
      description: 'Turn social posts into actual leads, not just likes',
      fullDescription: 'Create engaging social content with AI, schedule posts automatically, and direct followers to optimized lead forms. Track which posts generate the most leads.',
      timeToLaunch: '20 minutes',
      tools: ['AI Content', 'Social Media', 'Lead Forms', 'Analytics'],
      toolIcons: ['🤖', '📱', '📋', '📊'],
      outcome: 'Turn social posts into actual leads, not just likes',
      isPremium: false,
      badge: '⚡ High Impact',
      features: [
        'AI-generated social posts (5-10 posts)',
        'Built-in CTA link to lead form',
        'Automatic post scheduling',
        'Track form submissions by social source',
        'Performance analytics by platform'
      ],
      steps: [
        'Generate content with AI',
        'Review and customize posts',
        'Create matching lead form',
        'Schedule posts across platforms',
        'Track conversions in analytics'
      ]
    },
    {
      id: 3,
      name: 'Local Business Lead Booster',
      category: 'leads',
      description: 'Get more local inquiries without running ads',
      fullDescription: 'Perfect for service businesses. Get a local-optimized lead form, SEO recommendations, and content ideas to attract nearby customers.',
      timeToLaunch: '25 minutes',
      tools: ['Lead Forms', 'SEO Audit', 'AI Content', 'CRM'],
      toolIcons: ['📋', '🔍', '🤖', '🎯'],
      outcome: 'Get more local inquiries without running ads',
      isPremium: false,
      badge: '📍 Local Focus',
      features: [
        'Local-optimized lead form (Name, Phone, Service, Location)',
        'SEO audit snapshot for local search',
        'Content suggestions based on SEO gaps',
        'Simple follow-up tracking',
        'Local competitor insights'
      ],
      steps: [
        'Enter your service area',
        'Get local SEO recommendations',
        'Create location-specific form',
        'Generate local content ideas',
        'Start capturing local leads'
      ]
    },
    {
      id: 4,
      name: 'Campaign Launch in 30 Minutes',
      category: 'leads',
      description: 'Launch a real campaign today, not next week',
      fullDescription: 'Speed equals value. Set up a complete marketing campaign with content, forms, and tracking in under 30 minutes.',
      timeToLaunch: '30 minutes',
      tools: ['AI Content', 'Social Media', 'Lead Forms', 'Analytics'],
      toolIcons: ['🤖', '📱', '📋', '📊'],
      outcome: 'Launch a real campaign today, not next week',
      isPremium: false,
      badge: '⚡ Quick Launch',
      features: [
        'Guided campaign setup wizard',
        'AI-generated campaign content',
        'Scheduled social posts',
        'Campaign-specific lead form',
        'Real-time campaign analytics'
      ],
      steps: [
        'Pick your campaign goal',
        'Generate campaign content',
        'Schedule posts',
        'Publish lead form',
        'Track results live'
      ]
    },
    {
      id: 5,
      name: 'Missed Lead Recovery',
      category: 'followup',
      description: 'Stop leaving money on the table',
      fullDescription: 'Automatically identify leads that haven\'t been contacted and flag them for follow-up. Simple but powerful.',
      timeToLaunch: '10 minutes',
      tools: ['CRM', 'Analytics', 'Inbox'],
      toolIcons: ['🎯', '📊', '📥'],
      outcome: 'Stop leaving money on the table',
      isPremium: false,
      badge: '💰 Revenue Recovery',
      features: [
        'Identify leads not contacted within X hours',
        'Automatic flagging in CRM',
        'Dashboard priority view',
        'Follow-up sequence suggestions',
        'Recovery rate tracking'
      ],
      steps: [
        'Set your follow-up timeframe',
        'Review missed leads dashboard',
        'Enable automatic flagging',
        'Get follow-up reminders',
        'Track recovery success rate'
      ]
    },
    {
      id: 6,
      name: 'Content That Converts (AI-Guided)',
      category: 'analyze',
      description: 'Content with a purpose, not filler',
      fullDescription: 'AI-powered content creation focused on conversion. Every piece of content is designed to drive a specific action.',
      timeToLaunch: '15 minutes',
      tools: ['AI Content', 'Lead Forms', 'Social Media'],
      toolIcons: ['🤖', '📋', '📱'],
      outcome: 'Content with a purpose, not filler',
      isPremium: false,
      badge: '✨ AI-Powered',
      features: [
        'AI asks targeted questions about audience',
        'Generates content with clear CTA',
        'Creates matching form headline',
        'Platform-optimized formatting',
        'A/B testing suggestions'
      ],
      steps: [
        'Define your target audience',
        'Specify your offer/goal',
        'Choose destination (form/page)',
        'Generate conversion-focused content',
        'Deploy and track performance'
      ]
    }
  ];

  // Filter workflows
  const filteredWorkflows = selectedCategory === 'all' 
    ? workflows 
    : workflows.filter(w => w.category === selectedCategory);

  const getColorClass = (color) => {
    const colors = {
      leads: 'from-blue-500 to-cyan-500',
      followup: 'from-purple-500 to-pink-500',
      analyze: 'from-green-500 to-emerald-500',
      default: 'from-blue-500 to-purple-500'
    };
    return colors[color] || colors.default;
  };

  const WorkflowCard = ({ workflow }) => (
    <div
      onClick={() => setSelectedWorkflow(workflow)}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
          : 'bg-white border-gray-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
      }`}
    >
      {/* Badge */}
      {workflow.badge && (
        <div className="mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}>
            {workflow.badge}
          </span>
        </div>
      )}

      {/* Workflow Name */}
      <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {workflow.name}
      </h3>

      {/* Description */}
      <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {workflow.description}
      </p>

      {/* Tools Used */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
          Uses:
        </span>
        {workflow.toolIcons.map((icon, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span>{icon}</span>
            <span>{workflow.tools[idx]}</span>
          </div>
        ))}
      </div>

      {/* Time & Outcome */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {workflow.timeToLaunch}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            launchWorkflow(workflow.id);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          theme === 'dark'
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
          <Play className="w-4 h-4" />
          Launch
        </button>
      </div>
    </div>
  );

  const WorkflowDetailModal = ({ workflow, onClose }) => {
    if (!workflow) return null;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`relative overflow-hidden bg-gradient-to-br ${getColorClass(workflow.category)}`}>
            <div className="relative p-8">
              <div className="flex items-start justify-between">
                <div>
                  {workflow.badge && (
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white mb-3">
                      {workflow.badge}
                    </span>
                  )}
                  <h2 className="text-3xl font-bold text-white mb-2">{workflow.name}</h2>
                  <p className="text-white/90 text-lg">{workflow.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-200px)] overflow-y-auto p-6 space-y-6">
            {/* Overview */}
            <div>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {workflow.fullDescription}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <Clock className="w-5 h-5 text-blue-500 mb-2" />
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Time to Launch
                </div>
                <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.timeToLaunch}
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <Zap className="w-5 h-5 text-yellow-500 mb-2" />
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tools Connected
                </div>
                <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {workflow.tools.length}
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <Target className="w-5 h-5 text-green-500 mb-2" />
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Success Rate
                </div>
                <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  High
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Sparkles className="w-5 h-5 text-blue-500" />
                What You Get
              </h3>
              <div className="space-y-2">
                {workflow.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-800' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Play className="w-5 h-5 text-purple-500" />
                How It Works
              </h3>
              <div className="space-y-3">
                {workflow.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-sm pt-0.5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcome */}
            <div className={`p-5 rounded-xl border-2 ${
              theme === 'dark' ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Target className="w-5 h-5 text-green-500" />
                Expected Outcome
              </h3>
              <p className={`text-base font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                "{workflow.outcome}"
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <button 
              onClick={() => {
                onClose();
                launchWorkflow(workflow.id);
              }}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }`}>
              <span className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Launch This Workflow
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <Link
          to={`/business/${businessId}`}
          className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Business Workspace</span>
        </Link>
        <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Workflows</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready Workflows
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Pre-built growth playbooks. Choose a goal → we set up the system → you execute.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className={`p-6 rounded-2xl border-2 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800'
          : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Zap className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What are Ready Workflows?
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Pre-configured systems that connect your existing tools, reduce decision fatigue, and deliver measurable results fast. 
              No complex setup—just pick a goal and we'll guide you through the rest.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
      </div>

      {/* Empty State */}
      {filteredWorkflows.length === 0 && (
        <div className={`text-center py-12 rounded-2xl border-2 border-dashed ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No workflows found in this category
          </p>
        </div>
      )}

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <WorkflowDetailModal
          workflow={selectedWorkflow}
          onClose={() => setSelectedWorkflow(null)}
        />
      )}

      {/* Workflow Wizards */}
      {activeWorkflowId === 1 && (
        <InboundLeadCaptureWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}

      {activeWorkflowId === 2 && (
        <SocialContentToLeadFormWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}

      {activeWorkflowId === 3 && (
        <LocalBusinessLeadBoosterWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}

      {activeWorkflowId === 4 && (
        <CampaignLaunchWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}

      {activeWorkflowId === 5 && (
        <MissedLeadRecoveryWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}

      {activeWorkflowId === 6 && (
        <ContentThatConvertsWorkflow
          isOpen={true}
          onClose={() => setActiveWorkflowId(null)}
          businessId={businessId}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Workflows;
