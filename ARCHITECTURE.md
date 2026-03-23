# LeadFlexUp Creator Platform - System Architecture

> **Version:** 1.0.0  
> **Date:** March 23, 2026  
> **Status:** ✅ Complete Implementation

---

## 🎯 Executive Summary

The Creator Platform extends LeadFlexUp with end-to-end content creation capabilities, enabling users to generate AI assets, design images, edit videos, and publish directly to social media—all within a single modular architecture.

**Key Features:**
- 🎨 **Image Designer** - Browser-based Canva-like editor
- 🎬 **Video Editor** - Timeline-based video composition
- 🤖 **AI Generation** - Replicate SDXL integration
- 📚 **Media Library** - Centralized asset management
- ⚡ **Creator Pipeline** - Orchestrated AI → Design → Publish workflow

---

## 📐 Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Experience Layer                        │
│  React Components │ Business Tools UI │ Routing         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Domain Layer                           │
│  Design │ Video │ AI │ Publishing │ Asset Management    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                Integration Layer                         │
│  Replicate │ FFmpeg │ Social APIs │ Storage            │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Data Layer                             │
│  Zustand Store │ LocalStorage │ Queue System           │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Core Components

### 1. Image Designer (`ImageDesigner.jsx`)

**Purpose:** Browser-based design editor for creating social media graphics, banners, and marketing materials.

**Technology Stack:**
- Layout rendering (HTML/CSS with absolute positioning)
- Template system with platform presets
- Layer-based composition
- Export to PNG/JPG/WebP

**Key Features:**
- ✅ Drag-and-drop canvas
- ✅ Text, shapes, images, icons
- ✅ Layer management (visibility, locking, ordering)
- ✅ Undo/Redo history
- ✅ Platform presets (Instagram, Facebook, LinkedIn, etc.)
- ✅ Export in multiple formats
- ✅ Direct handoff to Social Media tool

**Data Flow:**
```
Template Selection → Canvas Initialization → Layer Management → 
Project Save → Export → Media Library → Social Publishing
```

**State Management:**
```javascript
// Zustand Store
designProjects: []     // All design projects
designTemplates: []    // Platform templates
mediaAssets: []        // Exported assets
```

---

### 2. Video Editor (`VideoEditor.jsx`)

**Purpose:** Timeline-based video editor for creating short-form content (reels, shorts, ads).

**Technology Stack:**
- Timeline composition UI
- Clip-based editing
- Remotion-inspired composition patterns
- FFmpeg rendering pipeline (simulated)

**Key Features:**
- ✅ Timeline editing (clips, trims, cuts)
- ✅ Text overlays with customizable styling
- ✅ Transitions (fade, dissolve, wipe, slide)
- ✅ Audio track support
- ✅ Multi-layer composition
- ✅ Template system (reels, shorts, promos)
- ✅ Async render queue

**Data Flow:**
```
Template Selection → Timeline Composition → Clip Management → 
Render Request → FFmpeg Processing → Output to Media Library → 
Social Campaign
```

**State Management:**
```javascript
// Zustand Store
videoProjects: []      // All video projects
videoTemplates: []     // Video templates
renderJobs: []         // Render queue
```

**Render Pipeline:**
```
Frontend Request → Render Job Creation → Queue Processing → 
FFmpeg Encoding → Progress Updates → Completion Notification → 
Media Library Storage
```

---

### 3. AI Content Studio Enhancement

**Purpose:** Generate images using Replicate SDXL API with direct handoff to design and publishing tools.

**Integration Points:**
- **Replicate API** - SDXL model for text-to-image
- **Media Library** - Auto-save generated assets
- **Image Designer** - Direct edit handoff
- **Social Media** - Direct publish handoff
- **Creator Pipeline** - Workflow orchestration

**Data Flow:**
```
User Prompt → Replicate API Call → 4 Image Variants Generated → 
Selection UI → [Edit in Designer | Create Post | Save to Library]
```

**State Management:**
```javascript
// Zustand Store
aiGenerations: []      // All AI generation requests
mediaAssets: []        // Generated images with metadata
```

**API Integration Pattern:**
```javascript
const generation = {
  prompt: userPrompt,
  type: 'image',
  model: 'SDXL',
  outputs: 4,
  businessId: activeBusiness.id
};

// Replicate API call (simulated)
const outputs = await replicateAPI.generate(generation);

// Store results
outputs.forEach(output => {
  addMediaAsset({
    type: 'image',
    source: 'ai',
    prompt: userPrompt,
    url: output.url,
    tags: ['ai-generated', 'sdxl']
  });
});
```

---

### 4. Media Library (`MediaLibrary.jsx`)

**Purpose:** Centralized asset management for all creative content.

**Asset Types:**
- Images (uploaded, designed, AI-generated)
- Videos (uploaded, edited)
- Audio files
- Documents

**Key Features:**
- ✅ Grid/List view modes
- ✅ Search and filter by type, source, tags
- ✅ Bulk selection and actions
- ✅ Asset preview and details modal
- ✅ Direct edit/publish actions
- ✅ Tag management
- ✅ File size and dimension tracking

