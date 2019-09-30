import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header.component"
import Whiteboard from "./components/Whiteboard";

const App: React.FC = () => {
  return (
    <main>
      <Whiteboard room="123" />
      <Header />
    </main>
  );
};

export default App;
