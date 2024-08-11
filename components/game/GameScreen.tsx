"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import ScoreDisplay from "./ScoreDisplay";
import DrawingCanvas from "../ui/drawingcanvas";
import GameTimer from "./GameTimer";
import axios from "axios";
import MultiplierDisplay from "./MultiplierDisplay";
import { set } from "mongoose";

interface GameScreenProps {
  onComplete: () => void;
  setPromptId: any;
  setImagePrompt: any;
  setDrawingUrl: any;
  isPlayToEarn: boolean;
  depositAmount: any;
  account: any;
  setCreationData: any;
  setTimeTaken: any;
}

const GameScreen: React.FC<GameScreenProps> = ({
  onComplete,
  setPromptId,
  setImagePrompt,
  setDrawingUrl,
  isPlayToEarn,
  depositAmount,
  account,
  setCreationData,
  setTimeTaken,
}) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [generatedText, setGeneratedText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generatePrompt();
  }, []);

  const handleSubmit = () => {
    setScore(Math.floor(Math.random() * 100));
    if (canvasRef.current) {
      const originalCanvas = canvasRef.current;
      const originalContext = originalCanvas.getContext("2d");
      setTimeTaken(60 - secondsLeft);

      if (originalContext) {
        // Create a new canvas with the same dimensions
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = originalCanvas.width;
        tempCanvas.height = originalCanvas.height;
        const tempContext = tempCanvas.getContext("2d");

        if (tempContext) {
          // Fill the new canvas with a white background
          tempContext.fillStyle = "#ffffff"; // White color
          tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

          // Draw the original canvas content on top of the white background
          tempContext.drawImage(originalCanvas, 0, 0);

          // Convert the new canvas to a blob and upload it
          tempCanvas.toBlob(async (blob) => {
            if (blob) {
              const data = new FormData();
              data.append("file", blob, "drawing.png");
              data.append("upload_preset", "studio-upload");
              const res = await axios.post(
                "https://api.cloudinary.com/v1_1/arttribute/upload",
                data
              );
              const uploadedFile = res.data;
              setDrawingUrl(uploadedFile.secure_url);

              //save creation to db
              const creationData = {
                drawing_url: uploadedFile.secure_url,
                prompt: generatedText,
                owner: account?._id,
                time_taken: 60 - secondsLeft,
              };
              console.log("creationData", creationData);
              const creationRes = await axios.post("/api/creations", {
                creationData,
              });
              console.log("creationRes", creationRes.data);
              setCreationData(creationRes.data);
            }
          }, "image/png");
        }
      }
    }
    onComplete(); // Trigger the transition to the next screen
  };

  async function generatePrompt() {
    setLoadingPrompt(true);
    setGeneratedText("");
    setImagePrompt("");
    try {
      const response = await fetch("/api/generate/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: "create",
        }),
      });
      console.log("response", response);
      const res = await response.json();
      console.log("res", res);
      setGeneratedText(res.image_prompt);
      setImagePrompt(res.image_prompt);
      generateArt(res.image_prompt);
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error in generating prompts", error);
    }
    setLoadingPrompt(false);
  }

  async function generateArt(image_prompt: string) {
    setPromptId("");
    try {
      console.log("prompt :", image_prompt);
      let promptToken = "sks style"; //TODO: replace with this `${tunedModel.modeldata.token} style` || "sks style";
      const textToImageObject = {
        text: image_prompt,
        negative_prompt: "ugly ",
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate/image`,
        {
          textToImageObject,
          modelId: "690204",
        }
      );
      const PromptResponse = res.data;
      console.log("Prompt Response", PromptResponse);
      setPromptId(PromptResponse.id);
    } catch (error) {
      console.error("Error in API call:", error);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-2 flex flex-col  justify-center p-4 md:p-8 lg:p-12 lg:w-[600px]">
      <div className="lg:hidden flex col-span-12  mt-6">
        <div className="w-16 ">
          <ScoreDisplay score={score} />
        </div>

        {isPlayToEarn && <MultiplierDisplay multiplier={1.5} />}
        <div className="w-16 ml-auto">
          <GameTimer
            initialSeconds={60}
            secondsLeft={secondsLeft}
            setSecondsLeft={setSecondsLeft}
            isActive={isTimerActive}
            setIsActive={setIsTimerActive}
          />
        </div>
      </div>

      <div className=" col-span-12 lg:col-span-10  w-full ">
        <div className="text-sm text-center text-white bg-indigo-500 rounded-xl p-4">
          {generatedText}
          {loadingPrompt && <p>Loading...</p>}
        </div>
        <div className="w-full h-96 sm:h-[40vh] md:h-[50vh] lg:h-[50vh] mb-16">
          <DrawingCanvas ref={canvasRef} />
        </div>
        <Button onClick={handleSubmit} className="mt-2 w-full">
          Submit
        </Button>
      </div>

      <div className="hidden lg:flex flex-col lg:col-span-2">
        <div className="border rounded-xl p-2">
          <GameTimer
            initialSeconds={60}
            secondsLeft={secondsLeft}
            setSecondsLeft={setSecondsLeft}
            isActive={isTimerActive}
            setIsActive={setIsTimerActive}
          />
        </div>
        <div className="mt-4 border rounded-xl p-2">
          <ScoreDisplay score={score} />
        </div>{" "}
        {isPlayToEarn && (
          <>
            <p className="mt-4 text-xs text-center p-1 text-green-600 font-semibold">
              {depositAmount} $
            </p>
            <div className=" border border-blue-300 text-center rounded-xl py-3">
              <MultiplierDisplay multiplier={1.5} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
