"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import ImageComparison from "../ui/imagecomparison";
import { MintDialog } from "./MintDialog";
import { Copy } from "lucide-react";

import axios from "axios";

interface MatchScreenProps {
  onComplete: () => void;
  promptId: string;
  modelId: string;
}

const MatchScreen: React.FC<MatchScreenProps> = ({
  onComplete,
  promptId,
  modelId,
}) => {
  const [generatedImage, setGeneratedimage] = useState("");
  const handleMintButtonClick = () => {
    onComplete(); // Trigger the transition to the MintScreen
  };

  useEffect(() => {
    getAIImage(promptId, modelId);
  }, []);

  async function getAIImage(promptId: string, modelId: string) {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image/${promptId}`,
        {
          params: { model_id: modelId, prompt_id: promptId },
        }
      );
      console.log("result", result);
      const promptleImages = result.data.data.images;

      console.log("promptleImages", promptleImages);
      setGeneratedimage(result.data.data.images[0]);
    } catch (error) {
      console.error(error);
    }
  }

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
              <span className="text-sm text-green-600">60 sec</span>
              <p className="text-xs font-semibold text-gray-800">time taken</p>
            </div>
          </div>
          {/* Diagonal Image Cards */}
          <ImageComparison generatedImage={generatedImage} />
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
