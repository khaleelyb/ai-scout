
import React from 'react';
import PlayerPostCard from '../components/PlayerCard';
import { Player } from '../types';

interface DashboardPageProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
  onLikePlayer: (playerId: number) => void;
  likedPlayers: Set<number>;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ players, onSelectPlayer, onLikePlayer, likedPlayers }) => {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {players.map((player) => (
                <PlayerPostCard 
                    key={player.id} 
                    player={player} 
                    onPress={onSelectPlayer}
                    onLike={onLikePlayer}
                    isLiked={likedPlayers.has(player.id)}
                />
            ))}
        </div>
    );
};

export default DashboardPage;
