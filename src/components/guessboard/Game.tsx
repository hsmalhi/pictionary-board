import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnswerBox from "./AnswerBox";

const CentreWrapper = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Bubblegum Sans", sans-serif;
`;

const Word = styled(({ word, ...props }) => <div {...props}>{word}</div>)`
  font-size: 5em;
  line-height: 1em;
  padding: 0;
  margin: 0;
  font-family: "Bubblegum Sans", sans-serif;
`;

const Results = styled(({ score, attempts, ...props }) => (
  <div {...props}>
    Score: <span>{score}</span>, Attempts: <span>{attempts}</span>
  </div>
))`
  display: block;
  font-size: 1.5em;
  span {
    font-weight: bold;
  }
`;

const shuffle = (arr: any) => [...arr].sort(() => 0.5 - Math.random());

export default (props: any) => {
  const [words, setWords] = useState(() => shuffle(props.words));
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(props.attempts);

  const nextWord = () => {
    setWords(words.length > 1 ? words.slice(1) : shuffle(props.words));
    setAttempts(props.attempts);
  };

  const onCorrect = () => {
    setScore(score + 1);
    nextWord();
  };

  const onIncorrect = () => {
    if (attempts >= 0) {
      setAttempts(attempts + 1);
      return;
    }

    setScore(Math.max(0, score - 1));
    nextWord();
  };

  const [{ emoji, name }] = words;

  useEffect(() => props.cheatMode && console.log(name), [name]);

  return (
    <CentreWrapper>
      <Word word={emoji} />
      <AnswerBox
        answer={name}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
      <Results score={score} attempts={attempts} />
    </CentreWrapper>
  );
};