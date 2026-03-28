import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, Building2, Users, TrendingUp,
  MoreVertical, Edit, Trash2, ExternalLink
} from 'lucide-react';
import { Card, Button, Badge, Avatar, Input } from '../../components/ui';
import useStore from '../../store/useStore';

const ModernBusinessWorkspace = () => {
  const { businesses, addBusiness, selectBusiness } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBusinesses = businesses?.filter(business =>
    business.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreateBusiness = () => {
    navigate('/app/ai-setup');
  };

  const handleBusinessClick = (business) => {
    selectBusiness(business.id);
    navigate(`/app/business/${business.id}`);
  };

  const businessStats = {
    total: businesses?.length || 0,
    active: businesses?.filter(b => b.status === 'active').length || 0,
    leads: businesses?.reduce((sum, b) => sum + (b.metrics?.leads || 0), 0) || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Business Workspace</h1>
          <p className="text-gray-600">Manage all your businesses in one place</p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          onClick={handleCreateBusiness}
        >
          New Business
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Businesses</p>
              <p className="text-3xl font-bold text-gray-900">{businessStats.total}</p>
            </div>
            <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-navy-900" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Businesses</p>
              <p className="text-3xl font-bold text-gray-900">{businessStats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900">{businessStats.leads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              leftIcon={<Search className="w-5 h-5" />}
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="md" icon={<Filter className="w-5 h-5" />}>
            Filter
          </Button>
        </div>
      </Card>

      {/* Businesses Grid */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((business) => (
            <Card key={business.id} hover className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  {business.name?.charAt(0) || 'B'}
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{business.industry}</p>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{business.metrics?.leads || 0}</p>
                  <p className="text-xs text-gray-600">Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{business.metrics?.conversionRate || 0}%</p>
                  <p className="text-xs text-gray-600">Conversion</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    ${((business.metrics?.revenue || 0) / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleBusinessClick(business)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
                <Button variant="outline" size="sm" icon={<Edit className="w-4 h-4" />} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery ? 'No businesses found' : 'No businesses yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Create your first business with AI in just 60 seconds'}
          </p>
          {!searchQuery && (
            <Button onClick={handleCreateBusiness}>
              <Plus className="w-4 h-4 mr-2" />
              Create Business
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};

export default ModernBusinessWorkspace;
