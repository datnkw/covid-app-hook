import React, {useState, useEffect} from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import InfoByCard from "../InfoByCase/InfoByCase";
import config from "../../config.json";
import SplashScreen from "../splashScreen/SplashScreen";
import SideBar from "../sideBar/SideBar";
import className from "classnames";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";


import "../../App.css";
import Pagination from "../pagination/Pagination";
import HocPagination from "../hocPagination/HocPagination";

const ITEM_PER_PAGE = 15;
const DEFAULT_URL = '/world';

function CountryItem(props) {
    const { Country, TotalConfirmed } = props.info;
    const itemUrl = "/country/" + Country;

    return (
      <Link to={itemUrl}>
        <div className={styles.countryItem}>
          <p>{Country}</p>
          <p>{TotalConfirmed}</p>
        </div>
      </Link>
    );
}

function CountryItemList(props) {
    const { countryItemList } = props;

    return countryItemList
      ? countryItemList.map((item) => (
          <CountryItem key={item.Slug} info={item} />
        ))
      : null;
}

function Dashboard(props){
  const [loading, setLoading] = useState(true);
  let summaryGlobalInfo, summaryCountries;

  const getInfo = async () => {
    const url = config.api + "/summary";
    if (window.navigator.onLine) {
      await axios.get(url).then((response) => {
        summaryGlobalInfo = response.data.Global;
        summaryCountries = response.data.Countries;

        props.setData(response.data.Countries.reverse());

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
      summaryGlobalInfo = JSON.parse(
        localStorage.getItem("summaryGlobalInfo")
      );
      summaryCountries = JSON.parse(
        localStorage.getItem("summaryCountries")
      );
    }

    setLoading(false);
    props.setVisibilitySplashScreen();
  }

  useEffect(async () => {
    await getInfo();
    props.setItemSideBarChoosen("World");
  }, [])

  
    if (!props.hasShowOffSplashScreen) {
      return <SplashScreen />;
    }

    if (loading) {
      return <Loading />;
    }
    return (
      <div className="full-width">
        <SideBar itemSideBarChoosen="World" />
        <div className={className(styles.wrapper, "content")}>
        <InfoByCard cases={summaryGlobalInfo} />
          <div className={styles.countryItemWrapper}>
            <CountryItemList countryItemList={props.dataCurrentPage} />
          </div>
          <Pagination
            setPage={props.setPage}
            page={props.page}
            maxPage={props.maxPage}
          />
        </div>
      </div>
    );
  
}

export default HocPagination(Dashboard, ITEM_PER_PAGE, DEFAULT_URL);
