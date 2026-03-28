import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Zap, ArrowRight, Sparkles } from 'lucide-react';
import useStore from '../../store/useStore';

const Register = () => {
  const navigate = useNavigate();
  const { login, theme } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    login({
      name: formData.name,
      email: formData.email,
      company: formData.company
    });
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold">LeadFlexUp</h1>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Transform Your Lead Generation Game
          </h2>
          <p className="text-xl text-white/90">
            Enterprise-grade tools built for SMEs. Scale your business with AI-powered automation.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Sparkles, label: 'AI Content Studio', value: 'Generate at scale' },
              { icon: ArrowRight, label: 'Smart CRM', value: 'Convert more leads' },
              { icon: Sparkles, label: 'Multi-Business', value: 'Manage everything' },
              { icon: ArrowRight, label: 'Team Ready', value: 'Collaborate easily' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <feature.icon className="w-6 h-6 text-white mb-2" />
                <div className="text-sm font-semibold text-white">{feature.label}</div>
                <div className="text-xs text-white/70">{feature.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/70 text-sm">
          © 2026 LeadFlexUp. Built for growth-minded businesses.
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Create Your Account
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Start growing your business in under 2 minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                placeholder="Your Company Inc."
              />
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-navy-900 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
            }`}>
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${
                theme === 'dark' ? 'bg-gray-950 text-gray-400' : 'bg-gray-50 text-gray-600'
              }`}>
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-white'
                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className={`text-center mt-6 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
              Sign in
            </Link>
          </p>

          <div className={`mt-6 p-4 rounded-lg border ${
            theme === 'dark' 
              ? 'bg-blue-500/5 border-blue-500/20' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <p className="text-xs text-blue-500">
              <strong>✨ What's next:</strong> After registration, you'll complete a quick 3-step onboarding to set up your first business and start generating leads immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
