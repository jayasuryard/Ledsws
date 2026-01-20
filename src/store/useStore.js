// Global State Management for LeadFlexUp
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
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
    }
  )
);

export default useStore;
