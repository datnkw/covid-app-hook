import React, { useState, useEffect } from "react";
import Dashboard from "../Dashboard";
import CountryInfo from "../CountryItem";
import Profile from "../Profile";
import Login from "../Login";
import { connect } from "react-redux";
import NotiOffline from "../../components/NotiOffline";
import firebase from "../../utils/Firebase";
import { login } from "../../redux/actions";
import "../../styles/App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";

function RenderCountryInfo(props) {
  let { name } = useParams();

  //const location = useLocation();
  return (
    <CountryInfo
      name={name}
      hasShowOffSplashScreen={props.hasShowOffSplashScreen}
      setVisibilitySplashScreen={props.setVisibilitySplashScreen}
    />
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

function App({auth, login}) {
  const [hasShowOffSplashScreen, setHasShowOffSplashScreen] = useState(false);
  const [authentication, setAuthentication] = useState({
    isLogin: false, 
    email: null, 
    id: null 
  })


  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        login(
          {
            email: user.email, 
            id: user.uid
          });
        setAuthentication({...auth});
      }
    });
  };

  const setVisibilitySplashScreen = () => {
    setHasShowOffSplashScreen(true);
  }

  useEffect(() => {
    checkLogin();
  }, [])

    return (
      
        <div className="App">
          <Router>
            <NotiOffline />
            <Switch>
              <Route exact path="/">
                <CountryInfo
                  name="Vietnam"
                  hasShowOffSplashScreen={hasShowOffSplashScreen}
                  setVisibilitySplashScreen={setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/country/:name">
                <RenderCountryInfo
                  
                  hasShowOffSplashScreen={hasShowOffSplashScreen}
                  setVisibilitySplashScreen={setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/world">
                <Dashboard
                  hasShowOffSplashScreen={hasShowOffSplashScreen}
                  setVisibilitySplashScreen={setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/profile">
                <Profile
                  hasShowOffSplashScreen={hasShowOffSplashScreen}
                  setVisibilitySplashScreen={setVisibilitySplashScreen}
                />{" "}
              </Route>{" "}
              <Route path="/login">
                <Login />
              </Route>{" "}
            </Switch>{" "}
          </Router>{" "}
        </div>
    );
  
}
export default connect(mapStateToProps, {login})(App);
