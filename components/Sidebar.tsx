
import React from 'react';
import { NavItem, UserRole } from '../types';
import { LogoutIcon } from './icons';

interface SidebarProps {
  navItems: NavItem[];
  activePage: string;
  setActivePage: (page: string) => void;
  onLogout: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, activePage, setActivePage, onLogout, userRole }) => {
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-bold text-green-500">ScoutAI</h1>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <nav className="mt-5 flex-1 px-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 rounded-lg transition-colors duration-200 ${
                activePage === item.name
                  ? 'bg-green-500 text-white dark:bg-green-600 dark:text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActivePage(item.name);
              }}
            >
              <item.icon className="w-6 h-6" />
              <span className="mx-4 font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="px-2 py-4">
            <div className="text-center mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Logged in as:</p>
                <p className="text-green-500 capitalize">{userRole}</p>
            </div>
            <button
                onClick={onLogout}
                className="flex items-center w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors duration-200"
            >
                <LogoutIcon className="w-6 h-6" />
                <span className="mx-4 font-medium">Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
