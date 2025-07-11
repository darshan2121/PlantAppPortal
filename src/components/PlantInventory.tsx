import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, TreePine, Package, AlertCircle } from 'lucide-react';

export const PlantInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [categorySuccess, setCategorySuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://192.168.0.38:5679/api/items');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPlants(data.data || []);
      } catch (err: any) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const categories = ['all', 'Fruit Trees', 'Flowering Plants', 'Medicinal Plants', 'Ornamental Plants'];

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (plant.details?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || plant.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (inventory: number) => {
    if (inventory > 50) return 'bg-green-100 text-green-800';
    if (inventory > 10) return 'bg-yellow-100 text-yellow-800';
    if (inventory > 0) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Calculate live statistics from API data
  const totalPlants = plants.length;
  const inStock = plants.filter(p => p.inventory > 50).length;
  const lowStock = plants.filter(p => p.inventory <= 50 && p.inventory > 10).length;
  const criticalStock = plants.filter(p => p.inventory <= 10 && p.inventory > 0).length;
  const outOfStock = plants.filter(p => p.inventory === 0).length;

  // Get unique categories and their counts
  const categoryStats = plants.reduce((acc, plant) => {
    const categoryName = plant.category?.name || 'Uncategorized';
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Generate dynamic alerts based on actual data
  const alerts = [
    ...plants.filter(p => p.inventory === 0).map(p => ({
      type: 'critical',
      title: 'Out of Stock',
      message: `${p.name} is out of stock`
    })),
    ...plants.filter(p => p.inventory <= 10 && p.inventory > 0).map(p => ({
      type: 'warning',
      title: 'Critical Stock',
      message: `${p.name} has only ${p.inventory} units left`
    }))
  ].slice(0, 3); // Show max 3 alerts

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Inventory</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowAddCategoryModal(false);
                setCategoryName('');
                setCategoryIcon('');
                setCategoryDescription('');
                setCategoryError(null);
                setCategorySuccess(null);
              }}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Add Category</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCategoryLoading(true);
                setCategoryError(null);
                setCategorySuccess(null);
                try {
                  const response = await fetch('http://192.168.0.38:5679/api/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: categoryName,
                      icon: categoryIcon,
                      discription: categoryDescription,
                    }),
                  });
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.message || 'Failed to create category');
                  setCategorySuccess('Category created successfully!');
                  setCategoryName('');
                  setCategoryIcon('');
                  setCategoryDescription('');
                } catch (err: any) {
                  setCategoryError(err.message || 'Error creating category');
                } finally {
                  setCategoryLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (optional)</label>
                <input
                  type="text"
                  value={categoryIcon}
                  onChange={e => setCategoryIcon(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={categoryDescription}
                  onChange={e => setCategoryDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {categoryError && <div className="text-red-600 text-sm">{categoryError}</div>}
              {categorySuccess && <div className="text-green-600 text-sm">{categorySuccess}</div>}
              <button
                type="submit"
                disabled={categoryLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {categoryLoading ? 'Creating...' : 'Add Category'}
              </button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="flex justify-center items-center py-10 text-red-500">{error}</div>
      ) : (
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
              <option value="all">All Categories</option>
              {/* Dynamically render categories from API data */}
              {[...new Set(plants.map(p => p.category?.name).filter(Boolean))].map(category => (
                <option key={category} value={category}>{category}</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlants.map((plant) => (
                <tr key={plant._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={plant.imageUrlFull || 'https://via.placeholder.com/48x48?text=No+Image'}
                        alt={plant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{plant.name}</div>
                        <div className="text-sm text-gray-500">{plant.details}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                      {plant.category?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-1" />
                      {plant.inventory}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(plant.inventory)}`}>
                      {plant.inventory > 50 ? 'In Stock' : plant.inventory > 10 ? 'Low Stock' : plant.inventory > 0 ? 'Critical' : 'Out of Stock'}
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock Summary</h3>
            <TreePine className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Items</span>
              <span className="font-semibold">{totalPlants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">In Stock</span>
              <span className="font-semibold text-green-600">{inStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock</span>
              <span className="font-semibold text-yellow-600">{lowStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Critical</span>
              <span className="font-semibold text-red-600">{criticalStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Out of Stock</span>
              <span className="font-semibold text-gray-600">{outOfStock}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="flex justify-between">
                <span className="text-gray-600">{category}</span>
                <span className="font-semibold">{count as number}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  alert.type === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <p className={`text-sm font-medium ${
                    alert.type === 'critical' ? 'text-red-800' : 'text-yellow-800'
                  }`}>{alert.title}</p>
                  <p className={`text-xs ${
                    alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                  }`}>{alert.message}</p>
                </div>
              ))
            ) : (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">All Good!</p>
                <p className="text-xs text-green-600">No critical alerts at the moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};