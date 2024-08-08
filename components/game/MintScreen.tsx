"use client";
import React from 'react';
import MintForm from '../ui/mintform';
import { Button } from '../ui/button';

interface MintScreenProps {
  onComplete: () => void;
  onViewLeaderboard: () => void;
}

const MintScreen: React.FC<MintScreenProps> = ({ onComplete, onViewLeaderboard }) => {
  const handleMintComplete = () => {
    onComplete(); // Redirect to NFT Screen
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4 mt-14"> Your Drawing</h1>
      <MintForm imageUrl=''/>
      <Button onClick={handleMintComplete} className="mt-4 w-44">Mint Drawing</Button>
      {/* <Button onClick={onViewLeaderboard} className="mt-4">View Leaderboard</Button> */}
    </div>
  );
};

export default MintScreen;
