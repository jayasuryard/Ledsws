import React from 'react';
import { X, Copy, Download, Share2 } from 'lucide-react';
import CardTemplates, { templateNames } from './CardTemplates';
import QRCode from 'qrcode';

export const CreateEditCardModal = ({ 
  show, 
  isEdit, 
  theme, 
  formData, 
  setFormData, 
  selectedTemplate, 
  setSelectedTemplate, 
  onSubmit, 
  onClose,
  teamMembers
}) => {
  if (!show) return null;

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const templateThumbnails = {
    minimal: '🎯 Minimal',
    bold: '💪 Bold',
    gradient: '🌈 Gradient',
    dark: '🌙 Dark',
    light: '☀️ Light',
    corporate: '💼 Corporate',
    creative: '🎨 Creative',
    modern: '✨ Modern',
    classic: '📜 Classic',
    event: '🎫 Event'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 overflow-y-auto">
      <div className={`w-full max-w-5xl my-8 rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-[#0b1021] text-white' : 'bg-white text-gray-900'
      }`}> 
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between rounded-t-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-fuchsia-700'
            : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white'
        }`}>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-80">{isEdit ? 'Update card' : 'Create card'}</p>
            <h2 className="text-2xl font-bold">Digital Business Card</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body grid */}
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-0">
          {/* Left: form */}
          <div className={`p-6 space-y-6 ${theme === 'dark' ? 'border-r border-white/5' : 'border-r border-gray-100'}`}>
            {/* Template Selection */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-indigo-500">Step 1</p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Choose a template</p>
                </div>
                <span className="text-xs text-gray-400">10 styles</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {templateNames.map((template) => (
                  <button
                    key={template}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setFormData({...formData, template});
                    }}
                    className={`rounded-lg p-2 text-center transition-all border ${
                      selectedTemplate === template
                        ? 'border-indigo-500 bg-indigo-500/10 ring-2 ring-indigo-200'
                        : theme === 'dark'
                          ? 'border-white/10 bg-white/5 hover:border-white/20'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xl mb-1">{templateThumbnails[template].split(' ')[0]}</div>
                    <div className="text-[11px] font-semibold capitalize">{templateThumbnails[template].split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className={`p-4 rounded-xl border space-y-4 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-indigo-500">Step 2</p>
                  <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Contact details</p>
                </div>
                <span className="text-xs text-gray-400">Required *</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="CEO & Founder"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Acme Corp"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://company.com"
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Meeting Link (Optional)</label>
                <input
                  type="url"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({...formData, meetingLink: e.target.value})}
                  placeholder="https://calendly.com/yourname"
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-gray-400">Profile Image</label>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-gray-800 flex items-center justify-center text-sm text-gray-400">
                    {formData.avatar
                      ? <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                      : <span>No image</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="card-avatar-upload"
                      className="px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Upload
                    </label>
                    <input
                      id="card-avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: '' })}
                        className={`${theme === 'dark' ? 'px-3 py-2 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20' : 'px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Bio / Description</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell people about yourself..."
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400">Card Accent Color</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({...formData, color})}
                        className={`w-10 h-10 rounded-lg border-2 transition ${formData.color === color ? 'border-indigo-500 scale-105' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Assign To</label>
                  <select
                    value={formData.assignedTo || ''}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value || null})}
                    className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-200'}`}
                  >
                    <option value="">Unassigned</option>
                    {teamMembers?.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-90 transition"
              >
                {isEdit ? 'Save Changes' : 'Create Card'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-3 rounded-lg font-semibold ${theme === 'dark' ? 'bg-white/10 text-gray-200 hover:bg-white/20' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right: live preview */}
          <div className={`p-6 space-y-4 ${theme === 'dark' ? 'bg-[#0e142b]' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-indigo-500">Live preview</p>
                <p className="text-sm text-gray-400">Updates as you type</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500">Template: {selectedTemplate}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="scale-90 origin-top">
                <CardTemplates card={formData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ShareModal = ({ show, card, theme, onClose, getCardURL, copyToClipboard }) => {
  if (!show || !card) return null;

  const cardURL = getCardURL(card.id);

  const shareViaWhatsApp = () => {
    const text = `Check out ${card.name}'s digital business card: ${cardURL}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Digital Business Card - ${card.name}`;
    const body = `Hi,\n\nI'd like to share my digital business card with you:\n\n${cardURL}\n\nBest regards,\n${card.name}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md p-6 rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Share Card
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-sm text-gray-500 mb-2">Card URL</div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={cardURL}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                  theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                }`}
              />
              <button
                onClick={() => copyToClipboard(cardURL)}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={shareViaWhatsApp}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <span>📱</span>
              <span>Share via WhatsApp</span>
            </button>
            <button
              onClick={shareViaEmail}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <span>📧</span>
              <span>Share via Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QRModal = ({ show, card, theme, onClose, getCardURL }) => {
  const [qrCodeDataURL, setQrCodeDataURL] = React.useState('');

  React.useEffect(() => {
    if (show && card) {
      const cardURL = getCardURL(card.id);
      QRCode.toDataURL(cardURL, { width: 300, margin: 2 }, (err, url) => {
        if (!err) setQrCodeDataURL(url);
      });
    }
  }, [show, card, getCardURL]);

  if (!show || !card) return null;

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = `${card.name.replace(/\s+/g, '_')}_QR.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md p-6 rounded-xl ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            QR Code
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className={`p-6 rounded-lg inline-block ${
            theme === 'dark' ? 'bg-white' : 'bg-gray-100'
          }`}>
            {qrCodeDataURL && <img src={qrCodeDataURL} alt="QR Code" className="w-64 h-64" />}
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Scan this QR code to view the business card
          </p>
          <button
            onClick={downloadQR}
            className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download QR Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsModal = ({ show, card, theme, onClose }) => {
  if (!show || !card) return null;

  const metrics = [
    { label: 'Total Views', value: card.views || 0, icon: '👁️' },
    { label: 'Total Shares', value: card.shares || 0, icon: '📤' },
    { label: 'QR Scans', value: card.qrScans || 0, icon: '📱' },
    { label: 'Call Clicks', value: card.ctaClicks?.call || 0, icon: '📞' },
    { label: 'Email Clicks', value: card.ctaClicks?.email || 0, icon: '📧' },
    { label: 'Website Clicks', value: card.ctaClicks?.website || 0, icon: '🌐' },
    { label: 'vCard Downloads', value: card.ctaClicks?.vcard || 0, icon: '💾' },
    { label: 'WhatsApp Clicks', value: card.ctaClicks?.whatsapp || 0, icon: '💬' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl p-6 rounded-xl max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Card Analytics - {card.name}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {metric.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-6 p-4 rounded-lg border ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Card Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Created:</span>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {new Date(card.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Template:</span>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {card.template || 'minimal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`${card.disabled ? 'text-red-500' : 'text-green-500'}`}>
                {card.disabled ? 'Disabled' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
