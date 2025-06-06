import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import socketService from '../../services/socketService';
import { useGameStore } from '../../store/gameStore';
import { GameMode, User } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { User as UserIcon, Hash } from 'lucide-react';

interface JoinRoomFormProps {
  gameMode: GameMode;
  isPrivate?: boolean;
  className?: string;
}

export const JoinRoomForm: React.FC<JoinRoomFormProps> = ({ 
  gameMode, 
  isPrivate = true, 
  className = '' 
}) => {
  const navigate = useNavigate();
  const setUser = useGameStore((state) => state.setUser);
  
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (isPrivate && !roomId.trim()) {
      setError('Please enter room code');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Initialize socket connection
      socketService.initialize();
      
      // Create user
      const user: User = {
        id: uuidv4(),
        name: userName.trim(),
        score: 0,
      };
      
      setUser(user);
      
      // Join room
      const actualRoomId = isPrivate ? roomId.trim() : 'public';
      socketService.joinRoom(actualRoomId, user, gameMode);
      
      // Navigate to room
      navigate(`/room/${gameMode}/${actualRoomId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Failed to join room. Please check the room code and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const gameModeLabel = gameMode === 'mcq' ? 'MCQ Quiz' : 'Drawing Game';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h2 className="text-xl font-bold">
          Join {gameModeLabel} {isPrivate ? 'Private' : 'Public'} Room
        </h2>
      </div>
      
      <form onSubmit={handleJoinRoom} className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <Input
            label="Your Name"
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            fullWidth
            required
            maxLength={20}
            icon={<UserIcon size={18} />}
          />
        </div>
        
        {isPrivate && (
          <div className="mb-6">
            <Input
              label="Room Code"
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room code"
              fullWidth
              required
              maxLength={10}
              icon={<Hash size={18} />}
            />
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !userName.trim() || (isPrivate && !roomId.trim())}
          >
            {isSubmitting ? 'Joining...' : 'Join Room'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoomForm;