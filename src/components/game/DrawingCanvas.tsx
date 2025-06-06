import React, { useRef, useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import socketService from '../../services/socketService';
import Button from '../ui/Button';
import { 
  Eraser, 
  Paintbrush,
  Square, 
  Circle,
  Trash2,
  Plus,
  Minus,
  MousePointer,
  LineChart
} from 'lucide-react';

interface DrawingCanvasProps {
  isDrawer: boolean;
  className?: string;
}

type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle' | 'line';
type Point = { x: number; y: number };

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ 
  isDrawer, 
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<Tool>('brush');
  const [startPos, setStartPos] = useState<Point | null>(null);
  const [lastPos, setLastPos] = useState<Point | null>(null);
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);
  
  const drawingData = useGameStore((state) => state.drawingData);
  const currentWord = useGameStore((state) => state.currentWord);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      setContext(ctx);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    if (!context) return;
    context.strokeStyle = color;
    context.lineWidth = brushSize;
  }, [context, color, brushSize]);

  useEffect(() => {
    if (!isDrawer && drawingData && canvasRef.current) {
      const image = new Image();
      image.onload = () => {
        if (!canvasRef.current || !context) return;
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(image, 0, 0);
      };
      image.src = drawingData;
    }
  }, [drawingData, isDrawer, context]);

  const resizeCanvas = () => {
    if (!canvasRef.current || !context) return;
    
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      if (drawingData) {
        const image = new Image();
        image.onload = () => context.drawImage(image, 0, 0);
        image.src = drawingData;
      }
    }
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const saveSnapshot = () => {
    if (!canvasRef.current || !context) return;
    setSnapshot(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  const restoreSnapshot = () => {
    if (!context || !snapshot) return;
    context.putImageData(snapshot, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !context || !canvasRef.current) return;
    
    setIsDrawing(true);
    const pos = getMousePos(e);
    setStartPos(pos);
    setLastPos(pos);
    saveSnapshot();

    if (tool === 'brush' || tool === 'eraser') {
      context.beginPath();
      context.moveTo(pos.x, pos.y);
      context.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawer || !context || !canvasRef.current || !startPos || !lastPos) return;
    
    const pos = getMousePos(e);

    if (tool === 'brush' || tool === 'eraser') {
      context.lineTo(pos.x, pos.y);
      context.stroke();
    } else {
      restoreSnapshot();
      context.beginPath();
      
      switch (tool) {
        case 'rectangle':
          context.rect(
            startPos.x,
            startPos.y,
            pos.x - startPos.x,
            pos.y - startPos.y
          );
          break;
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2)
          );
          context.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
          break;
        case 'line':
          context.moveTo(startPos.x, startPos.y);
          context.lineTo(pos.x, pos.y);
          break;
      }
      
      context.stroke();
    }

    setLastPos(pos);
  };

  const finishDrawing = () => {
    if (!isDrawing || !isDrawer || !context || !canvasRef.current) return;
    
    context.closePath();
    setIsDrawing(false);
    setStartPos(null);
    setLastPos(null);
    setSnapshot(null);

    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL();
      socketService.submitDrawing(dataURL);
    }
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL();
      socketService.submitDrawing(dataURL);
    }
  };

  const colors = [
    '#000000', '#7F7F7F', '#880015', '#ED1C24', '#FF7F27', '#FFF200', 
    '#22B14C', '#00A2E8', '#3F48CC', '#A349A4', '#FFFFFF', '#C3C3C3', 
    '#B97A57', '#FFAEC9', '#FFC90E', '#EFE4B0', '#B5E61D', '#99D9EA',
    '#7092BE', '#C8BFE7'
  ];

  const tools = [
    { id: 'brush', icon: <Paintbrush size={16} />, label: 'Brush' },
    { id: 'eraser', icon: <Eraser size={16} />, label: 'Eraser' },
    { id: 'line', icon: <LineChart size={16} />, label: 'Line' },
    { id: 'rectangle', icon: <Square size={16} />, label: 'Rectangle' },
    { id: 'circle', icon: <Circle size={16} />, label: 'Circle' }
  ];

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {isDrawer && (
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 p-1 bg-white rounded-lg shadow-sm">
              {tools.map((t) => (
                <Button
                  key={t.id}
                  type="button"
                  className={`p-2 ${tool === t.id ? 'bg-blue-100' : ''}`}
                  onClick={() => setTool(t.id as Tool)}
                  icon={t.icon}
                  title={t.label}
                />
              ))}
            </div>

            <div className="flex items-center space-x-1 p-1 bg-white rounded-lg shadow-sm">
              <Button
                type="button"
                className="p-2"
                onClick={() => setBrushSize(Math.max(1, brushSize - 2))}
                icon={<Minus size={16} />}
                title="Decrease size"
              />
              <span className="w-8 text-center">{brushSize}</span>
              <Button
                type="button"
                className="p-2"
                onClick={() => setBrushSize(Math.min(50, brushSize + 2))}
                icon={<Plus size={16} />}
                title="Increase size"
              />
            </div>

            <div className="flex flex-wrap gap-1 p-1 bg-white rounded-lg shadow-sm">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-6 h-6 rounded-lg ${color === c ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
                  style={{ backgroundColor: c, border: '1px solid #ccc' }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="danger"
              className="ml-auto"
              onClick={clearCanvas}
              icon={<Trash2 size={16} />}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 bg-white relative">
        <canvas
          ref={canvasRef}
          className={`absolute top-0 left-0 w-full h-full ${isDrawer ? 'cursor-crosshair' : ''}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;