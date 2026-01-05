import React, { useState } from 'react';
import { Plus, Search, Mail, Shield, Trash2, Edit, MoreVertical } from 'lucide-react';
import useStore from '../../store/useStore';

const TeamManagement = () => {
  const { theme, teamMembers, addTeamMember, removeTeamMember, businesses } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'member',
    businesses: []
  });

  const roles = [
    { id: 'admin', label: 'Admin', color: 'red', description: 'Full access to everything' },
    { id: 'manager', label: 'Manager', color: 'blue', description: 'Manage assigned businesses' },
    { id: 'member', label: 'Member', color: 'green', description: 'View and create leads' }
  ];

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      addTeamMember(newMember);
      setNewMember({ name: '', email: '', role: 'member', businesses: [] });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Team Management
          </h1>
          <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Invite team members and manage permissions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: teamMembers.length + 1, icon: Shield, color: 'blue' },
          { label: 'Admins', value: teamMembers.filter(m => m.role === 'admin').length + 1, icon: Shield, color: 'red' },
          { label: 'Managers', value: teamMembers.filter(m => m.role === 'manager').length, icon: Shield, color: 'blue' },
          { label: 'Members', value: teamMembers.filter(m => m.role === 'member').length, icon: Shield, color: 'green' }
        ].map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${
            theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}>
            <div className={`p-3 rounded-lg w-fit mb-3 ${
              stat.color === 'red' ? 'bg-red-500/10 text-red-500' :
              stat.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
              'bg-green-500/10 text-green-500'
            }`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Roles Overview */}
      <div className={`p-6 rounded-xl border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Role Permissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <Shield className={`w-5 h-5 ${
                  role.color === 'red' ? 'text-red-500' :
                  role.color === 'blue' ? 'text-blue-500' :
                  'text-green-500'
                }`} />
                <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {role.label}
                </div>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members List */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="p-6 border-b border-gray-800">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Team Members
          </h2>
        </div>
        <div className="divide-y divide-gray-800">
          {/* Current User */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    You
                  </div>
                  <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-xs font-medium">
                    Admin
                  </span>
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  jayasurya@email.com
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Owner</div>
          </div>

          {/* Team Members */}
          {teamMembers.length === 0 ? (
            <div className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-gray-500 opacity-50" />
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No team members yet. Invite your first member to collaborate.
              </p>
            </div>
          ) : (
            teamMembers.map((member) => (
              <div key={member.id} className="p-6 flex items-center justify-between hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {member.name}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        member.role === 'admin' ? 'bg-red-500/20 text-red-500' :
                        member.role === 'manager' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {member.role}
                      </span>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-2 rounded-lg ${
                    theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}>
                    <Edit className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={() => removeTeamMember(member.id)}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-lg p-6 rounded-xl ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Invite Team Member
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Role *
                </label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handleAddMember}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                >
                  Send Invitation
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-gray-200 text-gray-700'
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

export default TeamManagement;
