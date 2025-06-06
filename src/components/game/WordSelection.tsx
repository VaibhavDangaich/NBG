import React from 'react';
import { DrawingWord } from '../../types';
import socketService from '../../services/socketService';
import Button from '../ui/Button';
import Card, { CardHeader, CardBody } from '../ui/Card';

interface WordSelectionProps {
  words: DrawingWord[];
  className?: string;
}

export const WordSelection: React.FC<WordSelectionProps> = ({ 
  words, 
  className = '' 
}) => {
  const handleSelectWord = (wordId: string) => {
    socketService.selectWord(wordId);
  };
  
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6">Choose a word to draw</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {words.map((word) => (
          <Card 
            key={word.id} 
            className="hover:scale-105 transition-transform"
            hoverable
            onClick={() => handleSelectWord(word.id)}
          >
            <CardHeader className="bg-blue-600 text-white">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {word.category}
                </span>
                <span className={`
                  px-2 py-0.5 rounded text-xs font-medium
                  ${word.difficulty === 'easy' ? 'bg-green-500' : ''}
                  ${word.difficulty === 'medium' ? 'bg-yellow-500' : ''}
                  ${word.difficulty === 'hard' ? 'bg-red-500' : ''}
                `}>
                  {word.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-center font-bold text-xl">
                {word.word}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WordSelection;