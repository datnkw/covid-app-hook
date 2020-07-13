import React from "react";
import styles from "./Login.module.css";
import styleSplashScreen from "../splashScreen/SplashScreen.module.css";
import className from "classnames";
import firebase from "../profile/firebase";
import { UserContext } from "./user-context";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  static contextType = UserContext;

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  async login(event) {
    event.preventDefault();

    const { email, password } = this.state;

    if(!window.navigator.onLine) {
      alert("Disconnect internet");
        return;
    }

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        alert("login failed");
        return;
        // ...
      });

    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.context.login(user.email, user.uid);
        this.props.history.push(this.props.location.state.from);
      }
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={className(styleSplashScreen.logo, styles.logo)}></div>
        <form onSubmit={this.login} method="post">
          <div className={styles.inputWrapper}>
            <p>email:</p>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.inputWrapper}>
            <p>password:</p>
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input className={styles.submit} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
