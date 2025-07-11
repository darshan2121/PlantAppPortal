import React from 'react';
import { 
  LayoutDashboard, 
  TreePine, 
  Building2, 
  MapPin, 
  Package, 
  Users, 
  FileText,
  Leaf,
  Settings,
  User
} from 'lucide-react';
import { User as UserType } from '../App';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserType | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentUser }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Administrator', 'Supervisor', 'Manager'] },
    { id: 'inventory', label: 'Inventory', icon: TreePine, roles: ['Administrator', 'Supervisor', 'Manager'] },
    { id: 'orders', label: 'Orders', icon: Package, roles: ['Administrator', 'Supervisor', 'Manager'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['Administrator', 'Supervisor'] },
    { id: 'users', label: 'Users', icon: Users, roles: ['Administrator'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Administrator'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !currentUser || item.roles.includes(currentUser.role)
  );

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Plant Manager</h1>
            <p className="text-sm text-gray-500">AMC Admin Portal</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};