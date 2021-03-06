import React from "react";

import "./timer.styles.scss";

interface Props  {
  startTimeInSeconds: number;
  timeRemainingInSeconds: number;
}

interface State {
  timeRemainingInSeconds: number;
}

export class CountdownTimer extends React.Component<Props, State> {
  private timer: number;

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
      <div className="countdown-timer">
        <div className="countdown-timer__circle">
          <svg>
            <circle
              r="22"
              cx="26"
              cy="26"
              style={{
                animation: `countdown-animation ${this.props
                  .startTimeInSeconds}s linear`
              }}
            />
          </svg>
        </div>
        <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds}s
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
