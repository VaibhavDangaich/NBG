import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import CreateRoomPage from './pages/CreateRoomPage';
import JoinPublicRoomPage from './pages/JoinPublicRoomPage';
import JoinPrivateRoomPage from './pages/JoinPrivateRoomPage';
import GameRoomPage from './pages/GameRoomPage';
import SinglePlayerDrawPage from './pages/SinglePlayerDrawPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        
        {/* Create Room */}
        <Route path="/:gameMode/create" element={<CreateRoomPage />} />
        
        {/* Join Public Room */}
        <Route path="/:gameMode/play" element={<JoinPublicRoomPage />} />
        
        {/* Join Private Room */}
        <Route path="/:gameMode/join/:roomId?" element={<JoinPrivateRoomPage />} />
        
        {/* Game Room */}
        <Route path="/room/:gameMode/:roomId" element={<GameRoomPage />} />

        {/* Single Player Draw */}
        <Route path="/draw/practice" element={<SinglePlayerDrawPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App