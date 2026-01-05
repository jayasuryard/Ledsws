import React, { useState } from 'react';
import { Plus, CreditCard, QrCode, Share2, Download, Edit, Trash2, Eye, Copy, ExternalLink } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const DigitalCards = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    bio: '',
    color: '#3B82F6'
  });

  const cards = [
    {
      id: 1,
      name: 'John Doe',
      title: 'CEO & Founder',
      email: 'john@business.com',
      phone: '+1 (555) 123-4567',
      website: business?.website || 'https://business.com',
      views: 234,
      shares: 45,
      color: '#3B82F6',
      createdAt: 'Jan 1, 2026'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      title: 'Sales Manager',
      email: 'sarah@business.com',
      phone: '+1 (555) 987-6543',
      website: business?.website || 'https://business.com',
      views: 156,
      shares: 28,
      color: '#8B5CF6',
      createdAt: 'Dec 28, 2025'
    }
  ];

  const handleCreate = () => {
    console.log('Creating card:', formData);
    setShowCreateModal(false);
    setFormData({ name: '', title: '', email: '', phone: '', website: '', bio: '', color: '#3B82F6' });
  };

  const handleShare = (card) => {
    const url = `${window.location.origin}/card/${card.id}`;
    navigator.clipboard.writeText(url);
    alert('Card link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Digital Business Cards
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Create and share virtual business cards
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700"
        >
          <Plus className="w-5 h-5" />
          <span>Create Card</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Cards', value: cards.length, icon: CreditCard },
          { label: 'Total Views', value: '390', icon: Eye },
          { label: 'Total Shares', value: '73', icon: Share2 },
          { label: 'QR Scans', value: '145', icon: QrCode }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-8 h-8 text-indigo-500" />
              <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className={`rounded-xl border overflow-hidden ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            {/* Card Preview */}
            <div
              className="p-8 text-white relative"
              style={{ backgroundColor: card.color }}
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedCard(card)}
                  className="p-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">{card.name.charAt(0)}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{card.name}</h3>
              <p className="text-white/80 mb-4">{card.title}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📧</span>
                  <span className="text-white/90">{card.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span className="text-white/90">{card.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <span className="text-white/90 truncate">{card.website}</span>
                </div>
              </div>
            </div>

            {/* Card Stats & Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{card.views} views</span>
                  <span>{card.shares} shares</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare(card)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <QrCode className="w-4 h-4 text-gray-300" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <Edit className="w-4 h-4 text-gray-300" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Card Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl max-h-[90vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create Digital Business Card
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="CEO & Founder"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://company.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bio / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell people about yourself..."
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Card Color
                </label>
                <div className="flex items-center space-x-2">
                  {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({...formData, color})}
                      className={`w-12 h-12 rounded-lg border-2 ${
                        formData.color === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className={`p-6 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
              }`}>
                <div className="text-sm text-gray-500 mb-2">Preview</div>
                <div
                  className="p-6 rounded-lg text-white"
                  style={{ backgroundColor: formData.color }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{formData.name || 'Your Name'}</h3>
                  <p className="text-white/80 text-sm">{formData.title || 'Your Title'}</p>
                  {formData.email && (
                    <div className="mt-3 text-sm text-white/90">📧 {formData.email}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleCreate}
                  disabled={!formData.name || !formData.email}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Card
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ name: '', title: '', email: '', phone: '', website: '', bio: '', color: '#3B82F6' });
                  }}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div
              className="p-12 text-white text-center"
              style={{ backgroundColor: selectedCard.color }}
            >
              <div className="w-32 h-32 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-bold">{selectedCard.name.charAt(0)}</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{selectedCard.name}</h2>
              <p className="text-xl text-white/80 mb-6">{selectedCard.title}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <span>{selectedCard.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <span>{selectedCard.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">🌐</span>
                  <span className="truncate">{selectedCard.website}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleShare(selectedCard)}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Share Card
                </button>
                <button
                  onClick={() => setSelectedCard(null)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalCards;
