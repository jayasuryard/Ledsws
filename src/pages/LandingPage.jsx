import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Check, Zap, Globe, Users, TrendingUp,
  Mail, FormInput, BarChart3, Calendar, MessageSquare, Shield,
  Star, Play, ChevronRight
} from 'lucide-react';
import useStore from '../store/useStore';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/app/ai-setup');
    } else {
      navigate('/register', { state: { websiteUrl } });
    }
  };

  const features = [
    {
      icon: Globe,
      title: 'Website Analysis',
      description: 'AI scans your website and extracts business details, branding, and positioning automatically.',
    },
    {
      icon: FormInput,
      title: 'Lead Forms',
      description: 'Custom-branded contact forms generated instantly, ready to embed on any page.',
    },
    {
      icon: Mail,
      title: 'Email Workflows',
      description: 'Welcome sequences and nurture campaigns created and configured automatically.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Real-time dashboards tracking leads, conversions, email performance, and ROI.',
    },
    {
      icon: Calendar,
      title: 'Social Scheduler',
      description: 'AI-written posts for LinkedIn, Twitter, and Facebook ready to schedule.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Role-based access for admins, managers, and sales team members.',
    },
  ];

  const stats = [
    { value: '60s', label: 'Setup Time' },
    { value: '10k+', label: 'Businesses' },
    { value: '94%', label: 'Satisfaction' },
    { value: '24/7', label: 'Automation' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director, TechCorp',
      avatar: 'SJ',
      content: 'We went from blank dashboards to a fully operational marketing system in under a minute. Game-changing.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, StartupX',
      avatar: 'MC',
      content: 'The AI understands our business better than some consultants we hired. Saves us 20 hours per week.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Agency Owner',
      avatar: 'ER',
      content: 'Managing multiple clients is effortless. Each gets their own branded instance with zero manual setup.',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for testing and small projects',
      features: [
        '1 Business Profile',
        '100 Leads/month',
        'Basic Email Campaigns',
        'Lead Forms',
        'Community Support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For growing businesses and teams',
      features: [
        '5 Business Profiles',
        'Unlimited Leads',
        'Advanced Email Automation',
        'AI Content Generation',
        'CRM Pipeline',
        'Analytics Dashboard',
        'Priority Support',
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Business',
      price: '$149',
      description: 'For agencies and enterprises',
      features: [
        'Unlimited Business Profiles',
        'Unlimited Everything',
        'White-label Options',
        'Custom Integrations',
        'API Access',
        'Dedicated Account Manager',
        '24/7 Phone Support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-navy-900 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">
                  LeadFlexUp
                </h1>
                <p className="text-xs text-gray-500">Marketing Automation</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/app/dashboard')}
                  className="px-4 py-2 bg-navy-900 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-gray-900 transition-colors">
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 bg-navy-900 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Vibiz Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 via-white to-gray-50" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-navy-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-navy-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-navy-200 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-navy-900" />
            <span className="text-sm font-semibold text-gray-700">AI-Powered Marketing Automation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-gray-900">
              Grow your
            </span>
            <br />
            <span className="text-navy-900">
              Business
            </span>
            <span className="text-gray-900">
              {' '}with AI
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
            Your campaign manager.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Paste your URL. Your entire marketing system is live in 60 seconds.
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleGetStarted} className="max-w-2xl mx-auto mb-6">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-navy-900 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              
              {/* Input Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-2 flex items-center space-x-2">
                <Globe className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="flex-1 px-4 py-4 text-lg bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-navy-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Launch</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Ready in 2 minutes</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center justify-center space-x-1">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-navy-900 border-2 border-white"
                />
              ))}
            </div>
            <div className="ml-4 text-left">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-gray-900">4.9</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">from 10k+ customers</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-black text-navy-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Everything you need.
              <br />
              <span className="text-navy-900">
                Nothing you don't.
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A complete marketing system built automatically from your website URL. No configuration. No blank screens.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-navy-900 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              From URL to live system
              <br />
              <span className="text-navy-900">
                in 60 seconds
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Paste Your URL', description: 'Enter your website address. That\'s it.', icon: Globe },
              { step: '02', title: 'AI Analyzes', description: 'We extract branding, content, and positioning automatically.', icon: Sparkles },
              { step: '03', title: 'Launch & Grow', description: 'Your complete marketing system is ready. Start generating leads.', icon: TrendingUp },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-navy-900 -z-10" />
                )}
                <div className="text-center">
                  <div className="w-24 h-24 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-sm font-bold text-navy-900 mb-2">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Loved by <span className="text-navy-900">10,000+</span> businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? 'bg-navy-900 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    {plan.price !== '$0' && <span className="text-xl">/month</span>}
                  </div>
                  <p className={plan.popular ? 'text-gray-200' : 'text-gray-600'}>{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-gray-100' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-white text-navy-900 hover:shadow-xl hover:scale-105'
                      : 'bg-navy-900 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-2xl mb-12 text-gray-200">
            Join 10,000+ businesses already using LeadFlexUp
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-12 py-6 bg-white text-navy-900 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center space-x-3"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LeadFlexUp</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered marketing automation for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2026 Ryo Forge Pvt. Ltd. All rights reserved.</p>
            <p>Made with ❤️ for businesses worldwide</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
