# API Integration Guide - Creator Platform

> **Implementation guide for Replicate, FFmpeg, and Social Media APIs**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Replicate API Integration](#replicate-api-integration)
3. [FFmpeg Render Service](#ffmpeg-render-service)
4. [Social Media APIs](#social-media-apis)
5. [Storage & CDN](#storage--cdn)
6. [Error Handling](#error-handling)
7. [Rate Limiting & Quotas](#rate-limiting--quotas)

---

## 🎯 Overview

### Architecture Pattern

```
Frontend (React) → Backend API/BFF → External Services
                        ↓
                   Job Queue System
                        ↓
                Worker Pool → FFmpeg/Storage
```

### Why Backend API Layer?

1. **Security** - Never expose API keys to frontend
2. **Rate Limiting** - Control usage per business
3. **Cost Management** - Track and limit costs
4. **Error Handling** - Centralized retry logic
5. **Caching** - Reduce redundant API calls

---

## 🎨 Replicate API Integration

### Setup

#### 1. Get API Key

```bash
# Sign up at https://replicate.com
# Get API token from dashboard
export REPLICATE_API_TOKEN="r8_your_token_here"
```

#### 2. Install SDK

```bash
npm install replicate
```

#### 3. Backend Service Setup

```javascript
// services/replicateService.js
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateImages = async (prompt, options = {}) => {
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          num_outputs: options.num_outputs || 4,
          width: options.width || 1024,
          height: options.height || 1024,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8
        }
      }
    );
    
    return {
      success: true,
      images: output, // Array of image URLs
      metadata: {
        prompt,
        model: 'sdxl',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Replicate generation failed:', error);
    throw new ApiError('Image generation failed', 500, error);
  }
};
```

### API Endpoints

#### POST /api/ai/generate-images

**Request:**
```json
{
  "businessId": 123,
  "prompt": "A modern minimalist product photo...",
  "options": {
    "num_outputs": 4,
    "width": 1024,
    "height": 1024
  }
}
```

**Response:**
```json
{
  "success": true,
  "generationId": "gen_abc123",
  "images": [
    {
      "url": "https://replicate.delivery/pbxt/...",
      "id": "img_001"
    },
    {
      "url": "https://replicate.delivery/pbxt/...",
      "id": "img_002"
    }
  ],
  "metadata": {
    "prompt": "A modern minimalist...",
    "model": "sdxl",
    "timestamp": "2026-03-23T10:30:00Z"
  },
  "credits_used": 0.05
}
```

### Frontend Integration

```javascript
// services/api/aiService.js
export const generateImages = async (businessId, prompt, options) => {
  try {
    const response = await fetch('/api/ai/generate-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ businessId, prompt, options })
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const data = await response.json();
    
    // Save to store
    const assets = data.images.map(img => ({
      id: img.id,
      name: `AI Generated ${Date.now()}`,
      type: 'image',
      source: 'ai',
      url: img.url,
      prompt: prompt,
      tags: ['ai-generated', 'sdxl'],
      businessId
    }));
    
    assets.forEach(asset => addMediaAsset(asset));
    
    return { success: true, assets };
  } catch (error) {
    console.error('AI generation error:', error);
    return { success: false, error: error.message };
  }
};
```

### Polling for Completion (Alternative Approach)

```javascript
// For long-running predictions
export const generateImagesAsync = async (businessId, prompt) => {
  // 1. Create prediction
  const prediction = await replicate.predictions.create({
    version: "sdxl-version-id",
    input: { prompt }
  });
  
  // 2. Return prediction ID immediately
  return {
    predictionId: prediction.id,
    status: 'processing'
  };
};

// 3. Poll for completion
export const checkPredictionStatus = async (predictionId) => {
  const prediction = await replicate.predictions.get(predictionId);
  
  return {
    id: prediction.id,
    status: prediction.status, // starting, processing, succeeded, failed
    output: prediction.output,
    error: prediction.error
  };
};

// Frontend polling
const pollGeneration = async (predictionId) => {
  const checkStatus = async () => {
    const result = await fetch(`/api/ai/predictions/${predictionId}`);
    const data = await result.json();
    
    if (data.status === 'succeeded') {
      return data.output;
    } else if (data.status === 'failed') {
      throw new Error(data.error);
    } else {
      // Still processing, check again in 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      return checkStatus();
    }
  };
  
  return checkStatus();
};
```

### Cost Management

```javascript
// Track usage per business
const trackUsage = async (businessId, credits) => {
  await db.query(`
    INSERT INTO ai_usage (business_id, credits, timestamp)
    VALUES ($1, $2, NOW())
  `, [businessId, credits]);
  
  // Check quota
  const usage = await getMonthlyUsage(businessId);
  const quota = await getBusinessQuota(businessId);
  
  if (usage >= quota) {
    throw new QuotaExceededError('Monthly AI quota exceeded');
  }
};
```

---

## 🎬 FFmpeg Render Service

### Architecture

```
Frontend Request → API → Redis Queue → Worker Pool → FFmpeg → Storage → CDN
```

### Setup

#### 1. Worker Service

```javascript
// workers/videoRenderWorker.js
import Queue from 'bull';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

ffmpeg.setFfmpegPath(ffmpegPath.path);

const renderQueue = new Queue('video-render', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

renderQueue.process(async (job) => {
  const { projectId, clips, settings } = job.data;
  
  try {
    // Update status
    await updateRenderJob(job.id, { status: 'processing', progress: 0 });
    
    // Generate FFmpeg command
    const outputPath = `/tmp/${job.id}.${settings.format}`;
    await renderVideo(clips, settings, outputPath, (progress) => {
      // Update progress
      job.progress(progress);
      updateRenderJob(job.id, { progress });
    });
    
    // Upload to storage
    const videoUrl = await uploadVideo(outputPath, job.id);
    
    // Complete job
    await updateRenderJob(job.id, {
      status: 'completed',
      progress: 100,
      outputUrl: videoUrl
    });
    
    return { success: true, url: videoUrl };
  } catch (error) {
    await updateRenderJob(job.id, {
      status: 'failed',
      error: error.message
    });
    throw error;
  }
});
```

#### 2. Render Function

```javascript
// services/videoRenderService.js
const renderVideo = async (clips, settings, outputPath, onProgress) => {
  return new Promise((resolve, reject) => {
    const command = ffmpeg();
    
    // Add video/image clips
    clips
      .filter(c => c.type === 'video' || c.type === 'image')
      .forEach(clip => {
        command.input(clip.src);
      });
    
    // Add text overlays
    const textClips = clips.filter(c => c.type === 'text');
    if (textClips.length > 0) {
      const textFilters = textClips.map(clip => 
        `drawtext=text='${clip.text}':` +
        `x=${clip.position.x}:y=${clip.position.y}:` +
        `fontsize=${clip.fontSize}:` +
        `fontcolor=${clip.color}:` +
        `enable='between(t,${clip.startTime},${clip.startTime + clip.duration})'`
      );
      command.videoFilters(textFilters);
    }
    
    // Add transitions
    clips.forEach((clip, idx) => {
      if (clip.transition && clip.transition !== 'none') {
        applyTransition(command, clip, idx);
      }
    });
    
    // Output settings
    command
      .outputFormat(settings.format)
      .videoCodec('libx264')
      .audioCodec('aac')
      .outputOptions([
        `-preset ${settings.quality === 'high' ? 'slow' : 'fast'}`,
        `-crf ${settings.quality === 'high' ? '18' : '23'}`,
        `-r ${settings.fps}`
      ])
      .size(getResolution(settings.resolution))
      .output(outputPath);
    
    // Progress tracking
    command.on('progress', (progress) => {
      onProgress(progress.percent || 0);
    });
    
    command.on('end', () => resolve(outputPath));
    command.on('error', (error) => reject(error));
    
    command.run();
  });
};

const applyTransition = (command, clip, index) => {
  const transitions = {
    fade: `fade=t=in:st=${clip.startTime}:d=0.5,fade=t=out:st=${clip.startTime + clip.duration - 0.5}:d=0.5`,
    dissolve: `xfade=transition=dissolve:duration=0.5:offset=${clip.startTime}`,
    wipe: `xfade=transition=wipeleft:duration=0.5:offset=${clip.startTime}`,
    slide: `xfade=transition=slideleft:duration=0.5:offset=${clip.startTime}`
  };
  
  if (transitions[clip.transition]) {
    command.videoFilters(transitions[clip.transition]);
  }
};

const getResolution = (preset) => {
  const resolutions = {
    '720p': '1280x720',
    '1080p': '1920x1080',
    '4k': '3840x2160'
  };
  return resolutions[preset] || '1920x1080';
};
```

### API Endpoints

#### POST /api/video/render

**Request:**
```json
{
  "businessId": 123,
  "projectId": 456,
  "clips": [
    {
      "type": "video",
      "src": "https://...",
      "startTime": 0,
      "duration": 5
    },
    {
      "type": "text",
      "text": "Hello World",
      "startTime": 1,
      "duration": 3,
      "fontSize": 48,
      "color": "#FFFFFF",
      "position": { "x": 100, "y": 100 }
    }
  ],
  "settings": {
    "format": "mp4",
    "quality": "high",
    "resolution": "1080p",
    "fps": 30
  }
}
```

**Response:**
```json
{
  "success": true,
  "jobId": "job_xyz789",
  "status": "pending",
  "estimatedTime": 120
}
```

#### GET /api/video/render/:jobId

**Response:**
```json
{
  "jobId": "job_xyz789",
  "status": "processing",
  "progress": 45,
  "startedAt": "2026-03-23T10:30:00Z"
}
```

**On Completion:**
```json
{
  "jobId": "job_xyz789",
  "status": "completed",
  "progress": 100,
  "outputUrl": "https://cdn.example.com/videos/job_xyz789.mp4",
  "fileSize": 5242880,
  "duration": 30,
  "completedAt": "2026-03-23T10:32:00Z"
}
```

### Frontend Integration

```javascript
// services/api/videoService.js
export const renderVideo = async (projectId, clips, settings) => {
  // 1. Submit render job
  const response = await fetch('/api/video/render', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify({ projectId, clips, settings })
  });
  
  const { jobId } = await response.json();
  
  // 2. Add to store
  addRenderJob({
    id: jobId,
    projectId,
    status: 'pending',
    progress: 0
  });
  
  // 3. Poll for progress
  const pollProgress = async () => {
    const statusResponse = await fetch(`/api/video/render/${jobId}`);
    const status = await statusResponse.json();
    
    // Update store
    updateRenderJob(jobId, status);
    
    if (status.status === 'completed') {
      // Add to media library
      addMediaAsset({
        name: `Video ${projectId}`,
        type: 'video',
        source: 'video-editor',
        url: status.outputUrl,
        size: status.fileSize,
        duration: status.duration
      });
      return status;
    } else if (status.status === 'failed') {
      throw new Error(status.error);
    } else {
      // Continue polling
      await new Promise(resolve => setTimeout(resolve, 2000));
      return pollProgress();
    }
  };
  
  return pollProgress();
};
```

---

## 📱 Social Media APIs

### Platform Integration

#### Instagram Graph API

```javascript
// services/instagram.js
export const publishToInstagram = async (businessId, post) => {
  const accessToken = await getInstagramToken(businessId);
  const instagramAccountId = await getInstagramAccountId(businessId);
  
  // 1. Create media container
  const containerResponse = await fetch(
    `https://graph.facebook.com/v18.0/${instagramAccountId}/media`,
    {
      method: 'POST',
      body: JSON.stringify({
        image_url: post.mediaUrl,
        caption: post.content,
        access_token: accessToken
      })
    }
  );
  
  const { id: containerId } = await containerResponse.json();
  
  // 2. Publish media
  const publishResponse = await fetch(
    `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish`,
    {
      method: 'POST',
      body: JSON.stringify({
        creation_id: containerId,
        access_token: accessToken
      })
    }
  );
  
  return await publishResponse.json();
};
```

#### LinkedIn API

```javascript
// services/linkedin.js
export const publishToLinkedIn = async (businessId, post) => {
  const accessToken = await getLinkedInToken(businessId);
  const personUrn = await getLinkedInPersonUrn(businessId);
  
  // 1. Upload image
  const uploadResponse = await uploadImageToLinkedIn(
    post.mediaUrl,
    accessToken
  );
  
  // 2. Create post
  const postResponse = await fetch(
    'https://api.linkedin.com/v2/ugcPosts',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: post.content
            },
            shareMediaCategory: 'IMAGE',
            media: [{
              status: 'READY',
              media: uploadResponse.asset
            }]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    }
  );
  
  return await postResponse.json();
};
```

#### Twitter API v2

```javascript
// services/twitter.js
export const publishToTwitter = async (businessId, post) => {
  const { accessToken, accessSecret } = await getTwitterTokens(businessId);
  
  // 1. Upload media
  const mediaId = await uploadMediaToTwitter(
    post.mediaUrl,
    accessToken,
    accessSecret
  );
  
  // 2. Create tweet
  const tweetResponse = await fetch(
    'https://api.twitter.com/2/tweets',
    {
      method: 'POST',
      headers: {
        'Authorization': `OAuth ${generateOAuthHeader(accessToken, accessSecret)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: post.content,
        media: {
          media_ids: [mediaId]
        }
      })
    }
  );
  
  return await tweetResponse.json();
};
```

### Unified Publishing Service

```javascript
// services/socialPublisher.js
export const publishToSocial = async (businessId, post, platforms) => {
  const results = await Promise.allSettled(
    platforms.map(async (platform) => {
      switch (platform) {
        case 'instagram':
          return await publishToInstagram(businessId, post);
        case 'linkedin':
          return await publishToLinkedIn(businessId, post);
        case 'twitter':
          return await publishToTwitter(businessId, post);
        case 'facebook':
          return await publishToFacebook(businessId, post);
        default:
          throw new Error(`Unknown platform: ${platform}`);
      }
    })
  );
  
  return results.map((result, idx) => ({
    platform: platforms[idx],
    status: result.status,
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : null
  }));
};
```

---

## 💾 Storage & CDN

### S3-Compatible Storage

```javascript
// services/storage.js
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export const uploadAsset = async (file, businessId) => {
  const key = `${businessId}/${Date.now()}_${file.name}`;
  
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: {
      businessId: businessId.toString(),
      uploadedAt: new Date().toISOString()
    }
  }));
  
  return {
    url: `${process.env.CDN_URL}/${key}`,
    key
  };
};

export const getSignedUploadUrl = async (businessId, filename) => {
  const key = `${businessId}/${Date.now()}_${filename}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  return { signedUrl, key };
};
```

### CDN Configuration

```javascript
// CloudFront or similar CDN setup
const cdnConfig = {
  originDomain: 's3.amazonaws.com',
  cacheBehaviors: {
    '/images/*': {
      ttl: 86400, // 24 hours
      compress: true
    },
    '/videos/*': {
      ttl: 86400,
      compress: false // Videos already compressed
    }
  },
  customHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=31536000'
  }
};
```

---

## ⚠️ Error Handling

### Standardized Error Responses

```javascript
// utils/apiError.js
export class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Middleware
export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      details: err.details
    });
  }
  
  // Unexpected errors
  console.error('Unexpected error:', err);
  return res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

### Retry Logic

```javascript
// utils/retry.js
export const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
};

// Usage
const result = await retryWithBackoff(
  () => replicate.run(model, input),
  3,
  1000
);
```

---

## 🚦 Rate Limiting & Quotas

### Rate Limiting Middleware

```javascript
// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';

export const aiRateLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:ai:'
  }),
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per business
  keyGenerator: (req) => req.body.businessId,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many requests, please try again later'
    });
  }
});
```

### Quota Management

```javascript
// services/quotaService.js
export const checkQuota = async (businessId, resourceType) => {
  const usage = await getMonthlyUsage(businessId, resourceType);
  const quota = await getBusinessQuota(businessId, resourceType);
  
  if (usage >= quota) {
    throw new ApiError(
      `Monthly ${resourceType} quota exceeded`,
      403,
      { usage, quota, resetDate: getNextMonthStart() }
    );
  }
  
  return { remaining: quota - usage, quota };
};

export const trackUsage = async (businessId, resourceType, amount) => {
  await db.query(`
    INSERT INTO usage_tracking 
    (business_id, resource_type, amount, timestamp)
    VALUES ($1, $2, $3, NOW())
  `, [businessId, resourceType, amount]);
};
```

---

## 📊 Monitoring & Logging

### Logging Setup

```javascript
// utils/logger.js
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('AI generation started', {
  businessId,
  prompt: prompt.substring(0, 100),
  model: 'sdxl'
});

logger.error('Render job failed', {
  jobId,
  error: error.message,
  stack: error.stack
});
```

### Metrics

```javascript
// utils/metrics.js
import { Counter, Histogram } from 'prom-client';

export const aiGenerationCounter = new Counter({
  name: 'ai_generations_total',
  help: 'Total number of AI generation requests',
  labelNames: ['business_id', 'status']
});

export const renderDurationHistogram = new Histogram({
  name: 'video_render_duration_seconds',
  help: 'Video render duration in seconds',
  labelNames: ['resolution', 'quality']
});

// Usage
aiGenerationCounter.inc({ business_id: businessId, status: 'success' });
renderDurationHistogram.observe({ resolution: '1080p', quality: 'high' }, duration);
```

---

## 🔐 Security Best Practices

### 1. API Key Management

```bash
# Never commit keys to git
# Use environment variables
REPLICATE_API_TOKEN=r8_xxx
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx
```

### 2. Input Validation

```javascript
import Joi from 'joi';

const generateImageSchema = Joi.object({
  businessId: Joi.number().required(),
  prompt: Joi.string().min(10).max(1000).required(),
  options: Joi.object({
    num_outputs: Joi.number().min(1).max(4),
    width: Joi.number().valid(512, 768, 1024),
    height: Joi.number().valid(512, 768, 1024)
  })
});

// Middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    next();
  };
};
```

### 3. Content Moderation

```javascript
// Check prompts for inappropriate content
export const moderatePrompt = async (prompt) => {
  const bannedWords = ['violence', 'explicit', 'hate'];
  const lowerPrompt = prompt.toLowerCase();
  
  for (const word of bannedWords) {
    if (lowerPrompt.includes(word)) {
      throw new ApiError('Inappropriate content detected', 400);
    }
  }
  
  // Optional: Use moderation API
  // const result = await moderationAPI.check(prompt);
  // if (result.flagged) throw error;
};
```

---

## 📝 Environment Variables

### Required Variables

```env
# Replicate
REPLICATE_API_TOKEN=r8_xxx

# AWS/Storage
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxx
S3_BUCKET=leadflexup-assets
CDN_URL=https://cdn.leadflexup.com

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Social Media APIs
INSTAGRAM_APP_ID=xxx
INSTAGRAM_APP_SECRET=xxx
LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx

# App Config
API_BASE_URL=https://api.leadflexup.com
MAX_UPLOAD_SIZE=52428800
RENDER_TIMEOUT=600000
```

---

**End of API Integration Guide**

For architecture overview, see `ARCHITECTURE.md`.  
For user documentation, see `CREATOR_TOOLS.md`.
