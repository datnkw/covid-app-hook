import React from "react";
import Styles from "./Login.module.css";
import StyleSplashScreen from "../../components/SplashScreen/SplashScreen.module.css";
import className from "classnames";
import Firebase from "../../utils/Firebase";
import { UserContext } from "../../utils/UserContext";
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
        this.context.login(user.email, user.uid);
        this.props.history.push(
          this.props.location.state ? this.props.location.state.from : "/"
        );
      }
    });
  }

  render() {
    return (
      <div className={Styles.wrapper}>
        <div className={className(StyleSplashScreen.logo, Styles.logo)}></div>
        <form onSubmit={this.login} method="post">
          <div className={Styles.inputWrapper}>
            <p>email:</p>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className={Styles.inputWrapper}>
            <p>password:</p>
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input className={Styles.submit} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
