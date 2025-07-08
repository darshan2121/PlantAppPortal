import React, { useState } from 'react';
import { Plus, Search, MapPin, Phone, Mail, Users, Edit, Trash2, Building2 } from 'lucide-react';

export const SocietyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const societies = [
    {
      id: 1,
      name: 'Shree Ganesh Society',
      address: 'Satellite Road, Ahmedabad',
      contact: 'Ramesh Patel',
      phone: '+91 98765 43210',
      email: 'ramesh@ganeshsociety.com',
      totalMembers: 145,
      plantsAllocated: 89,
      plantsDelivered: 75,
      status: 'Active',
      joinDate: '2023-01-15',
      area: 'Satellite'
    },
    {
      id: 2,
      name: 'Rajesh Apartments',
      address: 'C.G. Road, Ahmedabad',
      contact: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya@rajeshapts.com',
      totalMembers: 98,
      plantsAllocated: 65,
      plantsDelivered: 65,
      status: 'Active',
      joinDate: '2023-02-10',
      area: 'C.G. Road'
    },
    {
      id: 3,
      name: 'Sunrise Complex',
      address: 'Maninagar, Ahmedabad',
      contact: 'Amit Kumar',
      phone: '+91 98765 43212',
      email: 'amit@sunrisecomplex.com',
      totalMembers: 234,
      plantsAllocated: 150,
      plantsDelivered: 120,
      status: 'Active',
      joinDate: '2023-03-05',
      area: 'Maninagar'
    },
    {
      id: 4,
      name: 'Green Valley',
      address: 'Bopal, Ahmedabad',
      contact: 'Neha Patel',
      phone: '+91 98765 43213',
      email: 'neha@greenvalley.com',
      totalMembers: 187,
      plantsAllocated: 95,
      plantsDelivered: 88,
      status: 'Active',
      joinDate: '2023-01-20',
      area: 'Bopal'
    },
    {
      id: 5,
      name: 'Heritage Homes',
      address: 'Vastrapur, Ahmedabad',
      contact: 'Raj Mehta',
      phone: '+91 98765 43214',
      email: 'raj@heritagehomes.com',
      totalMembers: 76,
      plantsAllocated: 45,
      plantsDelivered: 32,
      status: 'Pending',
      joinDate: '2023-04-12',
      area: 'Vastrapur'
    }
  ];

  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || society.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Society Management</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Society</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-green-600">+5.2%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
          <p className="text-sm text-gray-600">Total Societies</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-emerald-600" />
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">45,678</p>
          <p className="text-sm text-gray-600">Total Members</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="w-8 h-8 text-orange-600" />
            <span className="text-sm font-medium text-green-600">+8.1%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">25</p>
          <p className="text-sm text-gray-600">Active Areas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium text-yellow-600">-2.3%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">47</p>
          <p className="text-sm text-gray-600">Pending Approvals</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search societies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Society</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSocieties.map((society) => (
                <tr key={society.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{society.name}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {society.area}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{society.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {society.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{society.totalMembers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center justify-between">
                        <span>Allocated: {society.plantsAllocated}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Delivered: {society.plantsDelivered}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-emerald-600 h-1.5 rounded-full" 
                          style={{ width: `${(society.plantsDelivered / society.plantsAllocated) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(society.status)}`}>
                      {society.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};