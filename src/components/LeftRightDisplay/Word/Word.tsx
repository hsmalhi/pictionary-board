import React from "react";
import"../../Styles/GamePage.scss";
interface WordProps {
  word: string;
}

const convertWord = function(word: string) {
  let result = "";
  for (let letter of word) {
    if (letter === " ") {
      result += "   ";
    } else result += " _ ";
  }
  return result;
};

const Word = ({ word }: WordProps) => {
  let underline = convertWord(word);
  return <div className="word">{underline}</div>;
};

export default Word;
