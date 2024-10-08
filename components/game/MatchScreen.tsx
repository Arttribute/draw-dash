"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import ImageComparison from "../ui/imagecomparison";
import { MintDialog } from "./MintDialog";

import axios from "axios";
import LoadingCount from "./LoadingCount";
import { compare } from "@/app/actions/compare";

interface MatchScreenProps {
  onComplete: () => void;
  promptId: string;
  modelId: string;
  imagePrompt: string;
  drawingUrl: string;
  similarity: number;
  setSimilarity: any;
  creationData: any;
  timeTaken: number;
}

const MatchScreen: React.FC<MatchScreenProps> = ({
  onComplete,
  promptId,
  modelId,
  imagePrompt,
  drawingUrl,
  similarity,
  setSimilarity,
  creationData,
  timeTaken,
}) => {
  const [generatedImage, setGeneratedImage] = useState("");
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [score, setScore] = useState(10);

  const worker = useRef<any>(null);
  const [workerReady, setWorkerReady] = useState<boolean | null>(null);

  const handleMintButtonClick = () => {
    onComplete(); // Trigger the transition to the MintScreen
  };

  useEffect(() => {
    getAIImage(promptId, modelId);
  }, []);

  useEffect(() => {
    if (similarity > 0) {
      calculateScore();
    }
  }, [similarity]);

  const calculateScore = () => {
    const timePenalty = timeTaken > 60 ? 0 : 60 - timeTaken;
    const similarityScore = similarity * 100;
    const score = 20 + similarityScore - timePenalty;
    setScore(score);
  };

  useEffect(() => {
    if (generatedImage !== "" && drawingUrl !== "") {
      compareImages(drawingUrl, generatedImage);
    } else {
      getAIImage(promptId, modelId);
    }
  }, [generatedImage, drawingUrl]);

  async function getAIImage(promptId: string, modelId: string) {
    try {
      setGeneratedImage("");
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image/${promptId}`,
        {
          params: { model_id: modelId, prompt_id: promptId },
        }
      );
      console.log("result", result);
      const promptleImages = result.data.data.images;

      console.log("promptleImages", promptleImages);
      setGeneratedImage(result.data.data.images[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case "initiate":
          setWorkerReady(false);
          break;
        case "ready":
          setWorkerReady(true);
          break;
        case "complete":
          setSimilarity(e.data.output);
          setLoadingComparison(false);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const compare = useCallback(
    (links: { query_image: string; ans_image: string }) => {
      if (worker.current) {
        worker.current.postMessage(links);
      }
    },
    []
  );

  // query image is the drawing, ans image is the AI generated image
  async function compareImages(queryImageURL: string, ansImageURL: string) {
    setLoadingComparison(true);
    setSimilarity(0);

    try {
      // upload image to cloudinary to avoid cors error
      const queryImagedata = new FormData();
      queryImagedata.append("file", ansImageURL);
      queryImagedata.append("upload_preset", "studio-upload");
      const resImage = await axios.post(
        "https://api.cloudinary.com/v1_1/arttribute/upload",
        queryImagedata
      );
      console.log("AI image uploaded to cloudinary");

      compare({
        query_image: queryImageURL,
        ans_image: resImage.data.secure_url,
      });
    } catch (error) {
      console.error("Error in API call:", error);
      setLoadingComparison(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-6 mt-10 min-h-screen">
      <div className="">
        <div className="absolute inset-0 opacity-30 rounded-lg"></div>
        <div className="relative z-10">
          <div className="text-center mb-4">
            <p className="text-xl font-semibold text-gray-800">
              Score:{" "}
              <span className="text-green-600">
                {loadingComparison ? <LoadingCount /> : score?.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center mb-4 mr-4">
              <span className="text-sm text-green-600">
                {loadingComparison ? <LoadingCount /> : similarity?.toFixed(2)}
              </span>
              <p className="text-xs font-semibold text-gray-800">similarity</p>
            </div>
            <div className="text-center mb-4 ">
              <span className="text-sm text-green-600">{timeTaken} sec</span>
              <p className="text-xs font-semibold text-gray-800">time taken</p>
            </div>
          </div>
          {/* Diagonal Image Cards */}
          <ImageComparison
            generatedImage={generatedImage}
            drawingUrl={drawingUrl}
          />
          {/* Mint Button */}
          <div className="flex justify-center w-full mt-6">
            <MintDialog
              drawingUrl={drawingUrl}
              prompt={imagePrompt}
              creationData={creationData}
              score={score}
              similarity={similarity}
            />
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
