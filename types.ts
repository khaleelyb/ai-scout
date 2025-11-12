
// Fix: Import ComponentType from react to resolve the 'React' not found error.
import type { ComponentType } from 'react';

export type UserRole = 'scout' | 'player';

export interface Video {
  id: number;
  title: string;
  url: string;
}

export interface Comment {
  id: number;
  author: string;
  text: string;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  club: string;
  nationality: string;
  imageUrl: string;
  stats: {
    goals: number;
    assists: number;
    rating: number;
  };
  videos?: Video[];
  likes: number;
  comments?: Comment[];
}

export interface NavItem {
  name: string;
  // Fix: Use ComponentType instead of React.ComponentType
  icon: ComponentType<{ className?: string }>;
}
