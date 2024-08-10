import React from "react";
import { Pencil, Eraser, Undo, Redo } from "lucide-react";
import { Button } from "./button";

interface ToolBarProps {
  handleDraw: () => void;
  handleErase: () => void;
  handleUndo: () => void;
  handleRedo: () => void;
  activeTool: "draw" | "erase";
}

const MyToolBar: React.FC<ToolBarProps> = ({
  handleDraw,
  handleErase,
  handleUndo,
  handleRedo,
  activeTool,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "8px",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div className="rounded-2xl p-1 m-2 bg-gray-100 border-2">
          <Button
            onClick={handleDraw}
            variant="ghost"
            className={`rounded-xl px-3 ${
              activeTool === "draw"
                ? "bg-gray-500 hover:bg-gray-500"
                : "hover:bg-gray-200"
            }`}
          >
            <Pencil
              className={`h-4 w-4 ${
                activeTool === "draw" ? "text-white" : "text-black"
              }`}
            />
          </Button>
          <Button
            onClick={handleErase}
            variant="ghost"
            className={`rounded-xl px-3 ${
              activeTool === "erase"
                ? "bg-gray-500 hover:bg-gray-500"
                : "hover:bg-gray-200"
            }`}
          >
            <Eraser
              className={`h-4 w-4 ${
                activeTool === "erase" ? "text-white" : "text-black"
              }`}
            />
          </Button>
          <Button
            onClick={handleUndo}
            variant="ghost"
            className="rounded-xl px-3 hover:bg-gray-200"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRedo}
            variant="ghost"
            className="rounded-xl px-3 hover:bg-gray-200"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyToolBar;
