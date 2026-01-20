import React from 'react';
import { Mail, Phone, Globe, Download, MessageCircle, Calendar, ExternalLink } from 'lucide-react';

const CardTemplates = ({ card, template = 'minimal', onAction }) => {
  const templates = {
    minimal: MinimalTemplate,
    bold: BoldTemplate,
    gradient: GradientTemplate,
    dark: DarkTemplate,
    light: LightTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
    modern: ModernTemplate,
    classic: ClassicTemplate,
    event: EventTemplate
  };

  const TemplateComponent = templates[template] || MinimalTemplate;
  return <TemplateComponent card={card} onAction={onAction} />;
};

// Action Buttons Component (reusable across all templates)
const ActionButtons = ({ card, onAction, buttonStyle = 'default' }) => {
  const actions = [
    { icon: Phone, label: 'Call', action: 'call', href: `tel:${card.phone}`, show: card.phone },
    { icon: Mail, label: 'Email', action: 'email', href: `mailto:${card.email}`, show: card.email },
    { icon: Globe, label: 'Website', action: 'website', href: card.website, show: card.website },
    { icon: Download, label: 'Save Contact', action: 'vcard', show: true },
    { icon: MessageCircle, label: 'WhatsApp', action: 'whatsapp', href: `https://wa.me/${card.phone?.replace(/\D/g, '')}`, show: card.phone },
    { icon: Calendar, label: 'Book Meeting', action: 'meeting', show: card.meetingLink }
  ];

  const getButtonClasses = () => {
    switch (buttonStyle) {
      case 'solid':
        return 'px-4 py-2 bg-white/20 backdrop-blur hover:bg-white/30 rounded-lg transition-all';
      case 'outline':
        return 'px-4 py-2 border-2 border-current rounded-lg hover:bg-white/10 transition-all';
      case 'minimal':
        return 'p-3 hover:bg-white/10 rounded-full transition-all';
      default:
        return 'px-4 py-2 bg-white/90 text-gray-900 hover:bg-white rounded-lg transition-all font-medium';
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {actions.filter(a => a.show).map((action, idx) => (
        <button
          key={idx}
          onClick={() => {
            if (action.href && action.action !== 'vcard') {
              window.open(action.href, '_blank');
            }
            onAction?.(action.action);
          }}
          className={getButtonClasses()}
        >
          <action.icon className="w-4 h-4 inline mr-2" />
          {buttonStyle !== 'minimal' && <span>{action.label}</span>}
        </button>
      ))}
    </div>
  );
};

// Template 1: Minimal
const MinimalTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
    <div className="p-12 text-center" style={{ backgroundColor: card.color }}>
      <div className="w-32 h-32 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
        {card.avatar
          ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
          : <span className="text-5xl font-bold text-white">{card.name?.charAt(0) || '?'}</span>}
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">{card.name}</h1>
      <p className="text-xl text-white/80 mb-1">{card.title}</p>
      {card.company && <p className="text-lg text-white/60">{card.company}</p>}
    </div>
    <div className="p-8 space-y-6">
      {card.bio && <p className="text-gray-600 text-center">{card.bio}</p>}
      <div className="space-y-3 text-sm">
        {card.email && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5" />
            <span>{card.email}</span>
          </div>
        )}
        {card.phone && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5" />
            <span>{card.phone}</span>
          </div>
        )}
        {card.website && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Globe className="w-5 h-5" />
            <span className="truncate">{card.website}</span>
          </div>
        )}
      </div>
      <ActionButtons card={card} onAction={onAction} />
    </div>
  </div>
);

