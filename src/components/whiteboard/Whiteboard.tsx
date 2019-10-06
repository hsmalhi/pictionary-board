import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment
} from "react";
import "../styles/Whiteboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faTrash } from "@fortawesome/free-solid-svg-icons";
import Toolbar from "./Toolbar/Toolbar";
import { Socket } from "socket.io";

interface CanvasProps {
  width: number;
  height: number;
  side: string;
  socket: Socket;
}

type Coordinate = {
  x: number;
  y: number;
};

const Whiteboard = ({ width, height, socket, side }: CanvasProps) => {
  let room = window.location.href.split("/")[3].toUpperCase();

  let canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [color, setColor] = useState<string>("black");
  const [stroke, setStroke] = useState<number>(14);

  function sendCoords(mousePosition: Coordinate) {
    socket.emit("coordinates", { mousePosition, room, side, color, stroke });
  }
  //When the pen is lifted sends a stop message to the client
  function sendStop() {
    socket.emit("stop", { room, side });
  }
  //Sends coordinates of the mouse to the server while the user is drawing
  function sendClear() {
    socket.emit("clear", { room, side });
  }

  function handleColorChange(event: string) {
    setStroke(14);
    setColor(event);
  }

  //Clears the image
  const clearImage = function() {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sendClear();
  };

  const eraser = () => {
    setColor("white");
    setStroke(50);
  };

  //Once the mouse is pressed down, we use this callback and then if the coordinates are true we will get the mouse poistion via coordiantes and set setispainting to true
  const startPaint = useCallback(
    event => {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
        drawDot(coordinates, color);
      }
    },
    [color]
  );

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

  //command to stop scrolling on ios
  document.ontouchmove = function(event) {
    event.preventDefault();
  };

  //Paint callback, it if is painting and the mouse is moved then we will call the drawline function with each new mouse position
  const paint = useCallback(
    event => {
      if (isPainting) {
        // console.log(color);
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition, color);
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
    sendStop();
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
  const getCoordinates = (event: TouchEvent | undefined) => {
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
    newMousePosition: Coordinate,
    color: string
  ) => {
    if (!canvasRef.current) {
      return;
    }
    if (
      originalMousePosition.x < 0 ||
      originalMousePosition.y < 0 ||
      newMousePosition.x < 0 ||
      newMousePosition.y < 0 ||
      originalMousePosition.x > width ||
      originalMousePosition.y > height ||
      newMousePosition.x > width ||
      newMousePosition.y > height
    ) {
      sendStop();
    } else {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineJoin = "round";
        ctx.lineWidth = stroke;
        ctx.beginPath();
        ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
        ctx.lineTo(newMousePosition.x, newMousePosition.y);
        ctx.closePath();
        ctx.stroke();
        sendCoords(newMousePosition);
      }
    }
  };
  //Draw the initial dot for the painting
  const drawDot = (MousePosition: Coordinate, color: string) => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineJoin = "round";
      ctx.lineWidth = stroke/6;
      ctx.beginPath();
      ctx.arc(MousePosition.x, MousePosition.y, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      sendCoords(MousePosition);
    }
  };

  return (
    <Fragment>
      <div>
      <canvas className="phone-whiteboard" ref={canvasRef} height={height} width={width} />
      </div>
      <div className="additional-tool-button clear" onClick={clearImage}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <div className="additional-tool-button erase" onClick={eraser}>
        <FontAwesomeIcon icon={faEraser} />
      </div>
      <Toolbar onColorChange={handleColorChange} />
    </Fragment>
  );
};

Whiteboard.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight * 0.9
};

export default Whiteboard;
