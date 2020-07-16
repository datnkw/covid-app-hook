import React from "react";
import { Link } from "react-router-dom";
import Styles from "./SideBar.module.css";
import { UserContext } from "../../utils/UserContext";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import className from "classnames";

class SideBarItem extends React.Component {
  render() {
    const {info, itemSideBarChoosen} = this.props;
    return (
      <Link to={info.to}>
        <div
          className={className(Styles.sideBarItem, {
            [Styles.clicked]: itemSideBarChoosen === info.name,
          })}
        >
          {info.name}
        </div>
      </Link>
    );
  }
}

class ItemSideBarList extends React.Component {
  render() {
    const { itemLists, itemSideBarChoosen } = this.props;
    return itemLists
      ? itemLists.map((item) => (
          <SideBarItem
            key={item.name ? item.name : ""}
            info={item}
            itemSideBarChoosen={itemSideBarChoosen}
          />
        ))
      : null;
  }
}

const AuthBtn = (props) => {
  return (
    <UserContext.Consumer>
      {({authentication, logout}) => {
        return (
          <div className={Styles.authWrapper}>
            <div
              className={className(
                Styles.btnHolder,
                authentication.isLogin ? "hidden" : ""
              )}
            >
              <div className={Styles.authBtn} onClick={props.goToLogin}>
                {" "}
                Login{" "}
              </div>{" "}
            </div>{" "}
            <div
              className={className(
                Styles.btnHolder,
                authentication.isLogin ? "" : "hidden"
              )}
            >
              <p> {authentication.email} </p>{" "}
              <div className={Styles.authBtn} onClick={logout}> Logout </div>{" "}
            </div>{" "}
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authentication: {},
      isHiddenSideBar: true
    };
  }

  doTheLogout = (logout) => {
    
    firebase.auth().signOut().catch(function(error) {
    });
    logout();
  }
  
  goToLogin = () => {
    this.props.history.push({
      pathname: '/login',
      state: { from: this.props.location.pathname }
    });
  };

  switchSideBar = () => {
    this.setState({
      isHiddenSideBar: !this.state.isHiddenSideBar
    })
    
  }

  render() {
    const itemSideBarInfoList = [
      {
        name: "Vietnam",
        to: "/",
      },
      {
        name: "World",
        to: "/world",
      },
      {
        name: "Profile",
        to: "/profile",
      },
    ];

    return (
      <div className={className(
        Styles.sideBarWrapper,
        this.state.isHiddenSideBar ? Styles.hiddenSidebar : ''
      )}>
        <div className={Styles.logoWrapper}>
          <div className={Styles.logo}> </div> <p> Covid - 19 app </p>{" "}
        </div>
        <ItemSideBarList
          itemLists={itemSideBarInfoList}
          itemSideBarChoosen={this.props.itemSideBarChoosen}
        />

        <AuthBtn goToLogin={this.goToLogin} doTheLogout={this.doTheLogout}/>

        <button className={Styles.menuBtnWrapper} onClick={this.switchSideBar}>
          <div className={Styles.menuBtn}></div>
          <div className={Styles.menuBtn}></div>
          <div className={Styles.menuBtn}></div>
        </button>
      </div>
    );
  }
}

export default withRouter(SideBar);
