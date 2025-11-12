
import React, { useState } from 'react';
import { PLAYERS } from '../constants';
import { Player, Video } from '../types';
import { UploadIcon, UserIcon, UsersIcon } from '../components/icons';

// Create a new icon for Video Highlights
const VideoIcon = (props: { className?: string }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);


interface PlayerProfilePageProps {
  following: Set<number>;
  allPlayers: Player[];
  onSelectPlayer: (player: Player) => void;
}


const PlayerProfilePage: React.FC<PlayerProfilePageProps> = ({ following, allPlayers, onSelectPlayer }) => {
  // For demonstration, we'll just show the first player as the logged-in user.
  const loggedInPlayer = PLAYERS[0];

  const [videos, setVideos] = useState<Video[]>(loggedInPlayer.videos || []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'highlights' | 'following'>('profile');

  const followedPlayers = allPlayers.filter(p => following.has(p.id));

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile && videoTitle) {
      const newVideo: Video = {
        id: Date.now(), // simple unique id
        title: videoTitle,
        url: URL.createObjectURL(selectedFile),
      };
      setVideos(prevVideos => [...prevVideos, newVideo]);
      // Reset form
      setSelectedFile(null);
      setVideoTitle('');
      // Clear file input visually
      const fileInput = document.getElementById('video-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } else {
      alert('Please select a video file and provide a title.');
    }
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="text-center">
            <img
              className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-green-500"
              src={loggedInPlayer.imageUrl}
              alt={loggedInPlayer.name}
            />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">{loggedInPlayer.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{loggedInPlayer.position} | {loggedInPlayer.nationality}</p>
            <p className="mt-2 text-xl text-gray-700 dark:text-gray-300">{loggedInPlayer.club}</p>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Season Stats</h3>
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">{loggedInPlayer.stats.goals}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Goals</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">{loggedInPlayer.stats.assists}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Assists</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-500">{loggedInPlayer.stats.rating.toFixed(1)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'highlights':
        return (
          <div>
            {/* Upload Form */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-8 border border-dashed border-gray-300 dark:border-gray-600">
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Upload New Highlight</h4>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Video Title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="flex-grow w-full sm:w-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Video Title"
                />
                <div className="flex-grow w-full sm:w-auto">
                  <label htmlFor="video-upload" className="w-full text-center block cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 truncate">
                      {selectedFile ? selectedFile.name : 'Choose a video file...'}
                  </label>
                  <input id="video-upload" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || !videoTitle}
                  className="flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Upload
                </button>
              </div>
            </div>

            {/* Video List */}
            <div className="grid grid-cols-1 gap-6">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <div key={video.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow">
                    <video className="w-full aspect-video bg-black" controls src={video.url}></video>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{video.title}</h4>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <p>No video highlights uploaded yet.</p>
                  <p className="text-sm mt-1">Use the form above to add your first highlight clip!</p>
                </div>
              )}
            </div>
          </div>
        );
        case 'following':
            return (
                <div>
                    {followedPlayers.length > 0 ? (
                         <div className="space-y-3">
                            {followedPlayers.map(player => (
                                <div
                                    key={player.id}
                                    onClick={() => onSelectPlayer(player)}
                                    className="flex items-center p-3 transition-colors duration-200 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                >
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={player.imageUrl}
                                        alt={player.name}
                                    />
                                    <div className="ml-4 flex-grow">
                                        <p className="text-md font-semibold text-gray-800 dark:text-white">{player.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{player.club}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                          <p>You aren't following any players yet.</p>
                          <p className="text-sm mt-1">Use the 'Explore' tab to find players to follow!</p>
                        </div>
                    )}
                </div>
            );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{
    label: string;
    tabName: 'profile' | 'highlights' | 'following';
    icon: React.ElementType;
  }> = ({ label, tabName, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex justify-center items-center gap-2 py-3 text-sm font-semibold border-b-2 transition-colors ${
        activeTab === tabName
          ? 'border-green-500 text-green-500'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-green-500 hover:border-green-500'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Your Dashboard</h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <TabButton label="Profile" tabName="profile" icon={UserIcon} />
          <TabButton label="Highlights" tabName="highlights" icon={VideoIcon} />
          <TabButton label="Following" tabName="following" icon={UsersIcon} />
        </div>
        {/* Content */}
        <div className="p-8">
            {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;
