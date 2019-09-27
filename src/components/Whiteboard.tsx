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
  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  //This is what starts everything, once the mouse is clicked then it calls start paint which begins the paint process
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        } else {
          drawDot(mousePosition);
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
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
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
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  //Function to get the coordinates of the mouse click
  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "red";
      context.lineJoin = "round";
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    }
  };

  const drawDot = (MousePosition: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.strokeStyle = "red";
      context.lineJoin = "round";
      context.lineWidth = 5;
      context.save();
      context.translate(MousePosition.x, MousePosition.y);
      context.restore();
      context.stroke();

      console.log("running drawdot", MousePosition);
    }
  };

  return <canvas ref={canvasRef} height={height} width={width} />;
};

Whiteboard.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default Whiteboard;
