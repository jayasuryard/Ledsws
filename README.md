# 🚀 LeadFlexUp - AI-Powered Marketing Automation Platform

> **"Paste your URL. Your entire marketing system is live in 60 seconds."**

Modern, intelligent marketing automation platform with AI-powered business setup, lead generation, email campaigns, and comprehensive analytics.

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server  
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173/` to see the landing page.

---

## 🎨 Design System

### Theme
- **Primary Theme**: Light mode
- **Main Color**: Navy (#1e3a8a, #1e40af, #1d4ed8)
- **UI Style**: Replit-inspired clean interface
- **Typography**: Inter font family
- **Spacing**: 8px grid system

### Color Palette
```css
Navy Primary: #1e3a8a (navy-900)
Navy Secondary: #1e40af (navy-800)  
Navy Accent: #1d4ed8 (navy-700)
Navy Light: #2563eb (navy-600)
Background: #ffffff
Text Primary: #0f172a
Text Secondary: #64748b
Success: #10b981
Warning: #f59e0b
Error: #ef4444
```

---

## 📦 Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Zustand 5** - State management
- **Lucide React** - Icon library

---

## 🎯 Core Features

### 1. AI-Powered Business Setup (60 Seconds)
- Paste URL, AI extracts business details
- Auto-detect colors, logo, style
- Generate lead forms, email workflows, content
- Complete marketing system ready instantly

### 2. Dashboard
- Executive KPIs (revenue, leads, conversion)
- Quick actions & business cards
- Real-time activity feed

### 3. Analytics
- Cross-business insights
- Lead tracking & conversion
- Email performance & ROI

### 4. AI Content Studio
- Text generation (blog, social, email)
- Image designer (Canva-like editor)
- Video editor (timeline-based)
- Media library & batch generation

### 5. Business Workspace
- Multi-business management
- Isolated data per business
- Team collaboration & roles

### 6. CRM & Lead Management
- Visual pipeline with drag-and-drop
- AI-powered lead scoring
- Auto-assignment & activity tracking

### 7. Email Marketing
- Campaign builder with automation
- Triggers, sequences, workflows
- Personalization & A/B testing

### 8. Lead Forms
- Custom form builder
- Embeddable with one-line code
- Spam protection & validation

---

## 📊 Routing Structure

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/register` - Registration
- `/forms/:id` - Public form viewer

### Protected Routes
- `/app/dashboard` - Main dashboard
- `/app/ai-setup` - AI business setup
- `/app/analytics` - Analytics
- `/app/ai-studio` - AI content generation
- `/app/businesses` - Business workspace
- `/app/business/:id/*` - Business tools
- `/app/team` - Team management
- `/app/subscription` - Billing
- `/app/profile` - User settings

---

## 🎨 UI Components

Located in `src/components/ui/index.js`:

- `Button` - 5 variants, 4 sizes
- `Card` - Hover/clickable variants
- `Input` - With icons & validation
- `Badge` - 5 color variants
- `Avatar` - With online status
- `Modal` - 5 size options
- `Tooltip` - 4 placements
- `Spinner` - Loading states
- `Alert` - 4 notification types

### Usage
```jsx
import { Button, Card } from './components/ui';

<Button variant="primary" size="lg">
  Click Me
</Button>
```

---

## 🔐 State Management

Zustand store structure:
```javascript
{
  theme: 'light',
  user: {...},
  isAuthenticated: boolean,
  businesses: [...],
  activeBusiness: {...},
  leads: [...],
  globalAnalytics: {...}
}
```

---

## 🚀 Development

```bash
npm run dev        # Dev server (port 5173)
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # Run ESLint
```

---

## 📈 Performance Targets

- Lighthouse Score: 90+
- First Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB gzipped

---

## 🎯 Roadmap

### Phase 1: Foundation ✅
- Navy-themed UI
- AI business setup
- Landing page & auth
- Core dashboard

### Phase 2: In Progress
- Analytics redesign
- AI Studio with creator tools
- Business workspace modernization
- Enhanced CRM

### Phase 3: Advanced
- Real API integrations
- Email deliverability
- Payment processing
- Mobile apps

---

## 📄 License

Proprietary - © 2026 Ryo Forge Pvt. Ltd.

---

**Version**: 2.0.0  
**Last Updated**: March 28, 2026  
**Status**: 🚧 Active Development
