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
      leads: [],
      addLead: (lead) => set((state) => ({
        leads: [...state.leads, { ...lead, id: Date.now(), createdAt: new Date().toISOString() }]
      })),
      updateLead: (leadId, updates) => set((state) => ({
        leads: state.leads.map(l => l.id === leadId ? { ...l, ...updates } : l)
      })),

      // Team Members
      teamMembers: [],
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
    }),
    {
      name: 'leadflexup-storage',
    }
  )
);

export default useStore;
