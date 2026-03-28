import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Image, Video, FileText, Palette, Wand2,
  Plus, Download, Grid, List, Search
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../../components/ui';
import useStore from '../../store/useStore';

const ModernAIStudio = () => {
  const { activeBusiness } = useStore();
  const navigate = useNavigate();
  const [view, setView] = useState('grid');

  const tools = [
    {
      id: 'text',
      title: 'AI Text Generator',
      description: 'Create blog posts, social media content, and marketing copy',
      icon: FileText,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      path: '/app/ai-studio/text',
    },
    {
      id: 'image',
      title: 'Image Designer',
      description: 'Canva-like editor for creating custom graphics',
      icon: Image,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      path: '/app/business/:id/design',
    },
    {
      id: 'video',
      title: 'Video Editor',
      description: 'Timeline-based video creation and editing',
      icon: Video,
      color: 'bg-pink-50',
      iconColor: 'text-pink-600',
      path: '/app/business/:id/video',
    },
    {
      id: 'media',
      title: 'Media Library',
      description: 'Centralized storage for all your assets',
      icon: Grid,
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      path: '/app/business/:id/media',
    },
    {
      id: 'creator',
      title: 'Creator Pipeline',
      description: 'End-to-end content creation workflow',
      icon: Wand2,
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
      path: '/app/business/:id/creator',
    },
    {
      id: 'brand',
      title: 'Brand Kit',
      description: 'Manage your brand colors, fonts, and assets',
      icon: Palette,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      path: '/app/ai-studio/brand-kit',
    },
  ];

  const recentGenerations = [
    { id: 1, type: 'Blog Post', title: 'Top 10 Marketing Strategies for 2026', date: '2 hours ago' },
    { id: 2, type: 'Social Media', title: 'Instagram Story - Product Launch', date: '5 hours ago' },
    { id: 3, type: 'Video', title: 'Product Demo - 30s Version', date: '1 day ago' },
    { id: 4, type: 'Image', title: 'Facebook Ad Banner - Spring Sale', date: '1 day ago' },
  ];

  const handleToolClick = (tool) => {
    let path = tool.path;
    if (path.includes(':id')) {
      if (!activeBusiness) {
        alert('Please select a business first.');
        return;
      }
      path = path.replace(':id', activeBusiness.id);
    }
    navigate(path);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">AI Content Studio</h1>
          <p className="text-gray-600">Create stunning content with AI-powered tools</p>
        </div>
        <Button variant="primary" icon={<Sparkles className="w-5 h-5" />}>
          New Generation
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <Input
              leftIcon={<Search className="w-5 h-5" />}
              placeholder="Search tools and content..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${
                view === 'grid' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-all ${
                view === 'list' ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>

      {/* AI Tools Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const needsBusiness = tool.path.includes(':id');
            const disabled = needsBusiness && !activeBusiness;
            return (
              <Card
                key={tool.id}
                clickable={!disabled}
                hover={!disabled}
                onClick={() => !disabled && handleToolClick(tool)}
                className={`p-6 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-4`}>
                  <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <div className="flex items-center text-navy-900 font-medium text-sm">
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </div>
                {disabled && (
                  <div className="mt-2 text-xs text-red-500">Select a business to use this tool</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Generations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Generations</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {recentGenerations.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-navy-900 hover:bg-navy-50 cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.type} • {item.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ModernAIStudio;
