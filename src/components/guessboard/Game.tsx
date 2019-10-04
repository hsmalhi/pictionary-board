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

export default (props: any) => {

  const onCorrect = () => {
    props.onCorrect();
  };

  const onIncorrect = () => {
    // setScore(Math.max(0, score - 1));
  };

  return (
    <CentreWrapper>
      <AnswerBox
        answer={props.word}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />
    </CentreWrapper>
  );
};