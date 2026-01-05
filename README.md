# LeadFlexUp - Modern SaaS Lead Generation Platform

![LeadFlexUp](https://img.shields.io/badge/LeadFlexUp-v1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC)

**Enterprise-grade lead generation platform built for SMEs & SMBs**

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✨ Key Features

### User Journey
1. **Frictionless Registration** - Quick signup with minimal friction
2. **Onboarding Wizard** - 4-step guided setup for first business
3. **Global Dashboard** - Real-time KPIs and executive overview
4. **Multi-Business Management** - Create and manage multiple businesses
5. **AI Content Studio** - Generate blogs, social posts, e-commerce copy
6. **CRM Pipeline** - Drag-and-drop lead management
7. **Team Management** - Role-based access control
8. **Dark/Light Mode** - Full theme support

### Core Modules

#### 📊 Global Dashboard
- Aggregate revenue tracking
- Active business count
- Weekly leads generated
- Conversion rate metrics
- Live activity feed
- Quick action CTAs

#### 🏢 Business Workspace
- Create multiple business profiles
- Individual dashboards per business
- Business-specific analytics
- Custom branding per profile

#### 🤖 AI Content Studio
- Blog post generation
- Social media content (Instagram, Facebook, LinkedIn)
- E-commerce product descriptions
- Brand voice integration

#### 🎯 Lead CRM Pipeline
- Drag-and-drop stages: New → Contacted → Qualified → Proposal → Converted
- Automated lead scoring
- List and pipeline views
- Lead activity tracking

#### Business-Specific Tools
- **Unified Inbox** - All messages in one place
- **Social Media Automation** - Schedule and automate posts
- **Email Marketing** - Campaigns and sequences
- **Brand Kit & AI Persona** - Colors, logos, voice
- **Website SEO Audit** - Actionable insights
- **Lead Forms Creator** - Google Forms-like builder
- **Digital Business Cards** - Quick sharing
- **Business Analytics** - Unified insights
- **Integrations Hub** - Connect platforms
- **Settings** - Business configuration

---

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| React Router | 7.1.3 | Navigation |
| Zustand | 5.0.3 | State Management |
| Tailwind CSS | 4.1.18 | Styling |
| Lucide React | Latest | Icons |
| Framer Motion | 11.18.0 | Animations |
| Recharts | 2.15.0 | Charts |
| Vite | 7.2.4 | Build Tool |

---

## 📁 Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Sidebar.jsx       # Persistent navigation
│       ├── Header.jsx        # Top bar with search
│       └── MainLayout.jsx    # Main wrapper
├── pages/
│   ├── Auth/
│   │   └── Register.jsx      # Registration/Login
│   ├── Onboarding/
│   │   └── Onboarding.jsx    # 4-step wizard
│   ├── Dashboard/
│   │   └── GlobalDashboard.jsx
│   ├── Business/
│   │   ├── BusinessWorkspace.jsx
│   │   └── BusinessDashboard.jsx
│   ├── AIStudio/
│   │   └── AIContentStudio.jsx
│   └── CRM/
│       └── CRMPipeline.jsx
├── store/
│   └── useStore.js           # Zustand store
└── App.jsx                   # Main app & routes
```

---

## 🎨 Design System

### Color Palette
- **Primary Blue:** `#3B82F6` - Actions, CTAs
- **Purple:** `#9333EA` - Gradients, accents
- **Green:** `#10B981` - Success, revenue
- **Orange:** `#F59E0B` - Warnings
- **Red:** `#EF4444` - Errors

### Dark Theme
- Background: `#030712` (gray-950)
- Cards: `#111827` (gray-900)
- Borders: `#1F2937` (gray-800)

### Light Theme
- Background: `#F9FAFB` (gray-50)
- Cards: `#FFFFFF` (white)
- Borders: `#E5E7EB` (gray-200)

---

## 🎮 Usage Guide

### Creating Your First Business
1. Complete registration
2. Follow onboarding wizard
3. Set business name, industry, website
4. Select goals (lead gen, nurturing, revenue)
5. Choose channels (email, social platforms)
6. Launch dashboard

### Generating AI Content
1. Navigate to AI Content Studio
2. Select business (loads brand voice)
3. Choose content type
4. Enter prompt
5. Generate content

### Managing Leads
1. Open Business Dashboard
2. Click "Lead CRM Pipeline"
3. Add leads manually or via forms
4. Drag between stages
5. View automated scoring

---

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🔐 Security Features

- Secure authentication
- Role-based access control
- Data isolation per business
- Encrypted storage
- GDPR compliance ready

---

## 🚦 Roadmap

### ✅ Phase 1 (Complete)
- User registration & authentication
- Onboarding wizard
- Global dashboard with KPIs
- Business workspace
- AI content studio
- CRM pipeline with lead scoring

### 🚧 Phase 2 (Coming Soon)
- Team management
- Subscription billing
- Advanced analytics
- Email automation
- Social media scheduler

### 📅 Phase 3 (Planned)
- Unified inbox
- Integrations hub
- Mobile apps
- Advanced AI features

---

## 📄 License

© 2026 LeadFlexUp. All rights reserved.

---

**Built with ❤️ for growth-minded businesses**
