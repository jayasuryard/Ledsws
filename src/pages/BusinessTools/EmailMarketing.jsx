import React, { useState } from 'react';
import { Mail, Plus, Send, Users, BarChart3, Clock, Edit, Copy, Trash2, Eye, Zap, Calendar } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';
import CreateCampaignModal from '../../components/Email/CreateCampaignModal';
import CreateSequenceModal from '../../components/Email/CreateSequenceModal';
import CampaignDetailModal from '../../components/Email/CampaignDetailModal';

const EmailMarketing = () => {
  const { businessId } = useParams();
  const { theme, businesses, leads } = useStore();
  const business = businesses.find(b => b.id === parseInt(businessId));

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateSequence, setShowCreateSequence] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale 2026',
      subject: '🔥 50% Off Everything This Weekend Only!',
      status: 'sent',
      sent: 2456,
      delivered: 2400,
      opened: 1234,
      clicked: 456,
      bounced: 56,
      revenue: 12450,
      date: 'Jan 10, 2026',
      fromName: 'Sales Team',
      fromEmail: 'sales@company.com',
      previewText: 'Don\'t miss our biggest sale of the year!',
      body: 'Hi there!\n\nThis weekend only, get 50% off everything in our store...'
    },
    {
      id: 2,
      name: 'Weekly Newsletter #42',
      subject: 'This Week\'s Top Updates & Tips',
      status: 'sent',
      sent: 2456,
      delivered: 2420,
      opened: 982,
      clicked: 234,
      bounced: 36,
      revenue: 3200,
      date: 'Jan 8, 2026',
      fromName: 'Content Team',
      fromEmail: 'news@company.com',
      body: 'Welcome to this week\'s newsletter...'
    },
    {
      id: 3,
      name: 'Product Launch Teaser',
      subject: 'Something Big Is Coming... 👀',
      status: 'scheduled',
      scheduledFor: 'Jan 20, 2026',
      recipients: 2456,
      fromName: 'Product Team',
      fromEmail: 'product@company.com'
    },
    {
      id: 4,
      name: 'Customer Survey',
      subject: 'We\'d Love Your Feedback!',
      status: 'draft',
      lastEdited: 'Jan 5, 2026',
      fromName: 'Support Team',
      fromEmail: 'support@company.com'
    }
  ]);

  const [sequences, setSequences] = useState([
    {
      id: 1,
      name: 'New Lead Welcome Series',
      trigger: { type: 'form_submission', value: '' },
      steps: 3,
      status: 'active',
      enrolledLeads: 156,
      completedLeads: 89
    },
    {
      id: 2,
      name: 'Re-engagement Campaign',
      trigger: { type: 'inactivity', value: '14' },
      steps: 2,
      status: 'active',
      enrolledLeads: 45,
      completedLeads: 12
    }
  ]);

  const handleSaveCampaign = (campaign) => {
    setCampaigns([campaign, ...campaigns]);
  };

  const handleSaveSequence = (sequence) => {
    setSequences([sequence, ...sequences]);
  };

  const handleDuplicateCampaign = (campaign) => {
    const duplicate = {
      ...campaign,
      id: Date.now(),
      name: `${campaign.name} (Copy)`,
      status: 'draft',
      sent: 0,
      opened: 0,
      clicked: 0,
      revenue: 0
    };
    setCampaigns([duplicate, ...campaigns]);
  };

  const handleDeleteCampaign = (campaignId) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  const handleDeleteSequence = (sequenceId) => {
    if (confirm('Are you sure you want to delete this sequence?')) {
      setSequences(sequences.filter(s => s.id !== sequenceId));
    }
  };

  // Calculate overview stats
  const totalSent = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + (c.sent || 0), 0);
  const totalOpened = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + (c.opened || 0), 0);
  const totalClicked = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + (c.clicked || 0), 0);
  const totalRevenue = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + (c.revenue || 0), 0);
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : '0';
  const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : '0';

  const activeCampaignsCount = campaigns.filter(c => c.status === 'sent' || c.status === 'scheduled').length;
  const activeSequencesCount = sequences.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Email Marketing
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Create and send email campaigns
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateSequence(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700"
          >
            <Zap className="w-5 h-5" />
            <span>Create Sequence</span>
          </button>
          <button
            onClick={() => setShowCreateCampaign(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-blue-500/10`}>
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {activeCampaignsCount}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Campaigns
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-purple-500/10`}>
            <Zap className="w-6 h-6 text-purple-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {activeSequencesCount}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Sequences
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-green-500/10`}>
            <Send className="w-6 h-6 text-green-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {totalSent.toLocaleString()}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Emails Sent (30d)
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-orange-500/10`}>
            <Eye className="w-6 h-6 text-orange-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {openRate}%
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Open Rate
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-purple-500/10`}>
            <BarChart3 className="w-6 h-6 text-purple-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {clickRate}%
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Click Rate
          </div>
        </div>

        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-3 rounded-lg w-fit mb-3 bg-green-500/10`}>
            <BarChart3 className="w-6 h-6 text-green-500" />
          </div>
          <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            ${totalRevenue.toLocaleString()}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Revenue
          </div>
        </div>
      </div>

      {/* Active Sequences */}
      {sequences.length > 0 && (
        <div className={`rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Automated Sequences
              </h2>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {sequences.length} sequences
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-800">
            {sequences.map((sequence) => (
              <div key={sequence.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Zap className="w-5 h-5 text-purple-500" />
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {sequence.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sequence.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'
                      }`}>
                        {sequence.status}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {sequence.steps} steps • Trigger: {sequence.trigger.type.replace('_', ' ')}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Enrolled
                        </div>
                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {sequence.enrolledLeads}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Completed
                        </div>
                        <div className={`text-lg font-bold text-green-500`}>
                          {sequence.completedLeads}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Completion Rate
                        </div>
                        <div className={`text-lg font-bold text-blue-500`}>
                          {sequence.enrolledLeads > 0 
                            ? ((sequence.completedLeads / sequence.enrolledLeads) * 100).toFixed(1)
                            : '0'}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 rounded-lg hover:bg-gray-800">
                      <Edit className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteSequence(sequence.id)}
                      className="p-2 rounded-lg hover:bg-gray-800"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Campaigns List */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Recent Campaigns
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-6 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 cursor-pointer" onClick={() => setSelectedCampaign(campaign)}>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaign.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'sent' ? 'bg-green-500/20 text-green-500' :
                      campaign.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {campaign.subject}
                  </p>

                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Sent
                        </div>
                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {campaign.sent.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Opened
                        </div>
                        <div className={`text-lg font-bold text-green-500`}>
                          {campaign.opened.toLocaleString()}
                          <span className="text-xs ml-1">
                            ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Clicked
                        </div>
                        <div className={`text-lg font-bold text-blue-500`}>
                          {campaign.clicked.toLocaleString()}
                          <span className="text-xs ml-1">
                            ({((campaign.clicked / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Revenue
                        </div>
                        <div className={`text-lg font-bold text-purple-500`}>
                          ${campaign.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}

                  {campaign.status === 'scheduled' && (
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Scheduled for {campaign.scheduledFor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{campaign.recipients} recipients</span>
                      </div>
                    </div>
                  )}

                  {campaign.status === 'draft' && (
                    <div className="text-sm text-gray-500">
                      Last edited {campaign.lastEdited}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 rounded-lg hover:bg-gray-800">
                    <Edit className="w-5 h-5 text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDuplicateCampaign(campaign)}
                    className="p-2 rounded-lg hover:bg-gray-800"
                  >
                    <Copy className="w-5 h-5 text-green-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 rounded-lg hover:bg-gray-800"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showCreateCampaign && (
        <CreateCampaignModal
          theme={theme}
          leads={leads}
          onClose={() => setShowCreateCampaign(false)}
          onSave={handleSaveCampaign}
        />
      )}

      {showCreateSequence && (
        <CreateSequenceModal
          theme={theme}
          onClose={() => setShowCreateSequence(false)}
          onSave={handleSaveSequence}
        />
      )}

      {selectedCampaign && (
        <CampaignDetailModal
          theme={theme}
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};

export default EmailMarketing;
