import React from 'react';
import { FaPen, FaEraser, FaUndo, FaRedo } from 'react-icons/fa';

interface ToolBarProps {
  handleDraw: () => void;
  handleErase: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  activeTool: 'draw' | 'erase';
}

const MyToolBar: React.FC<ToolBarProps> = ({ handleDraw, handleErase, handleUndo, handleRedo, activeTool }) => {
  return (
    <div  style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center', marginBottom:'10px' }}>
      <button
        onClick={handleDraw}
        style={{
          padding: '8px',
          backgroundColor: activeTool === 'draw' ? '#a0aec0' : '#e2e8f0', // Highlight if active
          borderRadius: '8px',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
        }}
      >
        <FaPen style={{ fontSize: '20px', color: activeTool === 'draw' ? '#2d3748' : '#4a5568' }} />
      </button>
      <button
        onClick={handleErase}
        style={{
          padding: '8px',
          backgroundColor: activeTool === 'erase' ? '#a0aec0' : '#e2e8f0', // Highlight if active
          borderRadius: '8px',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
        }}
      >
        <FaEraser style={{ fontSize: '20px', color: activeTool === 'erase' ? '#2d3748' : '#4a5568' }} />
      </button>
      <button
        onClick={handleUndo}
        style={{
          padding: '8px',
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
        }}
      >
        <FaUndo style={{ fontSize: '20px', color: '#4a5568' }} />
      </button>
      <button
        onClick={handleRedo}
        style={{
          padding: '8px',
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
        }}
      >
        <FaRedo style={{ fontSize: '20px', color: '#4a5568' }} />
      </button>
    </div>
  );
};

export default MyToolBar;
