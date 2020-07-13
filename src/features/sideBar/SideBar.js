import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./SideBar.module.css";
import { UserContext } from "../login/user-context";
import { withRouter } from "react-router-dom";
import firebase from "../profile/firebase";
import className from "classnames";
import "../../App.css";

class SideBarItem extends React.Component {


  render() {
    const {info, itemSideBarChoosen} = this.props;
    return (
      <Link to={info.to}>
        <div
          className={classNames(styles["side-bar-item"], {
            [styles.clicked]: itemSideBarChoosen === info.name,
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
          <div className={styles.authWrapper}>
            <div
              className={classNames(
                styles.btnHolder,
                authentication.isLogin ? "hidden" : ""
              )}
            >
              <div className={styles.authBtn} onClick={props.goToLogin}>
                {" "}
                Login{" "}
              </div>{" "}
            </div>{" "}
            <div
              className={classNames(
                styles.btnHolder,
                authentication.isLogin ? "" : "hidden"
              )}
            >
              <p> {authentication.email} </p>{" "}
              <div className={styles.authBtn} onClick={logout}> Logout </div>{" "}
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
        styles["wrapper-side-bar"],
        this.state.isHiddenSideBar ? styles.hiddenSidebar : ''
      )}>
        <div className={styles["logo-wrapper"]}>
          <div className={styles["logo"]}> </div> <p> Covid - 19 app </p>{" "}
        </div>
        <ItemSideBarList
          itemLists={itemSideBarInfoList}
          itemSideBarChoosen={this.props.itemSideBarChoosen}
        />

        <AuthBtn goToLogin={this.goToLogin} doTheLogout={this.doTheLogout}/>

        <button className={styles["btn-menu"]} onClick={this.switchSideBar}>
          <div className={styles["menu-btn"]}></div>
          <div className={styles["menu-btn"]}></div>
          <div className={styles["menu-btn"]}></div>
        </button>
      </div>
    );
  }
}

export default withRouter(SideBar);
