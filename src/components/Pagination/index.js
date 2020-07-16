import React from "react";
import classNames from "classnames";
import Styles from "./Pagination.module.css";

function isVisibleLeftBlank(page, maxPage) {
  return page > 3;
}

function isVisibleRightBlank(page, maxPage) {
  return page < maxPage - 2;
}

function setValueBtn(page, maxPage) {
  let resultArr = [];

  if (page < 3) {
    resultArr = [2, 3, 0, 0, +maxPage - 1];
  } else if (page === 3) {
    resultArr = [2, 3, 4, 0, 0];
  } else if (page === +maxPage - 2) {
    resultArr = [0, 0, +maxPage - 3, +maxPage - 2, +maxPage - 1];
  } else if (page > +maxPage - 2) {
    resultArr = [2, 0, 0, +maxPage - 2, +maxPage - 1];
  } else {
    resultArr = [0, +page -1, +page, +page + 1, 0];
  }
  return resultArr;
}

function compareArrays(arr, secondArr) {
  return JSON.stringify(arr) === JSON.stringify(secondArr);
}

class BlankBtn extends React.Component {
  render() {
    return (
      <div
        className={classNames(
          Styles.blankBtn,
          Styles.btnPagination,
          this.props.isVisible ? "" : Styles.hiddenBtn
        )}
      >
        {" "}
        ...
      </div>
    );
  }
}

class NumberBtn extends React.Component {
  render() {
    const { page, setPage } = this.props;

    return (
      <div
        className={classNames(
          Styles.btnPagination,
          page ? "" : Styles.hiddenBtn
        )}
        onClick={() => setPage(page)}
      >
        {page}
      </div>
    );
  }
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleLeft: false,
      isVisibleRight: false,
      valueBtn: [0, 0, 0, 0, 0],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, maxPage } = this.props;
    const { valueBtn } = prevState;
    const newValueBth = [...setValueBtn(page, maxPage)];

    if (!compareArrays(valueBtn, newValueBth)) {
      this.setState({
        valueBtn: [...newValueBth],
      });
    }
  }

  render() {
    const { page, maxPage, setPage } = this.props;
    const valueBtn = this.state.valueBtn;
    
    return (
      <div className={Styles.wrapper}>
        <div
          className={classNames(Styles.preBtn, Styles.btnPagination)}
          onClick={() => setPage(page - 1)}
        >
          {" "}
        </div>{" "}
        <div className={Styles.numberPagination}>
          <NumberBtn page={1} setPage={setPage} />
          <NumberBtn page={valueBtn[0]} setPage={setPage} />
          <BlankBtn isVisible={isVisibleLeftBlank(page, maxPage)} />
          <NumberBtn page={valueBtn[1]} setPage={setPage} />
          <NumberBtn page={valueBtn[2]} setPage={setPage} />
          <NumberBtn page={valueBtn[3]} setPage={setPage} />
          <BlankBtn isVisible={isVisibleRightBlank(page, maxPage)} />
          <NumberBtn page={valueBtn[4]} setPage={setPage} />
          <NumberBtn page={maxPage} setPage={setPage} />
        </div>
        <div
          className={classNames(Styles.nextBtn, Styles.btnPagination)}
          onClick={() => this.props.setPage(this.props.page + 1)}
        >
          {" "}
        </div>{" "}
      </div>
    );
  }
}

export default Pagination;
