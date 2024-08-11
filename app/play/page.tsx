"use client";

import React, { useState, useEffect } from "react";
import GameScreen from "@/components/game/GameScreen";
import MatchScreen from "@/components/game/MatchScreen";
import AppBar from "@/components/layout/AppBar";
import StartGameScreen from "@/components/game/StartGameScreen";
import { User } from "@/models/User";

import RequireAuthPlaceholder from "@/components/account/RequireAuthPlaceHolder";

const Play = () => {
  const [currentScreen, setCurrentScreen] = useState("start"); // Default to 'game'
  const [promptId, setPromptId] = useState("");
  const [modelId, setModelId] = useState("690204");
  const [drawingUrl, setDrawingUrl] = useState("");
  const [similarity, setSimilarity] = useState(0);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isPlayToEarn, setIsPlayToEarn] = useState(false);
  const [multiplier, setMultiplier] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [creationData, setCreationData] = useState<any>({});

  const handleGameScreenComplete = () => {
    setCurrentScreen("match");
  };

  const handleMatchScreenComplete = () => {
    setCurrentScreen("game");
  };

  const handleStartGame = () => {
    setCurrentScreen("game");
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

  const [loaded, setLoaded] = useState(false);
  const [loadedAccount, setLoadedAccount] = useState(true);
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setLoadedAccount(true);
    setAccount(user);
  }, [loaded]);

  return (
    <div>
      <AppBar />

      <div className="flex flex-col items-center justify-center mt-8 ">
        {!account && loadedAccount && (
          <div className="mt-12">
            <RequireAuthPlaceholder />
          </div>
        )}
        {account && (
          <>
            {" "}
            {currentScreen === "start" && (
              <StartGameScreen
                onComplete={handleStartGame}
                setIsPlayToEarn={setIsPlayToEarn}
                setDepositAmount={setDepositAmount}
                depositAmount={depositAmount}
              />
            )}
            {currentScreen === "game" && (
              <GameScreen
                onComplete={handleGameScreenComplete}
                setPromptId={setPromptId}
                setDrawingUrl={setDrawingUrl}
                setImagePrompt={setImagePrompt}
                isPlayToEarn={isPlayToEarn}
                depositAmount={depositAmount}
                account={account}
                setCreationData={setCreationData}
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
                creationData={creationData}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Play;
