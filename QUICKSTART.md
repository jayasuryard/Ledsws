# ⚡ LeadFlexUp - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies (2 minutes)
```bash
npm install
```

### Step 2: Start Development Server (30 seconds)
```bash
npm run dev
```

### Step 3: Open Browser (10 seconds)
Navigate to: **http://localhost:5173**

---

## 🎯 Your First Session

### 1. Register (1 minute)
- Enter your name, email, and password
- Click "Create Account"

### 2. Complete Onboarding (2 minutes)

**Step 1/4: Business Info**
- Business name: "My First Business"
- Industry: Select any (e.g., "SaaS")
- Click "Continue"

**Step 2/4: Goals**
- Select at least one goal
- Recommended: All three
- Click "Continue"

**Step 3/4: Channels**
- Select at least one channel
- Recommended: Email Marketing
- Click "Continue"

**Step 4/4: Launch**
- Review your setup
- Click "Launch Dashboard" 🎉

### 3. Explore Dashboard (5 minutes)

**You'll see:**
- ✅ Real-time KPIs at the top
- ✅ Your first business in the overview
- ✅ Quick action cards
- ✅ Subscription status
- ✅ Sidebar navigation on the left

**Try these actions:**
1. Click your business card → Opens Business Dashboard
2. Click "AI Content Studio" → Generate content
3. Navigate to "Lead CRM Pipeline" → Add a lead
4. Toggle dark/light mode (sun/moon icon in header)

---

## 🎨 Key Features to Try

### Create More Businesses
1. Click "Business Workspace" in sidebar
2. Click "+ New Business" button
3. Complete onboarding for the business

### Add Leads to CRM
1. Go to any Business Dashboard
2. Click "Lead CRM Pipeline" card
3. Click "+ Add Lead" button
4. Fill in name and email
5. See it appear in "New" stage

### Generate AI Content
1. Click "AI Content Studio" in sidebar
2. Select a business from dropdown
3. Choose content type (Blog, Social, Product)
4. Enter a prompt
5. Click "Generate with AI"
6. Copy the generated content

### Switch Themes
1. Find sun/moon icon in header (top right)
2. Click to toggle between dark and light
3. Theme persists across sessions

---

## 📱 Application Structure

### Sidebar Navigation (Left)
```
🏠 Global Dashboard        → Executive overview
📊 Global Analytics        → Reports & metrics
✨ AI Content Studio       → Generate content
💼 Business Workspace      → Manage businesses
👥 Team Management         → (Coming soon)
💳 Subscription           → (Coming soon)
👤 Profile                → (Coming soon)
```

### Header Bar (Top)
```
🔍 Search                  → Find businesses, leads
🌙 Theme Toggle            → Dark/Light mode
🔔 Notifications           → Activity alerts
👤 User Menu               → Profile, Logout
```

---

## 🎓 Learning Path

### Day 1: Basics
- [x] Complete registration and onboarding
- [x] Explore Global Dashboard
- [x] Create 2-3 test businesses
- [x] Add 5-10 test leads
- [x] Try theme toggle

### Day 2: Features
- [x] Generate AI content (3 types)
- [x] Use CRM pipeline (drag leads)
- [x] Switch between businesses
- [x] Explore business tools grid

### Day 3: Advanced
- [x] Understand state management
- [x] Review code structure
- [x] Plan backend integration
- [x] Customize components

---

## 🛠️ Common Tasks

### Adding a New Page
1. Create file in `src/pages/YourFeature/`
2. Import in `src/App.jsx`
3. Add Route in Routes section
4. Add sidebar link (optional)

### Creating a Component
1. Create file in `src/components/`
2. Use existing components as template
3. Import theme from useStore
4. Apply Tailwind classes

### Modifying State
1. Open `src/store/useStore.js`
2. Add new state property
3. Add action functions
4. Use in components with `useStore()`

---

## 📊 Sample Data

### Test Businesses
```javascript
{
  name: "Tech Startup Inc",
  industry: "SaaS",
  website: "https://techstartup.com",
  goals: ["lead-gen", "nurturing"],
  channels: ["email", "linkedin"]
}
```

### Test Leads
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  stage: "new",
  score: 75
}
```

---

## 🎯 Success Checklist

After 10 minutes, you should have:
- [x] Application running locally
- [x] Account created
- [x] Onboarding completed
- [x] At least 1 business created
- [x] At least 1 lead added
- [x] AI content generated
- [x] Themes toggled
- [x] Sidebar navigation explored

---

## 🚨 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading
- Check browser console for errors
- Ensure all files are saved
- Restart dev server (Ctrl+C, then npm run dev)

### Theme Not Persisting
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

---

## 📚 Documentation

### Full Guides
- [README.md](README.md) - Complete overview
- [INSTALLATION.md](INSTALLATION.md) - Detailed setup
- [FEATURES.md](FEATURES.md) - All features
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - What's built

### Quick References
- State: `src/store/useStore.js`
- Routes: `src/App.jsx`
- Sidebar: `src/components/Layout/Sidebar.jsx`

---

## ⚡ Pro Tips

1. **Use Search**: Global search bar finds everything
2. **Keyboard Shortcuts**: Tab navigation throughout
3. **Persistent State**: All data saved to localStorage
4. **Mobile Friendly**: Resize browser to test
5. **Dark Mode First**: Optimized for dark theme

---

## 🎉 You're Ready!

LeadFlexUp is now running and ready to explore.

**What to do next:**
1. Experiment with all features
2. Review the code structure
3. Plan your backend integration
4. Customize the branding
5. Deploy to production

---

## 💡 Need Help?

- **Documentation**: Check the 4 markdown files
- **Code**: All components are well-commented
- **Console**: Check browser console for errors
- **State**: Use React DevTools to inspect state

---

**Happy building!** 🚀

Built with ❤️ for growth-minded businesses
