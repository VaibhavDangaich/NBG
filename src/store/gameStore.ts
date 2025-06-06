import { create } from 'zustand';

interface Player {
  id: string;
  name: string;
  score: number;
  isReady: boolean;
}

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

interface GameState {
  players: Player[];
  messages: Message[];
  currentWord?: string;
  currentDrawer?: string;
  gameMode: 'waiting' | 'playing' | 'finished';
  timeRemaining: number;
  isHost: boolean;
  roomId?: string;
  // Actions
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerScore: (playerId: string, score: number) => void;
  setPlayerReady: (playerId: string, isReady: boolean) => void;
  addMessage: (message: Message) => void;
  setCurrentWord: (word: string) => void;
  setCurrentDrawer: (playerId: string) => void;
  setGameMode: (mode: 'waiting' | 'playing' | 'finished') => void;
  setTimeRemaining: (time: number) => void;
  setIsHost: (isHost: boolean) => void;
  setRoomId: (roomId: string) => void;
  resetGame: () => void;
}

const initialState = {
  players: [],
  messages: [],
  currentWord: undefined,
  currentDrawer: undefined,
  gameMode: 'waiting' as const,
  timeRemaining: 0,
  isHost: false,
  roomId: undefined,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),

  updatePlayerScore: (playerId, score) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, score } : p
      ),
    })),

  setPlayerReady: (playerId, isReady) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, isReady } : p
      ),
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setCurrentWord: (word) =>
    set(() => ({
      currentWord: word,
    })),

  setCurrentDrawer: (playerId) =>
    set(() => ({
      currentDrawer: playerId,
    })),

  setGameMode: (mode) =>
    set(() => ({
      gameMode: mode,
    })),

  setTimeRemaining: (time) =>
    set(() => ({
      timeRemaining: time,
    })),

  setIsHost: (isHost) =>
    set(() => ({
      isHost,
    })),

  setRoomId: (roomId) =>
    set(() => ({
      roomId,
    })),

  resetGame: () =>
    set(() => ({
      ...initialState,
    })),
}));