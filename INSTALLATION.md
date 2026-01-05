# 🚀 LeadFlexUp - Installation & Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher
- A modern web browser (Chrome, Firefox, Safari, or Edge)

Check your versions:
```bash
node --version
npm --version
```

---

## 📦 Installation Steps

### Step 1: Install Dependencies

From the project root directory, run:

```bash
npm install
```

This will install all required packages:
- ✅ react & react-dom (19.2.0)
- ✅ react-router-dom (7.1.3)
- ✅ zustand (5.0.3)
- ✅ lucide-react (0.468.0)
- ✅ framer-motion (11.18.0)
- ✅ recharts (2.15.0)
- ✅ tailwindcss (4.1.18)
- ✅ vite (7.2.4)

**Installation time:** ~2-3 minutes (depending on your connection)

---

### Step 2: Start Development Server

```bash
npm run dev
```

You should see output similar to:
```
  VITE v7.2.4  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### Step 3: Open in Browser

Navigate to: **http://localhost:5173**

You should see the **LeadFlexUp Registration** page! 🎉

---

## 🎯 First-Time Setup

### Complete the User Journey

1. **Register an Account**
   - Fill in your name, email, company (optional), and password
   - Click "Create Account"

2. **Complete Onboarding (4 Steps)**
   
   **Step 1: Business Information**
   - Enter business name (e.g., "Acme Inc")
   - Select industry (e.g., "SaaS", "E-commerce")
   - Add website URL (optional)
   
   **Step 2: Define Goals**
   - Select at least one goal:
     - ✅ Lead Generation
     - ✅ Lead Nurturing
     - ✅ Revenue Growth
   
   **Step 3: Choose Channels**
   - Select platforms to automate:
     - ✅ Email Marketing
     - ✅ Facebook
     - ✅ Instagram
     - ✅ LinkedIn
   
   **Step 4: Launch**
   - Review your setup summary
   - Click "Launch Dashboard"

3. **Explore the Dashboard**
   - You'll land on the Global Dashboard
   - See real-time KPIs
   - Access all features from the left sidebar

---

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env` file in the root directory for custom configurations:

```env
# API Configuration (when you add backend)
VITE_API_URL=http://localhost:3000/api

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_AI_STUDIO=true
```

---

## 📱 Application Features Overview

### Available Now

✅ **User Registration & Authentication**
- Secure login/signup flow
- Session persistence

✅ **Onboarding Wizard**
- 4-step guided setup
- Business profile creation

✅ **Global Dashboard**
- Real-time KPIs (revenue, leads, conversion rate)
- Activity feed
- Quick actions
- Subscription status

✅ **Business Workspace**
- Create multiple businesses
- View all businesses
- Search and filter

✅ **Business Dashboard**
- Business-specific overview
- Access to 12+ tools
- Performance metrics

✅ **AI Content Studio**
- Generate blog posts
- Create social media content
- E-commerce copy
- Brand voice integration

✅ **Lead CRM Pipeline**
- Pipeline view (drag-and-drop)
- List view
- Add leads manually
- Stage management (New → Contacted → Qualified → Proposal → Converted)
- Automated lead scoring

✅ **Dark/Light Mode**
- Theme toggle in header
- Persistent preference

✅ **Responsive Sidebar Navigation**
- Global Analytics
- AI Content Studio
- Business Workspace
- Team Management
- Subscription
- Profile

---

## 🎨 Theme Customization

### Changing Default Theme

Edit [src/store/useStore.js](src/store/useStore.js):

```javascript
// Change line 9 from:
theme: 'dark',

// To:
theme: 'light',
```

---

## 🧪 Testing the Application

### Test User Flow

1. **Registration**
   - Email: test@example.com
   - Password: Test123!

2. **Create Test Business**
   - Name: "Demo SaaS Inc"
   - Industry: "SaaS"
   - Goals: All three
   - Channels: All four

3. **Add Test Leads**
   - Navigate to CRM Pipeline
   - Click "Add Lead"
   - Fill in dummy data

4. **Generate AI Content**
   - Go to AI Content Studio
   - Select your business
   - Choose "Blog Post"
   - Prompt: "Write about lead generation benefits"
   - Click "Generate with AI"

---

## 🚀 Production Build

### Build for Deployment

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Opens a local server to preview the production build.

---

## 📊 Build Output

Expected build metrics:
- **Bundle Size:** ~400-500KB (gzipped)
- **Build Time:** 10-20 seconds
- **Chunks:** Vendor, app, lazy-loaded routes

---

## 🔍 Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Zustand Persistence Not Working

Clear browser localStorage:
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

### Theme Not Changing

Check if `localStorage` has the theme key:
```javascript
// In browser console:
console.log(localStorage.getItem('leadflexup-storage'))
```

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component & routing |
| `src/store/useStore.js` | Global state management |
| `src/components/Layout/Sidebar.jsx` | Navigation sidebar |
| `src/components/Layout/Header.jsx` | Top header with search |
| `src/pages/Dashboard/GlobalDashboard.jsx` | Main dashboard |
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind CSS config |

---

## 🎯 Next Steps

After installation, you can:

1. **Customize Branding**
   - Update logo in Sidebar.jsx
   - Modify color scheme in Tailwind config

2. **Add Backend Integration**
   - Connect to your API
   - Implement real authentication
   - Store data in database

3. **Enhance Features**
   - Add more CRM stages
   - Implement email sequences
   - Build integrations hub

4. **Deploy to Production**
   - Build the app
   - Deploy to Vercel, Netlify, or your hosting

---

## 📞 Need Help?

- Check the main [README.md](README.md) for full documentation
- Review component files for inline comments
- Check browser console for errors

---

## ✅ Installation Checklist

- [ ] Node.js and npm installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opened at localhost:5173
- [ ] Registration completed
- [ ] Onboarding finished
- [ ] Dashboard loaded successfully
- [ ] First business created
- [ ] CRM pipeline tested
- [ ] AI Studio explored
- [ ] Theme toggle verified

---

**Installation Complete!** 🎉

Your LeadFlexUp platform is ready to use. Start generating leads and growing your business!
