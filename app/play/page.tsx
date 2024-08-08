"use client"
import React from 'react';
import GameScreen from '@/components/game/GameScreen'; // Adjust the path if necessary
import MatchScreen from '@/components/game/MatchScreen';
import MintScreen from '@/components/game/MintScreen';
import NFTScreen from '@/components/game/NFTScreen';
import Leaderboard from '@/components/game/Leaderboard';
import AppBar from '@/components/layout/AppBar';

const Play = () => {
  return (
    <div>
        <AppBar />
        <MatchScreen />
    </div>
  );
};

export default Play;