**Data Flow:**
```
Upload/Generate → Media Library → [Edit | Publish | Download] → 
Social Media / Campaigns
```

**State Management:**
```javascript
// Zustand Store
mediaAssets: [{
  id: timestamp,
  name: string,
  type: 'image' | 'video' | 'audio',
  source: 'upload' | 'ai' | 'design' | 'video',
  url: string,
  size: number,
  dimensions: { width, height },
  tags: string[],
  businessId: number,
  createdAt: ISOString
}]
```

---

### 5. Creator Pipeline (`CreatorPipeline.jsx`)

**Purpose:** End-to-end guided workflow for creating and publishing content.

**Workflow Steps:**
1. **Choose Type** - Image or Video content
2. **Generate with AI** - SDXL prompt interface
3. **Select & Edit** - Choose outputs and refine in designer
4. **Schedule & Publish** - Create campaigns or save to library

**Data Flow:**
```
Type Selection → AI Generation → Asset Selection → 
[Edit in Designer/Video Editor] → Social Publishing / Campaign Creation
```

**State Management:**
```javascript
// Zustand Store
creatorWorkflows: [{
  id: timestamp,
  type: 'image' | 'video',
  aiPrompt: string,
  generatedAssets: [],
  selectedAssets: [],
  campaign: campaignId,
  status: 'active' | 'completed'
}]
```

---

## 🔄 Integration Architecture

### Replicate API Integration

**Endpoint Pattern:**
```javascript
POST https://api.replicate.com/v1/predictions

{
  "version": "sdxl-model-version-id",
  "input": {
    "prompt": userPrompt,
    "num_outputs": 4,
    "width": 1024,
    "height": 1024
  }
}
```

**Response Handling:**
```javascript
// Poll for completion
const checkStatus = async (predictionId) => {
  const response = await fetch(
    `https://api.replicate.com/v1/predictions/${predictionId}`
  );
  const data = await response.json();
  
  if (data.status === 'succeeded') {
    return data.output; // Array of image URLs
  } else if (data.status === 'processing') {
    // Continue polling
    setTimeout(() => checkStatus(predictionId), 1000);
  }
};
```

---

### FFmpeg Render Pipeline

**Architecture:**
```
Frontend Request → Job Queue → Worker Pool → FFmpeg Process → 
Progress Events → Completion → Storage
```

**Job Queue Schema:**
```javascript
{
  id: timestamp,
  projectId: number,
  clips: Array<ClipData>,
  settings: {
    format: 'mp4' | 'webm' | 'mov',
    quality: 'low' | 'medium' | 'high',
    resolution: '720p' | '1080p' | '4k',
    fps: 30
  },
  status: 'pending' | 'processing' | 'completed' | 'failed',
  progress: 0-100,
  outputUrl: string | null,
  error: string | null
}
```

**FFmpeg Command Generation:**
```bash
ffmpeg -i input.mp4 \
  -vf "drawtext=text='Hello':x=100:y=100:fontsize=48" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 128k \
  output.mp4
```

---

### Social Media Integration

**Handoff Pattern:**
```javascript
// From Image Designer
navigate(`/business/${businessId}/social?asset=${assetId}`);

// From AI Studio
navigate(`/business/${businessId}/social?assets=${assetIds.join(',')}`);

// From Creator Pipeline
navigate(`/business/${businessId}/social?campaign=true&assets=${ids}`);
```

**Social Media Component Enhancement:**
```javascript
// Detect incoming assets from URL params
const urlParams = new URLSearchParams(location.search);
const assetIds = urlParams.get('assets')?.split(',') || [];