// Template 2: Bold
const BoldTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
    <div className="p-8 text-white">
      <div className="flex items-start space-x-6 mb-8">
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black overflow-hidden" style={{ backgroundColor: card.color }}>
          {card.avatar
            ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
            : <span>{card.name?.charAt(0) || '?'}</span>}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-black mb-2 leading-tight">{card.name}</h1>
          <p className="text-xl font-bold" style={{ color: card.color }}>{card.title}</p>
          {card.company && <p className="text-lg text-gray-400 mt-1">{card.company}</p>}
        </div>
      </div>
      {card.bio && <p className="text-gray-300 mb-6 leading-relaxed">{card.bio}</p>}
      <div className="space-y-3 mb-6">
        {card.email && <div className="flex items-center space-x-3"><Mail className="w-5 h-5" /><span>{card.email}</span></div>}
        {card.phone && <div className="flex items-center space-x-3"><Phone className="w-5 h-5" /><span>{card.phone}</span></div>}
        {card.website && <div className="flex items-center space-x-3"><Globe className="w-5 h-5" /><span className="truncate">{card.website}</span></div>}
      </div>
      <ActionButtons card={card} onAction={onAction} buttonStyle="solid" />
    </div>
  </div>
);

// Template 3: Gradient
const GradientTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${card.color}, #667eea)` }}>
    <div className="p-12 text-white text-center">
      <div className="w-40 h-40 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white/30 overflow-hidden">
        {card.avatar
          ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
          : <span className="text-6xl font-bold">{card.name?.charAt(0) || '?'}</span>}
      </div>
      <h1 className="text-4xl font-bold mb-3">{card.name}</h1>
      <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur rounded-full mb-2">
        <p className="text-lg font-semibold">{card.title}</p>
      </div>
      {card.company && <p className="text-xl text-white/80 mb-6">{card.company}</p>}
      {card.bio && <p className="text-white/90 mb-8 max-w-sm mx-auto">{card.bio}</p>}
      <div className="space-y-2 mb-8 text-white/90">
        {card.email && <div>{card.email}</div>}
        {card.phone && <div>{card.phone}</div>}
        {card.website && <div className="truncate">{card.website}</div>}
      </div>
      <ActionButtons card={card} onAction={onAction} buttonStyle="outline" />
    </div>
  </div>
);

// Template 4: Dark
const DarkTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-gray-950 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
    <div className="p-10">
      <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-800">
        <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold text-white overflow-hidden" style={{ backgroundColor: card.color }}>
          {card.avatar
            ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
            : <span>{card.name?.charAt(0) || '?'}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{card.name}</h1>
          <p className="text-gray-400">{card.title}</p>
          {card.company && <p className="text-gray-500 text-sm mt-1">{card.company}</p>}
        </div>
      </div>
      {card.bio && <p className="text-gray-400 mb-6">{card.bio}</p>}
      <div className="space-y-4 mb-8">
        {card.email && (
          <div className="flex items-center space-x-3 text-gray-300 bg-gray-900 p-3 rounded-lg">
            <Mail className="w-5 h-5" style={{ color: card.color }} />
            <span>{card.email}</span>
          </div>
        )}
        {card.phone && (
          <div className="flex items-center space-x-3 text-gray-300 bg-gray-900 p-3 rounded-lg">
            <Phone className="w-5 h-5" style={{ color: card.color }} />
            <span>{card.phone}</span>
          </div>
        )}
        {card.website && (
          <div className="flex items-center space-x-3 text-gray-300 bg-gray-900 p-3 rounded-lg">
            <Globe className="w-5 h-5" style={{ color: card.color }} />
            <span className="truncate">{card.website}</span>
          </div>
        )}
      </div>
      <ActionButtons card={card} onAction={onAction} />
    </div>
  </div>
);

// Template 5: Light
const LightTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200">
    <div className="p-10">
      <div className="text-center mb-8">
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6 shadow-lg overflow-hidden" style={{ backgroundColor: card.color }}>
          {card.avatar
            ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
            : <span>{card.name?.charAt(0) || '?'}</span>}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.name}</h1>
        <p className="text-lg text-gray-600">{card.title}</p>
        {card.company && <p className="text-md text-gray-500 mt-1">{card.company}</p>}
      </div>
      {card.bio && <p className="text-gray-600 text-center mb-6 leading-relaxed">{card.bio}</p>}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 space-y-3">
        {card.email && <div className="flex items-center space-x-3 text-gray-700"><Mail className="w-5 h-5" style={{ color: card.color }} /><span>{card.email}</span></div>}
        {card.phone && <div className="flex items-center space-x-3 text-gray-700"><Phone className="w-5 h-5" style={{ color: card.color }} /><span>{card.phone}</span></div>}
        {card.website && <div className="flex items-center space-x-3 text-gray-700"><Globe className="w-5 h-5" style={{ color: card.color }} /><span className="truncate">{card.website}</span></div>}
      </div>
      <ActionButtons card={card} onAction={onAction} />
    </div>
  </div>
);

