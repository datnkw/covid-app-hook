import React, { useState, useEffect, useContext } from "react";
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

function App(props) {
  //const UserContextInstance = useContext(UserContext);

  const [hasShowOffSplashScreen, setHasShowOffSplashScreen] = useState(false);
  const [authentication, setAuthentication] = useState({
    isLogin: false, 
    email: null, 
    id: null 
  })

  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //UserContextInstance.login(user.email, user.uid);
        
        //setAuthentication({...UserContextInstance.authentication});
      }
    });
  };

  const setVisibilitySplashScreen = () => {
    setHasShowOffSplashScreen(true);
  }

  useEffect(() => {
    checkLogin();
  }, [])

  const login = (email, id) => {
    setAuthentication({
        isLogin: true, 
        email,
        id
      })
  }

  const logout = async () => {
    await firebase.auth().signOut().catch(function(error) {
      alert("log out failed");
    });
    setAuthentication({
      isLogin: false, 
        email: null,
        id: null
    })
  }

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
export default App;
