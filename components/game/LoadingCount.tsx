"use client";

import { useEffect, useState } from "react";

const LoadingCount = () => {
  const [counter, setCounter] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter >= 100) {
          setDirection(-1);
          return prevCounter - 0.1;
        } else if (prevCounter <= 0) {
          setDirection(1);
          return prevCounter + 0.1;
        }
        return prevCounter + 0.1 * direction;
      });
    }, 1);

    return () => clearInterval(interval);
  }, [direction]);

  return <>{counter.toFixed(1)}</>;
};

export default LoadingCount;
