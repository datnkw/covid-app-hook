import React from "react";
import styles from "./Loading.module.css";
import className from "classnames";

function Loading() {
    return (
      <div className={styles.loadingWrapper}>
        <div className={className(styles.loadingDot, styles.dot1)}> </div>{" "}
        <div className={className(styles.loadingDot, styles.dot2)}> </div>{" "}
        <div className={className(styles.loadingDot, styles.dot3)}> </div>{" "}
        <div className={className(styles.loadingDot, styles.dot4)}> </div>{" "}
      </div>
    );
}

export default Loading;
