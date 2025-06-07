import { create } from 'zustand';
import { User, Message, GameMode, MCQQuestion, DrawingWord } from '../types';

interface GameStore {
  // Connection state
  isConnected: boolean;
  
  // User state
  user: User | null;
  users: User[];
  
  // Room state
  roomId: string | null;
  gameMode: GameMode | null;
  
  // Game state
  gameStarted: boolean;
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
  
  // MCQ state
  currentQuestion: MCQQuestion | null;
  selectedOption: string | null;
  
  // Drawing state
  currentWord: DrawingWord | null;
  drawingData: string | null;
  
  // Chat state
  messages: Message[];
  
  // Scores
  scores: Record<string, number>;
  
  // Actions
  setIsConnected: (connected: boolean) => void;
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  setRoomId: (roomId: string | null) => void;
  setGameMode: (gameMode: GameMode | null) => void;
  setGameStarted: (started: boolean) => void;
  setCurrentRound: (round: number) => void;
  setTotalRounds: (rounds: number) => void;
  setTimeLeft: (time: number) => void;
  setCurrentQuestion: (question: MCQQuestion | null) => void;
  setSelectedOption: (option: string | null) => void;
  setCurrentWord: (word: DrawingWord | null) => void;
  setDrawingData: (data: string | null) => void;
  addMessage: (message: Message) => void;
  updateScore: (userId: string, score: number) => void;
  resetGame: () => void;
}

const initialState = {
  isConnected: false,
  user: null,
  users: [],
  roomId: null,
  gameMode: null,
  gameStarted: false,
  currentRound: 0,
  totalRounds: 0,
  timeLeft: 0,
  currentQuestion: null,
  selectedOption: null,
  currentWord: null,
  drawingData: null,
  messages: [],
  scores: {},
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setIsConnected: (connected) => set({ isConnected: connected }),
  
  setUser: (user) => set({ user }),
  
  setUsers: (users) => set({ users }),
  
  setRoomId: (roomId) => set({ roomId }),
  
  setGameMode: (gameMode) => set({ gameMode }),
  
  setGameStarted: (started) => set({ gameStarted: started }),
  
  setCurrentRound: (round) => set({ currentRound: round }),
  
  setTotalRounds: (rounds) => set({ totalRounds: rounds }),
  
  setTimeLeft: (time) => set({ timeLeft: time }),
  
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  
  setSelectedOption: (option) => set({ selectedOption: option }),
  
  setCurrentWord: (word) => set({ currentWord: word }),
  
  setDrawingData: (data) => set({ drawingData: data }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  updateScore: (userId, score) => set((state) => ({
    scores: { ...state.scores, [userId]: score }
  })),
  
  resetGame: () => set({
    gameStarted: false,
    currentRound: 0,
    totalRounds: 0,
    timeLeft: 0,
    currentQuestion: null,
    selectedOption: null,
    currentWord: null,
    drawingData: null,
    messages: [],
    scores: {},
  }),
}));