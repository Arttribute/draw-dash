"use client";
import React, { useState } from 'react';
import GameScreen from '@/components/game/GameScreen';
import MatchScreen from '@/components/game/MatchScreen';
import MintScreen from '@/components/game/MintScreen';
import NFTScreen from '@/components/game/NFTScreen';
import Leaderboard from '@/components/game/Leaderboard';
import AppBar from '@/components/layout/AppBar';

const Play = () => {
  const [currentScreen, setCurrentScreen] = useState('game'); // Default to 'game'

  const handleGameScreenComplete = () => {
    setCurrentScreen('match');
  };

  const handleMatchScreenComplete = () => {
    setCurrentScreen('mint');
  };

  const handleMintScreenComplete = () => {
    setCurrentScreen('nft');
  };

  const handleNFTScreenComplete = () => {
    setCurrentScreen('leaderboard');
  };

  const handleViewLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const handleGoBack = () => {
    switch (currentScreen) {
      case 'leaderboard':
        setCurrentScreen('nft');
        break;
      case 'nft':
        setCurrentScreen('mint');
        break;
      case 'mint':
        setCurrentScreen('match');
        break;
      case 'match':
        setCurrentScreen('game');
        break;
      default:
        setCurrentScreen('game');
        break;
    }
  };

  const handleRestartGame = () => {
    setCurrentScreen('game');
  };

  return (
    <div>
      <AppBar/>
      {currentScreen === 'game' && <GameScreen onComplete={handleGameScreenComplete} />}
      {currentScreen === 'match' && <MatchScreen onComplete={handleMatchScreenComplete} />}
      {currentScreen === 'mint' && 
        <MintScreen 
          onComplete={handleMintScreenComplete} 
          onViewLeaderboard={handleViewLeaderboard} 
        />
      }
      {currentScreen === 'nft' && 
        <NFTScreen 
          onViewLeaderboard={handleViewLeaderboard} 
          onRestart={handleRestartGame} 
        />
      }
      {currentScreen === 'leaderboard' && 
        <Leaderboard 
          onGoBack={handleGoBack} 
          onRestart={handleRestartGame} 
        />
      }
    </div>
  );
};

export default Play;
