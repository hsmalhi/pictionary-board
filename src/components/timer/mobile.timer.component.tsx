import React from "react";

import "./mobile.timer.styles.scss";

interface Props  {
  startTimeInSeconds: number;
  timeRemainingInSeconds: number;
}

interface State {
  timeRemainingInSeconds: number;
}

export class CountdownTimer extends React.Component<Props, State> {
  private timer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: props.startTimeInSeconds
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      });
    } else {
      clearInterval(this.timer!);
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  render() {
    return (
      <div className="mcountdown-timer">
        <div className="mcountdown-timer__circle">
          <svg>
            <circle
              r="22"
              cx="26"
              cy="26"
              style={{
                animation: `mcountdown-animation ${this.props
                  .startTimeInSeconds}s linear`
              }}
            />
          </svg>
        </div>
        <div className="mcountdown-timer__text">
          {this.state.timeRemainingInSeconds}s
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
