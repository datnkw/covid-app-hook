import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Styles from "./NotiOffline.module.css";

function NotiOffline() {
  const [isDisconnect, setIsDisconnect] = useState(false);
  const [timer, setTimer] = useState();

  useEffect(() => {
    setTimer(setInterval(() => checkConnect()));

    return () => {
      clearInterval(timer);
    }
  }, []);

  const checkConnect = () => {
    const isOnline = window.navigator.onLine;
    if (!isOnline) {
      setIsDisconnect(true);
    } else if (isOnline) {
      setIsDisconnect(false);
    }
  }

    return (
      <div
        className={classNames(
          Styles.warning,
          isDisconnect ? Styles.disconnect : null
        )}
      >
        Internet connection lost
      </div>
    );
}

export default NotiOffline;
