
import React, { useRef, useEffect } from 'react';
import { Player } from '../types';
import { HeartIcon, CommentIcon } from './icons';

interface PlayerPostCardProps {
  player: Player;
  onPress: (player: Player) => void;
  onLike: (playerId: number) => void;
  isLiked: boolean;
}

const PlayerPostCard: React.FC<PlayerPostCardProps> = ({ player, onPress, onLike, isLiked }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(e => console.log("Autoplay was prevented.", e));
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // Play when 50% of the video is visible
    );

    observer.observe(video);

    return () => observer.unobserve(video);
  }, []);

  const hasVideo = player.videos && player.videos.length > 0;
  const latestComment = player.comments && player.comments.length > 0 ? player.comments[player.comments.length - 1] : null;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 w-full"
    >
      {/* Card Header */}
      <div className="flex items-center p-4 cursor-pointer" onClick={() => onPress(player)}>
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={player.imageUrl}
          alt={player.name}
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">{player.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{player.club}</p>
        </div>
      </div>

      {/* Media */}
      <div className="w-full bg-black cursor-pointer" onClick={() => onPress(player)}>
        {hasVideo ? (
          <video 
            ref={videoRef}
            className="w-full h-auto max-h-[600px] object-cover" 
            src={player.videos![0].url} 
            loop 
            muted 
            playsInline
          />
        ) : (
          <img className="w-full h-auto max-h-[600px] object-cover" src={player.imageUrl} alt={`${player.name} profile`} />
        )}
      </div>
      
      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => onLike(player.id)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
            <HeartIcon filled={isLiked} className={`w-8 h-8 ${isLiked ? 'text-red-500' : ''}`} />
          </button>
          <button onClick={() => onPress(player)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
             <CommentIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Likes and Comments */}
        <div className="mt-3">
          <p className="font-semibold text-gray-800 dark:text-white">{player.likes} likes</p>
          <div className="text-gray-700 dark:text-gray-300 mt-1 space-y-1">
            <p>
              <span className="font-semibold cursor-pointer" onClick={() => onPress(player)}>{player.name}</span>
              <span className="text-gray-600 dark:text-gray-400"> - {player.position} with {player.stats.goals} goals and {player.stats.assists} assists this season.</span>
            </p>
            {latestComment && (
               <p className="text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-600 dark:text-gray-300">{latestComment.author}</span> {latestComment.text}
              </p>
            )}
            <p className="text-gray-500 dark:text-gray-400 cursor-pointer text-sm" onClick={() => onPress(player)}>
              View all {player.comments?.length || 0} comments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPostCard;
