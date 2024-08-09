"use client";
import React, { useState } from "react";
import NFTGallery from "../ui/nftgallery";
import { Button } from "../ui/button";

interface NFTScreenProps {
  onViewLeaderboard: () => void;
  onRestart: () => void;
}

const NFTScreen: React.FC<NFTScreenProps> = ({
  onViewLeaderboard,
  onRestart,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "user">("all");

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mt-14">
        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              className={`py-2 px-4 rounded-lg text-sm font-medium w-40 ${
                activeTab === "all"
                  ? "bg-white text-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All NFTs
            </button>
            <button
              className={`py-2 px-4 rounded-lg text-sm font-medium w-40 ${
                activeTab === "user"
                  ? "bg-white text-black font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("user")}
            >
              Your NFTs
            </button>
          </div>
        </div>

        {/* NFT Gallery */}
        <NFTGallery filter={activeTab} />

        {/* Buttons */}
        <div className="flex gap-5">
          <Button onClick={onViewLeaderboard} className="mt-4">
            View Leaderboard
          </Button>
          <Button onClick={onRestart} className="mt-4">
            Restart Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NFTScreen;
