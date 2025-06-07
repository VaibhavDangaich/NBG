export type GameMode = 'mcq' | 'draw';

export interface User {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  isDrawing?: boolean;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: number;
  isCorrectGuess?: boolean;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface DrawingWord {
  id: string;
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Room {
  id: string;
  gameMode: GameMode;
  isPrivate: boolean;
  users: User[];
  maxUsers: number;
  isGameStarted: boolean;
  currentRound: number;
  totalRounds: number;
}