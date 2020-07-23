import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./SideBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "../../utils/Firebase";
import className from "classnames";
import { logout } from "../../redux/actions";

function SideBarItem(props) {
  const { info, itemSideBarChoosen } = props;
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

function ItemSideBarList(props) {
  const { itemLists, itemSideBarChoosen } = props;
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

const AuthBtn = (props) => {
  const authentication = useSelector(state => state.auth);
  const dispatch = useDispatch();

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
              <div className={Styles.authBtn} onClick={() => dispatch(logout())}>
                {" "}
                Logout{" "}
              </div>{" "}
            </div>{" "}
          </div>
        );

};

function SideBar({
  itemSideBarChoosen
}) {
  const [isHiddenSideBar, setIsHiddenSideBar] = useState(true);

  const location = useLocation();
  const history = useHistory();


  const doTheLogout = (logout) => {
    firebase
      .auth()
      .signOut()
      .catch(function (error) {
        alert("Log out failed");
      });
    logout();
  };

  const goToLogin = () => {

    history.push({
      pathname: "/login",
      state: { from: location.pathname },
    });
  };

  const switchSideBar = () => {
    setIsHiddenSideBar(!isHiddenSideBar);
  };

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
    <div
      className={className(
        Styles.sideBarWrapper,
        isHiddenSideBar ? Styles.hiddenSidebar : ""
      )}
    >
      <div className={Styles.logoWrapper}>
        <div className={Styles.logo}> </div> <p> Covid - 19 app </p>{" "}
      </div>
      <ItemSideBarList
        itemLists={itemSideBarInfoList}
        itemSideBarChoosen={itemSideBarChoosen}
      />

      <AuthBtn goToLogin={goToLogin} doTheLogout={doTheLogout} />

      <button className={Styles.menuBtnWrapper} onClick={switchSideBar}>
        <div className={Styles.menuBtn}></div>
        <div className={Styles.menuBtn}></div>
        <div className={Styles.menuBtn}></div>
      </button>
    </div>
  );
}

export default SideBar;
