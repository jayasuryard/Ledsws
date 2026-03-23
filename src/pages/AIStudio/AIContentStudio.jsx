import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, FileText, MessageSquare, ShoppingCart, Wand2, 
  Image, Video, Download, Eye, Edit2, Share2, Zap 
} from 'lucide-react';
import useStore from '../../store/useStore';

const AIContentStudio = () => {
  const navigate = useNavigate();
  const { theme, businesses, activeBusiness, addAIGeneration, addMediaAsset } = useStore();
  const [selectedBusiness, setSelectedBusiness] = useState(activeBusiness?.id || '');
  const [contentType, setContentType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { id: 'blog', label: 'Blog Post', icon: FileText, description: 'Long-form articles', category: 'text' },
    { id: 'social', label: 'Social Post', icon: MessageSquare, description: 'Instagram, Facebook, LinkedIn', category: 'text' },
    { id: 'ecommerce', label: 'Product Description', icon: ShoppingCart, description: 'E-commerce copy', category: 'text' },
    { id: 'image', label: 'AI Image (SDXL)', icon: Image, description: 'Generate images with AI', category: 'media' },
    { id: 'video-concept', label: 'Video Concept', icon: Video, description: 'Storyboard ideas', category: 'text' }
  ];

  const handleGenerate = () => {
    if (!selectedBusiness || !contentType || !prompt) return;
    
    setIsGenerating(true);
    
    // Image generation via Replicate SDXL
    if (contentType === 'image') {
      const generation = {
        prompt,
        type: 'image',
        model: 'SDXL',
        businessId: selectedBusiness,
        outputs: 4
      };
      
      addAIGeneration(generation);
      
      // Simulate Replicate API call
      setTimeout(() => {
        const mockImages = Array.from({ length: 4 }, (_, i) => ({
          id: Date.now() + i,
          name: `AI Image ${i + 1}`,
          type: 'image',
          url: `/placeholder-ai-${i}.jpg`,
          source: 'ai',
          prompt: prompt,
          size: 1024 * 800,
          tags: ['ai-generated', 'sdxl'],
          dimensions: { width: 1024, height: 1024 }
        }));
        
        setGeneratedImages(mockImages);
        setIsGenerating(false);
      }, 4000);
    } else {
      // Text content generation
      setTimeout(() => {
        setGeneratedContent(`Generated ${contentType} content for: ${prompt}\n\nThis is a sample AI-generated content that would appear here. In production, this would call your AI API using the brand voice and guidelines from the selected business profile.`);
        setGeneratedImages([]);
        setIsGenerating(false);
      }, 2000);
    }
  };

  const handleSaveToLibrary = (image) => {
    addMediaAsset(image);
    alert('Image saved to Media Library!');
  };

  const handleEditInDesigner = (image) => {
    addMediaAsset(image);
    navigate(`/business/${selectedBusiness}/design?asset=${image.id}`);
  };

  const handleCreatePost = (image) => {
    addMediaAsset(image);
    navigate(`/business/${selectedBusiness}/social?asset=${image.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          AI Content Studio
        </h1>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Generate content using your brand voice and AI
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className={`lg:col-span-1 p-6 rounded-xl border h-fit ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Configuration
          </h2>

          {/* Business Selection */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Select Business *
              </label>
              <select
                value={selectedBusiness}
                onChange={(e) => setSelectedBusiness(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="">Choose business...</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Brand voice and guidelines will be applied
              </p>
            </div>

            {/* Content Type */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Content Type *
              </label>
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`w-full p-4 rounded-lg border transition-all text-left ${
                      contentType === type.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className={`w-5 h-5 ${
                        contentType === type.id ? 'text-blue-500' : 'text-gray-500'
                      }`} />
                      <div>
                        <div className={`font-medium text-sm ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Generation */}
        <div className={`lg:col-span-2 p-6 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>Images */}
          {generatedImages.length > 0 && (
            <div className="mt-6">
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Generated Images ({generatedImages.length})
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {generatedImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative group rounded-lg border overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="aspect-square bg-gray-900 flex items-center justify-center">
                      <Image className="w-16 h-16 text-gray-600" />
                    </div>
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleSaveToLibrary(image)}
                        className="p-2 bg-white rounded-lg hover:bg-gray-100"
                        title="Save to Library"
                      >
                        <Download className="w-5 h-5 text-gray-900" />
                      </button>
                      <button
                        onClick={() => handleEditInDesigner(image)}
                        className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                        title="Edit in Designer"
                      >
                        <Edit2 className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleCreatePost(image)}
                        className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                        title="Create Post"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <div className="p-3">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {image.name}
                      </p>
                      <p className="text-xs text-gray-500">1024 × 1024</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mt-4 p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Ready to use these images?
                    </p>
                    <p className="text-sm text-gray-500">
                      Edit them or publish directly to social media
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/business/${selectedBusiness}/creator`)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Creator Pipeline</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Generated Text Content */}
          {generatedContent && contentType !== 'image' && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Generated Content
                </h3>
                <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">
                  Copy
                </button>
              </div>
              <div className={`p-4 rounded-lg border whitespace-pre-wrap ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-300'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                {generatedContent}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!generatedContent && generatedImages.length === 0 && !isGenerating && (
            <div className="mt-8 text-center py-12">
              <Sparkles className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className="text-gray-500">
                Select a business, choose content type, and enter a prompt to start generating
              </p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedBusiness || !contentType || !prompt || isGenerating}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              !selectedBusiness || !contentType || !prompt || isGenerating
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIContentStudio;
