import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { Brain, Pencil, Users, Zap, Trophy, Target, X } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showGameModeModal, setShowGameModeModal] = useState(false);

  const handleStartPlaying = () => {
    setShowGameModeModal(true);
  };

  const handleGameModeSelect = (gameMode: 'mcq' | 'draw') => {
    setShowGameModeModal(false);
    navigate(`/${gameMode}/play`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full">
                  <Brain size={48} className="text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                NEET Battleground
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Master NEET concepts through interactive multiplayer games. 
                Challenge friends, test your knowledge, and visualize complex medical concepts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4" onClick={handleStartPlaying}>
                  Start Playing
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Modes Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Battle Mode
            </h2>
            <p className="text-lg text-gray-600">
              Two exciting ways to master NEET concepts
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MCQ Quiz Mode */}
            <Card className="hover:scale-105 transition-transform duration-300" hoverable>
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain size={32} className="mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">MCQ Quiz Battle</h3>
                      <p className="text-blue-100">Test your knowledge</p>
                    </div>
                  </div>
                  <Zap size={24} className="text-yellow-300" />
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Challenge yourself and others with timed multiple-choice questions 
                    covering the entire NEET syllabus.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Real-time competitive gameplay
                    </li>
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Detailed explanations for each answer
                    </li>
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Physics, Chemistry, and Biology topics
                    </li>
                  </ul>
                  <div className="flex gap-2 pt-4">
                    <Link to="/mcq/create" className="flex-1">
                      <Button fullWidth>Create Room</Button>
                    </Link>
                    <Link to="/mcq/play" className="flex-1">
                      <Button variant="outline" fullWidth>Join Public</Button>
                    </Link>
                  </div>
                  <Link to="/mcq/join" className="block">
                    <Button variant="secondary" fullWidth>Join Private Room</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>

            {/* Drawing Challenge Mode */}
            <Card className="hover:scale-105 transition-transform duration-300" hoverable>
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Pencil size={32} className="mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">Drawing Challenge</h3>
                      <p className="text-purple-100">Visualize concepts</p>
                    </div>
                  </div>
                  <Trophy size={24} className="text-yellow-300" />
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Draw and guess medical terms, anatomical structures, and biological 
                    processes in this interactive pictionary-style game.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Visual learning reinforcement
                    </li>
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Collaborative drawing tools
                    </li>
                    <li className="flex items-center">
                      <Target size={16} className="mr-2 text-green-500" />
                      Anatomy and biology focus
                    </li>
                  </ul>
                  <div className="flex gap-2 pt-4">
                    <Link to="/draw/create" className="flex-1">
                      <Button fullWidth>Create Room</Button>
                    </Link>
                    <Link to="/draw/play" className="flex-1">
                      <Button variant="outline" fullWidth>Join Public</Button>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/draw/join" className="flex-1">
                      <Button variant="secondary" fullWidth>Join Private Room</Button>
                    </Link>
                    <Link to="/draw/practice" className="flex-1">
                      <Button variant="outline" fullWidth>Practice Mode</Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose NBG?
              </h2>
              <p className="text-lg text-gray-600">
                The ultimate platform for NEET preparation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multiplayer Learning</h3>
                <p className="text-gray-600">
                  Study with friends or compete with students worldwide in real-time battles.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain size={32} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">NEET-Focused Content</h3>
                <p className="text-gray-600">
                  Curated questions and drawing prompts specifically designed for NEET success.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Trophy size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor your improvement with detailed statistics and leaderboards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Mode Selection Modal */}
        {showGameModeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold">Choose Game Mode</h3>
                <button
                  onClick={() => setShowGameModeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <button
                  onClick={() => handleGameModeSelect('mcq')}
                  className="w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Brain size={24} className="text-blue-600 mr-3" />
                    <div className="text-left">
                      <div className="font-bold">MCQ Quiz Battle</div>
                      <div className="text-sm text-gray-600">Test your knowledge with timed questions</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleGameModeSelect('draw')}
                  className="w-full p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Pencil size={24} className="text-purple-600 mr-3" />
                    <div className="text-left">
                      <div className="font-bold">Drawing Challenge</div>
                      <div className="text-sm text-gray-600">Draw and guess medical concepts</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;