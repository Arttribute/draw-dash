"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import Timer from '../ui/timer';
import ScoreDisplay from '../ui/scoredisplay';
import ToolBar from '../ui/toolbar';
import DrawingCanvas from '../ui/drawingcanvas';


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

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex justify-between w-full mb-4">
                <ScoreDisplay score={score} />
                <Timer timeLeft={timeLeft} />
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="text-xl mb-4">{generatedText}</div>
                <DrawingCanvas ref={canvasRef} />
                <ToolBar canvasRef={canvasRef} />
            </div>
            <Button onClick={handleSubmit} className="mt-4">Submit</Button>
        </div>
    );
};

export default GameScreen;
