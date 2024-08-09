import React, { useState, useRef, useEffect, ForwardedRef } from "react";
import MyToolBar from "./toolbar";

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  eraserSize?: number;
}

const DrawingCanvas = React.forwardRef<HTMLCanvasElement, DrawingCanvasProps>(
  (
    { width = 500, height = 400, eraserSize = 10 },
    ref: ForwardedRef<HTMLCanvasElement>
  ) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");
    const [canvasSize, setCanvasSize] = useState({ width, height });
    const [lineWidth, setLineWidth] = useState(3);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Utility function to get the correct coordinates for mouse and touch events
    const getEventCoords = (
      event: React.MouseEvent | React.TouchEvent,
      canvas: HTMLCanvasElement
    ) => {
      let offsetX: number;
      let offsetY: number;

      if ("touches" in event) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
      } else {
        offsetX = event.nativeEvent.offsetX;
        offsetY = event.nativeEvent.offsetY;
      }

      return { offsetX, offsetY };
    };

    const resizeCanvas = (canvas: HTMLCanvasElement) => {
      const parent = canvas.parentElement;
      if (parent) {
        const { clientWidth, clientHeight } = parent;
        setCanvasSize({ width: clientWidth, height: clientHeight });
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          canvas.width = clientWidth;
          canvas.height = clientHeight;
          ctx.putImageData(imageData, 0, 0);
        }
      }
    };

    useEffect(() => {
      if (canvasRef.current) {
        resizeCanvas(canvasRef.current);
        window.addEventListener("resize", () =>
          resizeCanvas(canvasRef.current!)
        );
      }
      return () => {
        window.removeEventListener("resize", () =>
          resizeCanvas(canvasRef.current!)
        );
      };
    }, []);

    useEffect(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = lineWidth; // Use initial line width
        }
      }
    }, [lineWidth]);

    useEffect(() => {
      if (typeof ref === "function") {
        ref(canvasRef.current);
      } else if (ref) {
        ref.current = canvasRef.current;
      }
    }, [ref]);

    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault(); // Prevent scrolling
      if (canvasRef.current) {
        const { offsetX, offsetY } = getEventCoords(event, canvasRef.current);
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY);
          setIsDrawing(true);
        }
      }
    };

    const draw = (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault(); // Prevent scrolling
      if (!isDrawing || !canvasRef.current) return;
      const { offsetX, offsetY } = getEventCoords(event, canvasRef.current);
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        ctx.lineWidth = lineWidth;
      }
    };

    const stopDrawing = () => {
      if (canvasRef.current && isDrawing) {
        setIsDrawing(false);
        setUndoStack([...undoStack, canvasRef.current.toDataURL()]);
        setRedoStack([]);
      }
    };

    const handleUndo = () => {
      if (canvasRef.current && undoStack.length > 0) {
        const ctx = canvasRef.current!.getContext("2d");
        const lastState = undoStack.pop()!;
        setRedoStack([...redoStack, canvasRef.current!.toDataURL()]);
        setUndoStack([...undoStack]);

        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current!.width,
              canvasRef.current!.height
            );
            ctx.drawImage(img, 0, 0);
          }
        };
      }
    };

    const handleRedo = () => {
      if (canvasRef.current && redoStack.length > 0) {
        const ctx = canvasRef.current.getContext("2d");
        const nextState = redoStack.pop()!;
        setUndoStack([...undoStack, canvasRef.current.toDataURL()]);
        setRedoStack([...redoStack]);

        const img = new Image();
        img.src = nextState;
        img.onload = () => {
          if (ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current!.width,
              canvasRef.current!.height
            );
            ctx.drawImage(img, 0, 0);
          }
        };
      }
    };

    const handleDraw = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "source-over";
          ctx.lineWidth = lineWidth;
        }
        setActiveTool("draw");
        setIsErasing(false);
      }
    };

    const handleErase = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineWidth = eraserSize; // Use eraser size when erasing
        }
        setActiveTool("erase");
        setIsErasing(true);
        setIsDrawing(false);
      }
    };

    return (
      <div className="relative w-full h-full">
        <div className="-mb-10">
          <MyToolBar
            handleDraw={handleDraw}
            handleErase={handleErase}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            activeTool={activeTool}
          />
        </div>
        <canvas
          ref={(node) => {
            canvasRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={`border border-gray-300 rounded-xl ${
            isErasing ? "cursor-cell" : "cursor-crosshair"
          } 
            w-full h-full touch-none select-none`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
    );
  }
);

export default DrawingCanvas;
