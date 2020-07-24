import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import InfoByCard from "../../components/InfoByCase";
import config from "../../utils/config.json";
import SplashScreen from "../../components/SplashScreen";
import SideBar from "../../components/SideBar";
import className from "classnames";
import { Link } from "react-router-dom";
import Styles from "./Dashboard.module.css";

import _ from "lodash";
import checkShouldReloadData from "../../utils/checkNessaryLoadData";

import Pagination from "../../components/Pagination";
import usePaginationData from "../../components/usePaginationData";

import { connect } from "react-redux";
import { updateWorldInfo } from "../../redux/actions";
import { getWorldInfoByName } from "../../redux/selectors";

const ITEM_PER_PAGE = 15;
const DEFAULT_URL = "/world";

function CountryItem(props) {
  const { Country, TotalConfirmed } = props.info;
  const itemUrl = "/country/" + Country;

  const LinkObject = {
    pathname: itemUrl,
    state: { name: Country }
  }

  return (
    <Link to={LinkObject}>
      <div className={Styles.countryItem}>
        <p> {Country} </p> <p> {TotalConfirmed} </p>{" "}
      </div>{" "}
    </Link>
  );
}

function CountryItemList({
  countryItemList
}) {
  const countryItemReverseList = countryItemList.reverse();

  return countryItemReverseList
    ? countryItemReverseList.map((item) => <CountryItem key={item.Slug} info={item} />)
    : null;
}

const mapStateToProps = state => {
  const worldInfo = getWorldInfoByName(state, 'world');
  return { worldInfo };
};

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [summaryGlobalInfo, setSummaryGlobalInfo] = useState({});

  const {
    currentPageData,
    page,
    setPage,
    setData,
    maxPage,
  } = usePaginationData(ITEM_PER_PAGE, DEFAULT_URL);

  

  const fetchData = async () => {
    const url = config.api + "/summary";
    const isOnline = window.navigator.onLine;
    console.log("time: ", props.worldInfo.time);
    if (isOnline && checkShouldReloadData(props.worldInfo.time)) {
      return axios.get(url).then((response) => {
        const data = response.data;

        setSummaryGlobalInfo(data.Global);

        props.updateWorldInfo('world', data);

        return data.Countries;
      });
    } else {

      console.log("worldInfo catched: ", props.worldInfo);

      setSummaryGlobalInfo(
        props.worldInfo.data.Global
      );

      return props.worldInfo.data.Countries;
    }
  }

  const getInfo = async () => {
    const dataCountries = await fetchData();
    
    setData(dataCountries.reverse());
    setLoading(false);

    props.setVisibilitySplashScreen();
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (!props.hasShowOffSplashScreen) {
    return <SplashScreen />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="full-width">
      <SideBar itemSideBarChoosen="World" />
      <div className={className(Styles.wrapper, "content")}>
        <InfoByCard cases={summaryGlobalInfo} />{" "}
        <div className={Styles.countryItemWrapper}>
          <CountryItemList countryItemList={currentPageData.reverse()} />{" "}
        </div>{" "}
        <Pagination page={page} setPage={setPage} maxPage={maxPage} />{" "}
      </div>{" "}
    </div>
  );
}

export default connect(mapStateToProps, {updateWorldInfo})(Dashboard);
