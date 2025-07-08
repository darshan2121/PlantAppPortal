import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, BarChart3, PieChart, Filter } from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('distribution');

  const reportData = {
    distribution: {
      title: 'Plant Distribution Report',
      metrics: [
        { label: 'Total Plants Distributed', value: '12,847', change: '+12%' },
        { label: 'Societies Served', value: '1,234', change: '+8%' },
        { label: 'Success Rate', value: '94.5%', change: '+2.3%' },
        { label: 'Avg. Delivery Time', value: '2.5 hrs', change: '-15%' }
      ],
      chartData: [
        { month: 'Jan', plants: 1200, societies: 98 },
        { month: 'Feb', plants: 1450, societies: 112 },
        { month: 'Mar', plants: 1680, societies: 125 },
        { month: 'Apr', plants: 1890, societies: 145 },
        { month: 'May', plants: 2100, societies: 167 },
        { month: 'Jun', plants: 2340, societies: 189 },
      ]
    },
    inventory: {
      title: 'Inventory Management Report',
      metrics: [
        { label: 'Current Stock', value: '8,456', change: '+5%' },
        { label: 'Low Stock Items', value: '23', change: '-12%' },
        { label: 'Reorder Level', value: '15%', change: '+3%' },
        { label: 'Stock Turnover', value: '4.2x', change: '+8%' }
      ],
      chartData: [
        { month: 'Jan', inStock: 8200, lowStock: 45 },
        { month: 'Feb', inStock: 8450, lowStock: 38 },
        { month: 'Mar', inStock: 8680, lowStock: 32 },
        { month: 'Apr', inStock: 8890, lowStock: 28 },
        { month: 'May', inStock: 8950, lowStock: 25 },
        { month: 'Jun', inStock: 8456, lowStock: 23 },
      ]
    },
    performance: {
      title: 'Performance Analytics Report',
      metrics: [
        { label: 'Delivery Success Rate', value: '94.5%', change: '+2.1%' },
        { label: 'Avg. Route Time', value: '2.8 hrs', change: '-12%' },
        { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.3' },
        { label: 'Cost per Delivery', value: '₹45', change: '-8%' }
      ],
      chartData: [
        { month: 'Jan', successRate: 91, avgTime: 3.2 },
        { month: 'Feb', successRate: 92, avgTime: 3.1 },
        { month: 'Mar', successRate: 93, avgTime: 3.0 },
        { month: 'Apr', successRate: 94, avgTime: 2.9 },
        { month: 'May', successRate: 94.2, avgTime: 2.8 },
        { month: 'Jun', successRate: 94.5, avgTime: 2.8 },
      ]
    }
  };

  const currentReport = reportData[selectedReport as keyof typeof reportData];

  const topPerformers = [
    { name: 'Rajesh Kumar', metric: '245 deliveries', score: 98 },
    { name: 'Priya Sharma', metric: '189 deliveries', score: 95 },
    { name: 'Amit Patel', metric: '167 deliveries', score: 93 },
    { name: 'Suresh Sharma', metric: '156 deliveries', score: 91 },
    { name: 'Vikram Singh', metric: '123 deliveries', score: 88 }
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Report Types</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedReport('distribution')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === 'distribution'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Distribution</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedReport('inventory')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === 'inventory'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-medium">Inventory</span>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedReport('performance')}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedReport === 'performance'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-4 h-4" />
                    <span className="font-medium">Performance</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{currentReport.title}</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {currentReport.metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className={`text-sm font-medium ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Trend Analysis</h4>
                <div className="space-y-3">
                  {currentReport.chartData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        {Object.entries(data).filter(([key]) => key !== 'month').map(([key, value]) => (
                          <div key={key} className="text-right">
                            <p className="text-sm font-medium text-gray-900">{value}</p>
                            <p className="text-xs text-gray-500 capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-emerald-700">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.metric}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{performer.score}</p>
                    <p className="text-sm text-gray-500">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plant Distribution by Category</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {plantCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.count} plants</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Performance Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-700">12,847</p>
              <p className="text-sm text-emerald-600">Plants Distributed</p>
              <p className="text-xs text-emerald-500 mt-1">+12% from last month</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">1,234</p>
              <p className="text-sm text-blue-600">Societies Served</p>
              <p className="text-xs text-blue-500 mt-1">+8% from last month</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <PieChart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-700">94.5%</p>
              <p className="text-sm text-orange-600">Success Rate</p>
              <p className="text-xs text-orange-500 mt-1">+2.3% from last month</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-700">2.5 hrs</p>
              <p className="text-sm text-purple-600">Avg. Delivery Time</p>
              <p className="text-xs text-purple-500 mt-1">-15% from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};