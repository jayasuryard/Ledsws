import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Zap, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import useStore from '../../store/useStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, completeOnboarding } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: 'Demo User',
      email: formData.email,
      company: 'Demo Company'
    });
    completeOnboarding();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 p-12 flex-col justify-between relative overflow-hidden">
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
            Welcome Back to Your Growth Hub
          </h2>
          <p className="text-xl text-white/80">
            Continue driving results with AI-powered lead generation and CRM automation.
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

        <div className="relative z-10 text-white/60 text-sm">
          © 2026 LeadFlexUp. Built for growth-minded businesses.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border bg-white border-gray-300 text-gray-900 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-navy-900 focus:ring-navy-900" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-navy-900 hover:text-navy-800 font-semibold">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-navy-900 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-all flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-600">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border bg-white border-gray-300 hover:bg-gray-50 text-gray-900"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-semibold">Continue with Google</span>
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy-900 hover:text-navy-800 font-semibold">
              Create account
            </Link>
          </p>

          <div className="mt-6 p-4 rounded-lg border bg-green-50 border-green-200">
            <p className="text-xs text-green-600">
              <strong>Quick Demo:</strong> Just enter any email and password to explore the full platform with sample data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
