import React, { useState } from 'react';
import { Search, Filter, Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      orderId: 'ORD-001',
      society: 'Shree Ganesh Society',
      contact: 'Ramesh Patel',
      phone: '+91 98765 43210',
      plants: [
        { name: 'Mango Tree', quantity: 10, price: 1500 },
        { name: 'Rose Plant', quantity: 15, price: 675 }
      ],
      totalAmount: 2175,
      status: 'Delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      route: 'Route A - Satellite Zone',
      driver: 'Rajesh Kumar',
      notes: 'Delivered successfully to society gate'
    },
    {
      id: 2,
      orderId: 'ORD-002',
      society: 'Rajesh Apartments',
      contact: 'Priya Sharma',
      phone: '+91 98765 43211',
      plants: [
        { name: 'Tulsi Plant', quantity: 20, price: 500 },
        { name: 'Neem Tree', quantity: 8, price: 640 }
      ],
      totalAmount: 1140,
      status: 'In Transit',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      route: 'Route A - Satellite Zone',
      driver: 'Rajesh Kumar',
      notes: 'Expected delivery by 2:00 PM'
    },
    {
      id: 3,
      orderId: 'ORD-003',
      society: 'Sunrise Complex',
      contact: 'Amit Kumar',
      phone: '+91 98765 43212',
      plants: [
        { name: 'Coconut Tree', quantity: 5, price: 1000 },
        { name: 'Bougainvillea', quantity: 12, price: 1440 }
      ],
      totalAmount: 2440,
      status: 'Preparing',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-16',
      route: 'Route B - Maninagar Zone',
      driver: 'Amit Patel',
      notes: 'Plants being prepared for delivery'
    },
    {
      id: 4,
      orderId: 'ORD-004',
      society: 'Green Valley',
      contact: 'Neha Patel',
      phone: '+91 98765 43213',
      plants: [
        { name: 'Rose Plant', quantity: 25, price: 1125 }
      ],
      totalAmount: 1125,
      status: 'Cancelled',
      orderDate: '2024-01-14',
      deliveryDate: null,
      route: null,
      driver: null,
      notes: 'Cancelled by customer due to space constraints'
    },
    {
      id: 5,
      orderId: 'ORD-005',
      society: 'Heritage Homes',
      contact: 'Raj Mehta',
      phone: '+91 98765 43214',
      plants: [
        { name: 'Mango Tree', quantity: 8, price: 1200 },
        { name: 'Neem Tree', quantity: 12, price: 960 }
      ],
      totalAmount: 2160,
      status: 'Pending',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-17',
      route: 'Route C - Bopal Zone',
      driver: 'Suresh Sharma',
      notes: 'Awaiting confirmation from society'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Preparing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Transit': return <Package className="w-4 h-4 text-blue-600" />;
      case 'Preparing': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Pending': return <Clock className="w-4 h-4 text-orange-600" />;
      case 'Cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Order Tracking</h2>
        <div className="flex space-x-2">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Export Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-green-600">+8</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">247</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-600">+12</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">189</p>
          <p className="text-sm text-gray-600">Delivered</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">+5</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">34</p>
          <p className="text-sm text-gray-600">In Transit</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-600">+3</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">21</p>
          <p className="text-sm text-gray-600">Preparing</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 text-red-600" />
            <span className="text-sm font-medium text-red-600">+1</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="text-sm text-gray-600">Cancelled</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
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
              <option value="Delivered">Delivered</option>
              <option value="In Transit">In Transit</option>
              <option value="Preparing">Preparing</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Society</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.society}</div>
                      <div className="text-sm text-gray-500">{order.contact}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.plants.reduce((total, plant) => total + plant.quantity, 0)} plants
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.plants.length} types
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{order.totalAmount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.orderDate}</div>
                    {order.deliveryDate && (
                      <div className="text-sm text-gray-500">Delivery: {order.deliveryDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order.id)}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const order = orders.find(o => o.id === selectedOrder);
              if (!order) return null;
              
              return (
                <>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-medium">{order.orderId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Society Information</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium">{order.society}</p>
                        <p className="text-sm text-gray-600">{order.contact}</p>
                        <p className="text-sm text-gray-600">{order.phone}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Plants Ordered</p>
                      <div className="space-y-2">
                        {order.plants.map((plant, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{plant.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {plant.quantity}</p>
                            </div>
                            <p className="font-medium">₹{plant.price}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">Total Amount</p>
                          <p className="font-bold text-lg">₹{order.totalAmount}</p>
                        </div>
                      </div>
                    </div>

                    {order.route && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Delivery Information</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{order.route}</p>
                          <p className="text-sm text-gray-600">Driver: {order.driver}</p>
                          {order.deliveryDate && (
                            <p className="text-sm text-gray-600">Expected: {order.deliveryDate}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Notes</p>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{order.notes}</p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};