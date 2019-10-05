import React, { Fragment, useEffect, useRef } from "react";
import { Socket } from "socket.io";
type Coordinate = {
  x: number;
  y: number;
};

interface CanvasProps {
  width: number;
  height: number;
  side: string;
  socket: Socket;
}

type message = {
  mousePosition: Coordinate;
  color: string;
  stroke:string
};

//Initializes the whiteboard with these sizes
const BoardDisplay = ({ width, height, side, socket }: CanvasProps) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);
  let drawingCoordinates: Array<Coordinate> = [];
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    socket.on(`clear${side}`, function() {
      const canvas: HTMLCanvasElement = canvasRef.current;
      if (canvas) {
      const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });

    socket.on(`coordinates${side}`, function(data: message) {
      drawDot(data["mousePosition"], data["color"], data["stroke"]);
      drawingCoordinates.push(data["mousePosition"]);
      socket.on(`stop${side}`, function() {
        drawingCoordinates = [];
      });

      if (drawingCoordinates.length === 2) {
        drawLine(drawingCoordinates[0], drawingCoordinates[1], data["color"], data["stroke"]);
        drawingCoordinates = [drawingCoordinates[1]];
      }
    });
  });

  //Draw the initial dot for the painting
  const drawDot = (MousePosition: Coordinate, color: string, stroke:any) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth=stroke;
      ctx.arc(MousePosition.x, MousePosition.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
    color: string,
    stroke:any
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";
      ctx.lineWidth = stroke;
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  return (
    <Fragment>
      <canvas className={side} ref={canvasRef} height={height} width={width} />
    </Fragment>
  );
};

BoardDisplay.defaultProps = {
  width: window.innerWidth * 0.4,
  height: window.innerHeight * 0.8
};

export default BoardDisplay;
