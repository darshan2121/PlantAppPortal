import React, { useState } from 'react';
import { MapPin, Route, Truck, Clock, CheckCircle, AlertCircle, Navigation } from 'lucide-react';

export const DistributionRouting: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const routes = [
    {
      id: 1,
      name: 'Route A - Satellite Zone',
      driver: 'Rajesh Kumar',
      vehicle: 'GJ-01-AB-1234',
      societies: ['Shree Ganesh Society', 'Rajesh Apartments', 'Heritage Homes'],
      status: 'In Progress',
      startTime: '09:00 AM',
      estimatedCompletion: '02:00 PM',
      plantsLoaded: 150,
      plantsDelivered: 95,
      currentLocation: 'Shree Ganesh Society',
      progress: 63
    },
    {
      id: 2,
      name: 'Route B - Maninagar Zone',
      driver: 'Amit Patel',
      vehicle: 'GJ-01-CD-5678',
      societies: ['Sunrise Complex', 'Green Valley', 'Maitri Society'],
      status: 'Completed',
      startTime: '08:30 AM',
      estimatedCompletion: '01:30 PM',
      plantsLoaded: 180,
      plantsDelivered: 180,
      currentLocation: 'Completed',
      progress: 100
    },
    {
      id: 3,
      name: 'Route C - Bopal Zone',
      driver: 'Suresh Sharma',
      vehicle: 'GJ-01-EF-9012',
      societies: ['Tech City', 'Orchid Society', 'Windmere Park'],
      status: 'Pending',
      startTime: '10:00 AM',
      estimatedCompletion: '03:00 PM',
      plantsLoaded: 120,
      plantsDelivered: 0,
      currentLocation: 'Loading Bay',
      progress: 0
    },
    {
      id: 4,
      name: 'Route D - Vastrapur Zone',
      driver: 'Vikram Singh',
      vehicle: 'GJ-01-GH-3456',
      societies: ['Silver Oak', 'Crystal Heights', 'Palm Heights'],
      status: 'Delayed',
      startTime: '09:30 AM',
      estimatedCompletion: '03:30 PM',
      plantsLoaded: 95,
      plantsDelivered: 35,
      currentLocation: 'Silver Oak',
      progress: 37
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'In Progress': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Delayed': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Distribution Routing</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors">
          <Route className="w-4 h-4" />
          <span>Create Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Route className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-green-600">+2</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-sm text-gray-600">Active Routes</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-8 h-8 text-emerald-600" />
            <span className="text-sm font-medium text-green-600">+1</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-gray-600">Vehicles</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-600">+15%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">6</p>
          <p className="text-sm text-gray-600">Completed Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <span className="text-sm font-medium text-red-600">+1</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1</p>
          <p className="text-sm text-gray-600">Delayed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Routes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRoute === route.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRoute(route.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{route.name}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Driver</p>
                      <p className="font-medium">{route.driver}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Vehicle</p>
                      <p className="font-medium">{route.vehicle}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{route.plantsDelivered}/{route.plantsLoaded} plants</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${route.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Route Details</h3>
          </div>
          <div className="p-6">
            {selectedRoute ? (
              <div className="space-y-4">
                {(() => {
                  const route = routes.find(r => r.id === selectedRoute);
                  if (!route) return null;
                  
                  return (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        {getStatusIcon(route.status)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{route.name}</h4>
                          <p className="text-sm text-gray-600">{route.status}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Start Time</p>
                          <p className="font-medium">{route.startTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Est. Completion</p>
                          <p className="font-medium">{route.estimatedCompletion}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Current Location</p>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          <span className="font-medium">{route.currentLocation}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Societies to Visit</p>
                        <div className="space-y-2">
                          {route.societies.map((society, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                index < route.progress / (100 / route.societies.length) 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-300'
                              }`}></div>
                              <span className="text-sm">{society}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                          <Navigation className="w-4 h-4" />
                          <span>Track Real-time</span>
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a route to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Route Optimization</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Route className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">2.5 hrs</p>
              <p className="text-sm text-blue-600">Avg. Route Time</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">94%</p>
              <p className="text-sm text-green-600">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-700">45 km</p>
              <p className="text-sm text-orange-600">Avg. Distance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};