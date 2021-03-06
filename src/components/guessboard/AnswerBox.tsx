import React, { useState, useEffect, useMemo, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import "./guessboard.styles.scss";

const toPlaceholder = (value: string, answer: any) =>
  [...value].reduce((placeholder, char) => {
    return placeholder.replace("_", char);
  }, answer.replace(/[^\s]/g, "_"));

const normalise = (value: any) => value.toUpperCase().replace(/[^A-Z]/g, "");

const Form = styled.form`
  margin-bottom: 1em;
`;

const Placeholder = styled.span`
  font-family: "Bubblegum Sans", sans-serif;
  padding: 0 0 0.2em 0.2em;
  font-size: 2em;
  letter-spacing: 0.2em;
  outline: 0 none;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  caret-color: transparent;
  &:focus + ${Placeholder} {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  }
`;

interface AnswerProps {
  answer: any
  onCorrect: any;
  onIncorrect: any;
  shake: boolean;
}

export default ({ answer, onCorrect, onIncorrect, ...props }: AnswerProps) => {
  const [value, setValue] = useState("");

  useEffect(() => setValue(""), [answer]);

  const handleChange = (event: { target: { value: any; }; }) => {
    setValue(normalise(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    value === normalise(answer) ? onCorrect() : onIncorrect();
    setValue("");
    return;
  };

  const placeholder = useMemo(() => toPlaceholder(value, answer), [
    value,
    answer
  ]);

  const maxLength = useMemo(() => normalise(answer).length, [answer]);

  const formClass = classNames("hidden-input-form", { shake: props.shake });

  return (
    <Fragment>
      <Form className={formClass} onSubmit={handleSubmit}>
        <HiddenInput
          onChange={handleChange}
          value={value}
          maxLength={maxLength}
          autoFocus
        />
        <Placeholder>{placeholder}</Placeholder>
      </Form>
      <div className="checking-button">
        <button onTouchStart={handleSubmit}> Submit</button>
      </div>
    </Fragment>
  );
};
