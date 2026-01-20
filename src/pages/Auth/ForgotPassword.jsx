import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Zap, ArrowLeft, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';

const ForgotPassword = () => {
  const { theme } = useStore();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate password reset email sent
    setIsSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
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
            We've Got Your Back
          </h2>
          <p className="text-xl text-white/90">
            Reset your password and get back to growing your business in minutes.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Sparkles, label: 'Secure Process', value: 'Bank-level encryption' },
              { icon: ArrowRight, label: 'Quick Reset', value: 'Under 2 minutes' },
              { icon: Sparkles, label: 'Email Link', value: 'One-click access' },
              { icon: ArrowRight, label: '24/7 Support', value: 'Always here to help' }
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

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'
                }`}>
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Forgot Password?
                </h2>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className={`inline-flex items-center space-x-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>

              <div className={`mt-6 p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-blue-500/5 border-blue-500/20' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <p className="text-xs text-blue-500">
                  <strong>💡 Tip:</strong> Check your spam folder if you don't receive the email within 5 minutes. The reset link will expire in 1 hour for security.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  theme === 'dark' ? 'bg-green-500/10' : 'bg-green-100'
                }`}>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Check Your Email
                </h2>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  We've sent password reset instructions to
                </p>
                <p className={`font-semibold mt-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {email}
                </p>
              </div>

              <div className={`p-6 rounded-xl border-2 space-y-4 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                    }`}>
                      <span className="text-blue-500 text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Check your inbox
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Look for an email from LeadFlexUp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                    }`}>
                      <span className="text-blue-500 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Click the reset link
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        It will take you to a secure page
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                    }`}>
                      <span className="text-blue-500 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Create a new password
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Choose a strong, unique password
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className={`w-full py-3 px-4 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-white'
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  Didn't receive email? Resend
                </button>
                
                <Link
                  to="/login"
                  className={`block text-center py-3 px-4 rounded-lg border transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 text-white'
                      : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  Back to Sign In
                </Link>
              </div>

              <div className={`mt-6 p-4 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-yellow-500/5 border-yellow-500/20' 
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <p className="text-xs text-yellow-600 dark:text-yellow-500">
                  <strong>⚠️ Security Note:</strong> If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
