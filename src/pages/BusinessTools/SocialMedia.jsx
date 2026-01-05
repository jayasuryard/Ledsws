import React, { useState } from 'react';
import { Calendar, Plus, Image, Video, FileText, Send, Clock, TrendingUp, Edit, Trash2, X, BarChart, Eye, Zap, Target, Users, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';

const SocialMedia = () => {
  const { businessId } = useParams();
  const { theme, businesses } = useStore();
  const business = businesses.find(b => b.id === businessId);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showPostAnalytics, setShowPostAnalytics] = useState(false);
  const [showAICalendar, setShowAICalendar] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [analyticsView, setAnalyticsView] = useState('unified');
  const [calendarView, setCalendarView] = useState('week');
  const [postForm, setPostForm] = useState({
    platforms: ['Instagram'],
    content: '',
    scheduleTime: '',
    media: []
  });
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    duration: '7days',
    platforms: [],
    goal: 'engagement'
  });
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'New Year Launch', status: 'active', posts: 12, platforms: ['Instagram', 'Facebook'] }
  ]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignDetail, setShowCampaignDetail] = useState(false);
  const [showCampaignPostModal, setShowCampaignPostModal] = useState(false);
  const [campaignPostForm, setCampaignPostForm] = useState({
    platforms: ['Instagram'],
    content: '',
    scheduleTime: '',
    media: []
  });
  const [calendarPosts, setCalendarPosts] = useState([
    { id: 101, day: 'Mon', date: 'Jan 6', platform: 'Instagram', content: 'New product launch! 🚀', time: '10:00 AM', campaignId: 1 },
    { id: 102, day: 'Wed', date: 'Jan 8', platform: 'Facebook', content: 'Join our webinar...', time: '2:00 PM', campaignId: 1 },
    { id: 103, day: 'Fri', date: 'Jan 10', platform: 'LinkedIn', content: 'Company expansion news...', time: '9:00 AM', campaignId: null }
  ]);

  const scheduledPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'New product launch! 🚀 Check out our latest innovation...',
      scheduledFor: 'Jan 15, 2026 - 10:00 AM',
      status: 'scheduled',
      image: true
    },
    {
      id: 2,
      platform: 'Facebook',
      content: 'Join us for our webinar on digital marketing strategies...',
      scheduledFor: 'Jan 16, 2026 - 2:00 PM',
      status: 'scheduled',
      image: false
    },
    {
      id: 3,
      platform: 'LinkedIn',
      content: 'Exciting company news! We\'re expanding our team...',
      scheduledFor: 'Jan 17, 2026 - 9:00 AM',
      status: 'scheduled',
      image: true
    }
  ];

  const analytics = [
    { platform: 'Instagram', followers: '12.5K', engagement: '4.2%', posts: 156 },
    { platform: 'Facebook', followers: '8.3K', engagement: '3.8%', posts: 134 },
    { platform: 'LinkedIn', followers: '5.7K', engagement: '5.1%', posts: 89 },
    { platform: 'Twitter', followers: '3.2K', engagement: '2.9%', posts: 234 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Social Media Automation
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {business?.name} - Schedule and manage social posts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAICalendar(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Calendar</span>
          </button>
          <button
            onClick={() => setShowCampaignModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            <Target className="w-4 h-4" />
            <span>Campaign</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Social Media Analytics
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAnalyticsView('unified')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                analyticsView === 'unified'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Unified View
            </button>
            <button
              onClick={() => setAnalyticsView('individual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                analyticsView === 'individual'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Individual Platforms
            </button>
          </div>
        </div>

        {analyticsView === 'unified' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-green-500 font-semibold">+12.5%</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                29.7K
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Followers
              </div>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm text-green-500 font-semibold">+8.3%</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                4.0%
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Avg Engagement
              </div>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-green-500 font-semibold">+15.7%</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                1.2M
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Reach
              </div>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <FileText className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-green-500 font-semibold">+6</span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                613
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Posts
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {analytics.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                stat.platform === 'Instagram' ? 'bg-purple-500/10' :
                stat.platform === 'Facebook' ? 'bg-blue-500/10' :
                stat.platform === 'LinkedIn' ? 'bg-blue-600/10' :
                'bg-sky-500/10'
              }`}>
                <span className={`font-bold ${
                  stat.platform === 'Instagram' ? 'text-purple-500' :
                  stat.platform === 'Facebook' ? 'text-blue-500' :
                  stat.platform === 'LinkedIn' ? 'text-blue-600' :
                  'text-sky-500'
                }`}>
                  {stat.platform[0]}
                </span>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.followers}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.engagement} engagement • {stat.posts} posts
            </div>
          </div>
        ))}
          </div>
        )}
      </div>

      {/* Active Campaigns */}
      {campaigns.length > 0 && (
        <div className={`p-6 rounded-xl border ${
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Active Campaigns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => {
                  setSelectedCampaign(campaign);
                  setShowCampaignDetail(true);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-gray-50 border-gray-200 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {campaign.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-medium">
                        {campaign.status}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {calendarPosts.filter(p => p.campaignId === campaign.id).length} posts scheduled
                      </span>
                    </div>
                  </div>
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex items-center space-x-2">
                  {campaign.platforms.map((platform, idx) => (
                    <div key={idx} className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      platform === 'Instagram' ? 'bg-purple-500/20 text-purple-500' :
                      platform === 'Facebook' ? 'bg-blue-500/20 text-blue-500' :
                      platform === 'LinkedIn' ? 'bg-blue-600/20 text-blue-600' :
                      'bg-sky-500/20 text-sky-500'
                    }`}>
                      {platform[0]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Time to Post */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Best Time to Post
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { platform: 'Instagram', time: 'Wed, 11 AM - 1 PM', engagement: '4.2%', color: 'purple' },
            { platform: 'Facebook', time: 'Thu, 1 PM - 3 PM', engagement: '3.8%', color: 'blue' },
            { platform: 'LinkedIn', time: 'Tue, 10 AM - 12 PM', engagement: '5.1%', color: 'blue' },
            { platform: 'Twitter', time: 'Mon, 9 AM - 11 AM', engagement: '2.9%', color: 'sky' }
          ].map((item, idx) => (
            <div key={idx} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.color === 'purple' ? 'bg-purple-500' :
                  item.color === 'blue' ? 'bg-blue-500' :
                  item.color === 'sky' ? 'bg-sky-500' : 'bg-blue-600'
                }`} />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {item.platform}
                </span>
              </div>
              <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.time}
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-semibold">
                  {item.engagement} avg engagement
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Content Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCalendarView('week')}
              className={`px-4 py-2 rounded-lg text-sm ${
                calendarView === 'week' ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setCalendarView('month')}
              className={`px-4 py-2 rounded-lg text-sm ${
                calendarView === 'month' ? 'bg-blue-600 text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {calendarView === 'week' ? (
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const dayPosts = calendarPosts.filter(post => post.day === day);
              return (
                <div key={day} className="text-center">
                  <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {day}
                  </div>
                  <div className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    Jan {6 + index}
                  </div>
                  <div className={`min-h-32 rounded-lg border-2 border-dashed p-2 ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  } ${dayPosts.length > 0 ? 'bg-gray-800/30' : ''}`}>
                    {dayPosts.length > 0 ? (
                      <div className="space-y-2">
                        {dayPosts.map((post) => (
                          <div key={post.id} className={`p-2 rounded text-left relative ${
                            post.platform === 'Instagram' ? 'bg-purple-500/20' :
                            post.platform === 'Facebook' ? 'bg-blue-500/20' :
                            post.platform === 'LinkedIn' ? 'bg-blue-600/20' :
                            'bg-sky-500/20'
                          }`}>
                            {post.campaignId && (
                              <div className="absolute top-1 right-1">
                                <Target className="w-3 h-3 text-yellow-500" />
                              </div>
                            )}
                            <div className="flex items-center space-x-1 mb-1">
                              <div className={`w-2 h-2 rounded-full ${
                                post.platform === 'Instagram' ? 'bg-purple-500' :
                                post.platform === 'Facebook' ? 'bg-blue-500' :
                                post.platform === 'LinkedIn' ? 'bg-blue-600' :
                                'bg-sky-500'
                              }`} />
                              <span className="text-xs text-gray-400">{post.time}</span>
                            </div>
                            <p className="text-xs text-white truncate">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-28">
                        <Calendar className="w-6 h-6 text-gray-500 opacity-30" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className={`text-center text-xs font-semibold py-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 2; // Starting from Dec 30 (offset for calendar alignment)
              const actualDate = dayNumber < 1 ? 31 + dayNumber : dayNumber > 31 ? dayNumber - 31 : dayNumber;
              const monthLabel = dayNumber < 1 ? 'Dec' : dayNumber > 31 ? 'Feb' : 'Jan';
              const isCurrentMonth = dayNumber >= 1 && dayNumber <= 31;
              const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i % 7];
              
              const dayPosts = calendarPosts.filter(post => {
                const postDate = parseInt(post.date.split(' ')[1]);
                return postDate === actualDate && monthLabel === 'Jan';
              });

              return (
                <div key={i} className={`min-h-20 rounded-lg border p-1.5 ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                } ${!isCurrentMonth ? 'opacity-40' : ''} ${dayPosts.length > 0 ? 'bg-gray-800/20' : ''}`}>
                  <div className={`text-xs mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {actualDate}
                  </div>
                  {dayPosts.length > 0 && (
                    <div className="space-y-1">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div key={post.id} className={`p-1 rounded text-left relative ${
                          post.platform === 'Instagram' ? 'bg-purple-500/20' :
                          post.platform === 'Facebook' ? 'bg-blue-500/20' :
                          post.platform === 'LinkedIn' ? 'bg-blue-600/20' :
                          'bg-sky-500/20'
                        }`}>
                          {post.campaignId && (
                            <Target className="w-2 h-2 text-yellow-500 absolute top-0.5 right-0.5" />
                          )}
                          <div className="flex items-center space-x-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              post.platform === 'Instagram' ? 'bg-purple-500' :
                              post.platform === 'Facebook' ? 'bg-blue-500' :
                              post.platform === 'LinkedIn' ? 'bg-blue-600' :
                              'bg-sky-500'
                            }`} />
                            <span className="text-xs text-gray-400 truncate">{post.time}</span>
                          </div>
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Scheduled Posts */}
      <div className={`rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Scheduled Posts
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  post.platform === 'Instagram' ? 'bg-purple-500/10 text-purple-500' :
                  post.platform === 'Facebook' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-blue-600/10 text-blue-600'
                }`}>
                  <span className="font-bold">{post.platform[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {post.platform}
                    </span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded text-xs font-medium">
                      Scheduled
                    </span>
                    {post.image && (
                      <span className="text-xs text-gray-500">
                        <Image className="w-4 h-4 inline" /> 1 image
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.scheduledFor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowPostAnalytics(true);
                    }}
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    title="View Analytics"
                  >
                    <BarChart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setPostForm({
                        platforms: [post.platform],
                        content: post.content,
                        scheduleTime: post.scheduledFor,
                        media: post.image ? ['image'] : []
                      });
                      setShowEditModal(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Create Social Media Post
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Select Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => {
                        if (postForm.platforms.includes(platform)) {
                          setPostForm({ ...postForm, platforms: postForm.platforms.filter(p => p !== platform) });
                        } else {
                          setPostForm({ ...postForm, platforms: [...postForm.platforms, platform] });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        postForm.platforms.includes(platform)
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Content
                </label>
                <textarea
                  rows={5}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="What's on your mind?"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <Image className="w-5 h-5 text-gray-400" />
                </button>
                <button className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <Video className="w-5 h-5 text-gray-400" />
                </button>
                <button className={`p-3 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
                }`}>
                  <FileText className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Schedule Time
                </label>
                <input
                  type="datetime-local"
                  value={postForm.scheduleTime}
                  onChange={(e) => setPostForm({ ...postForm, scheduleTime: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      console.log('Scheduling post:', postForm);
                      // Add to calendar posts
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                      const randomDay = days[Math.floor(Math.random() * days.length)];
                      const newPost = {
                        id: Date.now(),
                        day: randomDay,
                        date: 'Jan ' + (6 + Math.floor(Math.random() * 7)),
                        platform: postForm.platforms[0],
                        content: postForm.content.substring(0, 30) + '...',
                        time: postForm.scheduleTime ? new Date(postForm.scheduleTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '10:00 AM'
                      };
                      setCalendarPosts([...calendarPosts, newPost]);
                      setShowCreateModal(false);
                      setPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
                    }}
                    disabled={!postForm.content || !postForm.scheduleTime || postForm.platforms.length === 0}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock className="w-5 h-5" />
                    <span>Schedule Post</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log('Posting immediately:', postForm);
                      // Post immediately - could add to a "Posted" list
                      alert('Post published successfully to ' + postForm.platforms.join(', ') + '!');
                      setShowCreateModal(false);
                      setPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
                    }}
                    disabled={!postForm.content || postForm.platforms.length === 0}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    <span>Post Now</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-semibold ${
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

      {/* Edit Post Modal */}
      {showEditModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Edit Scheduled Post
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Platform
                </label>
                <div className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'
                }`}>
                  {selectedPost.platform}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Content
                </label>
                <textarea
                  rows={5}
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Reschedule Time
                </label>
                <input
                  type="datetime-local"
                  value={postForm.scheduleTime}
                  onChange={(e) => setPostForm({ ...postForm, scheduleTime: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    console.log('Updating post:', selectedPost.id, postForm);
                    setShowEditModal(false);
                    setSelectedPost(null);
                  }}
                  disabled={!postForm.content}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedPost(null);
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-full">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className={`text-xl font-bold text-center mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Delete Scheduled Post?
            </h2>
            <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              This will permanently delete the scheduled post for {selectedPost.platform}. This action cannot be undone.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  console.log('Deleting post:', selectedPost.id);
                  setCalendarPosts(calendarPosts.filter(p => p.id !== selectedPost.id));
                  setShowDeleteModal(false);
                  setSelectedPost(null);
                  if (showCampaignDetail) {
                    // Stay in campaign detail view
                  }
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Delete Post
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPost(null);
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
      )}

      {/* Campaign Creation Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create Social Media Campaign
              </h2>
              <button onClick={() => setShowCampaignModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  placeholder="e.g., Summer Product Launch"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Campaign Goal
                </label>
                <select
                  value={campaignForm.goal}
                  onChange={(e) => setCampaignForm({ ...campaignForm, goal: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="engagement">Increase Engagement</option>
                  <option value="reach">Expand Reach</option>
                  <option value="followers">Grow Followers</option>
                  <option value="conversions">Drive Conversions</option>
                  <option value="brand">Build Brand Awareness</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Campaign Duration
                </label>
                <select
                  value={campaignForm.duration}
                  onChange={(e) => setCampaignForm({ ...campaignForm, duration: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="7days">7 Days</option>
                  <option value="14days">14 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="60days">60 Days</option>
                  <option value="90days">90 Days</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Select Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => {
                        if (campaignForm.platforms.includes(platform)) {
                          setCampaignForm({ ...campaignForm, platforms: campaignForm.platforms.filter(p => p !== platform) });
                        } else {
                          setCampaignForm({ ...campaignForm, platforms: [...campaignForm.platforms, platform] });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        campaignForm.platforms.includes(platform)
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-800 text-gray-300 border border-gray-700'
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className={`font-medium mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      AI Campaign Generator
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Our AI will automatically generate and schedule optimized posts for your campaign based on your goals and target platforms.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    console.log('Creating campaign:', campaignForm);
                    // Add campaign to state
                    const newCampaign = {
                      id: Date.now(),
                      name: campaignForm.name,
                      status: 'active',
                      posts: Math.floor(Math.random() * 20) + 5,
                      platforms: campaignForm.platforms
                    };
                    setCampaigns([...campaigns, newCampaign]);
                    setShowCampaignModal(false);
                    setCampaignForm({ name: '', duration: '7days', platforms: [], goal: 'engagement' });
                  }}
                  disabled={!campaignForm.name || campaignForm.platforms.length === 0}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  Create Campaign
                </button>
                <button
                  onClick={() => {
                    setShowCampaignModal(false);
                    setCampaignForm({ name: '', duration: '7days', platforms: [], goal: 'engagement' });
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

      {/* Post Analytics Modal */}
      {showPostAnalytics && selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-4xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Post Analytics - {selectedPost.platform}
              </h2>
              <button onClick={() => setShowPostAnalytics(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  12.5K
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Impressions
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  847
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Likes
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-5 h-5 text-purple-500" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  123
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Comments
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Share2 className="w-5 h-5 text-green-500" />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  56
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Shares
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border mb-4 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Post Content
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedPost.content}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Engagement Rate
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    8.2%
                  </div>
                  <div className="text-green-500 text-sm font-semibold">+2.1%</div>
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Reach
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    9.8K
                  </div>
                  <div className="text-green-500 text-sm font-semibold">+15.3%</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPostAnalytics(false)}
              className={`w-full px-4 py-3 rounded-lg font-semibold ${
                theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* AI Content Calendar Modal */}
      {showAICalendar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                AI Content Calendar Generator
              </h2>
              <button onClick={() => setShowAICalendar(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-6 rounded-lg mb-6 ${
              theme === 'dark' ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Let AI Plan Your Content
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Our AI will analyze your business, audience, and goals to create a complete content calendar with optimized posting times and engaging content.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Calendar Duration
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option>1 Week</option>
                  <option>2 Weeks</option>
                  <option>1 Month</option>
                  <option>3 Months</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Content Focus
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option>Product Promotion</option>
                  <option>Educational Content</option>
                  <option>Brand Storytelling</option>
                  <option>Customer Testimonials</option>
                  <option>Industry News</option>
                  <option>Mixed Content</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Posting Frequency
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option>Once per day</option>
                  <option>Twice per day</option>
                  <option>3 times per day</option>
                  <option>5 times per week</option>
                  <option>Custom</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Target Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map((platform) => (
                    <button key={platform} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    console.log('Generating AI calendar');
                    // Generate AI calendar posts
                    const aiPosts = [
                      { id: Date.now() + 1, day: 'Mon', date: 'Jan 6', platform: 'Instagram', content: '🚀 Product spotlight...', time: '11:00 AM' },
                      { id: Date.now() + 2, day: 'Mon', date: 'Jan 6', platform: 'LinkedIn', content: 'Industry insights...', time: '10:00 AM' },
                      { id: Date.now() + 3, day: 'Tue', date: 'Jan 7', platform: 'Facebook', content: '💡 Customer testimonial...', time: '1:00 PM' },
                      { id: Date.now() + 4, day: 'Wed', date: 'Jan 8', platform: 'Twitter', content: 'Quick tips thread...', time: '9:00 AM' },
                      { id: Date.now() + 5, day: 'Wed', date: 'Jan 8', platform: 'Instagram', content: '📸 Behind the scenes...', time: '12:00 PM' },
                      { id: Date.now() + 6, day: 'Thu', date: 'Jan 9', platform: 'LinkedIn', content: 'Team milestone...', time: '10:30 AM' },
                      { id: Date.now() + 7, day: 'Fri', date: 'Jan 10', platform: 'Facebook', content: '🎉 Weekend special...', time: '3:00 PM' },
                      { id: Date.now() + 8, day: 'Sat', date: 'Jan 11', platform: 'Instagram', content: '✨ Saturday motivation...', time: '10:00 AM' }
                    ];
                    setCalendarPosts([...calendarPosts, ...aiPosts]);
                    setShowAICalendar(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Calendar</span>
                </button>
                <button
                  onClick={() => setShowAICalendar(false)}
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

      {/* Campaign Detail Modal */}
      {showCampaignDetail && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className={`w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-inherit pb-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-500" />
                <div>
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedCampaign.name}
                  </h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs font-medium">
                      {selectedCampaign.status}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {calendarPosts.filter(p => p.campaignId === selectedCampaign.id).length} posts
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowCampaignPostModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Post</span>
                </button>
                <button onClick={() => setShowCampaignDetail(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Campaign Calendar */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Campaign Calendar
              </h3>
              <div className="grid grid-cols-7 gap-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const dayPosts = calendarPosts.filter(post => post.day === day && post.campaignId === selectedCampaign.id);
                  return (
                    <div key={day} className="text-center">
                      <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {day}
                      </div>
                      <div className={`text-xs mb-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Jan {6 + index}
                      </div>
                      <div className={`min-h-24 rounded-lg border-2 border-dashed p-2 ${
                        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                      } ${dayPosts.length > 0 ? 'bg-blue-500/10' : ''}`}>
                        {dayPosts.length > 0 ? (
                          <div className="space-y-2">
                            {dayPosts.map((post) => (
                              <div
                                key={post.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPost(post);
                                  setCampaignPostForm({
                                    platforms: [post.platform],
                                    content: post.content,
                                    scheduleTime: post.scheduleTime || '',
                                    media: []
                                  });
                                  setShowCampaignPostModal(true);
                                }}
                                className={`p-2 rounded text-left cursor-pointer hover:opacity-80 ${
                                  post.platform === 'Instagram' ? 'bg-purple-500/30' :
                                  post.platform === 'Facebook' ? 'bg-blue-500/30' :
                                  post.platform === 'LinkedIn' ? 'bg-blue-600/30' :
                                  'bg-sky-500/30'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center space-x-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      post.platform === 'Instagram' ? 'bg-purple-500' :
                                      post.platform === 'Facebook' ? 'bg-blue-500' :
                                      post.platform === 'LinkedIn' ? 'bg-blue-600' :
                                      'bg-sky-500'
                                    }`} />
                                    <span className="text-xs text-gray-400">{post.time}</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedPost(post);
                                      setShowDeleteModal(true);
                                    }}
                                    className="p-0.5 hover:bg-red-500/20 rounded"
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                                <p className="text-xs text-white truncate">{post.content}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-20">
                            <Calendar className="w-5 h-5 text-gray-500 opacity-30" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Campaign Posts List */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                All Campaign Posts
              </h3>
              <div className="space-y-3">
                {calendarPosts.filter(p => p.campaignId === selectedCampaign.id).map((post) => (
                  <div key={post.id} className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          post.platform === 'Instagram' ? 'bg-purple-500/20 text-purple-500' :
                          post.platform === 'Facebook' ? 'bg-blue-500/20 text-blue-500' :
                          post.platform === 'LinkedIn' ? 'bg-blue-600/20 text-blue-600' :
                          'bg-sky-500/20 text-sky-500'
                        }`}>
                          <span className="font-bold text-sm">{post.platform[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {post.platform}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {post.day}, {post.date} at {post.time}
                            </span>
                          </div>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {post.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setCampaignPostForm({
                              platforms: [post.platform],
                              content: post.content,
                              scheduleTime: post.scheduleTime || '',
                              media: []
                            });
                            setShowCampaignPostModal(true);
                          }}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {calendarPosts.filter(p => p.campaignId === selectedCampaign.id).length === 0 && (
                  <div className={`p-8 text-center rounded-lg border-2 border-dashed ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                  }`}>
                    <Target className="w-12 h-12 text-gray-500 opacity-30 mx-auto mb-3" />
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      No posts in this campaign yet. Click "Add Post" to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Post Modal (Add/Edit) */}
      {showCampaignPostModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className={`w-full max-w-2xl p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedPost ? 'Edit Campaign Post' : 'Add Campaign Post'}
              </h2>
              <button onClick={() => {
                setShowCampaignPostModal(false);
                setSelectedPost(null);
                setCampaignPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className={`p-3 rounded-lg mb-4 ${
              theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                  Campaign: {selectedCampaign.name}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Platform
                </label>
                <select
                  value={campaignPostForm.platforms[0]}
                  onChange={(e) => setCampaignPostForm({ ...campaignPostForm, platforms: [e.target.value] })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  {selectedCampaign.platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Content
                </label>
                <textarea
                  rows={5}
                  value={campaignPostForm.content}
                  onChange={(e) => setCampaignPostForm({ ...campaignPostForm, content: e.target.value })}
                  placeholder="What's your message?"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Schedule Time
                </label>
                <input
                  type="datetime-local"
                  value={campaignPostForm.scheduleTime}
                  onChange={(e) => setCampaignPostForm({ ...campaignPostForm, scheduleTime: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => {
                    if (selectedPost) {
                      // Update existing post
                      const updatedPosts = calendarPosts.map(p =>
                        p.id === selectedPost.id
                          ? {
                              ...p,
                              platform: campaignPostForm.platforms[0],
                              content: campaignPostForm.content,
                              scheduleTime: campaignPostForm.scheduleTime,
                              time: campaignPostForm.scheduleTime ? new Date(campaignPostForm.scheduleTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : p.time
                            }
                          : p
                      );
                      setCalendarPosts(updatedPosts);
                    } else {
                      // Add new post
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                      const randomDay = days[Math.floor(Math.random() * days.length)];
                      const newPost = {
                        id: Date.now(),
                        day: randomDay,
                        date: 'Jan ' + (6 + Math.floor(Math.random() * 7)),
                        platform: campaignPostForm.platforms[0],
                        content: campaignPostForm.content,
                        time: campaignPostForm.scheduleTime ? new Date(campaignPostForm.scheduleTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '10:00 AM',
                        scheduleTime: campaignPostForm.scheduleTime,
                        campaignId: selectedCampaign.id
                      };
                      setCalendarPosts([...calendarPosts, newPost]);
                    }
                    setShowCampaignPostModal(false);
                    setSelectedPost(null);
                    setCampaignPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
                  }}
                  disabled={!campaignPostForm.content || !campaignPostForm.scheduleTime}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {selectedPost ? 'Update Post' : 'Add to Campaign'}
                </button>
                <button
                  onClick={() => {
                    setShowCampaignPostModal(false);
                    setSelectedPost(null);
                    setCampaignPostForm({ platforms: ['Instagram'], content: '', scheduleTime: '', media: [] });
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
    </div>
  );
};

export default SocialMedia;
