import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Sparkles, Image, Video, Send,
  ArrowRight, Check, Wand2, Edit2, Calendar, Share2,
  Zap, Download, Eye, Plus, Clock
} from 'lucide-react';
import useStore from '../../store/useStore';

const CreatorPipeline = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { 
    theme, businesses, aiGenerations, mediaAssets, 
    addAIGeneration, updateAIGeneration, addMediaAsset 
  } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));
  
  const [currentStep, setCurrentStep] = useState(0);
  const [workflow, setWorkflow] = useState({
    type: null, // 'image' or 'video'
    aiPrompt: '',
    generatedAssets: [],
    selectedAssets: [],
    editedAssets: [],
    campaign: null
  });

  const steps = [
    { id: 0, name: 'Choose Type', icon: Sparkles },
    { id: 1, name: 'Generate with AI', icon: Wand2 },
    { id: 2, name: 'Select & Edit', icon: Edit2 },
    { id: 3, name: 'Schedule & Publish', icon: Calendar }
  ];

  const contentTypes = [
    {
      id: 'image',
      name: 'Image Content',
      description: 'Generate images, edit in designer, publish to social',
      icon: Image,
      color: 'blue',
      flow: ['AI Generate', 'Image Designer', 'Social Post']
    },
    {
      id: 'video',
      name: 'Video Content',
      description: 'Generate stills, create videos, publish campaigns',
      icon: Video,
      color: 'purple',
      flow: ['AI Generate', 'Video Editor', 'Social Campaign']
    }
  ];

  const handleGenerateAI = async () => {
    // Simulated AI generation
    const generation = {
      prompt: workflow.aiPrompt,
      type: workflow.type,
      model: workflow.type === 'image' ? 'SDXL' : 'Stable Diffusion',
      outputs: 4
    };
    
    const savedGeneration = addAIGeneration(generation);
    
    // Simulate API call
    setTimeout(() => {
      const mockAssets = Array.from({ length: 4 }, (_, i) => ({
        id: Date.now() + i,
        name: `AI Generated ${workflow.type} ${i + 1}`,
        type: workflow.type,
        url: `/placeholder-${workflow.type}-${i}.jpg`,
        source: 'ai',
        prompt: workflow.aiPrompt,
        size: 1024 * 500,
        tags: ['ai-generated', workflow.type]
      }));
      
      updateAIGeneration(savedGeneration.id, { 
        status: 'completed',
        outputs: mockAssets 
      });
      
      setWorkflow({ ...workflow, generatedAssets: mockAssets });
      setCurrentStep(2);
    }, 3000);
    
    setCurrentStep(1.5); // Loading state
  };

  const handleSelectAsset = (assetId) => {
    setWorkflow({
      ...workflow,
      selectedAssets: workflow.selectedAssets.includes(assetId)
        ? workflow.selectedAssets.filter(id => id !== assetId)
        : [...workflow.selectedAssets, assetId]
    });
  };

  const handleEditAsset = (assetId) => {
    const asset = workflow.generatedAssets.find(a => a.id === assetId);
    if (asset) {
      addMediaAsset(asset);
      if (workflow.type === 'image') {
        navigate(`/business/${businessId}/design?asset=${assetId}`);
      } else {
        navigate(`/business/${businessId}/video?asset=${assetId}`);
      }
    }
  };

  const handleCreateCampaign = () => {
    // Save selected assets to media library
    workflow.selectedAssets.forEach(assetId => {
      const asset = workflow.generatedAssets.find(a => a.id === assetId);
      if (asset) {
        addMediaAsset(asset);
      }
    });
    
    // Navigate to social media with assets
    navigate(`/business/${businessId}/social?assets=${workflow.selectedAssets.join(',')}`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm">
        <Link
          to={`/business/${businessId}`}
          className={`flex items-center space-x-1 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Business Workspace</span>
        </Link>
        <ChevronRight className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Creator Pipeline</span>
      </div>

      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Creator Pipeline
        </h1>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          AI → Design → Publish in one seamless workflow
        </p>
      </div>

      {/* Progress Steps */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.id
                      ? 'bg-green-600 text-white'
                      : currentStep === step.id
                      ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                      : theme === 'dark'
                      ? 'bg-gray-800 text-gray-400'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.id
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-gray-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-96">
          {/* Step 0: Choose Type */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What do you want to create?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setWorkflow({ ...workflow, type: type.id });
                      setCurrentStep(1);
                    }}
                    className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                        : 'bg-white border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-lg bg-${type.color}-500/20 flex items-center justify-center mb-4`}>
                      <type.icon className={`w-8 h-8 text-${type.color}-500`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      {type.flow.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <span>{item}</span>
                          {idx < type.flow.length - 1 && <ArrowRight className="w-4 h-4" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Generate with AI */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Describe what you want to create
                </h2>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-sm font-medium">
                  {workflow.type === 'image' ? 'SDXL' : 'Stable Diffusion'}
                </span>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  AI Prompt
                </label>
                <textarea
                  value={workflow.aiPrompt}
                  onChange={(e) => setWorkflow({ ...workflow, aiPrompt: e.target.value })}
                  rows={6}
                  placeholder={`E.g., ${workflow.type === 'image' 
                    ? 'A modern minimalist product photo with soft lighting, professional studio setup, white background'
                    : 'A dynamic motion graphics intro with particle effects, corporate style, blue and purple gradient'}`}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">Pro Tip</p>
                    <p className="text-sm text-blue-600/80">
                      Be specific! Include details about style, mood, colors, and composition for best results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className={`px-6 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateAI}
                  disabled={!workflow.aiPrompt}
                  className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
                    workflow.aiPrompt
                      ? 'bg-navy-900 text-white hover:bg-navy-800'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Generate (4 variants)</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 1.5: Loading */}
          {currentStep === 1.5 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-6" />
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Generating your {workflow.type}s...
              </h3>
              <p className="text-gray-500">This usually takes 10-30 seconds</p>
              <div className="mt-6 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Average time: 20 seconds</span>
              </div>
            </div>
          )}

          {/* Step 2: Select & Edit */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Select assets to use ({workflow.selectedAssets.length} selected)
                </h2>
                <button
                  onClick={() => setWorkflow({ ...workflow, selectedAssets: workflow.generatedAssets.map(a => a.id) })}
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Select All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {workflow.generatedAssets.map(asset => (
                  <div
                    key={asset.id}
                    className={`relative rounded-xl border-2 overflow-hidden transition-all ${
                      workflow.selectedAssets.includes(asset.id)
                        ? 'ring-4 ring-blue-500/50 border-blue-500'
                        : theme === 'dark'
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-3 left-3 z-10">
                      <button
                        onClick={() => handleSelectAsset(asset.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          workflow.selectedAssets.includes(asset.id)
                            ? 'bg-blue-600 border-blue-600'
                            : 'bg-white/80 border-white/80 hover:bg-white'
                        }`}
                      >
                        {workflow.selectedAssets.includes(asset.id) && <Check className="w-4 h-4 text-white" />}
                      </button>
                    </div>

                    {/* Preview */}
                    <div className="aspect-square bg-gray-900 flex items-center justify-center">
                      {workflow.type === 'image' ? (
                        <Image className="w-24 h-24 text-gray-600" />
                      ) : (
                        <Video className="w-24 h-24 text-gray-600" />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="p-3 flex items-center justify-between">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {asset.name}
                      </span>
                      <button
                        onClick={() => handleEditAsset(asset.id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`px-6 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Regenerate
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={workflow.selectedAssets.length === 0}
                  className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 ${
                    workflow.selectedAssets.length > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue to Publish</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Schedule & Publish */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Ready to publish
              </h2>

              <div className={`p-6 rounded-xl border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Selected Assets
                    </h3>
                    <p className="text-sm text-gray-500">
                      {workflow.selectedAssets.length} {workflow.type}(s) ready to publish
                    </p>
                  </div>
                  <Check className="w-8 h-8 text-green-500" />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {workflow.selectedAssets.map(assetId => {
                    const asset = workflow.generatedAssets.find(a => a.id === assetId);
                    return (
                      <div key={assetId} className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
                        {workflow.type === 'image' ? (
                          <Image className="w-8 h-8 text-gray-600" />
                        ) : (
                          <Video className="w-8 h-8 text-gray-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleCreateCampaign}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-purple-500'
                      : 'bg-white border-gray-200 hover:border-purple-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Create Social Campaign
                  </h3>
                  <p className="text-sm text-gray-500">
                    Schedule posts across multiple platforms
                  </p>
                </button>

                <Link
                  to={`/business/${businessId}/media`}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                      : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                    <Download className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Save to Media Library
                  </h3>
                  <p className="text-sm text-gray-500">
                    Store for later use
                  </p>
                </Link>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`px-6 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-navy-900/20 border-navy-800' : 'bg-navy-50 border-navy-200'
      }`}>
        <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Or jump directly to:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            to={`/business/${businessId}/design`}
            className={`p-4 rounded-lg border flex items-center space-x-3 hover:scale-105 transition-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <Image className="w-8 h-8 text-blue-500" />
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Image Designer
              </div>
              <div className="text-xs text-gray-500">Start from scratch</div>
            </div>
          </Link>

          <Link
            to={`/business/${businessId}/video`}
            className={`p-4 rounded-lg border flex items-center space-x-3 hover:scale-105 transition-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <Video className="w-8 h-8 text-purple-500" />
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Video Editor
              </div>
              <div className="text-xs text-gray-500">Create videos</div>
            </div>
          </Link>

          <Link
            to={`/business/${businessId}/media`}
            className={`p-4 rounded-lg border flex items-center space-x-3 hover:scale-105 transition-all ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <Sparkles className="w-8 h-8 text-pink-500" />
            <div>
              <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Media Library
              </div>
              <div className="text-xs text-gray-500">Browse assets</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatorPipeline;
