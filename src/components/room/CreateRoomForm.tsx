import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import socketService from '../../services/socketService';
import { useGameStore } from '../../store/gameStore';
import { GameMode, User } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Users, Brain, Pencil } from 'lucide-react';

interface CreateRoomFormProps {
  gameMode: GameMode;
  className?: string;
}

export const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ 
  gameMode, 
  className = '' 
}) => {
  const navigate = useNavigate();
  const setUser = useGameStore((state) => state.setUser);
  
  const [userName, setUserName] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      setError('Please enter your name');
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
      
      // Create room
      const roomId = socketService.createRoom(gameMode, isPrivate, user);
      
      // Navigate to room
      navigate(`/room/${gameMode}/${roomId}`);
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Failed to create room. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const gameModeIcon = gameMode === 'mcq' 
    ? <Brain size={20} /> 
    : <Pencil size={20} />;
  
  const gameModeName = gameMode === 'mcq' 
    ? 'MCQ Quiz' 
    : 'Drawing Game';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-blue-600 text-white">
        <div className="flex items-center">
          {gameModeIcon}
          <h2 className="text-xl font-bold ml-2">
            Create {gameModeName} Room
          </h2>
        </div>
      </div>
      
      <form onSubmit={handleCreateRoom} className="p-6">
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
            icon={<Users size={18} />}
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">
              Create private room (generate invite code)
            </span>
          </label>
        </div>
        
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
            disabled={isSubmitting || !userName.trim()}
          >
            {isSubmitting ? 'Creating...' : 'Create Room'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomForm;