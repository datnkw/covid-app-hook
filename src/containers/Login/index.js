import React, { useState } from "react";
import Styles from "./Login.module.css";
import StyleSplashScreen from "../../components/SplashScreen/SplashScreen.module.css";
import className from "classnames";
import Firebase from "../../utils/Firebase";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const UserContextInstance = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    //console.log("event: ", event);

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
              dispatch(login(
                {
                  email: user.email, 
                  id: user.uid
                }));
              history.push(
                location.state ? location.state.from : "/"
              );
            }
          });
  }

    return (
      <div className={Styles.wrapper}>
        <div className={className(StyleSplashScreen.logo, Styles.logo)}></div>
        <form onSubmit={handleLogin} method="post">
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

export default Login;
