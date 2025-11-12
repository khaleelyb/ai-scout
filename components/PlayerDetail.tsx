
import React, { useState, useEffect } from 'react';
import { Player, UserRole } from '../types';
import { generateScoutingReport } from '../services/geminiService';
import { BackIcon, SparklesIcon, HeartIcon } from './icons';

interface PlayerDetailProps {
  player: Player;
  onBack: () => void;
  onLike?: (playerId: number) => void;
  isLiked?: boolean;
  onComment: (playerId: number, text: string) => void;
  userRole: UserRole;
  loggedInPlayerId?: number;
  isFollowing?: boolean;
  onFollow?: (playerId: number) => void;
}

// Fix: Replaced the buggy markdown renderer with a more robust one that correctly handles headings, paragraphs, and lists.
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const blocks = content.split('\n\n').filter(block => block.trim() !== '');

  return (
    <>
      {blocks.map((block, index) => {
        if (block.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">{block.substring(3)}</h2>;
        }

        const lines = block.split('\n');
        const isUnorderedList = lines.every(line => line.startsWith('- ') || line.startsWith('* '));
        if (isUnorderedList) {
          return (
            <ul key={index} className="list-disc list-inside space-y-1 my-4 ml-5">
              {lines.map((line, i) => <li key={i}>{line.substring(2)}</li>)}
            </ul>
          );
        }

        const isOrderedList = lines.every(line => /^\d+\.\s/.test(line));
        if (isOrderedList) {
          return (
            <ol key={index} className="list-decimal list-inside space-y-1 my-4 ml-5">
              {lines.map((line, i) => <li key={i}>{line.replace(/^\d+\.\s/, '')}</li>)}
            </ol>
          );
        }
        
        return <p key={index} className="text-gray-600 dark:text-gray-400 mb-2">{lines.map((line, i) => <React.Fragment key={i}>{line}{i < lines.length - 1 && <br />}</React.Fragment>)}</p>;
      })}
    </>
  );
};


const PlayerDetail: React.FC<PlayerDetailProps> = ({ player, onBack, onLike, isLiked, onComment, userRole, loggedInPlayerId, isFollowing, onFollow }) => {
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState('');

  const handleGenerateReport = async () => {
    setIsLoading(true);
    const generatedReport = await generateScoutingReport(player);
    setReport(generatedReport);
    setIsLoading(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(player.id, newComment.trim());
      setNewComment('');
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center mb-6 text-green-500 hover:text-green-600 transition-colors"
      >
        <BackIcon className="w-5 h-5 mr-2" />
        Back to List
      </button>

      {/* Player Info Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-start space-x-6">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          src={player.imageUrl}
          alt={player.name}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{player.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{player.position} | {player.nationality}</p>
              <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">{player.club}</p>
            </div>
            {userRole === 'scout' && onLike && (
                <button
                  onClick={() => onLike(player.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-500'
                  }`}
                  disabled={isLiked}
                >
                  <HeartIcon filled={isLiked} className="w-6 h-6"/>
                  <span className="font-semibold">{isLiked ? 'Liked' : 'Like'}</span>
                </button>
            )}
             {userRole === 'player' && onFollow && loggedInPlayerId !== player.id && (
                <button
                  onClick={() => onFollow(player.id)}
                   className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    isFollowing
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
            )}
          </div>
          <div className="mt-4 flex space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{player.stats.goals}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Goals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{player.stats.assists}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Assists</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{player.stats.rating.toFixed(1)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
            </div>
             <div className="text-center">
              <p className="text-2xl font-bold text-green-500">{player.likes}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scouting Report Section */}
      { userRole === 'scout' &&
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">AI Scouting Report</h2>
            <button
              onClick={handleGenerateReport}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Generating...' : (report ? 'Regenerate Report' : 'Generate Report')}
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}

          {!isLoading && report && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <SimpleMarkdown content={report} />
            </div>
          )}

          {!isLoading && !report && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <p>Click "Generate Report" to get an AI-powered analysis of this player.</p>
            </div>
          )}
        </div>
      }

      {/* Video Highlights Section */}
      {player.videos && player.videos.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Video Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {player.videos.map((video) => (
                      <div key={video.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow">
                          <video className="w-full aspect-video bg-black" controls src={video.url}></video>
                          <div className="p-3">
                              <h4 className="font-semibold text-md text-gray-800 dark:text-gray-200 truncate">{video.title}</h4>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

       {/* Discussion Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Discussion</h2>
        <div className="space-y-4">
          {(player.comments && player.comments.length > 0) ? (
            player.comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{comment.author}</p>
                  <p className="text-gray-600 dark:text-gray-400">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No comments yet. Start the discussion!</p>
          )}
        </div>
        <form onSubmit={handleCommentSubmit} className="mt-6 flex items-center space-x-3">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400"
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerDetail;
