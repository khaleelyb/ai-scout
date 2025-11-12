
import React from 'react';
import { Player } from '../types';

interface ExplorePlayersPageProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const ExplorePlayersPage: React.FC<ExplorePlayersPageProps> = ({ players, onSelectPlayer }) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Explore Players</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => onSelectPlayer(player)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
          >
            <img
              className="w-full h-48 object-cover"
              src={player.imageUrl}
              alt={player.name}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{player.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{player.position}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{player.club}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePlayersPage;
