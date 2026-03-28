import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Play, Pause, SkipBack, SkipForward,
  Scissors, Copy, Trash2, Plus, Volume2, VolumeX, Download,
  Upload, Video, Music, Type, Image as ImageIcon, Layers,
  Save, Clock, Zap, Split, Sparkles
} from 'lucide-react';
import useStore from '../../store/useStore';

const VideoEditor = () => {
  const { businessId } = useParams();
  const { 
    theme, businesses, videoTemplates, videoProjects, 
    createVideoProject, updateVideoProject, renderJobs, addRenderJob 
  } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));
  
  const [showTemplateModal, setShowTemplateModal] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Default 30 seconds
  const [zoom, setZoom] = useState(1);
  const [showRenderModal, setShowRenderModal] = useState(false);
  const [renderSettings, setRenderSettings] = useState({
    format: 'mp4',
    quality: 'high',
    fps: 30,
    resolution: '1080p'
  });

  const timelineRef = useRef(null);

  const clipTypes = [
    { id: 'video', label: 'Video', icon: Video, color: 'blue' },
    { id: 'image', label: 'Image', icon: ImageIcon, color: 'purple' },
    { id: 'text', label: 'Text', icon: Type, color: 'green' },
    { id: 'audio', label: 'Audio', icon: Music, color: 'orange' }
  ];

  const transitions = [
    { id: 'none', name: 'None' },
    { id: 'fade', name: 'Fade' },
    { id: 'dissolve', name: 'Dissolve' },
    { id: 'wipe', name: 'Wipe' },
    { id: 'slide', name: 'Slide' }
  ];

  const handleSelectTemplate = (template) => {
    setShowTemplateModal(false);
    const project = {
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      templateId: template.id,
      duration: template.duration,
      aspectRatio: template.aspectRatio,
      clips: []
    };
    const savedProject = createVideoProject(project);
    setCurrentProject(savedProject);
    setDuration(template.duration);
  };

  const addClip = (type) => {
    const newClip = {
      id: Date.now(),
      type,
      name: `${type} ${clips.length + 1}`,
      startTime: currentTime,
      duration: type === 'audio' ? 10 : 3,
      layer: clips.filter(c => c.type !== 'audio').length,
      // Type-specific properties
      ...(type === 'video' && {
        src: null,
        volume: 100,
        speed: 1
      }),
      ...(type === 'image' && {
        src: null
      }),
      ...(type === 'text' && {
        text: 'Double click to edit',
        fontSize: 48,
        color: '#FFFFFF',
        fontFamily: 'Arial',
        position: { x: 50, y: 50 }
      }),
      ...(type === 'audio' && {
        src: null,
        volume: 80
      }),
      transition: 'none',
      effects: []
    };
    
    setClips([...clips, newClip]);
    setSelectedClip(newClip.id);
  };

  const updateClip = (clipId, updates) => {
    setClips(clips.map(clip =>
      clip.id === clipId ? { ...clip, ...updates } : clip
    ));
  };

  const deleteClip = (clipId) => {
    setClips(clips.filter(clip => clip.id !== clipId));
    setSelectedClip(null);
  };

  const duplicateClip = (clipId) => {
    const clip = clips.find(c => c.id === clipId);
    if (clip) {
      const newClip = {
        ...clip,
        id: Date.now(),
        name: `${clip.name} copy`,
        startTime: clip.startTime + clip.duration
      };
      setClips([...clips, newClip]);
    }
  };

  const splitClip = (clipId) => {
    const clip = clips.find(c => c.id === clipId);
    if (clip && currentTime > clip.startTime && currentTime < clip.startTime + clip.duration) {
      const splitPoint = currentTime - clip.startTime;
      const clip1 = {
        ...clip,
        duration: splitPoint
      };
      const clip2 = {
        ...clip,
        id: Date.now(),
        name: `${clip.name} (2)`,
        startTime: currentTime,
        duration: clip.duration - splitPoint
      };
      setClips(clips.map(c => c.id === clipId ? clip1 : c).concat(clip2));
    }
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    // In real implementation, this would control video playback
  };

  const handleRenderVideo = () => {
    const job = {
      projectId: currentProject?.id,
      clips,
      settings: renderSettings,
      outputName: `${currentProject?.name || 'video'}.${renderSettings.format}`
    };
    
    addRenderJob(job);
    setShowRenderModal(false);
    alert('Video render started! Check the render queue for progress.');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedClipData = clips.find(c => c.id === selectedClip);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className={`border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/business/${businessId}`}
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Video Editor
                </h1>
                <p className="text-sm text-gray-500">
                  {currentProject?.name || 'New Video'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (currentProject) {
                    updateVideoProject(currentProject.id, { clips });
                    alert('Project saved!');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setShowRenderModal(true)}
                className="px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Render</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <div className={`w-20 border-r ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="p-3 space-y-2">
            {clipTypes.map(type => (
              <button
                key={type.id}
                onClick={() => addClip(type.id)}
                className={`w-full p-3 rounded-lg flex flex-col items-center space-y-1 ${
                  theme === 'dark'
                    ? `hover:bg-${type.color}-600/20 text-${type.color}-400`
                    : `hover:bg-${type.color}-50 text-${type.color}-600`
                }`}
                title={type.label}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-xs">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center - Preview & Timeline */}
        <div className="flex-1 flex flex-col">
          {/* Preview Area */}
          <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center p-8`}>
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
              style={{
                aspectRatio: currentProject?.aspectRatio === '9:16' ? '9/16' : '16/9',
                maxHeight: '60vh',
                maxWidth: '90%'
              }}
            >
              {/* Video Preview Canvas */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-24 h-24 text-gray-600" />
              </div>
              
              {/* Overlay text/images from clips at current time */}
              {clips
                .filter(clip => 
                  clip.type !== 'audio' &&
                  currentTime >= clip.startTime && 
                  currentTime < clip.startTime + clip.duration
                )
                .map(clip => (
                  <div key={clip.id} className="absolute inset-0">
                    {clip.type === 'text' && (
                      <div
                        style={{
                          position: 'absolute',
                          left: `${clip.position?.x || 50}%`,
                          top: `${clip.position?.y || 50}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: clip.fontSize,
                          color: clip.color,
                          fontFamily: clip.fontFamily,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {clip.text}
                      </div>
                    )}
                  </div>
                ))}

              {/* Playback time overlay */}
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 rounded text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className={`border-t border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="px-6 py-3 flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentTime(0)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 text-white"
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setCurrentTime(duration)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className={`h-64 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-x-auto`}>
            <div className="p-4">
              {/* Timeline Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Timeline
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                    className={`px-3 py-1 rounded text-sm ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    -
                  </button>
                  <span className="text-sm">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                    className={`px-3 py-1 rounded text-sm ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Timeline Grid */}
              <div 
                ref={timelineRef}
                className={`relative rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                style={{ height: '160px', minWidth: `${duration * 50 * zoom}px` }}
              >
                {/* Time markers */}
                <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-700 flex">
                  {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-500 border-r border-gray-700"
                      style={{ width: `${50 * zoom}px`, paddingLeft: '4px' }}
                    >
                      {i}s
                    </div>
                  ))}
                </div>

                {/* Clips */}
                <div className="absolute top-6 left-0 right-0 bottom-0">
                  {clips
                    .filter(c => c.type !== 'audio')
                    .map(clip => (
                      <div
                        key={clip.id}
                        onClick={() => setSelectedClip(clip.id)}
                        className={`absolute h-8 rounded cursor-move ${
                          selectedClip === clip.id 
                            ? 'ring-2 ring-blue-500' 
                            : ''
                        }`}
                        style={{
                          left: `${clip.startTime * 50 * zoom}px`,
                          width: `${clip.duration * 50 * zoom}px`,
                          top: `${clip.layer * 32}px`,
                          backgroundColor: 
                            clip.type === 'video' ? '#3B82F6' :
                            clip.type === 'image' ? '#8B5CF6' :
                            '#10B981'
                        }}
                      >
                        <div className="px-2 py-1 text-xs text-white truncate flex items-center space-x-1">
                          {clip.type === 'video' && <Video className="w-3 h-3" />}
                          {clip.type === 'image' && <ImageIcon className="w-3 h-3" />}
                          {clip.type === 'text' && <Type className="w-3 h-3" />}
                          <span>{clip.name}</span>
                        </div>
                      </div>
                    ))}

                  {/* Audio track */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-gray-700">
                    {clips
                      .filter(c => c.type === 'audio')
                      .map(clip => (
                        <div
                          key={clip.id}
                          onClick={() => setSelectedClip(clip.id)}
                          className={`absolute h-7 rounded cursor-move bg-orange-600 ${
                            selectedClip === clip.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          style={{
                            left: `${clip.startTime * 50 * zoom}px`,
                            width: `${clip.duration * 50 * zoom}px`,
                            top: '2px'
                          }}
                        >
                          <div className="px-2 py-1 text-xs text-white truncate flex items-center space-x-1">
                            <Music className="w-3 h-3" />
                            <span>{clip.name}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
                  style={{ left: `${currentTime * 50 * zoom}px` }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1" />
                </div>
              </div>

              {/* Timeline Controls */}
              {selectedClipData && (
                <div className="mt-3 flex items-center space-x-2">
                  <button
                    onClick={() => duplicateClip(selectedClip)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => splitClip(selectedClip)}
                    className={`px-3 py-1 rounded-lg border text-sm ${
                      theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <Scissors className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteClip(selectedClip)}
                    className="px-3 py-1 rounded-lg border border-red-600 text-red-600 text-sm hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className={`w-80 border-l ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-y-auto`}>
          {selectedClipData ? (
            <div className="p-4">
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Clip Properties
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedClipData.name}
                    onChange={(e) => updateClip(selectedClip, { name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Start (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedClipData.startTime}
                      onChange={(e) => updateClip(selectedClip, { startTime: parseFloat(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Duration (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={selectedClipData.duration}
                      onChange={(e) => updateClip(selectedClip, { duration: parseFloat(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {selectedClipData.type === 'text' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Text</label>
                      <textarea
                        value={selectedClipData.text}
                        onChange={(e) => updateClip(selectedClip, { text: e.target.value })}
                        rows={3}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Font Size</label>
                      <input
                        type="number"
                        value={selectedClipData.fontSize}
                        onChange={(e) => updateClip(selectedClip, { fontSize: parseInt(e.target.value) })}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Color</label>
                      <input
                        type="color"
                        value={selectedClipData.color}
                        onChange={(e) => updateClip(selectedClip, { color: e.target.value })}
                        className="w-full h-10 rounded-lg"
                      />
                    </div>
                  </>
                )}

                {(selectedClipData.type === 'video' || selectedClipData.type === 'audio') && (
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Volume</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedClipData.volume}
                      onChange={(e) => updateClip(selectedClip, { volume: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500 text-center">{selectedClipData.volume}%</div>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Transition</label>
                  <select
                    value={selectedClipData.transition}
                    onChange={(e) => updateClip(selectedClip, { transition: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {transitions.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Layers className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className="text-sm text-gray-500">
                Select a clip to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Choose a Video Template
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videoTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                      : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="text-4xl mb-3">{template.thumbnail}</div>
                  <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {template.duration}s • {template.aspectRatio}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-purple-500/20 text-purple-500 rounded text-xs">
                    {template.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render Modal */}
      {showRenderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Render Video
              </h2>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Format</label>
                <select
                  value={renderSettings.format}
                  onChange={(e) => setRenderSettings({ ...renderSettings, format: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="mp4">MP4</option>
                  <option value="webm">WebM</option>
                  <option value="mov">MOV</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Quality</label>
                <select
                  value={renderSettings.quality}
                  onChange={(e) => setRenderSettings({ ...renderSettings, quality: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="low">Low (faster)</option>
                  <option value="medium">Medium</option>
                  <option value="high">High (slower)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Resolution</label>
                <select
                  value={renderSettings.resolution}
                  onChange={(e) => setRenderSettings({ ...renderSettings, resolution: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="720p">720p (HD)</option>
                  <option value="1080p">1080p (Full HD)</option>
                  <option value="4k">4K (Ultra HD)</option>
                </select>
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'
              }`}>
                <p className="text-sm text-blue-600">
                  Estimated render time: ~{Math.ceil(duration / 5)} minutes
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRenderModal(false)}
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleRenderVideo}
                  className="flex-1 px-4 py-3 rounded-lg bg-navy-900 text-white hover:bg-navy-800 font-semibold"
                >
                  Start Render
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
