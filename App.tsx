
import React, { useState, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import PlaceholderPage from './pages/PlaceholderPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Player, UserRole, Comment } from './types';
import { SCOUT_NAV_ITEMS, PLAYER_NAV_ITEMS, PLAYERS } from './constants';
import PlayerDetail from './components/PlayerDetail';
import LeaderboardPage from './pages/LeaderboardPage';
import ExplorePlayersPage from './pages/ExplorePlayersPage';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [activePage, setActivePage] = useState<string>('Explore');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>(PLAYERS);
  const [likedPlayers, setLikedPlayers] = useState<Set<number>>(new Set());
  const [following, setFollowing] = useState<Set<number>>(new Set());

  // Use a stable ID for the logged-in player for demo purposes
  const loggedInPlayerId = PLAYERS[0].id;

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'scout') {
      setActivePage('Explore');
    } else {
      setActivePage('Profile');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedPlayer(null);
    setLikedPlayers(new Set());
    setFollowing(new Set()); // Reset following on logout
  };

  const handleSelectPlayer = useCallback((player: Player) => {
    setSelectedPlayer(player);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedPlayer(null);
  }, []);

  const handleLikePlayer = (playerId: number) => {
    if (likedPlayers.has(playerId)) return; // Already liked

    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId ? { ...p, likes: p.likes + 1 } : p
      )
    );
    setLikedPlayers(prevLiked => new Set(prevLiked).add(playerId));
  };
  
  const handleComment = (playerId: number, commentText: string) => {
    const newComment: Comment = {
      id: Date.now(),
      author: userRole === 'scout' ? 'Scout_User' : PLAYERS.find(p => p.id === loggedInPlayerId)?.name || 'Player_User',
      text: commentText,
    };

    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId
          ? { ...p, comments: [...(p.comments || []), newComment] }
          : p
      )
    );
  };
  
  const handleFollowPlayer = (playerId: number) => {
    setFollowing(prevFollowing => {
        const newFollowing = new Set(prevFollowing);
        if (newFollowing.has(playerId)) {
            newFollowing.delete(playerId);
        } else {
            newFollowing.add(playerId);
        }
        return newFollowing;
    });
  };

  const renderContent = () => {
    if (selectedPlayer) {
      return <PlayerDetail 
                player={selectedPlayer} 
                onBack={handleBackToList} 
                onLike={userRole === 'scout' ? handleLikePlayer : undefined}
                isLiked={likedPlayers.has(selectedPlayer.id)}
                onComment={handleComment}
                userRole={userRole!}
                loggedInPlayerId={loggedInPlayerId}
                isFollowing={following.has(selectedPlayer.id)}
                onFollow={userRole === 'player' ? handleFollowPlayer : undefined}
             />;
    }

    switch (activePage) {
      case 'Explore':
        return userRole === 'scout' 
            ? <DashboardPage 
                  players={players} 
                  onSelectPlayer={handleSelectPlayer} 
                  onLikePlayer={handleLikePlayer}
                  likedPlayers={likedPlayers}
               />
            : <ExplorePlayersPage 
                  players={players.filter(p => p.id !== loggedInPlayerId)} 
                  onSelectPlayer={handleSelectPlayer} 
              />;
      case 'Leaderboard':
        return <LeaderboardPage players={players} onSelectPlayer={handleSelectPlayer} />;
      case 'Profile':
        return <PlayerProfilePage 
                  allPlayers={players} 
                  following={following} 
                  onSelectPlayer={handleSelectPlayer} 
                />;
      case 'Search':
      case 'Watchlist':
      case 'Messages':
      case 'Settings':
        return <PlaceholderPage title={activePage} />;
      default:
        return <DashboardPage 
                  players={players} 
                  onSelectPlayer={handleSelectPlayer}
                  onLikePlayer={handleLikePlayer}
                  likedPlayers={likedPlayers}
               />;
    }
  };

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = userRole === 'scout' ? SCOUT_NAV_ITEMS : PLAYER_NAV_ITEMS;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
        userRole={userRole}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={selectedPlayer ? `${selectedPlayer.name}'s Profile` : activePage} 
          userRole={userRole} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
