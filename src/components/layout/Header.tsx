import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore';
import socketService from '../../services/socketService';
import Button from '../ui/Button';
import { LogOut, Home } from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useGameStore((state) => state.user);
  const roomId = useGameStore((state) => state.roomId);
  
  const handleLogout = () => {
    if (roomId) {
      socketService.leaveRoom();
    }
    
    useGameStore.getState().setUser(null);
    navigate('/');
  };
  
  const handleHome = () => {
    if (roomId) {
      socketService.leaveRoom();
    }
    
    navigate('/');
  };
  
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">NBG</span>
              <span className="ml-2 text-sm text-gray-500">NEET Battleground</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-gray-700">
                <span className="font-medium">{user.name}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              {roomId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHome}
                  icon={<Home size={16} />}
                >
                  Home
                </Button>
              )}
              
              {user && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleLogout}
                  icon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;