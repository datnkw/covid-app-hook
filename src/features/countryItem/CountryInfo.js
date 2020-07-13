import React from "react";
import axios from "axios";
import Loading from "../loading/Loading";
import config from "../../config.json";
import InfoByCase from "../InfoByCase/InfoByCase";
import SplashScreen from "../splashScreen/SplashScreen";
import Pagination from "../pagination/Pagination";
import SideBar from "../sideBar/SideBar";
import className from "classnames";
import { withRouter } from "react-router-dom";
import styles from "./CountryInfo.module.css";
import queryString from 'query-string';
import "../../App.css";

const ITEM_PER_PAGE = 5;

class ByDateItem extends React.Component {
  // {
  //   "Country": "Viet Nam",
  //   "CountryCode": "VN",
  //   "Province": "",
  //   "City": "",
  //   "CityCode": "",
  //   "Lat": "14.06",
  //   "Lon": "108.28",
  //   "Confirmed": 352,
  //   "Deaths": 0,
  //   "Recovered": 0,
  //   "Active": 352,
  //   "Date": "2020-06-24T00:00:00Z"
  //  }

  constructor(props) {
    super(props);
    if (this.props.name === "Vietnam") {
      this.props.setItemSideBarChoosen("Vietnam");
    } else {
      this.props.setItemSideBarChoosen("World");
    }
  }

  getData(item, preItem) {
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

  render() {
    const transfomData = this.getData(this.props.item, this.props.preItem);
    return (
      <div>
        <InfoByCase cases={transfomData} />{" "}
      </div>
    );
  }
}

class ByDateItemList extends React.Component {
  convertNormalFormatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  render() {
    const { byDateItemList } = this.props;

    let result = [];

    for (let i = byDateItemList.length - 1; i >= 0; i--) {
      result.push(
        <div key={i}>
          <p className={styles.headerTime}>
            {" "}
            {this.convertNormalFormatDate(byDateItemList[i].Date)}{" "}
          </p>{" "}
          <ByDateItem
            item={byDateItemList[i]}
            preItem={!i ? null : byDateItemList[i - 1]}
            name={this.props.name}
            setItemSideBarChoosen={this.props.setItemSideBarChoosen}
          />{" "}
        </div>
      );
    }

    return <div> {result} </div>;
  }
}

function getInfoByPage(page, data) {
  const positionFirstItem = data.length - page * ITEM_PER_PAGE;

  if (positionFirstItem >= 0) {
    return data.slice(positionFirstItem, positionFirstItem + ITEM_PER_PAGE);
  } else {
    return data.slice(0, ITEM_PER_PAGE + positionFirstItem);
  }
}

function getPages(amountItem) {
  return (
    Math.floor(amountItem / ITEM_PER_PAGE) +
    (amountItem % ITEM_PER_PAGE === 0 ? 0 : 1)
  );
}

class CountryInfo extends React.Component {
  constructor(props) {
    super(props);

    this.countryName = !props.name
      ? props.match.params.name
      : props.name;

    this.setPage = this.setPage.bind(this);
    
    const currentPage = props.location.search ? queryString.parse(props.location.search).page : 1;
    
    this.state = {
      loading: true,
      page: currentPage
    };
  }

  async getInfo() {
    const url = config.api + "/dayone/country/" + this.countryName;

    if(window.navigator.onLine) {
    await axios.get(url).then((response) => {
      this.maxPage = getPages(response.data.length);

      this.data = response.data;

      localStorage.setItem('maxPage', this.maxPage);
      localStorage.setItem('data', JSON.stringify(this.data));
    });
  } else {
    this.maxPage = localStorage.getItem('maxPage');
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  this.setState({
    loading: false,
  });

  this.props.setVisibilitySplashScreen();
  }

  setPage(page) {
    if (page > 0 && page <= this.maxPage) {
      this.props.history.push('/country/' + this.countryName + '?page=' + page);
      this.setState({
        page,
      });
    }
  }

  async componentDidMount() {
    await this.getInfo();
  }

  render() {
    if (!this.props.hasShowOffSplashScreen) {
      return <SplashScreen />;
    }

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="full-width">
        <SideBar
          itemSideBarChoosen={
            this.countryName === "Vietnam" ? "Vietnam" : "World"
          }
        />
        <div className={className(styles.wrapper, "content")}>
          <div className={styles.header}>
            {" "}
            Information of {this.countryName}{" "}
          </div>{" "}
          <ByDateItemList
            byDateItemList={getInfoByPage(this.state.page, this.data)}
            name={this.props.name}
            setItemSideBarChoosen={this.props.setItemSideBarChoosen}
          />{" "}
          <Pagination
            setPage={this.setPage}
            page={this.state.page}
            maxPage={this.maxPage}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(CountryInfo);
