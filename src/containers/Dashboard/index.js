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

import Pagination from "../../components/Pagination";
import HocPagination from "../../components/HocPagination";

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

function CountryItemList(props) {
  const { countryItemList } = props;
  return countryItemList
    ? countryItemList.map((item) => <CountryItem key={item.Slug} info={item} />)
    : null;
}

function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [summaryGlobalInfo, setSummaryGlobalInfo] = useState({});
  const [summaryCountries, setSummaryCountries] = useState({});

  const getInfo = async () => {
    const url = config.api + "/summary";
    if (window.navigator.onLine) {
      await axios.get(url).then((response) => {
        setSummaryGlobalInfo(response.data.Global);
        setSummaryCountries(response.data.Countries);
        console.log("summaryGlobalInfo: ", summaryGlobalInfo);
        console.log("data: ", summaryCountries);
        props.setData(response.data.Countries.reverse());

        setLoading(false);
        props.setVisibilitySplashScreen();

        localStorage.setItem(
          "summaryGlobalInfo",
          JSON.stringify(summaryGlobalInfo)
        );
        localStorage.setItem(
          "summaryCountries",
          JSON.stringify(summaryCountries)
        );
      });
    } else {
      summaryGlobalInfo = JSON.parse(localStorage.getItem("summaryGlobalInfo"));
      summaryCountries = JSON.parse(localStorage.getItem("summaryCountries"));
    }
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

  console.log("summaryGlobalInfo: ", summaryGlobalInfo);
  return (
    <div className="full-width">
      <SideBar itemSideBarChoosen="World" />
      <div className={className(Styles.wrapper, "content")}>
        <InfoByCard cases={summaryGlobalInfo} />{" "}
        <div className={Styles.countryItemWrapper}>
          <CountryItemList countryItemList={props.dataCurrentPage} />{" "}
        </div>{" "}
        <Pagination
          setPage={props.setPage}
          page={props.page}
          maxPage={props.maxPage}
        />{" "}
      </div>{" "}
    </div>
  );
}

export default HocPagination(Dashboard, ITEM_PER_PAGE, DEFAULT_URL);
