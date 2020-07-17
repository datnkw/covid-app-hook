import React, { useEffect, useReducer } from "react";
import classNames from "classnames";
import Styles from "./Pagination.module.css";

function isVisibleLeftBlank(page, maxPage) {
  return page > 3;
}

function isVisibleRightBlank(page, maxPage) {
  return page < maxPage - 2;
}

function valueBtnReducer(state, action) {
  const { page, maxPage } = action;

  console.log("page: ", page);
  console.log("maxPage: ", maxPage);

  if (page < 3) {
    return [2, 3, 0, 0, +maxPage - 1];
  } else if (page === 3) {
    return [2, 3, 4, 0, 0];
  } else if (page === +maxPage - 2) {
    return [0, 0, +maxPage - 3, +maxPage - 2, +maxPage - 1];
  } else if (page > +maxPage - 2) {
    return [2, 0, 0, +maxPage - 2, +maxPage - 1];
  } else {
    return [0, +page - 1, +page, +page + 1, 0];
  }
}

function BlankBtn(props) {
  return (
    <div
      className={classNames(
        Styles.blankBtn,
        Styles.btnPagination,
        props.isVisible ? "" : Styles.hiddenBtn
      )}
    >
      {" "}
      ...
    </div>
  );
}

function NumberBtn(props) {
  const { page, setPage, currentPage } = props;
  console.log("number page: ", page);
  return (
    <div
      className={classNames(
        Styles.btnPagination,
        page ? "" : Styles.hiddenBtn,
        currentPage === page ? Styles.choosenPage : ""
      )}
      onClick={() => setPage(page)}
    >
      {page}
    </div>
  );
}

function Pagination(props) {
  const [valueBtn, dispatchValueBtn] = useReducer(valueBtnReducer, [0, 0, 0, 0, 0]);

  const { page, maxPage, setPage } = props;

  console.log("current page: ", page);

  useEffect(() => {
    dispatchValueBtn({
      page,
      maxPage,
    });
  }, [page]);

  return (
    <div className={Styles.wrapper}>
      <div
        className={classNames(Styles.preBtn, Styles.btnPagination)}
        onClick={() => setPage(page - 1)}
      >
        {" "}
      </div>{" "}
      <div className={Styles.numberPagination}>
        <NumberBtn page={1} setPage={setPage} currentPage={page} />
        <NumberBtn page={valueBtn[0]} setPage={setPage} currentPage={page} />
        <BlankBtn isVisible={isVisibleLeftBlank(page, maxPage)} />
        <NumberBtn page={valueBtn[1]} setPage={setPage} currentPage={page} />
        <NumberBtn page={valueBtn[2]} setPage={setPage} currentPage={page} />
        <NumberBtn page={valueBtn[3]} setPage={setPage} currentPage={page} />
        <BlankBtn isVisible={isVisibleRightBlank(page, maxPage)} />
        <NumberBtn page={valueBtn[4]} setPage={setPage} currentPage={page} />
        <NumberBtn page={maxPage} setPage={setPage} currentPage={page} />
      </div>
      <div
        className={classNames(Styles.nextBtn, Styles.btnPagination)}
        onClick={() => setPage(page + 1)}
      >
        {" "}
      </div>{" "}
    </div>
  );
}

export default Pagination;
