import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useGameStore } from '../store/gameStore';
import DrawingCanvas from '../components/game/DrawingCanvas';
import Button from '../components/ui/Button';
import Layout from './Layout';
import { Brain, Eraser, RotateCcw } from 'lucide-react';

const PRACTICE_WORDS = [
  { id: '1', word: 'Mitochondria', category: 'Cell Biology', difficulty: 'easy' },
  { id: '2', word: 'DNA Double Helix', category: 'Genetics', difficulty: 'easy' },
  { id: '3', word: 'Neuron', category: 'Nervous System', difficulty: 'medium' },
  { id: '4', word: 'Nephron', category: 'Excretory System', difficulty: 'hard' },
  { id: '5', word: 'Heart Chambers', category: 'Circulatory System', difficulty: 'medium' },
  { id: '6', word: 'Respiratory System', category: 'Anatomy', difficulty: 'hard' },
  { id: '7', word: 'Cell Membrane', category: 'Cell Biology', difficulty: 'easy' },
  { id: '8', word: 'Chromosome', category: 'Genetics', difficulty: 'medium' },
];

export const SinglePlayerDrawPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(true);
  const [canvasKey, setCanvasKey] = useState(0); // For canvas reset

  // Initialize user if not exists
  React.useEffect(() => {
    const user = useGameStore.getState().user;
    if (!user) {
      useGameStore.getState().setUser({
        id: uuidv4(),
        name: 'Practice User',
        score: 0,
      });
    }
  }, []);

  const currentWord = PRACTICE_WORDS[currentWordIndex];

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % PRACTICE_WORDS.length);
    setShowWord(true);
    setCanvasKey(prev => prev + 1);
  };

  const handleResetCanvas = () => {
    setCanvasKey(prev => prev + 1);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Drawing Practice Mode</h2>
              <p className="text-sm text-gray-500">
                Practice your medical drawing skills
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              icon={<Brain size={18} />}
            >
              Exit Practice
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold mb-4">Current Word</h3>
            <div className="space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-600">Category:</div>
                <div className="text-lg font-bold text-blue-600">
                  {currentWord.category}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-600">Difficulty:</div>
                <div className={`text-lg font-bold ${
                  currentWord.difficulty === 'easy' ? 'text-green-600' :
                  currentWord.difficulty === 'medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {currentWord.difficulty.charAt(0).toUpperCase() + currentWord.difficulty.slice(1)}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-600">Word to Draw:</div>
                <button
                  className="w-full mt-1 py-2 px-4 rounded-md bg-white shadow-sm border border-blue-200 hover:bg-blue-50"
                  onClick={() => setShowWord(!showWord)}
                >
                  {showWord ? currentWord.word : '(Click to reveal)'}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button
                variant="outline"
                fullWidth
                onClick={handleResetCanvas}
                icon={<Eraser size={18} />}
              >
                Clear Canvas
              </Button>
              <Button
                fullWidth
                onClick={handleNextWord}
                icon={<RotateCcw size={18} />}
              >
                Next Word
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <DrawingCanvas
              key={canvasKey}
              isDrawer={true}
              className="h-[600px]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePlayerDrawPage;