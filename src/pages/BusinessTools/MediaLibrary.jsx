import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Upload, Image, Video, FileText, 
  Music, Filter, Grid, List, Search, Trash2, Download, 
  Eye, Edit2, Share2, FolderOpen, Tag, X, Check, Sparkles
} from 'lucide-react';
import useStore from '../../store/useStore';

const MediaLibrary = () => {
  const { businessId } = useParams();
  const { theme, businesses, mediaAssets, addMediaAsset, updateMediaAsset, deleteMediaAsset } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));
  
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    file: null,
    name: '',
    tags: '',
    source: 'upload'
  });

  // Filter assets by business
  const businessAssets = mediaAssets.filter(a => a.businessId === parseInt(businessId));

  const assetTypes = [
    { id: 'all', label: 'All Assets', icon: FolderOpen, count: businessAssets.length },
    { id: 'image', label: 'Images', icon: Image, count: businessAssets.filter(a => a.type === 'image').length },
    { id: 'video', label: 'Videos', icon: Video, count: businessAssets.filter(a => a.type === 'video').length },
    { id: 'ai-generated', label: 'AI Generated', icon: Sparkles, count: businessAssets.filter(a => a.source === 'ai').length }
  ];

  const filteredAssets = businessAssets
    .filter(asset => {
      if (filterType !== 'all') {
        if (filterType === 'ai-generated') return asset.source === 'ai';
        return asset.type === filterType;
      }
      return true;
    })
    .filter(asset => 
      asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleUpload = () => {
    if (uploadForm.file) {
      const newAsset = {
        name: uploadForm.name || uploadForm.file.name,
        type: uploadForm.file.type.startsWith('image') ? 'image' : 'video',
        size: uploadForm.file.size,
        url: URL.createObjectURL(uploadForm.file),
        tags: uploadForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        source: uploadForm.source,
        dimensions: { width: 1920, height: 1080 }
      };
      addMediaAsset(newAsset);
      setShowUploadModal(false);
      setUploadForm({ file: null, name: '', tags: '', source: 'upload' });
    }
  };

  const toggleAssetSelection = (assetId) => {
    setSelectedAssets(prev =>
      prev.includes(assetId) ? prev.filter(id => id !== assetId) : [...prev, assetId]
    );
  };

  const handleBulkDelete = () => {
    selectedAssets.forEach(id => deleteMediaAsset(id));
    setSelectedAssets([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Media Library</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Media Library
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Manage all your creative assets
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
        >
          <Upload className="w-5 h-5" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {assetTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setFilterType(type.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              filterType === type.id
                ? theme === 'dark'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-blue-50 border-blue-500 text-blue-600'
                : theme === 'dark'
                ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <type.icon className="w-5 h-5" />
              <span className="text-2xl font-bold">{type.count}</span>
            </div>
            <div className="text-sm">{type.label}</div>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assets by name or tags..."
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          />
        </div>

        {selectedAssets.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedAssets.length} selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className={`flex items-center space-x-2 p-1 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Assets Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              className={`relative group rounded-xl border overflow-hidden transition-all ${
                selectedAssets.includes(asset.id)
                  ? 'ring-2 ring-blue-500'
                  : theme === 'dark'
                  ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <button
                  onClick={() => toggleAssetSelection(asset.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                    selectedAssets.includes(asset.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white/80 border-white/80 hover:bg-white'
                  }`}
                >
                  {selectedAssets.includes(asset.id) && <Check className="w-4 h-4 text-white" />}
                </button>
              </div>

              {/* Preview */}
              <div className="aspect-square bg-gray-900 flex items-center justify-center overflow-hidden">
                {asset.type === 'image' ? (
                  <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                ) : (
                  <Video className="w-12 h-12 text-gray-600" />
                )}
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowDetailModal(true);
                  }}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Eye className="w-5 h-5 text-gray-900" />
                </button>
                <Link
                  to={`/business/${businessId}/design?asset=${asset.id}`}
                  className="p-2 bg-white rounded-lg hover:bg-gray-100"
                >
                  <Edit2 className="w-5 h-5 text-gray-900" />
                </Link>
                <button
                  onClick={() => deleteMediaAsset(asset.id)}
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className={`font-medium text-sm truncate mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {asset.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{formatFileSize(asset.size)}</span>
                  {asset.source === 'ai' && (
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-500 rounded text-xs">
                      AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`rounded-xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          {filteredAssets.map((asset, idx) => (
            <div
              key={asset.id}
              className={`flex items-center justify-between p-4 ${
                idx !== filteredAssets.length - 1 ? 'border-b' : ''
              } ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedAssets.includes(asset.id)}
                  onChange={() => toggleAssetSelection(asset.id)}
                  className="w-4 h-4"
                />
                <div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center overflow-hidden">
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <Video className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {asset.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-500">{asset.type}</span>
                    <span className="text-sm text-gray-500">{formatFileSize(asset.size)}</span>
                    {asset.source === 'ai' && (
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-500 rounded text-xs">
                        AI Generated
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowDetailModal(true);
                  }}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <Link
                  to={`/business/${businessId}/design?asset=${asset.id}`}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <Edit2 className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => deleteMediaAsset(asset.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredAssets.length === 0 && (
        <div className={`p-12 rounded-xl border text-center ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
          <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            No assets found
          </h3>
          <p className="text-gray-500 mb-4">Upload your first asset or generate one with AI</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Asset
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-lg w-full rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Upload Asset
              </h2>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  File
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Asset name"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={uploadForm.tags}
                  onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                  placeholder="product, social, banner"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!uploadForm.file}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    uploadForm.file
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full rounded-xl p-6 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Asset Details
              </h2>
              <button onClick={() => setShowDetailModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg bg-gray-900 flex items-center justify-center overflow-hidden">
                {selectedAsset.type === 'image' ? (
                  <img src={selectedAsset.url} alt={selectedAsset.name} className="max-w-full max-h-96" />
                ) : (
                  <Video className="w-24 h-24 text-gray-600" />
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAsset.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Type</label>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAsset.type}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Size</label>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {formatFileSize(selectedAsset.size)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Source</label>
                  <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAsset.source === 'ai' ? 'AI Generated' : 'Uploaded'}
                  </p>
                </div>
                {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500 mb-2 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedAsset.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 space-y-2">
                  <Link
                    to={`/business/${businessId}/design?asset=${selectedAsset.id}`}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit in Designer</span>
                  </Link>
                  <Link
                    to={`/business/${businessId}/social?asset=${selectedAsset.id}`}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Create Post</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
