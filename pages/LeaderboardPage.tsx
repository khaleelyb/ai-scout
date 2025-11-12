
import React from 'react';
import { Player } from '../types';
import { HeartIcon } from '../components/icons';

interface LeaderboardPageProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ players, onSelectPlayer }) => {
  const sortedPlayers = [...players].sort((a, b) => b.likes - a.likes);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400 dark:text-yellow-300';
      case 2:
        return 'text-gray-400 dark:text-gray-300';
      case 3:
        return 'text-yellow-600 dark:text-yellow-500';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Top Prospects Leaderboard</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="space-y-1">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              onClick={() => onSelectPlayer(player)}
              className="flex items-center p-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              <div className={`w-12 text-center text-2xl font-bold ${getRankColor(index + 1)}`}>
                {index + 1}
              </div>
              <img
                className="w-12 h-12 rounded-full object-cover ml-4"
                src={player.imageUrl}
                alt={player.name}
              />
              <div className="ml-4 flex-grow">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{player.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{player.club}</p>
              </div>
              <div className="flex items-center text-lg text-green-500">
                <HeartIcon filled className="w-5 h-5 mr-2" />
                <span className="font-bold">{player.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;