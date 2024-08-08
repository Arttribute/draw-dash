"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import ScoreDisplay from "./ScoreDisplay";
import DrawingCanvas from "../ui/drawingcanvas";
import GameTimer from "./GameTimer";
import "react-circular-progressbar/dist/styles.css";

interface GameScreenProps {
  onComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [generatedText, setGeneratedText] = useState(
    "Create a surreal landscape painting. Imagine a dreamlike scene where a giant, ancient tree with glowing leaves stands in the middle of a vast, reflective lake."
  );
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    setScore(Math.floor(Math.random() * 100));
    onComplete(); // Trigger the transition to the next screen
  };

  const timerProgress = (timeLeft / 60) * 100;

  return (
    <div className="grid grid-cols-12 gap-2 flex flex-col  justify-center p-4 md:p-8 lg:p-12 lg:w-[600px]">
      <div className="lg:hidden flex col-span-12 ">
        <div className="w-16 ">
          <ScoreDisplay score={score} />
        </div>

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
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
