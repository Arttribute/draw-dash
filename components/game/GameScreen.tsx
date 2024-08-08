"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import ScoreDisplay from '../ui/scoredisplay';
import DrawingCanvas from '../ui/drawingcanvas';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MyToolBar from '../ui/toolbar';


const GameScreen: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [generatedText, setGeneratedText] = useState('Draw a cat');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    setScore(Math.floor(Math.random() * 100));
  };

  const timerProgress = (timeLeft / 60) * 100;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex justify-between w-full mb-4 mt-10">
        <ScoreDisplay score={score} />
        <div className="w-16 h-16">
          <CircularProgressbar
            value={timerProgress}
            text={`${timeLeft}`}
            styles={buildStyles({
              textColor: "#000",
              pathColor: "#4caf50",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="text-xl font-semibold mb-4 animate-pulse">{generatedText}</div>
        <DrawingCanvas ref={canvasRef} />
      </div>
      <Button onClick={handleSubmit} className="mt-4 animate-bounce">Submit</Button>
    </div>
  );
};

export default GameScreen;
