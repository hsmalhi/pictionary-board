import React, { useCallback, useEffect, useRef, useState } from "react";

//Customizabe canvas
interface CanvasProps {
  width: number;
  height: number;
}
//Coordinates
type Coordinate = {
  x: number;
  y: number;
};

//Initializes the whiteboard with these sizes
const Whiteboard = ({ width, height }: CanvasProps) => {
  //<HTMLCanvasElement> describes the element, we could only jus use userefnull. Useref
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //Checks for the state of the thing this is used in some functions
  const [isPainting, setIsPainting] = useState(false);
  //Checks the mouse position via Coordinate
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  //Once the mouse is pressed down, we use this callback and then if the coordinates are true we will get the mouse poistion via coordiantes and set setispainting to true
  const startPaint = useCallback(event => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
      //Draws a dot immediately when pressed down
      drawDot(coordinates);
    }
  }, []);

  //This is what starts everything, once the mouse is clicked then it calls start paint which begins the paint process
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("touchstart", startPaint);
    return () => {
      canvas.removeEventListener("touchstart", startPaint);
    };
  }, [startPaint]);

  //Paint callback, it if is painting and the mouse is moved then we will call the drawline function with each new mouse position
  const paint = useCallback(
    event => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("touchmove", paint);
    return () => {
      canvas.removeEventListener("touchmove", paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("touchend", exitPaint);
    canvas.addEventListener("touchcancel", exitPaint);
    return () => {
      canvas.removeEventListener("touchend", exitPaint);
      canvas.removeEventListener("touchcancel", exitPaint);
    };
  }, [exitPaint]);

  //Function to get the coordinates of the touch
  const getCoordinates = (event): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.touches[0].clientX - canvas.offsetLeft,
      y: event.touches[0].clientY - canvas.offsetTop
    };
  };

  //Draw a line based on the initial coordinate and the final coordinate
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
    }
  };
 //Draw the initial dot for the painting
  const drawDot = (MousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(MousePosition.x, MousePosition.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  return <canvas ref={canvasRef} height={height} width={width} />;
};

Whiteboard.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default Whiteboard;
