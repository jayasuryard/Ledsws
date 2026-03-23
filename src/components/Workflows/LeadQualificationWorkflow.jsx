import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowWizard from './WorkflowWizard';
import { 
  Target, Mail, FormInput, Zap, Trophy, Clock, 
  Users, TrendingUp, Send, CheckCircle2, AlertCircle,
  MessageSquare, Calendar, DollarSign, Filter
} from 'lucide-react';
import useStore from '../../store/useStore';

const LeadQualificationWorkflow = ({ isOpen, onClose, businessId, theme }) => {
  const navigate = useNavigate();
  const { addEmailCampaign, addEmailAutomation, addLead, updateLead, leadScoringRules } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [workflowData, setWorkflowData] = useState({
    campaignName: '',
    businessInfo: {
      companyName: '',
      industry: '',
      website: ''
    },
    step1Form: {
      title: 'Get Started',
      description: 'Tell us about yourself',
      fields: [
        { id: 1, type: 'text', label: 'Full Name', required: true, placeholder: 'John Doe' },
        { id: 2, type: 'email', label: 'Email Address', required: true, placeholder: 'john@company.com' },
        { id: 3, type: 'tel', label: 'Phone Number', required: false, placeholder: '+1 (555) 000-0000' },
        { id: 4, type: 'text', label: 'Company Name', required: false, placeholder: 'Your Company Inc.' }
      ],
      thankYouMessage: 'Thanks! Check your email for next steps.',
      redirectUrl: ''
    },
    step2Form: {
      title: 'Tell Us About Your Needs',
      description: 'Help us understand how we can help',
      fields: [
        { id: 1, type: 'select', label: 'Budget Range', required: true, options: ['< $10k', '$10k - $50k', '$50k - $100k', '$100k+'] },
        { id: 2, type: 'select', label: 'Timeline', required: true, options: ['Immediate', '1-3 months', '3-6 months', '6+ months'] },
        { id: 3, type: 'textarea', label: 'Requirements', required: true, placeholder: 'Describe what you need...' },
        { id: 4, type: 'select', label: 'Service Interested In', required: true, options: ['Consulting', 'Implementation', 'Training', 'Support', 'All of the above'] }
      ],
      showTrigger: 'email_click', // Shows when lead clicks email link
      scoreBonus: 20
    },
    emailSequence: {
      firstEmail: {
        subject: 'Thanks for your interest! Next steps inside',
        preview: 'We received your request and want to help',
        body: `Hi {{name}},

Thanks for reaching out to {{company}}!

We're excited to learn more about your needs and show you how we can help.

To get you the best information, please take 2 minutes to answer a few quick questions:

{{step2_form_link}}

This helps us prepare a customized proposal just for you.

Best regards,
{{sender_name}}
{{company}}`,
        sendDelay: 0, // Send immediately
        trackOpen: true,
        trackClick: true
      },
      followUp1: {
        subject: 'Quick follow-up on your request',
        preview: 'Just checking in...',
        body: `Hi {{name}},

I wanted to follow up on the information I sent earlier.

Have you had a chance to review it?

{{step2_form_link}}

Let me know if you have any questions!

Best,
{{sender_name}}`,
        sendDelay: 24, // 24 hours after first email if no interaction
        trackOpen: true,
        trackClick: true
      },
      followUp2: {
        subject: 'Still interested in {{company}}?',
        preview: 'We\'re here to help',
        body: `Hi {{name}},

I haven't heard back from you, so I wanted to reach out one more time.

If you're still interested, here's that link again:

{{step2_form_link}}

If now isn't the right time, no problem! Just reply and let me know when we should reconnect.

Thanks,
{{sender_name}}`,
        sendDelay: 72, // 72 hours after first email if still no interaction
        trackOpen: true,
        trackClick: true
      }
    },
    scoringConfig: {
      emailOpen: 5,
      emailClick: 10,
      step1Submit: 15,
      step2Submit: 20,
      linkVisit: 2,
      emailReply: 25,
      thresholds: {
        interested: 30,   // Score >= 30 → "Interested"
        qualified: 60     // Score >= 60 → "Qualified" (auto-create deal)
      }
    },
    automationSettings: {
      enabled: true,
      stopOnReply: true,
      stopOnUnsubscribe: true,
      coldLeadThreshold: 168, // 7 days no interaction → "Cold"
      autoAssignToSales: true,
      createDealOnQualified: true,
      notifyOnQualified: true
    },
    dealSettings: {
      defaultStage: 'New Deal',
      defaultValue: 0,
      assignToTeam: true,
      createTask: true,
      taskDescription: 'Call lead to discuss requirements'
    }
  });

  const steps = [
    // Step 1: Campaign Setup
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Name Your Lead Qualification Campaign
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This will help you track and manage this automation
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Campaign Name *
            </label>
            <input
              type="text"
              value={workflowData.campaignName}
              onChange={(e) => setWorkflowData({ ...workflowData, campaignName: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="e.g., Q1 2026 Lead Gen, Spring Product Launch, Service Inquiries"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Company Name *
              </label>
              <input
                type="text"
                value={workflowData.businessInfo.companyName}
                onChange={(e) => setWorkflowData({ 
                  ...workflowData, 
                  businessInfo: { ...workflowData.businessInfo, companyName: e.target.value }
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="Your Company Inc."
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Industry
              </label>
              <input
                type="text"
                value={workflowData.businessInfo.industry}
                onChange={(e) => setWorkflowData({ 
                  ...workflowData, 
                  businessInfo: { ...workflowData.businessInfo, industry: e.target.value }
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="e.g., SaaS, Consulting, E-commerce"
              />
            </div>
          </div>

          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
            <div className="flex items-start space-x-3">
              <Zap className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  What This Automation Does
                </h4>
                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✅ Creates a 2-step lead capture + qualification system</li>
                  <li>✅ Sends automated follow-up emails based on behavior</li>
                  <li>✅ Tracks lead score and updates status automatically</li>
                  <li>✅ Creates Deal + assigns to Sales when lead is qualified</li>
                  <li>✅ Handles cold leads by moving them to nurture campaigns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 2: Configure Step-1 Form (Initial Lead Capture)
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Step-1 Form: Initial Lead Capture
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This is the first form leads will fill out. Keep it simple to maximize conversions.
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Form Title
            </label>
            <input
              type="text"
              value={workflowData.step1Form.title}
              onChange={(e) => setWorkflowData({ 
                ...workflowData, 
                step1Form: { ...workflowData.step1Form, title: e.target.value }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Get Started"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Form Description
            </label>
            <input
              type="text"
              value={workflowData.step1Form.description}
              onChange={(e) => setWorkflowData({ 
                ...workflowData, 
                step1Form: { ...workflowData.step1Form, description: e.target.value }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Form Fields</h4>
              <div className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}>
                {workflowData.step1Form.fields.length} fields
              </div>
            </div>
            <div className="space-y-2">
              {workflowData.step1Form.fields.map((field, index) => (
                <div key={field.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-center space-x-3">
                    <FormInput className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {field.label}
                      </div>
                      <div className="text-xs text-gray-500">{field.type} • {field.required ? 'Required' : 'Optional'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-800/30' : 'bg-blue-50 border-blue-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              💡 <strong>Pro Tip:</strong> Keep Step-1 simple (Name + Email minimum). You'll collect more details in Step-2 after they're engaged.
            </div>
          </div>
        </div>
      )
    },

    // Step 3: Configure Step-2 Form (Qualification Questions)
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Step-2 Form: Qualification Questions
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This form is shown to engaged leads to gather qualification details (Budget, Timeline, Requirements)
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Form Title
            </label>
            <input
              type="text"
              value={workflowData.step2Form.title}
              onChange={(e) => setWorkflowData({ 
                ...workflowData, 
                step2Form: { ...workflowData.step2Form, title: e.target.value }
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Tell Us About Your Needs"
            />
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Qualification Fields</h4>
              <div className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                +{workflowData.step2Form.scoreBonus} points on submit
              </div>
            </div>
            <div className="space-y-2">
              {workflowData.step2Form.fields.map((field, index) => (
                <div key={field.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-center space-x-3">
                    <Filter className="w-4 h-4 text-purple-500" />
                    <div>
                      <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {field.label}
                      </div>
                      <div className="text-xs text-gray-500">{field.type} • {field.required ? 'Required' : 'Optional'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-purple-900/20 border-purple-800/30' : 'bg-purple-50 border-purple-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              🎯 <strong>When Step-2 is shown:</strong> After lead clicks link in first email OR after {workflowData.emailSequence.firstEmail.sendDelay || 0} hours
            </div>
          </div>
        </div>
      )
    },

    // Step 4: Email Sequence Configuration
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Automated Email Sequence
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              These emails will be sent automatically based on lead behavior
            </p>
          </div>

          {/* First Email */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}>
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Email #1: Welcome & Next Steps
                </h4>
                <div className="text-xs text-gray-500">Sent immediately after Step-1 form submission</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Subject Line
                </label>
                <input
                  type="text"
                  value={workflowData.emailSequence.firstEmail.subject}
                  onChange={(e) => setWorkflowData({ 
                    ...workflowData, 
                    emailSequence: { 
                      ...workflowData.emailSequence, 
                      firstEmail: { ...workflowData.emailSequence.firstEmail, subject: e.target.value }
                    }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div className={`p-3 rounded-lg text-xs font-mono ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
                <div className="line-clamp-3">{workflowData.emailSequence.firstEmail.body}</div>
              </div>
            </div>
          </div>

          {/* Follow-up 1 */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Email #2: Follow-Up
                </h4>
                <div className="text-xs text-gray-500">Sent after {workflowData.emailSequence.followUp1.sendDelay}h if no interaction</div>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={workflowData.emailSequence.followUp1.subject}
                onChange={(e) => setWorkflowData({ 
                  ...workflowData, 
                  emailSequence: { 
                    ...workflowData.emailSequence, 
                    followUp1: { ...workflowData.emailSequence.followUp1, subject: e.target.value }
                  }
                })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>

          {/* Follow-up 2 */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Email #3: Last Chance
                </h4>
                <div className="text-xs text-gray-500">Sent after {workflowData.emailSequence.followUp2.sendDelay}h if still no interaction</div>
              </div>
            </div>
            <div>
              <input
                type="text"
                value={workflowData.emailSequence.followUp2.subject}
                onChange={(e) => setWorkflowData({ 
                  ...workflowData, 
                  emailSequence: { 
                    ...workflowData.emailSequence, 
                    followUp2: { ...workflowData.emailSequence.followUp2, subject: e.target.value }
                  }
                })}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>
        </div>
      )
    },

    // Step 5: Scoring & Qualification Rules
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Lead Scoring & Qualification Rules
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Configure how leads are scored and when they're automatically qualified
            </p>
          </div>

          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Trophy className="w-5 h-5 inline mr-2 text-yellow-500" />
              Point Values
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email Opened
                </label>
                <input
                  type="number"
                  value={workflowData.scoringConfig.emailOpen}
                  onChange={(e) => setWorkflowData({ 
                    ...workflowData, 
                    scoringConfig: { ...workflowData.scoringConfig, emailOpen: parseInt(e.target.value) }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Email Clicked
                </label>
                <input
                  type="number"
                  value={workflowData.scoringConfig.emailClick}
                  onChange={(e) => setWorkflowData({ 
                    ...workflowData, 
                    scoringConfig: { ...workflowData.scoringConfig, emailClick: parseInt(e.target.value) }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Step-1 Form Submitted
                </label>
                <input
                  type="number"
                  value={workflowData.scoringConfig.step1Submit}
                  onChange={(e) => setWorkflowData({ 
                    ...workflowData, 
                    scoringConfig: { ...workflowData.scoringConfig, step1Submit: parseInt(e.target.value) }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Step-2 Form Submitted
                </label>
                <input
                  type="number"
                  value={workflowData.scoringConfig.step2Submit}
                  onChange={(e) => setWorkflowData({ 
                    ...workflowData, 
                    scoringConfig: { ...workflowData.scoringConfig, step2Submit: parseInt(e.target.value) }
                  })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Target className="w-5 h-5 inline mr-2 text-green-500" />
              Status Thresholds
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    "Interested" Threshold
                  </label>
                  <input
                    type="number"
                    value={workflowData.scoringConfig.thresholds.interested}
                    onChange={(e) => setWorkflowData({ 
                      ...workflowData, 
                      scoringConfig: { 
                        ...workflowData.scoringConfig, 
                        thresholds: { ...workflowData.scoringConfig.thresholds, interested: parseInt(e.target.value) }
                      }
                    })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <div className="text-xs mt-1 text-gray-500">Score ≥ this → Status = "Interested"</div>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    "Qualified" Threshold
                  </label>
                  <input
                    type="number"
                    value={workflowData.scoringConfig.thresholds.qualified}
                    onChange={(e) => setWorkflowData({ 
                      ...workflowData, 
                      scoringConfig: { 
                        ...workflowData.scoringConfig, 
                        thresholds: { ...workflowData.scoringConfig.thresholds, qualified: parseInt(e.target.value) }
                      }
                    })}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  <div className="text-xs mt-1 text-gray-500">Score ≥ this → Status = "Qualified" + Create Deal</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-green-900/20 border-green-800/30' : 'bg-green-50 border-green-200'}`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              ✅ <strong>Auto-Qualification:</strong> When score reaches {workflowData.scoringConfig.thresholds.qualified}, lead is marked "Qualified", a Deal is created, and your sales team is notified.
            </div>
          </div>
        </div>
      )
    },

    // Step 6: Review & Launch
    {
      component: () => (
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Review & Launch Campaign
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Review your settings and activate the automation
            </p>
          </div>

          {/* Campaign Summary */}
          <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/30' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}>
            <h4 className={`font-bold text-lg mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {workflowData.campaignName || 'Untitled Campaign'}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Company</div>
                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {workflowData.businessInfo.companyName || 'Not set'}
                </div>
              </div>
              <div>
                <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Industry</div>
                <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {workflowData.businessInfo.industry || 'Not set'}
                </div>
              </div>
            </div>
          </div>

          {/* Automation Flow Preview */}
          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Automation Flow
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Lead fills Step-1 Form</div>
                  <div className="text-sm text-gray-500">Status: New • Score: 0 → {workflowData.scoringConfig.step1Submit}</div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>First Email Sent (Immediately)</div>
                  <div className="text-sm text-gray-500">Tracked: Opens (+{workflowData.scoringConfig.emailOpen}) & Clicks (+{workflowData.scoringConfig.emailClick})</div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>If Email Clicked → Show Step-2 Form</div>
                  <div className="text-sm text-gray-500">Score: +{workflowData.scoringConfig.step2Submit} on submit • Status: Engaged</div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">4</div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Follow-Up Emails (If Needed)</div>
                  <div className="text-sm text-gray-500">After {workflowData.emailSequence.followUp1.sendDelay}h & {workflowData.emailSequence.followUp2.sendDelay}h</div>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-gray-300 h-6"></div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">5</div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Score ≥ {workflowData.scoringConfig.thresholds.qualified} → Qualified!</div>
                  <div className="text-sm text-gray-500">Auto-create Deal • Assign to Sales • Send Notification</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'bg-green-900/20 border-green-800/30' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className={`w-5 h-5 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
              <div className="flex-1">
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Ready to Launch!
                </h4>
                <ul className={`text-sm space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>✅ {workflowData.step1Form.fields.length}-field lead capture form ready</li>
                  <li>✅ {workflowData.step2Form.fields.length}-question qualification form configured</li>
                  <li>✅ 3-email sequence with smart timing</li>
                  <li>✅ Automatic lead scoring & status updates</li>
                  <li>✅ Deal creation when score ≥ {workflowData.scoringConfig.thresholds.qualified}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleComplete = async () => {
    setIsProcessing(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create the automation in the system
    const automationId = Date.now();
    const automation = {
      id: automationId,
      name: workflowData.campaignName,
      type: 'lead_qualification',
      status: 'active',
      businessId: parseInt(businessId),
      config: workflowData,
      createdAt: new Date().toISOString(),
      stats: {
        leadsGenerated: 0,
        emailsSent: 0,
        formsSubmitted: 0,
        qualified: 0,
        dealsCreated: 0
      }
    };

    addEmailAutomation(automation);

    setIsProcessing(false);
    
    alert(`🎉 ${workflowData.campaignName} is now LIVE!

✅ Lead capture form created
✅ Email automation activated
✅ Lead scoring configured
✅ Deal pipeline connected

Next Steps:
1. Share your form link with prospects
2. Monitor leads in CRM Pipeline
3. Watch qualified leads flow to your sales team!

Form URL: yoursite.com/form/${automationId}
Embed Code: Available in Lead Forms section`);

    onClose();
    navigate(`/business/${businessId}/crm`);
  };

  return (
    <WorkflowWizard
      isOpen={isOpen}
      onClose={onClose}
      workflowName="Lead Qualification Campaign"
      workflowDescription="Automated lead capture → qualification → deal creation system"
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      onComplete={handleComplete}
      isProcessing={isProcessing}
      theme={theme}
      canProceed={currentStep === 0 ? workflowData.campaignName && workflowData.businessInfo.companyName : true}
    />
  );
};

export default LeadQualificationWorkflow;