// Template 6: Corporate
const CorporateTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-white rounded-none shadow-2xl overflow-hidden">
    <div className="h-32" style={{ backgroundColor: card.color }} />
    <div className="px-10 pb-10 -mt-16">
      <div className="w-32 h-32 bg-white rounded-lg shadow-xl flex items-center justify-center text-4xl font-bold mb-6 border-4 border-white overflow-hidden" style={{ color: card.color }}>
        {card.avatar
          ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
          : <span>{card.name?.charAt(0) || '?'}</span>}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{card.name}</h1>
      <p className="text-lg font-medium text-gray-600 mb-1">{card.title}</p>
      {card.company && <p className="text-md text-gray-500 mb-6">{card.company}</p>}
      {card.bio && <p className="text-gray-600 mb-6">{card.bio}</p>}
      <div className="space-y-3 mb-8 text-sm">
        {card.email && <div className="flex items-center space-x-3 text-gray-700"><Mail className="w-4 h-4" /><span>{card.email}</span></div>}
        {card.phone && <div className="flex items-center space-x-3 text-gray-700"><Phone className="w-4 h-4" /><span>{card.phone}</span></div>}
        {card.website && <div className="flex items-center space-x-3 text-gray-700"><Globe className="w-4 h-4" /><span className="truncate">{card.website}</span></div>}
      </div>
      <ActionButtons card={card} onAction={onAction} />
    </div>
  </div>
);

// Template 7: Creative
const CreativeTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden transform rotate-1">
    <div className="transform -rotate-1">
      <div className="relative p-12" style={{ backgroundColor: `${card.color}20` }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 opacity-20" style={{ backgroundColor: card.color }} />
        <div className="relative z-10">
          <div className="w-24 h-24 rounded-2xl shadow-xl flex items-center justify-center text-3xl font-black text-white mb-6 transform -rotate-6 overflow-hidden" style={{ backgroundColor: card.color }}>
            {card.avatar
              ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
              : <span>{card.name?.charAt(0) || '?'}</span>}
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">{card.name}</h1>
          <p className="text-xl font-bold mb-1" style={{ color: card.color }}>{card.title}</p>
          {card.company && <p className="text-lg text-gray-600">{card.company}</p>}
        </div>
      </div>
      <div className="p-10">
        {card.bio && <p className="text-gray-600 mb-6 italic">"{card.bio}"</p>}
        <div className="space-y-3 mb-6">
          {card.email && <div className="flex items-center space-x-3"><Mail className="w-5 h-5" style={{ color: card.color }} /><span>{card.email}</span></div>}
          {card.phone && <div className="flex items-center space-x-3"><Phone className="w-5 h-5" style={{ color: card.color }} /><span>{card.phone}</span></div>}
          {card.website && <div className="flex items-center space-x-3"><Globe className="w-5 h-5" style={{ color: card.color }} /><span className="truncate">{card.website}</span></div>}
        </div>
        <ActionButtons card={card} onAction={onAction} />
      </div>
    </div>
  </div>
);

// Template 8: Modern
const ModernTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="grid grid-cols-3">
      <div className="col-span-1 p-8 flex flex-col items-center justify-center text-white" style={{ backgroundColor: card.color }}>
        {card.avatar ? (
          <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white/30 mb-3">
            <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="text-6xl font-bold mb-2">{card.name?.charAt(0) || '?'}</div>
        )}
        <div className="writing-mode-vertical text-xl font-bold transform rotate-180">{card.name?.split(' ').pop()}</div>
      </div>
      <div className="col-span-2 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{card.name}</h1>
        <p className="text-md font-medium text-gray-600 mb-1">{card.title}</p>
        {card.company && <p className="text-sm text-gray-500 mb-6">{card.company}</p>}
        {card.bio && <p className="text-sm text-gray-600 mb-6 line-clamp-3">{card.bio}</p>}
        <div className="space-y-2 text-xs mb-6">
          {card.email && <div className="flex items-center space-x-2"><Mail className="w-4 h-4" /><span>{card.email}</span></div>}
          {card.phone && <div className="flex items-center space-x-2"><Phone className="w-4 h-4" /><span>{card.phone}</span></div>}
        </div>
        <ActionButtons card={card} onAction={onAction} buttonStyle="minimal" />
      </div>
    </div>
  </div>
);

