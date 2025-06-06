import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

interface PlayersListProps {
  className?: string;
}

export const PlayersList: React.FC<PlayersListProps> = ({ className = '' }) => {
  const users = useGameStore((state) => state.users);
  const currentUser = useGameStore((state) => state.user);
  const scores = useGameStore((state) => state.scores);
  const gameMode = useGameStore((state) => state.gameMode);

  // Sort users by score in descending order
  const sortedUsers = [...users].sort((a, b) => {
    const scoreA = scores[a.id] || 0;
    const scoreB = scores[b.id] || 0;
    return scoreB - scoreA;
  });

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium">Players ({users.length})</h3>
      </div>
      
      <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        {sortedUsers.map((user) => (
          <PlayerItem 
            key={user.id} 
            user={user} 
            isCurrentUser={user.id === currentUser?.id}
            score={scores[user.id] || 0}
            isDrawing={gameMode === 'draw' && user.isDrawing}
          />
        ))}
      </div>
    </div>
  );
};

interface PlayerItemProps {
  user: User;
  isCurrentUser: boolean;
  score: number;
  isDrawing?: boolean;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ 
  user, 
  isCurrentUser, 
  score,
  isDrawing
}) => {
  return (
    <div 
      className={`
        px-4 py-3 flex items-center justify-between border-b border-gray-100
        ${isCurrentUser ? 'bg-blue-50' : ''}
        ${isDrawing ? 'bg-yellow-50' : ''}
      `}
    >
      <div className="flex items-center">
        <Avatar 
          name={user.name} 
          src={user.avatar} 
          size="sm" 
          showStatus 
          status="online" 
        />
        <div className="ml-3">
          <div className="font-medium flex items-center">
            {user.name}
            {isCurrentUser && (
              <Badge variant="info\" className="ml-2">
                You
              </Badge>
            )}
            {isDrawing && (
              <Badge variant="warning" className="ml-2">
                Drawing
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="font-bold text-blue-600">{score}</div>
    </div>
  );
};

export default PlayersList;