import React from "react";
import Styles from "./SplashScreen.module.css";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasShowUp: false,
    };
  }

  render() {
    return (
      <div className={Styles.splashWrapper}>
        <div className={Styles.logo}></div>
        <p>Get the latest information about Covid 19</p>
      </div>
    );
  }
}

export default Loading;
