"use client";
import React, { useState } from 'react';
import NFTGallery from '../ui/nftgallery';
import { Button } from '../ui/button';

interface NFTScreenProps {
  onViewLeaderboard: () => void;
  onRestart: () => void;
}

const NFTScreen: React.FC<NFTScreenProps> = ({ onViewLeaderboard, onRestart }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'user'>('all');

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mt-14">
        <div className="flex border-b border-gray-300 mb-4">
          <button
            className={`py-2 px-4 text-lg font-medium ${activeTab === 'all' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('all')}
          >
            All NFTs
          </button>
          <button
            className={`py-2 px-4 text-lg font-medium ${activeTab === 'user' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('user')}
          >
            Your NFTs
          </button>
        </div>
        <NFTGallery filter={activeTab} />
        <div className='flex gap-5'>
        <Button onClick={onViewLeaderboard} className="mt-4">View Leaderboard</Button>
        <Button onClick={onRestart} className="mt-4">Restart Game</Button>
        </div>
      
      </div>
    </div>
  );
};

export default NFTScreen;