// Template 9: Classic
const ClassicTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-gradient-to-b from-amber-50 to-white rounded-lg shadow-2xl overflow-hidden border-2 border-amber-200">
    <div className="p-10 text-center border-b-2 border-amber-200">
      <div className="w-32 h-32 border-4 border-amber-300 rounded-full flex items-center justify-center text-4xl font-serif font-bold mx-auto mb-6 overflow-hidden" style={{ color: card.color }}>
        {card.avatar
          ? <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
          : <span>{card.name?.charAt(0) || '?'}</span>}
      </div>
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{card.name}</h1>
      <div className="h-1 w-16 bg-amber-400 mx-auto mb-3" />
      <p className="text-lg font-serif text-gray-700">{card.title}</p>
      {card.company && <p className="text-md font-serif text-gray-600 mt-2">{card.company}</p>}
    </div>
    <div className="p-8">
      {card.bio && <p className="text-gray-600 text-center font-serif italic mb-6">"{card.bio}"</p>}
      <div className="space-y-2 text-center text-sm font-serif mb-6">
        {card.email && <div>{card.email}</div>}
        {card.phone && <div>{card.phone}</div>}
        {card.website && <div className="truncate">{card.website}</div>}
      </div>
      <ActionButtons card={card} onAction={onAction} />
    </div>
  </div>
);

// Template 10: Event
const EventTemplate = ({ card, onAction }) => (
  <div className="max-w-md mx-auto bg-black rounded-3xl shadow-2xl overflow-hidden border-4" style={{ borderColor: card.color }}>
    <div className="relative p-12 text-white text-center" style={{ background: `linear-gradient(135deg, black, ${card.color}50)` }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="relative z-10">
        <div className="inline-block p-6 mb-6 rounded-2xl" style={{ backgroundColor: `${card.color}40`, backdropFilter: 'blur(10px)' }}>
          {card.avatar ? (
            <div className="w-24 h-24 rounded-xl overflow-hidden mx-auto">
              <img src={card.avatar} alt={card.name || 'Profile'} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="text-6xl font-black">{card.name?.charAt(0) || '?'}</div>
          )}
        </div>
        <h1 className="text-4xl font-black mb-3 tracking-tight">{card.name}</h1>
        <div className="inline-block px-6 py-2 rounded-full font-bold text-lg mb-2" style={{ backgroundColor: card.color }}>
          {card.title}
        </div>
        {card.company && <p className="text-xl text-white/80 mt-3">{card.company}</p>}
      </div>
    </div>
    <div className="p-8 bg-gray-950">
      {card.bio && <p className="text-gray-400 text-center mb-6">{card.bio}</p>}
      <div className="space-y-3 mb-6">
        {card.email && <div className="flex items-center justify-center space-x-3 text-white"><Mail className="w-5 h-5" style={{ color: card.color }} /><span>{card.email}</span></div>}
        {card.phone && <div className="flex items-center justify-center space-x-3 text-white"><Phone className="w-5 h-5" style={{ color: card.color }} /><span>{card.phone}</span></div>}
        {card.website && <div className="flex items-center justify-center space-x-3 text-white"><Globe className="w-5 h-5" style={{ color: card.color }} /><span className="truncate">{card.website}</span></div>}
      </div>
      <ActionButtons card={card} onAction={onAction} buttonStyle="solid" />
    </div>
  </div>
);

export default CardTemplates;
export const templateNames = ['minimal', 'bold', 'gradient', 'dark', 'light', 'corporate', 'creative', 'modern', 'classic', 'event'];
