import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CreateRoomForm from '../components/room/CreateRoomForm';
import Layout from './Layout';
import { GameMode } from '../types';

export const CreateRoomPage: React.FC = () => {
  const { gameMode } = useParams<{ gameMode: string }>();
  
  if (gameMode !== 'mcq' && gameMode !== 'draw') {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="flex justify-center items-center py-8">
        <div className="w-full max-w-md px-4">
          <CreateRoomForm gameMode={gameMode as GameMode} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateRoomPage;