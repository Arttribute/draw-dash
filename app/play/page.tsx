"use client";
import React, { useState } from "react";
import GameScreen from "@/components/game/GameScreen";
import MatchScreen from "@/components/game/MatchScreen";
import MintScreen from "@/components/game/MintScreen";
import NFTScreen from "@/components/game/NFTScreen";
import Leaderboard from "@/components/game/Leaderboard";
import AppBar from "@/components/layout/AppBar";

const Play = () => {
  const [currentScreen, setCurrentScreen] = useState("game"); // Default to 'game'
  const [promptId, setPromptId] = useState("");
  const [modelId, setModelId] = useState("690204");
  const [drawingUrl, setDrawingUrl] = useState("");
  const [similarity, setSimilarity] = useState(0);
  const [imagePrompt, setImagePrompt] = useState("");

  const handleGameScreenComplete = () => {
    setCurrentScreen("match");
  };

  const handleMatchScreenComplete = () => {
    setCurrentScreen("mint");
  };

  const handleMintScreenComplete = () => {
    setCurrentScreen("nft");
  };

  const handleNFTScreenComplete = () => {
    setCurrentScreen("leaderboard");
  };

  const handleViewLeaderboard = () => {
    setCurrentScreen("leaderboard");
  };

  const handleGoBack = () => {
    switch (currentScreen) {
      case "leaderboard":
        setCurrentScreen("nft");
        break;
      case "nft":
        setCurrentScreen("mint");
        break;
      case "mint":
        setCurrentScreen("match");
        break;
      case "match":
        setCurrentScreen("game");
        break;
      default:
        setCurrentScreen("game");
        break;
    }
  };

  const handleRestartGame = () => {
    setCurrentScreen("game");
  };

  return (
    <div>
      <AppBar />
      1234567
      <div className="flex flex-col items-center justify-center mt-8 ">
        {currentScreen === "game" && (
          <GameScreen
            onComplete={handleGameScreenComplete}
            setPromptId={setPromptId}
            setDrawingUrl={setDrawingUrl}
            setImagePrompt={setImagePrompt}
          />
        )}
        {currentScreen === "match" && (
          <MatchScreen
            onComplete={handleMatchScreenComplete}
            promptId={promptId}
            imagePrompt={imagePrompt}
            modelId={modelId}
            drawingUrl={drawingUrl}
            similarity={similarity}
            setSimilarity={setSimilarity}
          />
        )}
      </div>
    </div>
  );
};

export default Play;
