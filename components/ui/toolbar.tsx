import React from 'react';

interface ToolBarProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const ToolBar: React.FC<ToolBarProps> = ({ canvasRef }) => {
  const handleDraw = () => {
    // Implement draw tool functionality
  };

  const handleErase = () => {
    // Implement erase tool functionality
  };

  const handleUndo = () => {
    // Implement undo functionality
  };

  const handleRedo = () => {
    // Implement redo functionality
  };

  return (
    <div className="flex gap-2 mt-4">
      <button onClick={handleDraw} className="p-2 bg-gray-300 rounded hover:bg-gray-400">Draw</button>
      <button onClick={handleErase} className="p-2 bg-gray-300 rounded hover:bg-gray-400">Erase</button>
      <button onClick={handleUndo} className="p-2 bg-gray-300 rounded hover:bg-gray-400">Undo</button>
      <button onClick={handleRedo} className="p-2 bg-gray-300 rounded hover:bg-gray-400">Redo</button>
    </div>
  );
};

export default ToolBar;
