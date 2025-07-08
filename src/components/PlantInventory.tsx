import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, TreePine, Package, AlertCircle } from 'lucide-react';

export const PlantInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const plants = [
    {
      id: 1,
      name: 'Mango Tree',
      scientificName: 'Mangifera indica',
      category: 'Fruit Trees',
      stock: 245,
      price: 150,
      status: 'In Stock',
      image: 'https://images.pexels.com/photos/1458915/pexels-photo-1458915.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'High-quality mango saplings suitable for urban plantation'
    },
    {
      id: 2,
      name: 'Rose Plant',
      scientificName: 'Rosa rubiginosa',
      category: 'Flowering Plants',
      stock: 89,
      price: 45,
      status: 'Low Stock',
      image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Beautiful flowering rose plants for garden decoration'
    },
    {
      id: 3,
      name: 'Neem Tree',
      scientificName: 'Azadirachta indica',
      category: 'Medicinal Plants',
      stock: 167,
      price: 80,
      status: 'In Stock',
      image: 'https://images.pexels.com/photos/1458915/pexels-photo-1458915.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Medicinal neem trees with natural pest control properties'
    },
    {
      id: 4,
      name: 'Tulsi Plant',
      scientificName: 'Ocimum tenuiflorum',
      category: 'Medicinal Plants',
      stock: 234,
      price: 25,
      status: 'In Stock',
      image: 'https://images.pexels.com/photos/1458915/pexels-photo-1458915.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Sacred tulsi plants with medicinal properties'
    },
    {
      id: 5,
      name: 'Bougainvillea',
      scientificName: 'Bougainvillea spectabilis',
      category: 'Ornamental Plants',
      stock: 12,
      price: 120,
      status: 'Critical',
      image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Colorful ornamental flowering plants for landscaping'
    },
    {
      id: 6,
      name: 'Coconut Tree',
      scientificName: 'Cocos nucifera',
      category: 'Fruit Trees',
      stock: 78,
      price: 200,
      status: 'In Stock',
      image: 'https://images.pexels.com/photos/1458915/pexels-photo-1458915.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Tall coconut trees suitable for coastal and urban areas'
    }
  ];

  const categories = ['all', 'Fruit Trees', 'Flowering Plants', 'Medicinal Plants', 'Ornamental Plants'];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Plant Inventory</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Plant</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlants.map((plant) => (
                <tr key={plant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{plant.name}</div>
                        <div className="text-sm text-gray-500">{plant.scientificName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                      {plant.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-1" />
                      {plant.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{plant.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plant.status)}`}>
                      {plant.status}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock Summary</h3>
            <TreePine className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Plants</span>
              <span className="font-semibold">825</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">In Stock</span>
              <span className="font-semibold text-green-600">724</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock</span>
              <span className="font-semibold text-yellow-600">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Critical</span>
              <span className="font-semibold text-red-600">12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Fruit Trees</span>
              <span className="font-semibold">323</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Flowering Plants</span>
              <span className="font-semibold">245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Medicinal Plants</span>
              <span className="font-semibold">167</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ornamental Plants</span>
              <span className="font-semibold">90</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm font-medium text-red-800">Critical Stock Alert</p>
              <p className="text-xs text-red-600">Bougainvillea stock is critically low</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Low Stock Warning</p>
              <p className="text-xs text-yellow-600">Rose plants need restocking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};