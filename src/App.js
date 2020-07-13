import React from "react";
import Dashboard from "./features/dashboard/Dashboard";
import CountryInfo from "./features/countryItem/CountryInfo";
import Profile from "./features/profile/Profile";
import Login from "./features/login/Login";
import { UserContext } from "./features/login/user-context";
import NotiOffline from "./features/notiOffline/NotiOffline";
import firebase from "./features/profile/firebase";
import "./App.css";

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
      setItemSideBarChoosen={props.setItemSideBarChoosen}
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
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/country/:name">
                <RenderCountryInfo
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/world">
                <Dashboard
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
                />{" "}
              </Route>{" "}
              <Route path="/profile">
                <Profile
                  hasShowOffSplashScreen={this.state.hasShowOffSplashScreen}
                  setVisibilitySplashScreen={this.setVisibilitySplashScreen}
                  setItemSideBarChoosen={this.setItemSideBarChoosen}
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
