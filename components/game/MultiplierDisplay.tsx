import * as React from "react";

export default function MultiplierDisplay({
  multiplier,
}: {
  multiplier: number;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="lg:text-xl text-lg italic font-bold  bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
        <p className="mx-1">{multiplier} X</p>
      </div>
      <div className="text-sm italic font-bold  bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
        <p className="mx-1"> multiplier </p>
      </div>
    </div>
  );
}
