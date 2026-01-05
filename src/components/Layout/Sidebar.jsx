import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart3, Sparkles, Briefcase, Users, 
  CreditCard, User, ChevronDown, ChevronRight, Settings,
  TrendingUp, Activity, Zap
} from 'lucide-react';
import useStore from '../../store/useStore';

const Sidebar = () => {
  const location = useLocation();
  const { theme, businesses, activeBusiness } = useStore();
  const [expandedSections, setExpandedSections] = useState({
    businesses: true,
    analytics: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      label: 'Global Dashboard',
      description: 'Executive Overview'
    },
    { 
      path: '/analytics', 
      icon: BarChart3, 
      label: 'Global Analytics',
      description: 'Consolidated Reports'
    },
    { 
      path: '/ai-studio', 
      icon: Sparkles, 
      label: 'AI Content Studio',
      description: 'Generate Content'
    },
    { 
      path: '/businesses', 
      icon: Briefcase, 
      label: 'Business Workspace',
      description: 'Manage Businesses',
      highlight: true
    },
    { 
      path: '/team', 
      icon: Users, 
      label: 'Team Management',
      description: 'Roles & Permissions'
    },
    { 
      path: '/subscription', 
      icon: CreditCard, 
      label: 'Subscription',
      description: 'Plans & Billing'
    },
    { 
      path: '/profile', 
      icon: User, 
      label: 'Profile',
      description: 'Account Settings'
    }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800' 
        : 'bg-white border-gray-200'
    } overflow-y-auto`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LeadFlexUp
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Growth Engine
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.expandable ? '#' : item.path}
              onClick={(e) => {
                if (item.expandable) {
                  e.preventDefault();
                  toggleSection(item.section);
                }
              }}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all group ${
                isActive(item.path)
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${item.highlight ? 'ring-2 ring-blue-500/20' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className={`text-xs ${
                    isActive(item.path)
                      ? 'text-blue-200'
                      : theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </div>
              {item.expandable && (
                expandedSections[item.section] 
                  ? <ChevronDown className="w-4 h-4" />
                  : <ChevronRight className="w-4 h-4" />
              )}
            </Link>

            {/* Expandable Sub-items */}
            {item.expandable && expandedSections[item.section] && item.subItems && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                      isActive(subItem.path)
                        ? theme === 'dark'
                          ? 'bg-gray-800 text-blue-400'
                          : 'bg-gray-100 text-blue-600'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:bg-gray-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <subItem.icon className="w-4 h-4" />
                    <span className="text-sm">{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Active Business Indicator */}
      {activeBusiness && (
        <div className={`m-4 p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="text-xs font-medium text-gray-500 mb-1">Active Business</div>
          <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {activeBusiness.name}
          </div>
          <Link 
            to={`/business/${activeBusiness.id}`}
            className="text-xs text-blue-500 hover:text-blue-400 mt-2 inline-block"
          >
            View Dashboard →
          </Link>
        </div>
      )}

      {/* Quick Stats */}
      <div className={`m-4 p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
      }`}>
        <div className="text-xs font-medium text-blue-500 mb-2">Quick Stats</div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Businesses</span>
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {businesses.length}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
