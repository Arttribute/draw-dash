import React, { useEffect, useRef } from 'react';

const DrawingCanvas: React.FC<React.RefAttributes<HTMLCanvasElement>> = React.forwardRef((props, ref) => {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Initialize canvas context for drawing
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Add more drawing setup if needed
      }
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-300"
    />
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;
