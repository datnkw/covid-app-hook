import React from "react";
import Styles from "./SplashScreen.module.css";

function Loading() {
  return (
    <div className={Styles.splashWrapper}>
      <div className={Styles.logo}></div>
      <p>Get the latest information about Covid 19</p>
    </div>
  );
}

export default Loading;
