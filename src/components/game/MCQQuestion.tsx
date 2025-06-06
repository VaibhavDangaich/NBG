import React from 'react';
import { useGameStore } from '../../store/gameStore';
import socketService from '../../services/socketService';
import { MCQQuestion as MCQQuestionType } from '../../types';
import Timer from '../ui/Timer';
import Button from '../ui/Button';

interface MCQQuestionProps {
  question: MCQQuestionType;
  className?: string;
}

export const MCQQuestion: React.FC<MCQQuestionProps> = ({ 
  question, 
  className = '' 
}) => {
  const selectedOption = useGameStore((state) => state.selectedOption);
  const timeLeft = useGameStore((state) => state.timeLeft);
  
  const handleSelectOption = (optionId: string) => {
    if (!selectedOption) {
      socketService.submitAnswer(optionId);
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-blue-600 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Question</h3>
          <Timer timeLeft={timeLeft} showProgress className="w-32" />
        </div>
      </div>
      
      <div className="px-6 py-4">
        <div className="mb-6">
          <p className="text-lg font-medium">{question.question}</p>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={!!selectedOption}
              className={`
                w-full text-left px-4 py-3 rounded-md border transition-colors
                ${selectedOption === option.id 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'border-gray-300 hover:bg-gray-50'
                }
                ${selectedOption && !selectedOption && option.isCorrect 
                  ? 'bg-green-100 border-green-500' 
                  : ''
                }
              `}
            >
              <span className="mr-2 font-medium">
                {String.fromCharCode(65 + question.options.findIndex(o => o.id === option.id))}
              </span>
              {option.text}
            </button>
          ))}
        </div>
      </div>
      
      {selectedOption && question.explanation && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="font-medium mb-1">Explanation:</div>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MCQQuestion;