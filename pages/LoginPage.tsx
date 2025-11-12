
import React from 'react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-green-400">ScoutAI</h1>
        <p className="text-xl text-gray-300 mt-2">The Future of Football Scouting</p>
      </div>
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Role</h2>
        <div className="space-y-6">
          <button
            onClick={() => onLogin('scout')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log in as a Scout
          </button>
          <button
            onClick={() => onLogin('player')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log in as a Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
