"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./styles/Whiteboard.scss");
const socket_io_client_1 = require("socket.io-client");
//Initializes the whiteboard with these sizes
const Whiteboard = ({ width, height }) => {
    //<HTMLCanvasElement> describes the element, we could only jus use userefnull. Useref
    let canvasRef = react_1.useRef(null);
    //Checks for the state of the thing this is used in some functions
    const [isPainting, setIsPainting] = react_1.useState(false);
    //Checks the mouse position via Coordinate
    const [mousePosition, setMousePosition] = react_1.useState(undefined);
    //Clears the image
    const clearImage = function () {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    //Once the mouse is pressed down, we use this callback and then if the coordinates are true we will get the mouse poistion via coordiantes and set setispainting to true
    const startPaint = react_1.useCallback(event => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setIsPainting(true);
            setMousePosition(coordinates);
            //Draws a dot immediately when pressed down
            drawDot(coordinates);
        }
    }, []);
    //This is what starts everything, once the mouse is clicked then it calls start paint which begins the paint process
    react_1.useEffect(() => {
        const socket = socket_io_client_1.default("http://localhost:3001");
        function sendMsg() {
            socket.emit("message", "HELLO WORLD");
        }
        sendMsg();
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("touchstart", startPaint);
        return () => {
            canvas.removeEventListener("touchstart", startPaint);
        };
    }, [startPaint]);
    //Paint callback, it if is painting and the mouse is moved then we will call the drawline function with each new mouse position
    const paint = react_1.useCallback(event => {
        if (isPainting) {
            const newMousePosition = getCoordinates(event);
            if (mousePosition && newMousePosition) {
                drawLine(mousePosition, newMousePosition);
                setMousePosition(newMousePosition);
            }
        }
    }, [isPainting, mousePosition]);
    document.ontouchmove = function (event) {
        event.preventDefault();
    };
    react_1.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("touchmove", paint);
        return () => {
            canvas.removeEventListener("touchmove", paint);
        };
    }, [paint]);
    const exitPaint = react_1.useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);
    react_1.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("touchend", exitPaint);
        canvas.addEventListener("touchcancel", exitPaint);
        return () => {
            canvas.removeEventListener("touchend", exitPaint);
            canvas.removeEventListener("touchcancel", exitPaint);
        };
    }, [exitPaint]);
    //Function to get the coordinates of the touch
    const getCoordinates = (event) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        return {
            x: event.touches[0].clientX - canvas.offsetLeft,
            y: event.touches[0].clientY - canvas.offsetTop
        };
    };
    //Draw a line based on the initial coordinate and the final coordinate
    const drawLine = (originalMousePosition, newMousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineJoin = "round";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
            ctx.lineTo(newMousePosition.x, newMousePosition.y);
            ctx.closePath();
            ctx.stroke();
            console.log(newMousePosition.x, newMousePosition.y);
        }
    };
    //Draw the initial dot for the painting
    const drawDot = (MousePosition) => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.arc(MousePosition.x, MousePosition.y, 2, 0, 2 * Math.PI);
            ctx.fill();
            console.log(MousePosition.x, MousePosition.y);
        }
    };
    return (<react_1.Fragment>
      <canvas ref={canvasRef} height={height} width={width}/>
      <button className="clear-button" onClick={clearImage}>
      <i class="fal fa-times-circle"></i>      
      </button>
    </react_1.Fragment>);
};
Whiteboard.defaultProps = {
    width: window.innerWidth * 0.99,
    height: window.innerHeight * 0.99
};
exports.default = Whiteboard;
//send over a whole bunch of x/y coordinates
//everytime someone clicks theres a click event send through the soket, send the current coordinate
//
//# sourceMappingURL=Whiteboard.js.map