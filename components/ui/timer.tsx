import React from 'react';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className="text-xl font-bold">
      Time Left: {timeLeft}s
    </div>
  );
};

export default Timer;
