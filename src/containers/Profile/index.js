import React from "react";
import Styles from "./Profile.module.css";
import Firebase from "../../utils/Firebase";
import Loading from "../../components/Loading";
import SideBar from "../../components/SideBar";
import className from "classnames";
import SplashScreen from "../../components/SplashScreen";
import { UserContext } from "../../utils/UserContext";
import { withRouter } from "react-router-dom";

class Profile extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      firstName: "123",
      lastName: "",
      email: "",
      location: "",
      healthStatus: "",
      meetRelatedCovid: "",
      loading: true,
    };

    this.db = Firebase.firestore();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: [target.value],
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    alert(
      "A name was submitted: " +
        this.state.firstName +
        " " +
        this.state.lastName
    );

    this.db
      .collection("profiles")
      .doc(this.context.authentication.id)
      .set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        location: this.state.location,
        healthStatus: this.state.healthStatus,
        meetRelatedCovid: this.state.meetRelatedCovid,
      })
      .then(function () {
        alert("Document successfully written!");
      })
      .catch(function (error) {
        alert("Error writing document: ", error);
      });
  }

  setStateInfo(state) {
    this.setState({
      ...state,
    });
  }

  async componentDidMount() {
    if (!this.context.authentication.isLogin) {
      this.props.history.push({
        pathname: "/login",
        state: { from: this.props.location.pathname },
      });
      return;
    }

    if (window.navigator.onLine) {
      await this.db
        .collection("profiles")
        .doc(this.context.authentication.id)
        .get()
        .then((querySnapshot) => {
          this.setStateInfo(querySnapshot.data());
          localStorage.setItem("data", JSON.stringify(querySnapshot.data()));
        });
    } else {
      this.setStateInfo(JSON.parse(localStorage.getItem("data")));
    }

    this.setState({
      loading: false,
    });
    this.props.setVisibilitySplashScreen();
  }

  render() {
    const labels = {
      firstName: "First name",
      lastName: "Last name",
      location: "Location",
      healthStatus: "Health status",
      meetRelatedCovid: "Are you meeting someone who is related to Covid-19",
    };

    if (!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />;
    }

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="full-width">
        <SideBar itemSideBarChoosen="Profile" />
        <div className={className(Styles.wrapper, "content")}>
          <h1 className={Styles.header}> Your profile </h1>{" "}
          <form onSubmit={this.handleSubmit}>
            {" "}
            {Object.keys(labels).map((item) => {
              return (
                <div className={Styles.itemInput} key={item}>
                  <p> {labels[item]}: </p>{" "}
                  <input
                    name={[item]}
                    type="text"
                    value={this.state[item]}
                    onChange={this.handleChange}
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
}

export default withRouter(Profile);
