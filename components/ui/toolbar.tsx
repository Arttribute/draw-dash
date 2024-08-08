import React from 'react';
import { FaPen, FaEraser, FaUndo, FaRedo } from 'react-icons/fa';

interface ToolBarProps {
  handleDraw: () => void;
  handleErase: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
}

const MyToolBar: React.FC<ToolBarProps> = ({ handleDraw, handleErase, handleUndo, handleRedo }) => {
  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button onClick={handleDraw} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
        <FaPen className="text-lg" />
      </button>
      <button onClick={handleErase} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
        <FaEraser className="text-lg" />
      </button>
      <button onClick={handleUndo} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
        <FaUndo className="text-lg" />
      </button>
      <button onClick={handleRedo} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
        <FaRedo className="text-lg" />
      </button>
    </div>
  );
};

export default MyToolBar;
