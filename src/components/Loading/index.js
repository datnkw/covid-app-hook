import React from "react";
import Styles from "./Loading.module.css";
import className from "classnames";

class Loading extends React.Component {
  render() {
    return (
      <div className={Styles.loadingWrapper}>
        <div className={className(Styles.loadingDot, Styles.dot1)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot2)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot3)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot4)}> </div>{" "}
      </div>
    );
  }
}

export default Loading;
