import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import socketService from '../../services/socketService';
import { Message } from '../../types';
import { Button } from '../ui/Button';
import { SendIcon } from 'lucide-react';

interface ChatBoxProps {
  className?: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const messages = useGameStore((state) => state.messages);
  const user = useGameStore((state) => state.user);
  const gameMode = useGameStore((state) => state.gameMode);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !user) return;
    
    if (gameMode === 'draw') {
      socketService.submitGuess(inputValue.trim());
    } else {
      socketService.sendMessage(inputValue.trim());
    }
    
    setInputValue('');
  };

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.userId === user?.id;
    const isCorrectGuess = message.isCorrectGuess;
    
    return (
      <div
        key={message.id}
        className={`mb-3 ${isOwnMessage ? 'flex flex-row-reverse' : 'flex flex-row'}`}
      >
        <div
          className={`
            flex flex-col
            max-w-[80%] px-4 py-2 rounded-2xl
            ${isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }
            ${isCorrectGuess ? 'bg-green-500 text-white' : ''}
          `}
        >
          {!isOwnMessage && (
            <span className="text-xs font-semibold mb-1">
              {message.userName}
            </span>
          )}
          <span className="text-sm break-words">{message.text}</span>
          <span className={`
            text-[10px] mt-1
            ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}
            ${isCorrectGuess ? 'text-green-100' : ''}
          `}>
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-gray-50 border-b">
        <h3 className="font-semibold text-gray-700">Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 italic text-sm">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map(renderMessage)}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        onSubmit={handleSendMessage}
        className="p-3 bg-gray-50 border-t flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={gameMode === 'draw' ? "Type your guess..." : "Type a message..."}
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          maxLength={100}
        />
        <Button 
          type="submit"
          className="rounded-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white"
          disabled={!inputValue.trim()}
        >
          <SendIcon size={18} />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;