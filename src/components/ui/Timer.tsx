import React from 'react';
import { cn } from '../../lib/utils';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  showProgress?: boolean;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  showProgress = false,
  className = '',
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (timeLeft > 20) return 'bg-green-500';
    if (timeLeft > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Clock size={16} className="text-gray-500" />
      <div className="flex flex-col">
        <span className="font-mono font-bold text-lg">
          {formatTime(timeLeft)}
        </span>
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div
              className={cn('h-1 rounded-full transition-all duration-1000', getProgressColor())}
              style={{ width: `${Math.max(0, (timeLeft / 60) * 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;