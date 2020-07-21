import React from "react";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function usePaginationData(itemPerPage, defaultURL) {
  const location = useLocation();
  const history = useHistory();

  const currentPage = location.search
    ? queryString.parse(location.search).page
    : 1;

  const [data, setData] = useState([]);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(currentPage);
  const [currentPageData, setcurrentPageData] = useState([]);

  const getInfoByPage = (page, data) => {
    const positionFirstItem = data.length - page * itemPerPage;
    let result = [];

    try {
      if (positionFirstItem >= 0) {
        result = [...data.slice(positionFirstItem, positionFirstItem + itemPerPage)];
      } else {
        result = [...data.slice(0, itemPerPage)]
      }
    } catch {
      result = [];
    }

    return result;
  };

  const getMaxPage = (amountItem) => {
    return (
      Math.floor(amountItem / itemPerPage) +
      (amountItem % itemPerPage === 0 ? 0 : 1)
    );
  };

  const setDataState = (data) => {
    setData(data);
    setMaxPage(getMaxPage(data.length));
    setcurrentPageData(getInfoByPage(page, data));
  };

  const setPageState = (page) => {
    if (page > 0 && page <= maxPage) {
      history.push(defaultURL + "?page=" + page);
      setPage(page);
    }
  };

  useEffect(() => {
    setcurrentPageData(getInfoByPage(page, data));
  }, [page]);

  return {
    currentPageData: currentPageData,
    page: page,
    setPage: setPageState,
    setData: setDataState,
    maxPage: maxPage
  };
}

export default usePaginationData;
