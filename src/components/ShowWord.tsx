import React from "react";
import "../components/Styles/Whiteboard.scss";

interface WordProps {
  word: string;
}


const ShowWord = ({ word }: WordProps) => {
  return <div className="word">{word}</div>;
};

export default ShowWord;
