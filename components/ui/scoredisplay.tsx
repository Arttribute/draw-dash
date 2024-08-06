import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="text-xl font-bold">
      Score: {score}
    </div>
  );
};

export default ScoreDisplay;
