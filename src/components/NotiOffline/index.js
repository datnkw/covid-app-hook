import React from "react";
import classNames from "classnames";
import Styles from "./NotiOffline.module.css";

class NotiOffline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisconnect: false,
    };

    this.checkConnect = this.checkConnect.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.checkConnect());
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  checkConnect() {
    const { isDisconnect } = this.state;
    const isOnline = window.navigator.onLine;
    if (!isOnline && !isDisconnect) {
      this.setState({
        isDisconnect: true,
      });
    } else if (isOnline && isDisconnect) {
      this.setState({
        isDisconnect: false,
      });
    }
  }

  render() {
    return (
      <div
        className={classNames(
          Styles.warning,
          this.state.isDisconnect ? Styles.disconnect : null
        )}
      >
        Internet connection lost
      </div>
    );
  }
}

export default NotiOffline;
