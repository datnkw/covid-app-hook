import React, { useState, useEffect, useReducer } from "react";
import Styles from "./Profile.module.css";
import Firebase from "../../utils/Firebase";
import Loading from "../../components/Loading";
import SideBar from "../../components/SideBar";
import className from "classnames";
import SplashScreen from "../../components/SplashScreen";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

function reducer(state, action) {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: action.value,
      };
    case "lastName":
      return {
        ...state,
        lastName: action.value,
      };
    case "location":
      return {
        ...state,
        location: action.value,
      };
    case "healthStatus":
      return {
        ...state,
        healthStatus: action.value,
      };
    case "meetRelatedCovid":
      return {
        ...state,
        meetRelatedCovid: action.value,
      };
    default:
      return {
        ...action.value,
      };
  }
}

const initialInfo = {
  firstName: "",
  lastName: "",
  location: "",
  healthStatus: "",
  meetRelatedCovid: "",
};

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

function Profile(props) {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useReducer(reducer, initialInfo);
  const [db] = useState(Firebase.firestore());

  const history = useHistory();
  const location = useLocation();

  const handleChange = (event) => {
    const target = event.target;
    setInfo({
      type: target.name,
      value: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection("profiles")
      .doc(props.auth.id)
      .set({
        ...info,
      })
      .then(function () {
        alert("Document successfully written!");
      })
      .catch(function (error) {
        alert("Error writing document: ", error);
      });
  };

  useEffect(() => {
    if (!props.auth.isLogin) {
      history.push({
        pathname: "/login",
        state: { from: location.pathname },
      });
      return;
    }

    if (window.navigator.onLine) {
      db.collection("profiles")
        .doc(props.auth.id)
        .get()
        .then((querySnapshot) => {
          setInfo({
            value: querySnapshot.data(),
          });
          localStorage.setItem("data", JSON.stringify(querySnapshot.data()));
        });
    } else {
      setInfo({
        value: JSON.parse(localStorage.getItem("data")),
      });
    }

    setLoading(false);
    props.setVisibilitySplashScreen();
  }, []);

  const labels = {
    firstName: "First name",
    lastName: "Last name",
    location: "Location",
    healthStatus: "Health status",
    meetRelatedCovid: "Are you meeting someone who is related to Covid-19",
  };

  if (!props.hasShowOffSplashScreen) {
    return <SplashScreen />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="full-width">
      <SideBar itemSideBarChoosen="Profile" />
      <div className={className(Styles.wrapper, "content")}>
        <h1 className={Styles.header}> Your profile </h1>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          {Object.keys(labels).map((item) => {
            return (
              <div className={Styles.itemInput} key={item}>
                <p> {labels[item]}: </p>{" "}
                <input
                  name={[item]}
                  type="text"
                  value={info[item]}
                  onChange={handleChange}
                />{" "}
              </div>
            );
          })}{" "}
          <input className={Styles.submit} type="submit" value="Submit" />
        </form>{" "}
      </div>{" "}
    </div>
  );
}

export default connect(mapStateToProps)(Profile);
