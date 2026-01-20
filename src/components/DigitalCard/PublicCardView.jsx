import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Share2, QrCode } from 'lucide-react';
import CardTemplates from './CardTemplates';
import useStore from '../../store/useStore';

const PublicCardView = () => {
  const { cardId } = useParams();
  const { cards, addLead, trackCardInteraction } = useStore();
  const [card, setCard] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  
  const hasTrackedView = useRef(false);

  const pageBg = {
    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 30%),
      radial-gradient(circle at 80% 0%, rgba(94,234,212,0.12), transparent 25%),
      radial-gradient(circle at 50% 80%, rgba(99,102,241,0.08), transparent 30%),
      linear-gradient(135deg, #0b1224 0%, #0f172a 45%, #0b152e 100%)`
  };

  useEffect(() => {
    const foundCard = cards.find(c => c.id === cardId);
    setCard(foundCard);
  }, [cardId, cards]);

  useEffect(() => {
    if (card && !hasTrackedView.current) {
      trackCardInteraction(card.id, 'view');
      hasTrackedView.current = true;
    }
  }, [card, trackCardInteraction]);

  useEffect(() => {
    hasTrackedView.current = false;
  }, [cardId]);

  const handleAction = (action) => {
    if (!card) return;
    
    trackCardInteraction(card.id, action);
    
    if (action === 'email' && card.email) {
      window.location.href = `mailto:${card.email}`;
    } else if (action === 'phone' && card.phone) {
      window.location.href = `tel:${card.phone}`;
    } else if (action === 'website' && card.website) {
      window.open(card.website, '_blank');
    } else if (action === 'download') {
      downloadVCard();
    }
  };

  const downloadVCard = () => {
    if (!card) return;
    
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name || ''}
TITLE:${card.title || ''}
EMAIL:${card.email || ''}
TEL:${card.phone || ''}
URL:${card.website || ''}
NOTE:${card.bio || ''}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.name || 'contact'}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!card) return;
    
    const shareData = {
      title: `${card.name}'s Business Card`,
      text: `Check out ${card.name}'s digital business card`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackCardInteraction(card.id, 'share');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
      trackCardInteraction(card.id, 'share');
    }
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    if (!card) return;

    addLead({
      ...formData,
      source: 'digital-card',
      cardId: card.id,
      createdAt: new Date().toISOString()
    });

    trackCardInteraction(card.id, 'contact');
    setFormSubmitted(true);

    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    }, 3000);
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading card...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-14 px-4" style={pageBg}>
      <div className="max-w-5xl mx-auto relative">
        <div className="absolute inset-0 blur-3xl opacity-40 pointer-events-none" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.35), transparent 35%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.35), transparent 30%), radial-gradient(circle at 60% 80%, rgba(99,102,241,0.25), transparent 35%)'
        }} />

        {/* Action Bar */}
        <div className="relative flex justify-center gap-4 mb-10">
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-white/15 backdrop-blur-lg rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.25)] border border-white/10 hover:-translate-y-0.5 transition-all flex items-center space-x-2 text-slate-100"
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share Card</span>
          </button>
          <button
            onClick={() => setShowContactForm(!showContactForm)}
            className="px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-400 via-emerald-300 to-blue-500 shadow-[0_14px_45px_rgba(14,165,233,0.35)] hover:shadow-[0_20px_55px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 transition-all"
          >
            Get in Touch
          </button>
        </div>

        {/* Card Display with 3D feel */}
        <div className="relative p-6">
                <CardTemplates
                  card={card}
                  template={card.template || 'minimal'}
                  onAction={handleAction}
                />
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="relative max-w-2xl mx-auto bg-blue-50 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-8 border border-white/20">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600">Your message has been sent. We'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Get in Touch with {card.name}</h3>
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">Response in 1-2 hrs</div>
                </div>
                <form onSubmit={handleContactFormSubmit} className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center justify-between">
                    <p className="text-xs text-slate-500">We respect your privacy. No spam, ever.</p>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_12px_35px_rgba(14,165,233,0.35)] hover:shadow-[0_16px_45px_rgba(14,165,233,0.45)] transition-all"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="relative text-center mt-12 text-slate-300">
          <p className="text-sm mb-3 opacity-80">
            Powered by{' '}
            {card.businessName && <span className="font-semibold text-white">{card.businessName}</span>}
            {!card.businessName && <span className="font-semibold text-white">Digital Business Cards</span>}
          </p>
          <div className="text-4xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-200 to-blue-400 drop-shadow-[0_10px_25px_rgba(14,165,233,0.25)]">
            LEADFLEXUP
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCardView;
