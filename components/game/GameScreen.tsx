"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import ScoreDisplay from '../ui/scoredisplay';
import DrawingCanvas from '../ui/drawingcanvas';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GameScreenProps {
  onComplete: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onComplete }) => {
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
    onComplete(); // Trigger the transition to the next screen
  };

  const timerProgress = (timeLeft / 60) * 100;

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 h-screen mt-16 ">
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-4 mt-10 p-4 rounded-lg">
        <ScoreDisplay score={score} />
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
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
      <div className="flex flex-col items-center w-full mb-16">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-center">{generatedText}</div>
        <div className="w-full h-96 sm:h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <DrawingCanvas ref={canvasRef} />
        </div>
      </div>
      <Button onClick={handleSubmit} className="mt-4 animate-bounce">Submit</Button>
    </div>
  );
};

export default GameScreen;
