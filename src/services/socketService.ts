import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';
import { User, Message, GameMode, MCQQuestion, DrawingWord } from '../types';
import { v4 as uuidv4 } from 'uuid';

// In a production environment, this would be an environment variable
const SOCKET_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:3001';

class SocketService {
  private socket: Socket | null = null;
  private initialized = false;

  initialize() {
    if (this.initialized) return;
    
    this.socket = io(SOCKET_URL);
    this.setupListeners();
    this.initialized = true;
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      useGameStore.getState().setIsConnected(true);
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      useGameStore.getState().setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    this.socket.on('users', (users: User[]) => {
      useGameStore.getState().setUsers(users);
    });

    this.socket.on('message', (message: Message) => {
      useGameStore.getState().addMessage(message);
    });

    this.socket.on('gameStart', ({ currentRound, totalRounds }) => {
      useGameStore.getState().setCurrentRound(currentRound);
      useGameStore.getState().setTotalRounds(totalRounds);
      useGameStore.getState().setGameStarted(true);
    });

    this.socket.on('newQuestion', (question: MCQQuestion) => {
      useGameStore.getState().setCurrentQuestion(question);
      useGameStore.getState().setSelectedOption(null);
    });

    this.socket.on('newWord', (word: DrawingWord) => {
      useGameStore.getState().setCurrentWord(word);
    });

    this.socket.on('drawingData', (data: string) => {
      useGameStore.getState().setDrawingData(data);
    });

    this.socket.on('timeUpdate', (timeLeft: number) => {
      useGameStore.getState().setTimeLeft(timeLeft);
    });

    this.socket.on('scoreUpdate', ({ userId, score }) => {
      useGameStore.getState().updateScore(userId, score);
    });

    this.socket.on('gameEnd', () => {
      useGameStore.getState().setGameStarted(false);
    });

    this.socket.on('roundUpdate', (round: number) => {
      useGameStore.getState().setCurrentRound(round);
    });
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
    this.initialized = false;
  }

  joinRoom(roomId: string, user: User, gameMode: GameMode) {
    if (!this.socket) return;
    
    this.socket.emit('joinRoom', { roomId, user, gameMode });
    useGameStore.getState().setRoomId(roomId);
    useGameStore.getState().setGameMode(gameMode);
  }

  createRoom(gameMode: GameMode, isPrivate: boolean, user: User) {
    if (!this.socket) return;
    
    const roomId = isPrivate ? uuidv4().substring(0, 6) : 'public';
    this.socket.emit('createRoom', { roomId, gameMode, isPrivate, user });
    useGameStore.getState().setRoomId(roomId);
    useGameStore.getState().setGameMode(gameMode);
    
    return roomId;
  }

  leaveRoom() {
    if (!this.socket) return;
    
    this.socket.emit('leaveRoom');
    useGameStore.getState().setRoomId(null);
    useGameStore.getState().setGameMode(null);
    useGameStore.getState().resetGame();
  }

  startGame() {
    if (!this.socket) return;
    
    const { roomId } = useGameStore.getState();
    if (!roomId) return;
    
    this.socket.emit('startGame', { roomId });
  }

  sendMessage(text: string) {
    if (!this.socket) return;
    
    const { user, roomId } = useGameStore.getState();
    if (!user || !roomId) return;
    
    const message: Omit<Message, 'id'> = {
      userId: user.id,
      userName: user.name,
      text,
      timestamp: Date.now(),
    };
    
    this.socket.emit('message', { roomId, message });
  }

  submitAnswer(optionId: string) {
    if (!this.socket) return;
    
    const { roomId, user } = useGameStore.getState();
    if (!roomId || !user) return;
    
    this.socket.emit('submitAnswer', { roomId, userId: user.id, optionId });
    useGameStore.getState().setSelectedOption(optionId);
  }

  submitDrawing(drawingData: string) {
    if (!this.socket) return;
    
    const { roomId } = useGameStore.getState();
    if (!roomId) return;
    
    this.socket.emit('drawingData', { roomId, drawingData });
  }

  submitGuess(guess: string) {
    if (!this.socket) return;
    
    const { roomId, user } = useGameStore.getState();
    if (!roomId || !user) return;
    
    this.socket.emit('submitGuess', { roomId, userId: user.id, guess });
  }

  selectWord(wordId: string) {
    if (!this.socket) return;
    
    const { roomId } = useGameStore.getState();
    if (!roomId) return;
    
    this.socket.emit('selectWord', { roomId, wordId });
  }
}

export const socketService = new SocketService();
export default socketService;