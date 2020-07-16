import React, { useState, useContext } from "react";
import Styles from "./Login.module.css";
import StyleSplashScreen from "../../components/SplashScreen/SplashScreen.module.css";
import className from "classnames";
import Firebase from "../../utils/Firebase";
import { UserContext } from "../../utils/UserContext";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UserContextInstance = useContext(UserContext);

  const {
    location,
    history
  } = props;

  const login = async (event) => {
    event.preventDefault();

    if (!window.navigator.onLine) {
      alert("Disconnect internet");
      return;
    }

    await Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        alert("login failed");
        return;
      });

    await Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        UserContextInstance.login(user.email, user.uid);
        history.push(
          location.state ? location.state.from : "/"
        );
      }
    });
  }

    return (
      <div className={Styles.wrapper}>
        <div className={className(StyleSplashScreen.logo, Styles.logo)}></div>
        <form onSubmit={login} method="post">
          <div className={Styles.inputWrapper}>
            <p>email:</p>
            <input
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={Styles.inputWrapper}>
            <p>password:</p>
            <input
              name="password"
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input className={Styles.submit} type="submit" value="Login" />
        </form>
      </div>
    );
  
}

export default withRouter(Login);
