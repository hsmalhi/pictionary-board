import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Fragment
} from "react";
import "../styles/Whiteboard.scss";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Color, color } from "@storybook/theming";
import Toolbar from "./Toolbar/Toolbar";
const socket = io("http://localhost:3001");
//Customizabe canvas
interface CanvasProps {
  width: number;
  height: number;
  room: string;
  side: string;
  socket: any;
}
//Coordinates
type Coordinate = {
  x: number;
  y: number;
};

const Whiteboard = ({ width, height, socket, side }: CanvasProps) => {
  let room = window.location.href.split("/")[4];

  //Sends coordinates of the mouse to the server while the user is drawing
  function sendCoords(mousePosition: Coordinate) {
    socket.emit("coordinates", { mousePosition, room, side });
  }
  //When the pen is lifted sends a stop message to the client
  function sendStop() {
    socket.emit("stop", room, side);
  }
  //Sends coordinates of the mouse to the server while the user is drawing
  function sendClear() {
    socket.emit("clear", room, side);
  }

  function handleColorChange(event: string) {
    setColor(event);
  }

  let canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [color, setColor] = useState("black");

  //Clears the image
  const clearImage = function() {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sendClear();
  };

  //Once the mouse is pressed down, we use this callback and then if the coordinates are true we will get the mouse poistion via coordiantes and set setispainting to true
  const startPaint = useCallback(event => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
      //Draws a dot immediately when pressed down
      drawDot(coordinates, color);
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
          drawLine(mousePosition, newMousePosition, color);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  //command to stop scrolling on ios
  document.ontouchmove = function(event) {
    event.preventDefault();
  };

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
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
      sendCoords(newMousePosition);
    }
  };
  //Draw the initial dot for the painting
  const drawDot = (MousePosition: Coordinate, color: string) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.arc(MousePosition.x, MousePosition.y, 2, 0, 2 * Math.PI);
      ctx.fill();
      sendCoords(MousePosition);
    }
  };

  return (
    <Fragment>
      <canvas ref={canvasRef} height={height} width={width} />
      <button className="clear-button" onClick={clearImage}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <Toolbar onColorChange={handleColorChange} />
    </Fragment>
  );
};

Whiteboard.defaultProps = {
  width: window.innerWidth * 0.99,
  height: window.innerHeight * 0.99
};

export default Whiteboard;
