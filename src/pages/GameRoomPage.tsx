import React from 'react';
import Layout from './Layout';

const GameRoomPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Game Room</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600">Game room content will be implemented here.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameRoomPage;