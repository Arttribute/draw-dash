import * as React from "react";
import { Star } from "lucide-react";

export default function ScoreDisplay({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center   rounded-lg ">
      <div className="flex -mr-2">
        <p className="text-xl lg:text-3xl font-semibold">{score?.toFixed(2)}</p>
        <Star className="w-3 h-3 text-amber-500 font-bold -mb-6" />
      </div>
      <p className="text-sm lg:text-md font-medium ">Score</p>
    </div>
  );
}
