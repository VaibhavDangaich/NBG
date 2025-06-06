import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import JoinRoomForm from '../components/room/JoinRoomForm';
import Layout from './Layout';
import { GameMode } from '../types';

export const JoinPublicRoomPage: React.FC = () => {
  const { gameMode } = useParams<{ gameMode: string }>();
  
  if (gameMode !== 'mcq' && gameMode !== 'draw') {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="flex justify-center items-center py-8">
        <div className="w-full max-w-md px-4">
          <JoinRoomForm gameMode={gameMode as GameMode} isPrivate={false} />
        </div>
      </div>
    </Layout>
  );
};

export default JoinPublicRoomPage;