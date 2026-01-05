import React, { useState } from 'react';
import { Mail, Inbox, Send, Archive, Star, Search, Reply, Trash2, Tag, X, Paperclip } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const UnifiedInbox = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeForm, setComposeForm] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const messages = [
    {
      id: 1,
      from: 'john.doe@client.com',
      subject: 'Product Inquiry - Premium Plan',
      preview: 'Hi, I\'m interested in your premium plan. Could you provide more details...',
      time: '10:30 AM',
      read: false,
      starred: true,
      channel: 'email',
      tags: ['lead', 'high-priority']
    },
    {
      id: 2,
      from: '@sarah_marketing',
      subject: 'DM: Collaboration Opportunity',
      preview: 'Love your content! Would like to discuss a potential collaboration...',
      time: '9:15 AM',
      read: false,
      starred: false,
      channel: 'instagram',
      tags: ['partnership']
    },
    {
      id: 3,
      from: 'mike.johnson@company.com',
      subject: 'Re: Proposal Discussion',
      preview: 'Thanks for the detailed proposal. Our team reviewed it and we have...',
      time: 'Yesterday',
      read: true,
      starred: false,
      channel: 'email',
      tags: ['proposal']
    },
    {
      id: 4,
      from: 'LinkedIn Message',
      subject: 'Connection Request from Alex Chen',
      preview: 'I came across your profile and was impressed by your work in...',
      time: '2 days ago',
      read: true,
      starred: false,
      channel: 'linkedin',
      tags: []
    }
  ];

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 24 },
    { id: 'sent', label: 'Sent', icon: Send, count: 0 },
    { id: 'starred', label: 'Starred', icon: Star, count: 8 },
    { id: 'archive', label: 'Archive', icon: Archive, count: 156 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 12 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Unified Inbox
        </h1>
        <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {business?.name} - All messages in one place
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className={`col-span-3 p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <button 
            onClick={() => setShowComposeModal(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 mb-6"
          >
            <Send className="w-4 h-4 inline mr-2" />
            Compose
          </button>

          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <folder.icon className="w-5 h-5" />
                  <span className="font-medium">{folder.label}</span>
                </div>
                {folder.count > 0 && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    selectedFolder === folder.id
                      ? 'bg-white/20'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Channels
            </div>
            {['Email', 'Instagram', 'Facebook', 'LinkedIn'].map((channel) => (
              <div key={channel} className="flex items-center space-x-2 px-4 py-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {channel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className={`col-span-4 p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search messages..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>

          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedMessage?.id === message.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : theme === 'dark'
                    ? 'border-gray-800 hover:bg-gray-800'
                    : 'border-gray-200 hover:bg-gray-50'
                } ${!message.read ? 'font-semibold' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {message.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {message.from}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <div className={`text-sm mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {message.subject}
                </div>
                <div className={`text-xs truncate ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {message.preview}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    message.channel === 'email' ? 'bg-blue-500/20 text-blue-500' :
                    message.channel === 'instagram' ? 'bg-purple-500/20 text-purple-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {message.channel}
                  </span>
                  {message.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-500/20 text-gray-500 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className={`col-span-5 p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          {selectedMessage ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {selectedMessage.subject}
                </h2>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Star className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Archive className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {selectedMessage.from.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {selectedMessage.from}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedMessage.time}
                    </div>
                  </div>
                </div>

                <div className={`prose max-w-none ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p className="mb-4">{selectedMessage.preview}</p>
                  <p className="mb-4">
                    I came across your website and I'm really impressed with your services. 
                    I'd like to learn more about your premium plan and how it could benefit my business.
                  </p>
                  <p className="mb-4">
                    Could we schedule a call this week to discuss this further? I'm available 
                    Tuesday and Thursday afternoon if that works for you.
                  </p>
                  <p>Looking forward to hearing from you.</p>
                  <p className="mt-4">Best regards,<br />John Doe</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
                }`}>
                  <Tag className="w-4 h-4" />
                  <span>Add Tags</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Select a message to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                New Message
              </h2>
              <button
                onClick={() => setShowComposeModal(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <input
                  type="email"
                  value={composeForm.to}
                  onChange={(e) => setComposeForm({...composeForm, to: e.target.value})}
                  placeholder="To: recipient@example.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <input
                  type="text"
                  value={composeForm.subject}
                  onChange={(e) => setComposeForm({...composeForm, subject: e.target.value})}
                  placeholder="Subject"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <textarea
                  value={composeForm.body}
                  onChange={(e) => setComposeForm({...composeForm, body: e.target.value})}
                  placeholder="Write your message..."
                  rows={12}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex items-center space-x-4">
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Paperclip className="w-4 h-4" />
                  <span>Attach File</span>
                </button>
              </div>
            </div>

            <div className={`flex items-center justify-end space-x-3 p-6 border-t ${
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowComposeModal(false)}
                className={`px-6 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                }`}
              >
                Discard
              </button>
              <button
                onClick={() => {
                  console.log('Sending:', composeForm);
                  setShowComposeModal(false);
                  setComposeForm({to: '', subject: '', body: ''});
                }}
                disabled={!composeForm.to || !composeForm.subject}
                className={`px-6 py-2 rounded-lg ${
                  !composeForm.to || !composeForm.subject
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white flex items-center space-x-2`}
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedInbox;
