import React from "react";
import styles from "./Loading.module.css";

class Loading extends React.Component {
  render() {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loading}> </div>{" "}
      </div>
    );
  }
}

export default Loading;
