import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Type, Square, Circle, Image as ImageIcon, 
  Download, Save, Undo, Redo, Trash2, ZoomIn, ZoomOut, Grid,
  Layers, Plus, Eye, EyeOff, Lock, Unlock, Copy, Move, Palette,
  Upload, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Share2
} from 'lucide-react';
import useStore from '../../store/useStore';

const ImageDesigner = () => {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const { 
    theme, businesses, designTemplates, designProjects, 
    createDesignProject, updateDesignProject, addMediaAsset 
  } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));
  
  const canvasRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [tool, setTool] = useState('select');
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showExportModal, setShowExportModal] = useState(false);

  const tools = [
    { id: 'select', label: 'Select', icon: Move },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'image', label: 'Image', icon: ImageIcon }
  ];

  const platformPresets = [
    { name: 'Instagram Post', size: { width: 1080, height: 1080 } },
    { name: 'Instagram Story', size: { width: 1080, height: 1920 } },
    { name: 'Facebook Post', size: { width: 1200, height: 630 } },
    { name: 'LinkedIn Post', size: { width: 1200, height: 627 } },
    { name: 'Twitter Post', size: { width: 1200, height: 675 } },
    { name: 'YouTube Thumbnail', size: { width: 1280, height: 720 } }
  ];

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCanvasSize({ width: template.width, height: template.height });
    setShowTemplateModal(false);
    
    // Create new project
    const project = {
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      templateId: template.id,
      canvasSize: { width: template.width, height: template.height },
      layers: []
    };
    const savedProject = createDesignProject(project);
    setCurrentProject(savedProject);
  };

  const addLayer = (type) => {
    const newLayer = {
      id: Date.now(),
      type,
      name: `${type} ${layers.length + 1}`,
      visible: true,
      locked: false,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      rotation: 0,
      opacity: 1,
      // Type-specific properties
      ...(type === 'text' && {
        text: 'Double click to edit',
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: '#000000',
        align: 'left'
      }),
      ...(type === 'rectangle' && {
        fill: '#3B82F6',
        stroke: '#000000',
        strokeWidth: 0,
        cornerRadius: 0
      }),
      ...(type === 'circle' && {
        fill: '#8B5CF6',
        stroke: '#000000',
        strokeWidth: 0
      }),
      ...(type === 'image' && {
        src: null
      })
    };
    
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer.id);
    saveToHistory([...layers, newLayer]);
  };

  const updateLayer = (layerId, updates) => {
    const updatedLayers = layers.map(layer =>
      layer.id === layerId ? { ...layer, ...updates } : layer
    );
    setLayers(updatedLayers);
    saveToHistory(updatedLayers);
  };

  const deleteLayer = (layerId) => {
    const updatedLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(updatedLayers);
    setSelectedLayer(null);
    saveToHistory(updatedLayers);
  };

  const duplicateLayer = (layerId) => {
    const layer = layers.find(l => l.id === layerId);
    if (layer) {
      const newLayer = {
        ...layer,
        id: Date.now(),
        name: `${layer.name} copy`,
        x: layer.x + 20,
        y: layer.y + 20
      };
      setLayers([...layers, newLayer]);
      saveToHistory([...layers, newLayer]);
    }
  };

  const saveToHistory = (newLayers) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newLayers)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLayers(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLayers(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const handleExport = async (format) => {
    // In a real implementation, this would render the canvas to the specified format
    const exportData = {
      name: currentProject?.name || 'design',
      type: 'image',
      format,
      size: canvasSize.width * canvasSize.height * 4, // Estimated
      url: '/placeholder-export.png', // This would be the actual rendered image
      source: 'design',
      tags: ['design', selectedTemplate?.platform || 'custom']
    };
    
    addMediaAsset(exportData);
    setShowExportModal(false);
    
    // Navigate to media library or show success
    alert(`Design exported as ${format.toUpperCase()}`);
  };

  const handleSaveProject = () => {
    if (currentProject) {
      updateDesignProject(currentProject.id, {
        layers,
        canvasSize,
        updatedAt: new Date().toISOString()
      });
      alert('Project saved successfully!');
    }
  };

  const selectedLayerData = layers.find(l => l.id === selectedLayer);

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
                  Image Designer
                </h1>
                <p className="text-sm text-gray-500">
                  {currentProject?.name || 'New Design'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className={`p-2 rounded-lg ${
                  historyIndex <= 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <Undo className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className={`p-2 rounded-lg ${
                  historyIndex >= history.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <Redo className="w-5 h-5" />
              </button>
              
              <div className="w-px h-6 bg-gray-700 mx-2" />
              
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="w-px h-6 bg-gray-700 mx-2" />

              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
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
            {tools.map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setTool(t.id);
                  if (t.id !== 'select') {
                    addLayer(t.id);
                  }
                }}
                className={`w-full p-3 rounded-lg flex flex-col items-center space-y-1 ${
                  tool === t.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title={t.label}
              >
                <t.icon className="w-5 h-5" />
                <span className="text-xs">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className={`flex-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} overflow-auto`}>
          <div className="min-h-full flex items-center justify-center p-8">
            <div
              ref={canvasRef}
              style={{
                width: canvasSize.width * zoom,
                height: canvasSize.height * zoom,
                transform: `scale(${zoom})`,
                transformOrigin: 'center center'
              }}
              className="bg-white shadow-2xl relative"
            >
              {/* Render layers */}
              {layers.map(layer => (
                layer.visible && (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    style={{
                      position: 'absolute',
                      left: layer.x,
                      top: layer.y,
                      width: layer.width,
                      height: layer.height,
                      transform: `rotate(${layer.rotation}deg)`,
                      opacity: layer.opacity,
                      cursor: layer.locked ? 'default' : 'move',
                      border: selectedLayer === layer.id ? '2px solid #3B82F6' : 'none'
                    }}
                  >
                    {layer.type === 'text' && (
                      <div
                        style={{
                          fontSize: layer.fontSize,
                          fontFamily: layer.fontFamily,
                          fontWeight: layer.fontWeight,
                          fontStyle: layer.fontStyle,
                          color: layer.color,
                          textAlign: layer.align,
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {layer.text}
                      </div>
                    )}
                    {layer.type === 'rectangle' && (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: layer.fill,
                          border: layer.strokeWidth ? `${layer.strokeWidth}px solid ${layer.stroke}` : 'none',
                          borderRadius: layer.cornerRadius
                        }}
                      />
                    )}
                    {layer.type === 'circle' && (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: layer.fill,
                          border: layer.strokeWidth ? `${layer.strokeWidth}px solid ${layer.stroke}` : 'none',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                    {layer.type === 'image' && layer.src && (
                      <img
                        src={layer.src}
                        alt={layer.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Layers & Properties */}
        <div className={`w-80 border-l ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} overflow-y-auto`}>
          {/* Layers Panel */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Layers
              </h3>
              <Layers className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="space-y-1">
              {layers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No layers yet. Add elements using the toolbar.
                </p>
              ) : (
                layers.slice().reverse().map(layer => (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id)}
                    className={`p-2 rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedLayer === layer.id
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'hover:bg-gray-800 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLayer(layer.id, { visible: !layer.visible });
                        }}
                      >
                        {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLayer(layer.id, { locked: !layer.locked });
                        }}
                      >
                        {layer.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4 opacity-50" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateLayer(layer.id);
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLayer(layer.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Properties Panel */}
          {selectedLayerData && (
            <div className="p-4">
              <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Properties
              </h3>
              
              <div className="space-y-3">
                {/* Common Properties */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={selectedLayerData.name}
                    onChange={(e) => updateLayer(selectedLayer, { name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">X</label>
                    <input
                      type="number"
                      value={selectedLayerData.x}
                      onChange={(e) => updateLayer(selectedLayer, { x: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Y</label>
                    <input
                      type="number"
                      value={selectedLayerData.y}
                      onChange={(e) => updateLayer(selectedLayer, { y: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Width</label>
                    <input
                      type="number"
                      value={selectedLayerData.width}
                      onChange={(e) => updateLayer(selectedLayer, { width: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Height</label>
                    <input
                      type="number"
                      value={selectedLayerData.height}
                      onChange={(e) => updateLayer(selectedLayer, { height: parseInt(e.target.value) })}
                      className={`w-full px-3 py-2 rounded-lg border text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Text-specific properties */}
                {selectedLayerData.type === 'text' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Text Content</label>
                      <textarea
                        value={selectedLayerData.text}
                        onChange={(e) => updateLayer(selectedLayer, { text: e.target.value })}
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
                        value={selectedLayerData.fontSize}
                        onChange={(e) => updateLayer(selectedLayer, { fontSize: parseInt(e.target.value) })}
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
                        value={selectedLayerData.color}
                        onChange={(e) => updateLayer(selectedLayer, { color: e.target.value })}
                        className="w-full h-10 rounded-lg"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateLayer(selectedLayer, { 
                          fontWeight: selectedLayerData.fontWeight === 'bold' ? 'normal' : 'bold' 
                        })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedLayerData.fontWeight === 'bold'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : theme === 'dark'
                            ? 'border-gray-700 hover:bg-gray-800'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <Bold className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => updateLayer(selectedLayer, { 
                          fontStyle: selectedLayerData.fontStyle === 'italic' ? 'normal' : 'italic' 
                        })}
                        className={`flex-1 p-2 rounded-lg border ${
                          selectedLayerData.fontStyle === 'italic'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : theme === 'dark'
                            ? 'border-gray-700 hover:bg-gray-800'
                            : 'border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        <Italic className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </>
                )}

                {/* Shape-specific properties */}
                {(selectedLayerData.type === 'rectangle' || selectedLayerData.type === 'circle') && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Fill Color</label>
                      <input
                        type="color"
                        value={selectedLayerData.fill}
                        onChange={(e) => updateLayer(selectedLayer, { fill: e.target.value })}
                        className="w-full h-10 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Stroke Width</label>
                      <input
                        type="number"
                        value={selectedLayerData.strokeWidth}
                        onChange={(e) => updateLayer(selectedLayer, { strokeWidth: parseInt(e.target.value) })}
                        className={`w-full px-3 py-2 rounded-lg border text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>

                    {selectedLayerData.strokeWidth > 0 && (
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Stroke Color</label>
                        <input
                          type="color"
                          value={selectedLayerData.stroke}
                          onChange={(e) => updateLayer(selectedLayer, { stroke: e.target.value })}
                          className="w-full h-10 rounded-lg"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
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
              Choose a Template
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {designTemplates.map(template => (
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
                    {template.width} × {template.height}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-500/20 text-blue-500 rounded text-xs">
                    {template.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t pt-4 border-gray-800">
              <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Or choose a custom size
              </h3>
              <div className="flex flex-wrap gap-2">
                {platformPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const customTemplate = {
                        id: `custom-${idx}`,
                        name: preset.name,
                        width: preset.size.width,
                        height: preset.size.height,
                        category: 'custom',
                        platform: 'custom',
                        thumbnail: '📐'
                      };
                      handleSelectTemplate(customTemplate);
                    }}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      theme === 'dark'
                        ? 'border-gray-700 hover:bg-gray-800'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Export Design
            </h2>
            
            <div className="space-y-3">
              {['PNG', 'JPG', 'WebP'].map(format => (
                <button
                  key={format}
                  onClick={() => handleExport(format.toLowerCase())}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-500'
                      : 'bg-white border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {format}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format === 'PNG' && 'Best for graphics with transparency'}
                        {format === 'JPG' && 'Smallest file size, no transparency'}
                        {format === 'WebP' && 'Modern format, great compression'}
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowExportModal(false)}
              className={`w-full mt-4 px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'border-gray-700 text-white hover:bg-gray-800'
                  : 'border-gray-300 text-gray-900 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDesigner;
