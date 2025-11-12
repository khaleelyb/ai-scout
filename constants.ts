
import { Player, NavItem, Video } from './types';
import { HomeIcon, SearchIcon, StarIcon, MailIcon, UserIcon, CogIcon, LeaderboardIcon } from './components/icons';

export const PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Leo Messi',
    age: 19,
    position: 'Forward',
    club: 'FC Barcelona Youth',
    nationality: 'Argentina',
    imageUrl: 'https://picsum.photos/seed/messi/200/200',
    stats: { goals: 25, assists: 18, rating: 9.2 },
    videos: [
        { id: 1, title: 'First Team Debut Highlights', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        { id: 2, title: 'La Masia Skills Compilation', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    ],
    likes: 125,
    comments: [
      { id: 1, author: 'TopScout_1', text: 'Incredible potential, one to watch for sure.' },
      { id: 2, author: 'LaLigaExpert', text: 'His vision is already world-class.' },
    ],
  },
  {
    id: 2,
    name: 'Jude Bellingham',
    age: 20,
    position: 'Midfielder',
    club: 'Borussia Dortmund',
    nationality: 'England',
    imageUrl: 'https://picsum.photos/seed/bellingham/200/200',
    stats: { goals: 12, assists: 15, rating: 8.8 },
    videos: [
        { id: 3, title: 'Defensive Masterclass vs. Bayern', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
    likes: 210,
    comments: [
        { id: 3, author: 'BundesligaFan', text: 'Most complete young midfielder in the game.' },
    ],
  },
  {
    id: 3,
    name: 'Kylian Mbappé',
    age: 21,
    position: 'Forward',
    club: 'AS Monaco',
    nationality: 'France',
    imageUrl: 'https://picsum.photos/seed/mbappe/200/200',
    stats: { goals: 30, assists: 10, rating: 9.0 },
    videos: [
        { id: 4, title: 'Breakout Season Highlights', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        { id: 5, title: 'Champions League Goals', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
    likes: 180,
    comments: [],
  },
  {
    id: 4,
    name: 'Jamal Musiala',
    age: 18,
    position: 'Attacking Midfielder',
    club: 'Bayern Munich II',
    nationality: 'Germany',
    imageUrl: 'https://picsum.photos/seed/musiala/200/200',
    stats: { goals: 15, assists: 12, rating: 8.5 },
    videos: [],
    likes: 155,
    comments: [
       { id: 4, author: 'Scout_DE', text: 'His dribbling in tight spaces is unreal.' },
       { id: 5, author: 'Agent_47', text: 'Needs to work on his defensive contributions, but his attacking talent is undeniable.' },
    ],
  },
    {
    id: 5,
    name: 'Erling Haaland',
    age: 20,
    position: 'Striker',
    club: 'Molde FK',
    nationality: 'Norway',
    imageUrl: 'https://picsum.photos/seed/haaland/200/200',
    stats: { goals: 35, assists: 5, rating: 9.1 },
    videos: [
        { id: 6, title: 'Goal Scoring Compilation', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
    ],
    likes: 250,
    comments: [
        { id: 6, author: 'GoalMachine', text: 'Generational talent. Simple as that.'}
    ],
  },
  {
    id: 6,
    name: 'Gavi',
    age: 17,
    position: 'Central Midfielder',
    club: 'La Masia',
    nationality: 'Spain',
    imageUrl: 'https://picsum.photos/seed/gavi/200/200',
    stats: { goals: 8, assists: 14, rating: 8.7 },
    videos: [
        { id: 7, title: 'Midfield Dominance vs Real Madrid', url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
    ],
    likes: 95,
    comments: [],
  },
];

export const SCOUT_NAV_ITEMS: NavItem[] = [
  { name: 'Explore', icon: HomeIcon },
  { name: 'Leaderboard', icon: LeaderboardIcon },
  { name: 'Search', icon: SearchIcon },
  { name: 'Watchlist', icon: StarIcon },
  { name: 'Messages', icon: MailIcon },
];

export const PLAYER_NAV_ITEMS: NavItem[] = [
  { name: 'Profile', icon: UserIcon },
  { name: 'Explore', icon: HomeIcon },
  { name: 'Messages', icon: MailIcon },
  { name: 'Settings', icon: CogIcon },
];
