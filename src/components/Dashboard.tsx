import React from 'react';
import { TreePine, Building2, Package, TrendingUp, MapPin, Users, Clock, CheckCircle } from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  currentUser: User | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const stats = [
    {
      title: 'Total Plants',
      value: '12,847',
      change: '+12%',
      icon: TreePine,
      color: 'emerald',
      trend: 'up'
    },
    {
      title: 'Active Societies',
      value: '1,234',
      change: '+8%',
      icon: Building2,
      color: 'blue',
      trend: 'up'
    },
    {
      title: 'Pending Orders',
      value: '247',
      change: '-15%',
      icon: Package,
      color: 'orange',
      trend: 'down'
    },
    {
      title: 'Delivered Today',
      value: '189',
      change: '+24%',
      icon: CheckCircle,
      color: 'green',
      trend: 'up'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', society: 'Shree Ganesh Society', plants: 25, status: 'In Transit', time: '2 hours ago' },
    { id: 'ORD-002', society: 'Rajesh Apartments', plants: 18, status: 'Delivered', time: '3 hours ago' },
    { id: 'ORD-003', society: 'Sunrise Complex', plants: 32, status: 'Preparing', time: '4 hours ago' },
    { id: 'ORD-004', society: 'Green Valley', plants: 15, status: 'Delivered', time: '5 hours ago' },
  ];

  const plantCategories = [
    { name: 'Flowering Plants', count: 3247, percentage: 35 },
    { name: 'Fruit Trees', count: 2156, percentage: 25 },
    { name: 'Medicinal Plants', count: 1834, percentage: 20 },
    { name: 'Ornamental Plants', count: 1567, percentage: 18 },
    { name: 'Others', count: 89, percentage: 2 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
        <p className="text-emerald-100">Here's what's happening with your plant distribution system today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{order.society}</p>
                      <p className="text-sm text-gray-500">{order.id} • {order.plants} plants</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plant Categories</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {plantCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Distribution Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-emerald-700">8</p>
                <p className="text-sm text-emerald-600">Active Routes</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">15</p>
                <p className="text-sm text-blue-600">Field Workers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Orders Received</span>
                <span className="font-semibold text-gray-900">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plants Distributed</span>
                <span className="font-semibold text-gray-900">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Routes Completed</span>
                <span className="font-semibold text-gray-900">6/8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Delivery Time</span>
                <span className="font-semibold text-gray-900">2.5 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};