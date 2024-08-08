"use client";
import React from "react";
import { Button } from "../ui/button";
import ImageComparison from "../ui/imagecomparison";
import { MintDialog } from "./MintDialog";
import { Copy } from "lucide-react";

interface MatchScreenProps {
  onComplete: () => void;
}

const MatchScreen: React.FC<MatchScreenProps> = ({ onComplete }) => {
  const handleMintButtonClick = () => {
    onComplete(); // Trigger the transition to the MintScreen
  };

  return (
    <div className="flex flex-col items-center p-6 mt-10 min-h-screen">
      <div className="">
        <div className="absolute inset-0 opacity-30 rounded-lg bg-slate-200"></div>
        <div className="relative z-10">
          <div className="text-center mb-4">
            <p className="text-xl font-semibold text-gray-800">
              Score: <span className="text-green-600">85%</span>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center mb-4 mr-4">
              <span className="text-sm text-green-600">85%</span>
              <p className="text-xs font-semibold text-gray-800">similarity</p>
            </div>
            <div className="text-center mb-4 ">
              <span className="text-sm text-green-600">85%</span>
              <p className="text-xs font-semibold text-gray-800">time taken</p>
            </div>
          </div>
          {/* Diagonal Image Cards */}
          <ImageComparison />
          {/* Mint Button */}
          <div className="flex justify-center w-full mt-6">
            <MintDialog />
          </div>
          <div className="flex justify-center w-full">
            <Button
              onClick={handleMintButtonClick}
              className="w-full mt-2 px-6 py-3"
            >
              Continue playing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScreen;
