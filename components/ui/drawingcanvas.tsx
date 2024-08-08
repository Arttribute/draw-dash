import React, { useState, useRef, useEffect, ForwardedRef } from 'react';
import MyToolBar from './toolbar';

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  eraserSize?: number;
}

const DrawingCanvas = React.forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  ({ width = 500, height = 400, eraserSize = 10 }, ref: ForwardedRef<HTMLCanvasElement>) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const [activeTool, setActiveTool] = useState<'draw' | 'erase'>('draw'); 

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const handleResize = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Save current drawing
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Resize canvas
            canvas.width = canvas.parentElement?.clientWidth || width;
            canvas.height = canvas.parentElement?.clientHeight || height;

            // Restore drawing
            ctx.putImageData(imageData, 0, 0);
          }
        }
      };

      // Set initial size
      handleResize();

      // Add resize event listener
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, [width, height]);

    useEffect(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 3;
        }
      }
    }, []);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(canvasRef.current);
      } else if (ref) {
        ref.current = canvasRef.current;
      }
    }, [ref]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
      if (canvasRef.current) {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY);
          setIsDrawing(true); 
        }
      }
    };

    const draw = ({ nativeEvent }: React.MouseEvent) => {
      if (!isDrawing || !canvasRef.current) return;
      const { offsetX, offsetY } = nativeEvent;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    };

    const stopDrawing = () => {
      if (canvasRef.current && isDrawing) {
        setIsDrawing(false); 
        setUndoStack([...undoStack, canvasRef.current.toDataURL()]);
        setRedoStack([]);
      }
    };

    const handleUndo = () => {
      if (canvasRef.current && undoStack.length > 0) {
        const ctx = canvasRef.current!.getContext('2d');
        const lastState = undoStack.pop()!;
        setRedoStack([...redoStack, canvasRef.current!.toDataURL()]);
        setUndoStack([...undoStack]);
    
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            ctx.drawImage(img, 0, 0);
          }
        };
      }
    };

    const handleRedo = () => {
      if (canvasRef.current && redoStack.length > 0) {
        const ctx = canvasRef.current.getContext('2d');
        const nextState = redoStack.pop()!;
        setUndoStack([...undoStack, canvasRef.current.toDataURL()]);
        setRedoStack([...redoStack]);

        const img = new Image();
        img.src = nextState;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            ctx.drawImage(img, 0, 0);
          }
        };
      }
    };

    const handleDraw = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.globalCompositeOperation = 'source-over'; 
        }
        setActiveTool('draw'); 
        setIsErasing(false); 
      }
    };

    const handleErase = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.globalCompositeOperation = 'destination-out'; 
          ctx.lineWidth = eraserSize; 
        }
        setActiveTool('erase'); 
        setIsErasing(true); 
        setIsDrawing(false);
      }
    };

    return (
      <div className="relative w-full h-full">
        <canvas
          ref={(node) => {
            canvasRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={`border border-gray-300 ${isErasing ? 'cursor-cell' : 'cursor-crosshair'} 
            w-full h-full`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing} 
        />
        <MyToolBar
          handleDraw={handleDraw}
          handleErase={handleErase}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          activeTool={activeTool} 
        />
      </div>
    );
  }
);

export default DrawingCanvas;
