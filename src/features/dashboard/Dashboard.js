import React from "react";
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

class CountryItem extends React.Component {
  // {
  //   "Country": "Afghanistan",
  //   "CountryCode": "AF",
  //   "Slug": "afghanistan",
  //   "NewConfirmed": 165,
  //   "TotalConfirmed": 30616,
  //   "NewDeaths": 20,
  //   "TotalDeaths": 703,
  //   "NewRecovered": 368,
  //   "TotalRecovered": 10674,
  //   "Date": "2020-06-29T04:06:12Z"
  // }

  render() {
    const { Country, TotalConfirmed } = this.props.info;
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
}

class CountryItemList extends React.Component {
  render() {
    const { countryItemList } = this.props;
    return countryItemList
      ? countryItemList.map((item) => (
          <CountryItem key={item.Slug} info={item} />
        ))
      : null;
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async getInfo() {
    const url = config.api + "/summary";
    if (window.navigator.onLine) {
      await axios.get(url).then((response) => {
        this.summaryGlobalInfo = response.data.Global;
        this.summaryCountries = response.data.Countries;

        this.props.setData(response.data.Countries.reverse());

        localStorage.setItem(
          "summaryGlobalInfo",
          JSON.stringify(this.summaryGlobalInfo)
        );
        localStorage.setItem(
          "summaryCountries",
          JSON.stringify(this.summaryCountries)
        );
      });
    } else {
      this.summaryGlobalInfo = JSON.parse(
        localStorage.getItem("summaryGlobalInfo")
      );
      this.summaryCountries = JSON.parse(
        localStorage.getItem("summaryCountries")
      );
    }

    this.setState({ loading: false });
    this.props.setVisibilitySplashScreen();
  }

  async componentDidMount() {
    await this.getInfo();
    this.props.setItemSideBarChoosen("World");
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
        <SideBar itemSideBarChoosen="World" />
        <div className={className(styles.wrapper, "content")}>
        <InfoByCard cases={this.summaryGlobalInfo} />
          <div className={styles.countryItemWrapper}>
            <CountryItemList countryItemList={this.props.dataCurrentPage} />
          </div>
          <Pagination
            setPage={this.props.setPage}
            page={this.props.page}
            maxPage={this.props.maxPage}
          />
        </div>
      </div>
    );
  }
}

export default HocPagination(Dashboard, ITEM_PER_PAGE, DEFAULT_URL);
