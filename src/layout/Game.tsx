import React, { Fragment, useEffect, useRef } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
type Coordinate = {
  x: number;
  y: number;
};

interface CanvasProps {
  width: number;
  height: number;
}

socket.emit("lobbymessage", "this is the lobby");

//Initializes the whiteboard with these sizes
const Game = ({ width, height }: CanvasProps) => {
  //<HTMLCanvasElement> describes the element, we could only jus use userefnull. Useref
  let canvasRef = useRef(null);
  let drawingCoordinates: any = [];
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    socket.on("clear", function() {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    socket.on("coordinates1", function(data: Coordinate) {
      drawDot(data);
      drawingCoordinates.push(data);
      socket.on("stop", function() {
        drawingCoordinates = [];
      });

      if (drawingCoordinates.length === 2) {
        drawLine(drawingCoordinates[0], drawingCoordinates[1]);
        drawingCoordinates = [drawingCoordinates[1]];
      }
    });
  });

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

  return (
    <Fragment>
      <div>game</div>
      <canvas ref={canvasRef} height={height} width={width} />
    </Fragment>
  );
};

Game.defaultProps = {
  width: window.innerWidth * 0.99,
  height: window.innerHeight * 0.99
};

export default Game;
