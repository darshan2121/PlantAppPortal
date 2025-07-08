import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/auth/LoginScreen';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PlantInventory } from './components/PlantInventory';
import { SocietyManagement } from './components/SocietyManagement';
import { DistributionRouting } from './components/DistributionRouting';
import { OrderTracking } from './components/OrderTracking';
import { UserManagement } from './components/UserManagement';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser} />;
      case 'inventory':
        return <PlantInventory />;
      case 'societies':
        return <SocietyManagement />;
      case 'routing':
        return <DistributionRouting />;
      case 'orders':
        return <OrderTracking />;
      case 'users':
        return <UserManagement currentUser={currentUser} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings currentUser={currentUser} />;
      case 'profile':
        return <Profile currentUser={currentUser} onUpdateUser={setCurrentUser} />;
      default:
        return <Dashboard currentUser={currentUser} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      <div className="flex-1 ml-64">
        <Header currentUser={currentUser} onLogout={handleLogout} onProfileClick={() => setActiveTab('profile')} />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;