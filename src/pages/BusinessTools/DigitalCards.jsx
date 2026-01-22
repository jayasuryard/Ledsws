import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, QrCode, Share2, Download, Edit, Trash2, Eye, Copy, ExternalLink, BarChart, Users, ArrowLeft, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import CardTemplates, { templateNames } from '../../components/DigitalCard/CardTemplates';
import { CreateEditCardModal, ShareModal, QRModal, AnalyticsModal } from '../../components/DigitalCard/CardModals';

const DigitalCards = () => {
  const { businessId } = useParams();
  const { theme, businesses, cards, addCard, updateCard, deleteCard, trackCardInteraction, teamMembers } = useStore();
  const business = (businesses || []).find(b => b.id === parseInt(businessId));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: business?.name || '',
    email: '',
    phone: '',
    website: '',
    bio: '',
    avatar: '',
    color: '#3B82F6',
    template: 'minimal',
    meetingLink: '',
    assignedTo: null,
    businessId: parseInt(businessId),
    businessName: business?.name
  });

  // Filter cards for current business
  const businessCards = (cards || []).filter(c => c.businessId === parseInt(businessId));

  // Calculate stats
  const stats = {
    totalCards: businessCards.length,
    totalViews: businessCards.reduce((sum, c) => sum + (c.views || 0), 0),
    totalShares: businessCards.reduce((sum, c) => sum + (c.shares || 0), 0),
    totalQRScans: businessCards.reduce((sum, c) => sum + (c.qrScans || 0), 0)
  };

  const handleCreate = (e) => {
    e.preventDefault();
    addCard({
      ...formData,
      businessId: parseInt(businessId),
      businessName: business?.name || '',
    });
    closeCreateModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!selectedCard) return; // Safety guard when edit modal has no card selected
    updateCard(selectedCard.id, formData);
    closeEditModal();
  };

  const handleDelete = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(cardId);
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setFormData({
      name: '',
      title: '',
      company: business?.name || '',
      email: '',
      phone: '',
      website: '',
      bio: '',
      avatar: '',
      color: '#3B82F6',
      template: 'minimal',
      meetingLink: '',
      assignedTo: null,
      businessId: parseInt(businessId),
      businessName: business?.name
    });
    setSelectedTemplate('minimal');
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedCard(null);
    setFormData({
      name: '',
      title: '',
      company: business?.name || '',
      email: '',
      phone: '',
      website: '',
      bio: '',
      avatar: '',
      color: '#3B82F6',
      template: 'minimal',
      meetingLink: '',
      assignedTo: null,
      businessId: parseInt(businessId),
      businessName: business?.name
    });
    setSelectedTemplate('minimal');
  };

  const openEditModal = (card) => {
    setSelectedCard(card);
    setFormData({
      name: card.name,
      title: card.title,
      company: card.company || business?.name,
      email: card.email,
      phone: card.phone,
      website: card.website,
      bio: card.bio,
      avatar: card.avatar || '',
      color: card.color,
      template: card.template || 'minimal',
      meetingLink: card.meetingLink || '',
      assignedTo: card.assignedTo,
      businessId: parseInt(businessId),
      businessName: business?.name
    });
    setSelectedTemplate(card.template || 'minimal');
    setShowEditModal(true);
  };

  const handleShare = (card) => {
    setSelectedCard(card);
    setShowShareModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getCardURL = (cardId) => {
    // Works for both localhost and Vercel
    return `${window.location.origin}/card/${cardId}`;
  };

  const handleQRCode = (card) => {
    setSelectedCard(card);
    setShowQRModal(true);
  };

  const handleViewAnalytics = (card) => {
    setSelectedCard(card);
    setShowAnalyticsModal(true);
  };

  const handleDuplicate = (card) => {
    const duplicatedCard = {
      ...card,
      name: `${card.name} (Copy)`,
      businessId: parseInt(businessId),
      businessName: business?.name
    };
    delete duplicatedCard.id;
    delete duplicatedCard.createdAt;
    delete duplicatedCard.views;
    delete duplicatedCard.shares;
    delete duplicatedCard.qrScans;
    delete duplicatedCard.ctaClicks;
    addCard(duplicatedCard);
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
        <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-medium`}>Digital Cards</span>
      </div>

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
          { label: 'Total Cards', value: stats.totalCards, icon: CreditCard },
          { label: 'Total Views', value: stats.totalViews, icon: Eye },
          { label: 'Total Shares', value: stats.totalShares, icon: Share2 },
          { label: 'QR Scans', value: stats.totalQRScans, icon: QrCode }
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
        {businessCards.map((card) => (
          <div key={card.id} className={`rounded-xl border overflow-hidden ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            {/* Card Preview */}
            <div className="p-4 bg-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-gray-400 uppercase">Template: {card.template || 'minimal'}</span>
                <button
                  onClick={() => handleViewAnalytics(card)}
                  className="p-1.5 bg-white/10 backdrop-blur rounded hover:bg-white/20"
                >
                  <BarChart className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
                <CardTemplates card={card} template={card.template || 'minimal'} />
              </div>
            </div>

            {/* Card Stats & Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{card.views || 0} views</span>
                  <span>{card.shares || 0} shares</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <button
                  onClick={() => handleShare(card)}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 col-span-2"
                  title="Share"
                >
                  <Share2 className="w-4 h-4 text-white mx-auto" />
                </button>
                <button
                  onClick={() => handleQRCode(card)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                  title="QR Code"
                >
                  <QrCode className="w-4 h-4 text-gray-300 mx-auto" />
                </button>
                <button
                  onClick={() => openEditModal(card)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-gray-300 mx-auto" />
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-500 mx-auto" />
                </button>
              </div>
              <button
                onClick={() => handleDuplicate(card)}
                className={`w-full mt-2 px-3 py-2 rounded-lg text-sm hover:bg-opacity-80 ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Copy className="w-4 h-4 inline mr-2" />
                Duplicate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateEditCardModal
        show={showCreateModal}
        isEdit={false}
        theme={theme}
        formData={formData}
        setFormData={setFormData}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onSubmit={handleCreate}
        onClose={closeCreateModal}
        teamMembers={teamMembers}
      />

      <CreateEditCardModal
        show={showEditModal}
        isEdit={true}
        theme={theme}
        formData={formData}
        setFormData={setFormData}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        onSubmit={handleEdit}
        onClose={closeEditModal}
        teamMembers={teamMembers}
      />

      <ShareModal
        show={showShareModal}
        card={selectedCard}
        theme={theme}
        onClose={() => setShowShareModal(false)}
        getCardURL={getCardURL}
        copyToClipboard={copyToClipboard}
      />

      <QRModal
        show={showQRModal}
        card={selectedCard}
        theme={theme}
        onClose={() => setShowQRModal(false)}
        getCardURL={getCardURL}
      />

      <AnalyticsModal
        show={showAnalyticsModal}
        card={selectedCard}
        theme={theme}
        onClose={() => setShowAnalyticsModal(false)}
      />
    </div>
  );
};

export default DigitalCards;
