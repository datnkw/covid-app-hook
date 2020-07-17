import React from "react";
import Styles from "./Loading.module.css";
import className from "classnames";

function Loading() {
    return (
      <div className={Styles.loadingWrapper}>
        <div className={className(Styles.loadingDot, Styles.dot1)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot2)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot3)}> </div>{" "}
        <div className={className(Styles.loadingDot, Styles.dot4)}> </div>{" "}
      </div>
    );
}

export default Loading;
