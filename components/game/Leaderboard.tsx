"use client";
import React from 'react';
import LeaderboardTable from '../ui/leaderboardtable';
import { Button } from '../ui/button';

interface LeaderboardProps {
  onGoBack: () => void;
  onRestart: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onGoBack, onRestart }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4 mt-14">Leaderboard</h1>
      <LeaderboardTable />
      <div className='flex flex-row gap-4'>
      <Button onClick={onGoBack} className="mt-4">Go Back</Button>
      <Button onClick={onRestart} className="mt-4">Restart Game</Button>
      </div>
   
    </div>
  );
};

export default Leaderboard;
