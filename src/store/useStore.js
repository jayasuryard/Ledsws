// Global State Management for LeadFlexUp
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // User & Auth
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),

      // Businesses
      businesses: [],
      activeBusiness: null,
      addBusiness: (business) => set((state) => ({
        businesses: [...state.businesses, { ...business, id: Date.now() }]
      })),
      selectBusiness: (businessId) => set((state) => ({
        activeBusiness: state.businesses.find(b => b.id === businessId)
      })),
      updateBusiness: (businessId, updates) => set((state) => ({
        businesses: state.businesses.map(b => b.id === businessId ? { ...b, ...updates } : b)
      })),
      deleteBusiness: (businessId) => set((state) => ({
        businesses: state.businesses.filter(b => b.id !== businessId),
        activeBusiness: state.activeBusiness?.id === businessId ? null : state.activeBusiness
      })),

      // Global Analytics
      globalAnalytics: {
        weeklyLeads: 0,
        totalRevenue: 0,
        campaignsCreated: 0,
        conversionRate: 0,
        aiTokensUsed: 0,
        roi: 0
      },
      updateGlobalAnalytics: (data) => set({ globalAnalytics: data }),

      // Leads & CRM
      leads: [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.j@techcorp.com',
          phone: '+1 (555) 123-4567',
          company: 'TechCorp Solutions',
          source: 'Website Form',
          status: 'New',
          leadScore: 85,
          campaignId: 'WCF-001',
          assignedTo: '1',
          tags: ['High-Value', 'Enterprise'],
          createdAt: '2026-01-15T10:30:00Z',
          lastContact: '2026-01-18T14:20:00Z',
          metadata: {
            formName: 'Contact Us',
            submissionType: 'Direct',
            pageUrl: 'https://yoursite.com/contact',
            utm_source: 'google',
            utm_medium: 'cpc',
            utm_campaign: 'winter_2026',
            ipAddress: '192.168.1.100',
            userAgent: 'Mozilla/5.0'
          },
          customFields: {
            industry: 'Technology',
            companySize: '500+',
            budget: '$50,000 - $100,000',
            timeline: 'Within 3 months',
            interests: 'Marketing Automation, CRM'
          },
          statusHistory: [
            { status: 'New', timestamp: '2026-01-15T10:30:00Z', changedBy: 'System' }
          ]
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'mchen@startupx.io',
          phone: '+1 (555) 234-5678',
          company: 'StartupX',
          source: 'LinkedIn',
          status: 'Qualified',
          leadScore: 92,
          campaignId: 'SMO-002',
          assignedTo: '2',
          tags: ['Qualified', 'Tech-Savvy'],
          createdAt: '2026-01-12T09:15:00Z',
          lastContact: '2026-01-19T11:45:00Z',
          metadata: {
            formName: 'Demo Request',
            submissionType: 'Social',
            pageUrl: 'https://yoursite.com/demo',
            utm_source: 'linkedin',
            utm_medium: 'social',
            utm_campaign: 'q1_outreach'
          },
          customFields: {
            industry: 'SaaS',
            companySize: '50-200',
            currentSolution: 'HubSpot',
            painPoints: 'Lead tracking, Automation'
          },
          statusHistory: [
            { status: 'New', timestamp: '2026-01-12T09:15:00Z', changedBy: 'System' },
            { status: 'Contacted', timestamp: '2026-01-13T14:30:00Z', changedBy: 'John Smith' },
            { status: 'Qualified', timestamp: '2026-01-15T16:00:00Z', changedBy: 'John Smith' }
          ]
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          email: 'emily.r@design.co',
          phone: '+1 (555) 345-6789',
          company: 'Creative Design Co',
          source: 'Email Campaign',
          status: 'Contacted',
          leadScore: 76,
          campaignId: 'EMC-003',
          assignedTo: '1',
          tags: ['Design', 'Agency'],
          createdAt: '2026-01-10T13:00:00Z',
          lastContact: '2026-01-17T10:00:00Z',
          metadata: {
            formName: 'Newsletter Signup',
            submissionType: 'Email',
            utm_source: 'newsletter',
            utm_medium: 'email',
            utm_campaign: 'jan_newsletter'
          },
          customFields: {
            industry: 'Design & Creative',
            companySize: '10-50',
            services: 'Branding, Web Design'
          },
          statusHistory: [
            { status: 'New', timestamp: '2026-01-10T13:00:00Z', changedBy: 'System' },
            { status: 'Contacted', timestamp: '2026-01-14T09:30:00Z', changedBy: 'Sarah Williams' }
          ]
        },
        {
          id: 4,
          name: 'David Park',
          email: 'd.park@consulting.com',
          phone: '+1 (555) 456-7890',
          company: 'Park Consulting Group',
          source: 'Facebook Ads',
          status: 'Qualified',
          leadScore: 88,
          campaignId: 'SMO-002',
          assignedTo: '2',
          tags: ['B2B', 'Consulting'],
          createdAt: '2026-01-08T16:45:00Z',
          lastContact: '2026-01-18T15:30:00Z',
          dealAmount: 75000,
          metadata: {
            formName: 'Consultation Request',
            submissionType: 'Social',
            utm_source: 'facebook',
            utm_medium: 'paid',
            utm_campaign: 'q1_fb_ads'
          },
          customFields: {
            industry: 'Professional Services',
            companySize: '200-500',
            budget: '$75,000+',
            decisionMaker: 'Yes'
          },
          statusHistory: [
            { status: 'New', timestamp: '2026-01-08T16:45:00Z', changedBy: 'System' },
            { status: 'Contacted', timestamp: '2026-01-09T10:00:00Z', changedBy: 'Mike Johnson' },
            { status: 'Qualified', timestamp: '2026-01-11T14:20:00Z', changedBy: 'Mike Johnson' }
          ]
        },
        {
          id: 5,
          name: 'Lisa Anderson',
          email: 'lisa@ecommerce.shop',
          phone: '+1 (555) 567-8901',
          company: 'E-Commerce Shop',
          source: 'Google Ads',
          status: 'Converted',
          leadScore: 95,
          campaignId: 'PAD-004',
          assignedTo: '1',
          tags: ['Converted', 'E-Commerce'],
          createdAt: '2025-12-20T11:00:00Z',
          lastContact: '2026-01-05T14:00:00Z',
          dealAmount: 45000,
          metadata: {
            formName: 'Free Trial Signup',
            submissionType: 'Paid',
            utm_source: 'google',
            utm_medium: 'cpc',
            utm_campaign: 'ecommerce_solutions'
          },
          customFields: {
            industry: 'E-Commerce',
            companySize: '50-200',
            monthlyRevenue: '$100k-$500k',
            platforms: 'Shopify, WooCommerce'
          },
          statusHistory: [
            { status: 'New', timestamp: '2025-12-20T11:00:00Z', changedBy: 'System' },
            { status: 'Contacted', timestamp: '2025-12-21T09:00:00Z', changedBy: 'John Smith' },
            { status: 'Qualified', timestamp: '2025-12-23T15:00:00Z', changedBy: 'John Smith' },
            { status: 'Proposal Sent', timestamp: '2025-12-28T10:00:00Z', changedBy: 'John Smith' },
            { status: 'Converted', timestamp: '2026-01-05T14:00:00Z', changedBy: 'John Smith' }
          ]
        }
      ],
      addLead: (lead) => set((state) => ({
        leads: [...state.leads, { ...lead, id: Date.now(), createdAt: new Date().toISOString() }]
      })),
      updateLead: (leadId, updates) => set((state) => ({
        leads: state.leads.map(l => l.id === leadId ? { ...l, ...updates } : l)
      })),

      // Team Members
      teamMembers: [
        { id: 1, name: 'John Smith', email: 'john@company.com', role: 'Sales Manager', avatar: '👨‍💼' },
        { id: 2, name: 'Sarah Williams', email: 'sarah@company.com', role: 'Sales Rep', avatar: '👩‍💼' },
        { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'Account Executive', avatar: '👨‍💻' }
      ],
      addTeamMember: (member) => set((state) => ({
        teamMembers: [...state.teamMembers, { ...member, id: Date.now() }]
      })),
      updateTeamMember: (memberId, updates) => set((state) => ({
        teamMembers: state.teamMembers.map(m => m.id === memberId ? { ...m, ...updates } : m)
      })),
      removeTeamMember: (memberId) => set((state) => ({
        teamMembers: state.teamMembers.filter(m => m.id !== memberId)
      })),

      // Subscription
      subscription: {
        plan: 'free',
        billingCycle: 'monthly',
        usageLimits: {
          leads: 100,
          businesses: 1,
          aiTokens: 10000,
          teamMembers: 1
        },
        currentUsage: {
          leads: 0,
          businesses: 0,
          aiTokens: 0,
          teamMembers: 0
        }
      },
      updateSubscription: (data) => set({ subscription: data }),

      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [{ ...notification, id: Date.now(), read: false }, ...state.notifications]
      })),
      markNotificationRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(n => n.id === notificationId ? { ...n, read: true } : n)
      })),
      clearNotifications: () => set({ notifications: [] }),

      // Activity Feed
      activities: [],
      addActivity: (activity) => set((state) => ({
        activities: [{ ...activity, id: Date.now(), timestamp: new Date().toISOString() }, ...state.activities].slice(0, 50)
      })),

      // Digital Business Cards
      cards: [],
      addCard: (card) => set((state) => ({
        cards: [...state.cards, { ...card, id: Date.now(), createdAt: new Date().toISOString() }]
      })),
      updateCard: (cardId, updates) => set((state) => ({
        cards: state.cards.map(c => c.id === cardId ? { ...c, ...updates } : c)
      })),
      deleteCard: (cardId) => set((state) => ({
        cards: state.cards.filter(c => c.id !== cardId)
      })),

      // Media Library (Creator Assets)
      mediaAssets: [],
      addMediaAsset: (asset) => set((state) => ({
        mediaAssets: [...state.mediaAssets, { 
          ...asset, 
          id: Date.now(), 
          createdAt: new Date().toISOString(),
          businessId: state.activeBusiness?.id 
        }]
      })),
      updateMediaAsset: (assetId, updates) => set((state) => ({
        mediaAssets: state.mediaAssets.map(a => a.id === assetId ? { ...a, ...updates } : a)
      })),
      deleteMediaAsset: (assetId) => set((state) => ({
        mediaAssets: state.mediaAssets.filter(a => a.id !== assetId)
      })),

      // Image Design Projects
      designProjects: [],
      createDesignProject: (project) => set((state) => ({
        designProjects: [...state.designProjects, { 
          ...project, 
          id: Date.now(), 
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          businessId: state.activeBusiness?.id 
        }]
      })),
      updateDesignProject: (projectId, updates) => set((state) => ({
        designProjects: state.designProjects.map(p => 
          p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        )
      })),
      deleteDesignProject: (projectId) => set((state) => ({
        designProjects: state.designProjects.filter(p => p.id !== projectId)
      })),

      // Video Edit Projects
      videoProjects: [],
      createVideoProject: (project) => set((state) => ({
        videoProjects: [...state.videoProjects, { 
          ...project, 
          id: Date.now(), 
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          businessId: state.activeBusiness?.id,
          status: 'draft'
        }]
      })),
      updateVideoProject: (projectId, updates) => set((state) => ({
        videoProjects: state.videoProjects.map(p => 
          p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        )
      })),
      deleteVideoProject: (projectId) => set((state) => ({
        videoProjects: state.videoProjects.filter(p => p.id !== projectId)
      })),

      // Render Jobs Queue
      renderJobs: [],
      addRenderJob: (job) => set((state) => ({
        renderJobs: [...state.renderJobs, { 
          ...job, 
          id: Date.now(), 
          createdAt: new Date().toISOString(),
          status: 'pending',
          progress: 0
        }]
      })),
      updateRenderJob: (jobId, updates) => set((state) => ({
        renderJobs: state.renderJobs.map(j => j.id === jobId ? { ...j, ...updates } : j)
      })),

      // AI Generations
      aiGenerations: [],
      addAIGeneration: (generation) => set((state) => ({
        aiGenerations: [...state.aiGenerations, { 
          ...generation, 
          id: Date.now(), 
          createdAt: new Date().toISOString(),
          businessId: state.activeBusiness?.id,
          status: 'pending'
        }]
      })),
      updateAIGeneration: (genId, updates) => set((state) => ({
        aiGenerations: state.aiGenerations.map(g => g.id === genId ? { ...g, ...updates } : g)
      })),

      // Design Templates
      designTemplates: [
        {
          id: 'ig-post',
          name: 'Instagram Post',
          category: 'social',
          platform: 'instagram',
          width: 1080,
          height: 1080,
          thumbnail: '📸'
        },
        {
          id: 'ig-story',
          name: 'Instagram Story',
          category: 'social',
          platform: 'instagram',
          width: 1080,
          height: 1920,
          thumbnail: '📱'
        },
        {
          id: 'linkedin-post',
          name: 'LinkedIn Post',
          category: 'social',
          platform: 'linkedin',
          width: 1200,
          height: 627,
          thumbnail: '💼'
        },
        {
          id: 'fb-post',
          name: 'Facebook Post',
          category: 'social',
          platform: 'facebook',
          width: 1200,
          height: 630,
          thumbnail: '📘'
        },
        {
          id: 'banner',
          name: 'Web Banner',
          category: 'web',
          platform: 'web',
          width: 1920,
          height: 600,
          thumbnail: '🖼️'
        },
        {
          id: 'ad-square',
          name: 'Square Ad',
          category: 'ads',
          platform: 'multi',
          width: 1080,
          height: 1080,
          thumbnail: '🎯'
        }
      ],

      // Video Templates
      videoTemplates: [
        {
          id: 'reel',
          name: 'Instagram Reel',
          category: 'short',
          platform: 'instagram',
          duration: 30,
          aspectRatio: '9:16',
          thumbnail: '🎬'
        },
        {
          id: 'short',
          name: 'YouTube Short',
          category: 'short',
          platform: 'youtube',
          duration: 60,
          aspectRatio: '9:16',
          thumbnail: '▶️'
        },
        {
          id: 'tiktok',
          name: 'TikTok Video',
          category: 'short',
          platform: 'tiktok',
          duration: 60,
          aspectRatio: '9:16',
          thumbnail: '🎵'
        },
        {
          id: 'promo',
          name: 'Promo Video',
          category: 'ad',
          platform: 'multi',
          duration: 15,
          aspectRatio: '16:9',
          thumbnail: '📺'
        },
        {
          id: 'testimonial',
          name: 'Testimonial',
          category: 'content',
          platform: 'multi',
          duration: 30,
          aspectRatio: '16:9',
          thumbnail: '⭐'
        }
      ],

      // Creator Workflows
      creatorWorkflows: [],
      addCreatorWorkflow: (workflow) => set((state) => ({
        creatorWorkflows: [...state.creatorWorkflows, {
          ...workflow,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'active'
        }]
      })),
      updateCreatorWorkflow: (workflowId, updates) => set((state) => ({
        creatorWorkflows: state.creatorWorkflows.map(w => 
          w.id === workflowId ? { ...w, ...updates } : w
        )
      })),

      // === EMAIL MARKETING & AUTOMATION ===
      
      // Email Campaigns
      emailCampaigns: [],
      addEmailCampaign: (campaign) => set((state) => ({
        emailCampaigns: [...state.emailCampaigns, {
          ...campaign,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: campaign.status || 'draft',
          stats: {
            sent: 0,
            delivered: 0,
            opened: 0,
            clicked: 0,
            bounced: 0,
            unsubscribed: 0,
            revenue: 0
          }
        }]
      })),
      updateEmailCampaign: (campaignId, updates) => set((state) => ({
        emailCampaigns: state.emailCampaigns.map(c => 
          c.id === campaignId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
        )
      })),
      deleteEmailCampaign: (campaignId) => set((state) => ({
        emailCampaigns: state.emailCampaigns.filter(c => c.id !== campaignId)
      })),

      // Email Automation Workflows (Visual Node-Based)
      emailAutomations: [],
      addEmailAutomation: (automation) => set((state) => ({
        emailAutomations: [...state.emailAutomations, {
          ...automation,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: automation.status || 'draft',
          stats: {
            enrolled: 0,
            active: 0,
            completed: 0,
            revenue: 0
          }
        }]
      })),
      updateEmailAutomation: (automationId, updates) => set((state) => ({
        emailAutomations: state.emailAutomations.map(a => 
          a.id === automationId ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
        )
      })),
      deleteEmailAutomation: (automationId) => set((state) => ({
        emailAutomations: state.emailAutomations.filter(a => a.id !== automationId)
      })),

      // Email Templates
      emailTemplates: [
        {
          id: 1,
          name: 'Welcome Email',
          category: 'Onboarding',
          subject: 'Welcome to {{company_name}}! 👋',
          previewText: 'We\'re excited to have you here',
          body: 'Hi {{first_name}},\n\nWelcome to {{company_name}}! We\'re thrilled to have you join us...',
          thumbnail: '👋',
          usage: 245
        },
        {
          id: 2,
          name: 'Product Launch',
          category: 'Promotion',
          subject: '🚀 Introducing Our Latest Product!',
          previewText: 'You\'re going to love this',
          body: 'Hey {{first_name}},\n\nWe\'re excited to announce...',
          thumbnail: '🚀',
          usage: 156
        },
        {
          id: 3,
          name: 'Newsletter',
          category: 'Newsletter',
          subject: '📰 This Month\'s Updates',
          previewText: 'What\'s new in {{month}}',
          body: 'Hi {{first_name}},\n\nHere\'s what happened this month...',
          thumbnail: '📰',
          usage: 892
        },
        {
          id: 4,
          name: 'Cart Abandonment',
          category: 'E-commerce',
          subject: '🛒 You left something behind...',
          previewText: 'Complete your purchase today',
          body: 'Hi {{first_name}},\n\nWe noticed you left items in your cart...',
          thumbnail: '🛒',
          usage: 423
        },
        {
          id: 5,
          name: 'Re-engagement',
          category: 'Re-engagement',
          subject: 'We miss you, {{first_name}}! 💙',
          previewText: 'Come back and see what\'s new',
          body: 'Hi {{first_name}},\n\nIt\'s been a while since we\'ve seen you...',
          thumbnail: '💙',
          usage: 334
        },
        {
          id: 6,
          name: 'Event Invitation',
          category: 'Event',
          subject: '🎉 You\'re Invited!',
          previewText: 'Join us for an exclusive event',
          body: 'Dear {{first_name}},\n\nWe\'re hosting an exclusive event...',
          thumbnail: '🎉',
          usage: 178
        }
      ],
      addEmailTemplate: (template) => set((state) => ({
        emailTemplates: [...state.emailTemplates, { ...template, id: Date.now(), usage: 0 }]
      })),
      updateEmailTemplate: (templateId, updates) => set((state) => ({
        emailTemplates: state.emailTemplates.map(t => t.id === templateId ? { ...t, ...updates } : t)
      })),
      deleteEmailTemplate: (templateId) => set((state) => ({
        emailTemplates: state.emailTemplates.filter(t => t.id !== templateId)
      })),

      // Lead Scoring Rules
      leadScoringRules: [
        { id: 1, name: 'Email Opened', action: 'email_open', points: 5, enabled: true },
        { id: 2, name: 'Email Clicked', action: 'email_click', points: 10, enabled: true },
        { id: 3, name: 'Form Submitted', action: 'form_submit', points: 15, enabled: true },
        { id: 4, name: 'Page Visit', action: 'page_visit', points: 2, enabled: true },
        { id: 5, name: 'Demo Requested', action: 'demo_request', points: 30, enabled: true },
        { id: 6, name: 'Proposal Opened', action: 'proposal_open', points: 20, enabled: true },
        { id: 7, name: 'Webinar Attended', action: 'webinar_attend', points: 25, enabled: true },
        { id: 8, name: 'Social Media Follow', action: 'social_follow', points: 3, enabled: true },
        { id: 9, name: 'Email Bounced', action: 'email_bounce', points: -5, enabled: true },
        { id: 10, name: 'Unsubscribed', action: 'unsubscribe', points: -20, enabled: true }
      ],
      updateLeadScoringRule: (ruleId, updates) => set((state) => ({
        leadScoringRules: state.leadScoringRules.map(r => r.id === ruleId ? { ...r, ...updates } : r)
      })),
      addLeadScoringRule: (rule) => set((state) => ({
        leadScoringRules: [...state.leadScoringRules, { ...rule, id: Date.now() }]
      })),

      // Email Events (Activity Timeline)
      emailEvents: [],
      addEmailEvent: (event) => set((state) => ({
        emailEvents: [...state.emailEvents, {
          ...event,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }]
      })),

      // Nurture Flows (Prebuilt Sequences)
      nurtureFlows: [
        {
          id: 1,
          name: 'Welcome Series',
          description: 'Onboard new subscribers with a 5-email sequence',
          status: 'active',
          enrolled: 342,
          steps: [
            { day: 0, subject: 'Welcome! Here\'s what to expect', type: 'email', opens: 315, clicks: 187 },
            { day: 2, subject: 'Getting Started Guide', type: 'email', opens: 280, clicks: 156 },
            { day: 5, subject: 'Pro Tips from Our Team', type: 'email', opens: 245, clicks: 134 },
            { day: 7, subject: 'Success Stories', type: 'email', opens: 220, clicks: 98 },
            { day: 10, subject: 'Special Offer Inside', type: 'email', opens: 198, clicks: 89 }
          ]
        },
        {
          id: 2,
          name: 'Follow-Up Sequence',
          description: 'Re-engage leads who went cold',
          status: 'active',
          enrolled: 156,
          steps: [
            { day: 0, subject: 'Quick question...', type: 'email', opens: 98, clicks: 45 },
            { day: 3, subject: 'Did you see this?', type: 'email', opens: 87, clicks: 38 },
            { day: 7, subject: 'Last chance!', type: 'email', opens: 72, clicks: 34 }
          ]
        },
        {
          id: 3,
          name: 'Re-engagement Campaign',
          description: 'Win back inactive subscribers',
          status: 'active',
          enrolled: 89,
          steps: [
            { day: 0, subject: 'We miss you!', type: 'email', opens: 56, clicks: 23 },
            { day: 5, subject: 'Here\'s what you\'ve been missing', type: 'email', opens: 45, clicks: 18 },
            { day: 10, subject: 'One last thing...', type: 'email', opens: 38, clicks: 12 }
          ]
        }
      ],

      // Simulate Email Action (for demo)
      simulateEmailAction: (leadId, actionType) => {
        const state = get();
        const lead = state.leads.find(l => l.id === leadId);
        const rule = state.leadScoringRules.find(r => r.action === actionType && r.enabled);
        
        if (!lead || !rule) return;

        // Update lead score
        const newScore = (lead.leadScore || 0) + rule.points;
        const updates = { leadScore: newScore };

        // Auto-update status based on score thresholds
        if (newScore >= 80 && lead.status === 'New') {
          updates.status = 'Qualified';
        } else if (newScore >= 50 && lead.status === 'New') {
          updates.status = 'Engaged';
        } else if (newScore < 20 && newScore >= 0) {
          updates.status = 'Cold';
        }

        state.updateLead(leadId, updates);

        // Add event
        state.addEmailEvent({
          leadId,
          leadName: lead.name,
          actionType,
          actionName: rule.name,
          points: rule.points,
          newScore
        });

        return { newScore, updates };
      },

      // Lead Qualification Automation System
      // Handles the complete flow: Form → Email → Scoring → Status → Deal Creation
      
      // Step 1: Handle Lead Form Submission (Initial Capture)
      handleStep1FormSubmit: (formData, automationId) => {
        const state = get();
        const automation = state.emailAutomations.find(a => a.id === automationId);
        
        if (!automation) return null;

        const config = automation.config;
        
        // Create new lead
        const newLead = {
          id: Date.now(),
          name: formData.name || formData.fullName || 'Unknown',
          email: formData.email,
          phone: formData.phone || '',
          company: formData.company || formData.companyName || '',
          source: config.campaignName || 'Lead Qualification Campaign',
          status: 'New',
          leadScore: config.scoringConfig.step1Submit || 15,
          campaignId: `AUTO-${automationId}`,
          assignedTo: null,
          tags: ['automation', 'step1-completed'],
          createdAt: new Date().toISOString(),
          lastContact: new Date().toISOString(),
          metadata: {
            formName: config.step1Form.title,
            submissionType: 'Automation',
            automationId,
            step1SubmittedAt: new Date().toISOString(),
            step2Shown: false
          },
          customFields: formData.customFields || {},
          statusHistory: [
            { status: 'New', timestamp: new Date().toISOString(), changedBy: 'System - Automation' }
          ]
        };

        state.addLead(newLead);

        // Add event
        state.addEmailEvent({
          leadId: newLead.id,
          leadName: newLead.name,
          actionType: 'form_submit',
          actionName: 'Step-1 Form Submitted',
          points: config.scoringConfig.step1Submit,
          newScore: newLead.leadScore,
          automationId
        });

        // Trigger first email (immediate)
        setTimeout(() => {
          state.sendAutomationEmail(newLead.id, automationId, 'firstEmail');
        }, 100);

        return newLead;
      },

      // Step 2: Send Automated Email
      sendAutomationEmail: (leadId, automationId, emailType) => {
        const state = get();
        const lead = state.leads.find(l => l.id === leadId);
        const automation = state.emailAutomations.find(a => a.id === automationId);
        
        if (!lead || !automation) return;

        const config = automation.config;
        const emailConfig = config.emailSequence[emailType];
        
        if (!emailConfig) return;

        // Add email event
        state.addEmailEvent({
          leadId,
          leadName: lead.name,
          actionType: 'email_sent',
          actionName: `Email Sent: ${emailConfig.subject}`,
          emailType,
          automationId,
          timestamp: new Date().toISOString()
        });

        // Update automation stats
        state.updateEmailAutomation(automationId, {
          stats: {
            ...automation.stats,
            emailsSent: (automation.stats.emailsSent || 0) + 1
          }
        });

        // Simulate automatic tracking (in real app, this would be triggered by user action)
        // For demo purposes, we can simulate some leads opening/clicking
        const simulateEngagement = Math.random() > 0.4; // 60% engagement rate
        
        if (simulateEngagement) {
          // Simulate email open after 5 minutes
          setTimeout(() => {
            state.handleLeadEmailAction(leadId, automationId, 'email_open', emailType);
          }, 5000);
        }
      },

      // Step 3: Handle Lead Email Actions (Open, Click, Reply)
      handleLeadEmailAction: (leadId, automationId, actionType, emailType) => {
        const state = get();
        const lead = state.leads.find(l => l.id === leadId);
        const automation = state.emailAutomations.find(a => a.id === automationId);
        
        if (!lead || !automation) return;

        const config = automation.config;
        let points = 0;
        let showStep2 = false;

        // Calculate points based on action
        switch (actionType) {
          case 'email_open':
            points = config.scoringConfig.emailOpen || 5;
            break;
          case 'email_click':
            points = config.scoringConfig.emailClick || 10;
            showStep2 = true; // Show Step-2 form when they click
            break;
          case 'email_reply':
            points = config.scoringConfig.emailReply || 25;
            showStep2 = true;
            break;
          default:
            points = 0;
        }

        // Update lead score
        const newScore = (lead.leadScore || 0) + points;
        const updates = { 
          leadScore: newScore,
          lastContact: new Date().toISOString()
        };

        // Show Step-2 form if applicable
        if (showStep2 && !lead.metadata?.step2Shown) {
          updates.metadata = {
            ...lead.metadata,
            step2Shown: true,
            step2ShownAt: new Date().toISOString()
          };
          updates.tags = [...(lead.tags || []), 'step2-shown'];
        }

        // Auto-update status based on score thresholds
        const interestedThreshold = config.scoringConfig.thresholds.interested || 30;
        const qualifiedThreshold = config.scoringConfig.thresholds.qualified || 60;

        if (newScore >= qualifiedThreshold && lead.status !== 'Qualified') {
          updates.status = 'Qualified';
          updates.statusHistory = [
            ...(lead.statusHistory || []),
            { status: 'Qualified', timestamp: new Date().toISOString(), changedBy: 'System - Auto-Qualified' }
          ];
          
          // Trigger deal creation
          setTimeout(() => {
            state.createDealFromQualifiedLead(leadId, automationId);
          }, 100);
          
        } else if (newScore >= interestedThreshold && lead.status === 'New') {
          updates.status = 'Interested';
          updates.statusHistory = [
            ...(lead.statusHistory || []),
            { status: 'Interested', timestamp: new Date().toISOString(), changedBy: 'System - Scoring' }
          ];
        }

        state.updateLead(leadId, updates);

        // Add event
        state.addEmailEvent({
          leadId,
          leadName: lead.name,
          actionType,
          actionName: `${actionType.replace('_', ' ')} - ${emailType}`,
          points,
          newScore,
          automationId
        });
      },

      // Step 4: Handle Step-2 Form Submission (Qualification)
      handleStep2FormSubmit: (leadId, formData, automationId) => {
        const state = get();
        const lead = state.leads.find(l => l.id === leadId);
        const automation = state.emailAutomations.find(a => a.id === automationId);
        
        if (!lead || !automation) return;

        const config = automation.config;
        const step2Points = config.scoringConfig.step2Submit || 20;
        const newScore = (lead.leadScore || 0) + step2Points;

        // Update lead with qualification data
        const updates = {
          leadScore: newScore,
          status: 'Engaged',
          lastContact: new Date().toISOString(),
          customFields: {
            ...lead.customFields,
            ...formData,
            step2SubmittedAt: new Date().toISOString()
          },
          metadata: {
            ...lead.metadata,
            step2Completed: true,
            step2SubmittedAt: new Date().toISOString()
          },
          tags: [...(lead.tags || []).filter(t => t !== 'step2-shown'), 'step2-completed', 'qualified-data'],
          statusHistory: [
            ...(lead.statusHistory || []),
            { status: 'Engaged', timestamp: new Date().toISOString(), changedBy: 'System - Step-2 Completed' }
          ]
        };

        // Check if now qualified
        const qualifiedThreshold = config.scoringConfig.thresholds.qualified || 60;
        if (newScore >= qualifiedThreshold) {
          updates.status = 'Qualified';
          updates.statusHistory.push({
            status: 'Qualified',
            timestamp: new Date().toISOString(),
            changedBy: 'System - Auto-Qualified'
          });

          // Trigger deal creation
          setTimeout(() => {
            state.createDealFromQualifiedLead(leadId, automationId);
          }, 100);
        }

        state.updateLead(leadId, updates);

        // Add event
        state.addEmailEvent({
          leadId,
          leadName: lead.name,
          actionType: 'form_submit',
          actionName: 'Step-2 Qualification Form Submitted',
          points: step2Points,
          newScore,
          automationId
        });

        // Update automation stats
        state.updateEmailAutomation(automationId, {
          stats: {
            ...automation.stats,
            formsSubmitted: (automation.stats.formsSubmitted || 0) + 1
          }
        });
      },

      // Deals Management
      deals: [],
      addDeal: (deal) => set((state) => ({
        deals: [...state.deals, {
          ...deal,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      })),
      updateDeal: (dealId, updates) => set((state) => ({
        deals: state.deals.map(d => 
          d.id === dealId ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
        )
      })),
      deleteDeal: (dealId) => set((state) => ({
        deals: state.deals.filter(d => d.id !== dealId)
      })),

      // Step 5: Create Deal from Qualified Lead (Automatic)
      createDealFromQualifiedLead: (leadId, automationId) => {
        const state = get();
        const lead = state.leads.find(l => l.id === leadId);
        const automation = state.emailAutomations.find(a => a.id === automationId);
        
        if (!lead || !automation) return;

        const config = automation.config;
        
        // Check if deal already exists for this lead
        const existingDeal = state.deals.find(d => d.leadId === leadId);
        if (existingDeal) return existingDeal;

        // Extract deal value from qualification form (budget field)
        let dealValue = 0;
        if (lead.customFields?.budget) {
          const budget = lead.customFields.budget;
          // Parse budget range to get estimated value
          if (budget.includes('$100k+')) dealValue = 100000;
          else if (budget.includes('$50k - $100k')) dealValue = 75000;
          else if (budget.includes('$10k - $50k')) dealValue = 30000;
          else if (budget.includes('< $10k')) dealValue = 5000;
        }

        // Create new deal
        const newDeal = {
          id: Date.now(),
          leadId: lead.id,
          leadName: lead.name,
          leadEmail: lead.email,
          company: lead.company,
          title: `${lead.company || lead.name} - ${config.campaignName}`,
          value: dealValue,
          stage: 'New Deal',
          probability: 30,
          expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          assignedTo: null, // Will be assigned by sales manager
          source: config.campaignName,
          automationId,
          tags: ['auto-created', 'qualified-lead'],
          notes: `Auto-generated from qualified lead.\n\nTimeline: ${lead.customFields?.timeline || 'Not specified'}\nRequirements: ${lead.customFields?.requirements || 'See Step-2 form'}\nService: ${lead.customFields?.serviceInterestedIn || 'Not specified'}`,
          activities: [
            {
              type: 'deal_created',
              timestamp: new Date().toISOString(),
              description: 'Deal automatically created from qualified lead',
              by: 'System'
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        state.addDeal(newDeal);

        // Update lead with deal reference
        state.updateLead(leadId, {
          dealId: newDeal.id,
          dealAmount: dealValue,
          tags: [...(lead.tags || []), 'deal-created']
        });

        // Update automation stats
        state.updateEmailAutomation(automationId, {
          stats: {
            ...automation.stats,
            qualified: (automation.stats.qualified || 0) + 1,
            dealsCreated: (automation.stats.dealsCreated || 0) + 1
          }
        });

        // Add notification
        state.addNotification({
          type: 'success',
          title: '🎉 New Qualified Lead!',
          message: `${lead.name} from ${lead.company || 'their company'} has been qualified and a deal worth $${dealValue.toLocaleString()} has been created!`,
          timestamp: new Date().toISOString()
        });

        // Add activity
        state.addActivity({
          type: 'deal_created',
          leadId,
          dealId: newDeal.id,
          leadName: lead.name,
          dealValue,
          description: `Deal created automatically for qualified lead: ${lead.name}`,
          automationId
        });

        // Add event
        state.addEmailEvent({
          leadId,
          leadName: lead.name,
          actionType: 'deal_created',
          actionName: 'Deal Created (Auto-Qualified)',
          dealValue,
          automationId
        });

        return newDeal;
      },

      // Simulate Full Lead Journey (for testing/demo)
      simulateLeadJourney: async (automationId) => {
        const state = get();
        
        // Step 1: Simulate form submission
        const lead = state.handleStep1FormSubmit({
          name: 'Demo User ' + Math.floor(Math.random() * 1000),
          email: `demo${Math.floor(Math.random() * 1000)}@example.com`,
          phone: '+1 (555) 000-0000',
          company: 'Demo Company Inc.'
        }, automationId);

        if (!lead) return;

        // Step 2: Simulate email open after 10s
        setTimeout(() => {
          state.handleLeadEmailAction(lead.id, automationId, 'email_open', 'firstEmail');
        }, 10000);

        // Step 3: Simulate email click after 20s
        setTimeout(() => {
          state.handleLeadEmailAction(lead.id, automationId, 'email_click', 'firstEmail');
        }, 20000);

        // Step 4: Simulate Step-2 form submission after 30s
        setTimeout(() => {
          state.handleStep2FormSubmit(lead.id, {
            budget: '$50k - $100k',
            timeline: '1-3 months',
            requirements: 'Looking for a complete marketing automation solution',
            serviceInterestedIn: 'Implementation'
          }, automationId);
        }, 30000);

        return lead;
      },

      // === END EMAIL MARKETING ===

      addCard: (card) => set((state) => ({
        cards: [...state.cards, {
          ...card,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          views: 0,
          shares: 0,
          qrScans: 0,
          ctaClicks: {},
          disabled: false
        }]
      })),
      updateCard: (cardId, updates) => set((state) => ({
        cards: state.cards.map(c => c.id === cardId ? { ...c, ...updates } : c)
      })),
      deleteCard: (cardId) => set((state) => ({
        cards: state.cards.filter(c => c.id !== cardId)
      })),
      trackCardInteraction: (cardId, interactionType) => {
        const state = get();
        const card = state.cards.find(c => c.id === cardId);
        
        if (!card) return;

        // Update card analytics
        const updates = {};
        
        switch (interactionType) {
          case 'view':
            updates.views = (card.views || 0) + 1;
            // Create lead on first view
            if (!card.leadCreated) {
              const newLead = {
                name: 'Anonymous Visitor',
                source: 'Digital Business Card',
                campaignId: cardId,
                status: 'New',
                leadScore: 5,
                tags: ['digital-card', `card-${cardId}`, `card-owner-${card.name}`],
                metadata: {
                  formName: 'Digital Card View',
                  cardTemplate: card.template || 'minimal'
                }
              };
              state.addLead(newLead);
              updates.leadCreated = true;
            }
            break;
          
          case 'share':
            updates.shares = (card.shares || 0) + 1;
            break;
          
          case 'qr_scan':
            updates.qrScans = (card.qrScans || 0) + 1;
            break;
          
          case 'call':
          case 'email':
          case 'website':
          case 'vcard':
          case 'whatsapp':
          case 'meeting':
            updates.ctaClicks = {
              ...card.ctaClicks,
              [interactionType]: (card.ctaClicks?.[interactionType] || 0) + 1
            };
            break;
          
          case 'form_submit':
            // Lead score update happens in PublicCardView when form is submitted
            break;
        }

        // Update card
        state.updateCard(cardId, updates);

        // Add activity
        state.addActivity({
          type: 'card_interaction',
          cardId,
          cardName: card.name,
          interactionType,
          description: `Digital card interaction: ${interactionType}`
        });
      },
    }),
    {
      name: 'leadflexup-storage',
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        theme: 'light',
      }),
    }
  )
);

export default useStore;