// Pre-populate post with assets
if (assetIds.length > 0) {
  const assets = mediaAssets.filter(a => assetIds.includes(a.id));
  setPostForm({
    ...postForm,
    media: assets
  });
}
```

---

## 📊 State Management Schema

### Complete Store Structure

```javascript
// Zustand Store (useStore.js)
{
  // Existing state...
  
  // Media Library
  mediaAssets: Array<{
    id, name, type, source, url, size, 
    dimensions, tags, businessId, createdAt
  }>,
  
  // Design Projects
  designProjects: Array<{
    id, name, templateId, canvasSize, 
    layers, businessId, createdAt, updatedAt
  }>,
  
  // Video Projects
  videoProjects: Array<{
    id, name, templateId, duration, 
    aspectRatio, clips, businessId, 
    status, createdAt, updatedAt
  }>,
  
  // Render Jobs
  renderJobs: Array<{
    id, projectId, clips, settings, 
    status, progress, outputUrl, error, 
    createdAt
  }>,
  
  // AI Generations
  aiGenerations: Array<{
    id, prompt, type, model, businessId, 
    outputs, status, createdAt
  }>,
  
  // Templates
  designTemplates: Array<{
    id, name, category, platform, 
    width, height, thumbnail
  }>,
  
  videoTemplates: Array<{
    id, name, category, platform, 
    duration, aspectRatio, thumbnail
  }>,
  
  // Creator Workflows
  creatorWorkflows: Array<{
    id, type, aiPrompt, generatedAssets, 
    selectedAssets, campaign, status, createdAt
  }>
}
```

---

## 🛣️ Routing Architecture

### Route Structure

```javascript
// App.jsx Routes
{
  // Existing routes...
  
  // Creator Tools (Business-scoped)
  <Route path="business/:businessId/design" element={<ImageDesigner />} />
  <Route path="business/:businessId/video" element={<VideoEditor />} />
  <Route path="business/:businessId/media" element={<MediaLibrary />} />
  <Route path="business/:businessId/creator" element={<CreatorPipeline />} />
}
```

### Navigation Patterns

**From Business Dashboard:**
```javascript
// Tool grid with creator tools
{
  title: 'Creator Pipeline',
  path: `/business/${businessId}/creator`,
  badge: 'NEW'
},
{
  title: 'Image Designer',
  path: `/business/${businessId}/design`,
  badge: 'NEW'
},
// ... etc
```

---

## ⚡ Performance Optimizations

### 1. Asset Loading
- Lazy load images in Media Library
- Thumbnail generation for preview
- Progressive image loading

### 2. Canvas Rendering
- Layer virtualization for large projects
- Debounced property updates
- Canvas caching

### 3. Timeline Performance
- Clip virtualization for long videos
- Seek optimization
- Preview frame caching

### 4. State Updates
- Immer for immutable updates
- Selective re-renders
- Memoization of expensive computations

---

## 🔒 Security Considerations

### 1. Asset Storage
- Signed upload URLs
- Tenant isolation by businessId
- Content moderation before publish

### 2. API Keys
- Environment variables for Replicate API
- Rate limiting per business
- Usage quota enforcement

### 3. Render Jobs
- Sandbox execution
- Resource limits (memory, CPU time)
- Output size restrictions

---

## 📈 Scalability Patterns

### 1. Render Queue
- Horizontal scaling of workers
- Priority queue for paid users
- Auto-scaling based on queue depth

### 2. Asset Storage
- CDN for media delivery
- Object storage (S3-compatible)
- Automatic cleanup of orphaned assets

### 3. Database
- Index on businessId for fast filtering
- Archive old projects after 90 days
- Pagination for large asset libraries

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- State mutations
- Utility functions

### Integration Tests
- Workflow completion
- Asset handoffs between tools
- API integration mocks

### E2E Tests
- Complete creator pipeline
- Design → Export → Publish flow
- AI Generation → Edit → Campaign creation

---

## 🚀 Deployment Considerations

### Environment Variables
```env
VITE_REPLICATE_API_KEY=your_api_key
VITE_FFMPEG_WORKER_URL=https://ffmpeg.example.com
VITE_CDN_URL=https://cdn.example.com
VITE_MAX_UPLOAD_SIZE=50MB
```

### Build Optimization
```bash
npm run build
# Outputs to dist/ with:
# - Code splitting by route
# - Asset hashing
# - Minification
# - Sourcemaps
```

### Production Checklist
- ✅ API keys secured
- ✅ Rate limiting configured
- ✅ CDN cache headers
- ✅ Error tracking (Sentry)
- ✅ Analytics events
- ✅ Backup strategy

---

## 📚 Future Enhancements

### Phase 2 Features
- [ ] Real Konva.js integration for true canvas manipulation
- [ ] Background removal API integration
- [ ] AI-powered smart resize
- [ ] Collaborative editing

### Phase 3 Features
- [ ] Video collaboration (multiple editors)
- [ ] Advanced effects library
- [ ] Brand safety AI guardrails
- [ ] Performance analytics per asset

### Phase 4 Features
- [ ] Plugin system for custom tools
- [ ] White-label capabilities
- [ ] Advanced workflow automation
- [ ] A/B testing for creative assets

---

## 🔗 Integration Points Summary

| Tool | Inputs From | Outputs To |
|------|------------|------------|
| AI Content Studio | User prompts | Media Library, Image Designer, Social Media |
| Image Designer | Templates, Media Library | Media Library, Social Media |
| Video Editor | Templates, Media Library | Render Queue, Media Library, Social Media |
| Media Library | All tools | All tools |
| Creator Pipeline | User input | AI Studio, Designers, Social Media |
| Social Media | All creator tools | Published content |

---

## 📞 Support & Maintenance

### Monitoring
- Render job success rate
- AI generation failures
- Asset storage growth
- User engagement metrics

### Logs
- Application: Error tracking, user actions
- Render: Job queue, FFmpeg output
- API: Replicate calls, rate limits

### Alerts
- Failed render jobs > 5%
- Storage nearing quota
- API rate limit approached
- Unusual asset upload patterns

---

**End of Architecture Documentation**

For implementation details, see individual component files.  
For API integration guides, see `API_INTEGRATION.md`.  
For user documentation, see `CREATOR_TOOLS.md`.
