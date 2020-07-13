import React from "react";
import queryString from "query-string";
import {withRouter} from "react-router-dom";

function HocPagination(WrappedComponent, itemPerPage, defaultURL) {
  return withRouter(class extends React.Component {
    constructor(props) {
      super(props);
      const currentPage = props.location.search ? queryString.parse(props.location.search).page : 1;
      this.state = {
        page: currentPage,
        maxPage: 0,
        data: [],
        dataCurrentPage: []
      }
    }

    getInfoByPage = (page, data) => {
      const positionFirstItem = data.length - page * itemPerPage;

      if (positionFirstItem >= 0) {
        return data.slice(positionFirstItem, positionFirstItem + itemPerPage);
      } else {
        return data.slice(0, itemPerPage + positionFirstItem);
      }
    };

    setData = (data) => {
      this.setState({
        data,
        maxPage: this.getMaxPage(data.length)
      })

      this.setState({
        dataCurrentPage: this.getInfoByPage(this.state.page, this.state.data)
      })
    };

    getMaxPage = (amountItem) => {
      return (Math.floor(amountItem / itemPerPage)
      + (amountItem % itemPerPage === 0 ? 0 : 1));
    };

    setPage = (page) => {
      if (page > 0 && page <= this.state.maxPage) {
        this.props.history.push(defaultURL + '?page=' + page);
        this.setState({
          page
        });
      }
    }

    compareArrays(arr, secondArr) {
      return JSON.stringify(arr) === JSON.stringify(secondArr);
    }

    componentDidUpdate(prevProps, prevState) {
    const { dataCurrentPage } = prevState;
    const newdataCurrentPage = this.getInfoByPage(this.state.page, this.state.data).reverse();

    if (!this.compareArrays(dataCurrentPage, newdataCurrentPage)) {
      this.setState({
        dataCurrentPage: [...newdataCurrentPage],
      });
    }
    }

    render() {
      return (
      <div>
      <WrappedComponent
        dataCurrentPage={this.state.dataCurrentPage}
        setData={this.setData}
        setPage={this.setPage}
        page={this.state.page}
        maxPage={this.state.maxPage}
        {...this.props}
      />
      
      </div>);
    }
  });
}

export default HocPagination;
