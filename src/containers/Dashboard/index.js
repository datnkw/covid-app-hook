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
import isNeededToReloadData from "../../utils/checkNessaryLoadData";

import Pagination from "../../components/Pagination";
import usePaginationData from "../../components/usePaginationData";

const ITEM_PER_PAGE = 15;
const DEFAULT_URL = "/world";

function CountryItem(props) {
  const { Country, TotalConfirmed } = props.info;
  const itemUrl = "/country/" + Country;

  return (
    <Link to={itemUrl}>
      <div className={Styles.countryItem}>
        <p> {Country} </p> <p> {TotalConfirmed} </p>{" "}
      </div>{" "}
    </Link>
  );
}

function CountryItemList({
  countryItemList
}) {
  return countryItemReverseList
    ? countryItemReverseList.map((item) => <CountryItem key={item.Slug} info={item} />)
    : null;
}

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

    if (isOnline && isNeededToReloadData("prevGetDataTime")) {
      return axios.get(url).then((response) => {
        const dataCountries = response.data.Countries;
        setSummaryGlobalInfo(response.data.Global);

        localStorage.setItem(
          "summaryGlobalInfo",
          JSON.stringify(response.data.Global)
        );
        localStorage.setItem(
          "summaryCountries",
          JSON.stringify(dataCountries)
        );
        localStorage.setItem(
          "prevGetDataTime",
          Date.now()/1000
        )

        return dataCountries;
      });
    } else {
      setSummaryGlobalInfo(
        JSON.parse(localStorage.getItem("summaryGlobalInfo"))
      );
      const dataCountries = JSON.parse(localStorage.getItem("summaryCountries"));

      return dataCountries;
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

export default Dashboard;
