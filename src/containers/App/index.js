import React from "react";
import Dashboard from "../Dashboard";
import CountryInfo from "../CountryItem";
import Profile from "../Profile";
import Login from "../Login";
import { UserContext } from "../../utils/UserContext";
import NotiOffline from "../../components/NotiOffline";
import firebase from "../../utils/Firebase";
import "../../styles/App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function RenderCountryInfo(props) {
  let { name } = useParams();
  return (
    <CountryInfo
      name={name}
      hasShowOffSplashScreen={props.hasShowOffSplashScreen}
      setVisibilitySplashScreen={props.setVisibilitySplashScreen}
    />
  );
}

class App extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      hasShowOffSplashScreen: false,
      isTimeOutSplashScreen: false,
      isLoadingDataDone: false,
      itemSideBarChoosen: "",
      authentication: { isLogin: false, email: null, id: null },
    };

    this.setVisibilitySplashScreen = this.setVisibilitySplashScreen.bind(this);
    this.setItemSideBarChoosen = this.setItemSideBarChoosen.bind(this);
  }

  checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.context.login(user.email, user.uid);
        
        this.setState({
          authentication: { ...this.context.authentication },
        });
      }
    });
  };

  setVisibilitySplashScreen() {
    this.setState({
      hasShowOffSplashScreen: true,
    });
  }

  setItemSideBarChoosen(item) {
    this.setState({
      itemSideBarChoosen: item,
    });
  }

  componentDidMount() {
    this.checkLogin();
  }

  login = (email, id) => {
    this.setState({
      authentication: {
        isLogin: true, 
        email,
        id
      }
    })
  }

  logout = async () => {
    await firebase.auth().signOut().catch(function(error) {
    });
    this.setState({
      authentication: {
        isLogin: false, 
        email: null,
        id: null
      }
    })
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          authentication: this.state.authentication,
          logout: this.logout,
          login: this.login,
        }}
      >
        <div className="App">
          <Router>
            <NotiOffline />
            <Switch>
              <Route exact path="/">
                <CountryInfo
                  name="Vietnam"
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/country/:name">
                <RenderCountryInfo
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/world">
                <Dashboard
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/profile">
                <Profile
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/login">
                <Login />
              </Route>{" "}
            </Switch>{" "}
          </Router>{" "}
        </div>
      </UserContext.Provider>
    );
  }
}
//App.contextType = UserContext;
export default App;
