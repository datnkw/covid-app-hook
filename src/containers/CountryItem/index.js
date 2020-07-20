import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import config from "../../utils/config.json";
import InfoByCase from "../../components/InfoByCase";
import SplashScreen from "../../components/SplashScreen";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/SideBar";
import className from "classnames";
import { useRouteMatch } from "react-router-dom";
import usePaginationData from "../../components/usePaginationData";
import Styles from "./CountryInfo.module.css";
import isNeededToReloadData from "../../utils/checkNessaryLoadData";


const ITEM_PER_PAGE = 5;

function ByDateItem(props) {
  function getData(item, preItem) {
    const TotalConfirmed = item.Confirmed;
    const TotalDeaths = item.Deaths;
    const TotalRecovered = item.Recovered;
    const NewConfirmed = item.Confirmed - (preItem ? preItem.Confirmed : 0);
    const NewDeaths = item.Deaths - (preItem ? preItem.Deaths : 0);
    const NewRecovered = item.Recovered - (preItem ? preItem.Recovered : 0);

    return {
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
    };
  }

  const transfomData = getData(props.item, props.preItem);
  return (
    <div>
      <InfoByCase cases={transfomData} />{" "}
    </div>
  );
}

function ByDateItemList(props) {
  function convertNormalFormatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  const { byDateItemList, setItemSideBarChoosen, name } = props;

  let result = [];

  for (let i = byDateItemList.length - 1; i >= 0; i--) {
    result.push(
      <div key={i}>
        <p className={Styles.headerTime}>
          {" "}
          {convertNormalFormatDate(byDateItemList[i].Date)}{" "}
        </p>{" "}
        <ByDateItem
          item={byDateItemList[i]}
          preItem={!i ? null : byDateItemList[i - 1]}
          name={name}
          setItemSideBarChoosen={setItemSideBarChoosen}
        />{" "}
      </div>
    );
  }

  return <div> {result} </div>;
}

function CountryInfo(props) {
  const match = useRouteMatch();

  const {
    name,
    hasShowOffSplashScreen,
    setItemSideBarChoosen,
    setVisibilitySplashScreen,
  } = props;

  const getCountryName = () => {
    return !name ? match.params.name : name;
  };

  const countryName = getCountryName();
  const [loading, setLoading] = useState(true);

  const {
    currentPageData,
    page,
    setPage,
    setData,
    maxPage
  } = usePaginationData(ITEM_PER_PAGE, '/country/' + countryName);

  const isSameCountryName = (countryName) => {
    return countryName === localStorage.getItem("country");
  }

  const fetchData = async () => {
    const url = config.api + "/dayone/country/" + countryName;

    if ((window.navigator.onLine && isNeededToReloadData("prevGetDataCountryTime")) || !isSameCountryName(countryName)) {
      return await axios.get(url).then((response) => {
        const data = response.data;

        localStorage.setItem("maxPage", maxPage);
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem(
          "prevGetDataCountryTime",
          Date.now()/1000
        )
        localStorage.setItem("country", countryName)

        return data;
      }).catch(error => {
        console.log("error get info country");
        console.log(error);

        return [];
      });
    } else {
      return JSON.parse(localStorage.getItem("data"))
    }
  }

  const getInfo = async () => {
    const dataCountry = await fetchData();
    setData(dataCountry);
    setLoading(false);
    setVisibilitySplashScreen();
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (!hasShowOffSplashScreen) {
    return <SplashScreen />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="full-width">
      <SideBar
        itemSideBarChoosen={countryName === "Vietnam" ? "Vietnam" : "World"}
      />
      <div className={className(Styles.wrapper, "content")}>
        <div className={Styles.header}> Information of {countryName} </div>{" "}
        <ByDateItemList
          byDateItemList={currentPageData}
          name={name}
          setItemSideBarChoosen={setItemSideBarChoosen}
        />{" "}
        <Pagination setPage={setPage} page={page} maxPage={maxPage} />
      </div>
    </div>
  );
}

export default CountryInfo;
