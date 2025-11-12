
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  title: string;
  userRole: UserRole;
}

const Header: React.FC<HeaderProps> = ({ title, userRole }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{title}</h1>
      <div className="flex items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
          Role: <span className="font-semibold text-green-500 capitalize">{userRole}</span>
        </span>
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
          {userRole.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
