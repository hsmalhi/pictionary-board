import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Whiteboard from "./components/Whiteboard";

const App: React.FC = () => {
  return (
    <main>
      <Whiteboard room="123" side="left" />
    </main>
  );
};

export default App;
