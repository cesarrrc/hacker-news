import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import SearchParams from "./components/SearchParams";
import Pagination from "./components/Pagination";
import changeWidth from "./utils/change-select-width";
import {
  dateHandler,
  dateParamHelper,
  modifyDateParam,
  paginationHelper,
} from "./utils";
import { fetchCustomDateRange } from "./utils/api";
import "./App.css";

function App() {
  // State
  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    search: "",
    tag: "story",
    searchBy: "search",
    time: "all",
    page: 0,
  });
  const [pagination, setPagination] = useState({
    totalPages: 0,
    listOfPages: [],
  });
  const [searchDate, setSearchDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [datePlaceHolder, setDatePlaceHolder] = useState("");

  // Update params onChange function
  const changeParams = (e) => {
    const { name, value } = e.target;
    if (name === "tag" && (value === "job" || value === "comment")) {
      return setParams({
        ...params,
        searchBy: "search_by_date",
        [name]: value,
      });
    }
    setParams({
      ...params,
      [name]: value,
      page: 0,
    });
  };

  // Update select elements width to fit its content better when component loads and params update
  useEffect(() => {
    const listOfSelects = Array.from(document.getElementsByTagName("select"));
    changeWidth(listOfSelects);
  }, [params]);

  // Function that handles a custom date range when applied
  const customRangeHandler = useCallback(
    async (dateSelection) => {
      if (!datePlaceHolder) {
        setParams({
          ...params,
          time: "closed",
        });
        setSearchDate(dateSelection);
        const datePlaceHolderString = dateHandler(dateSelection);
        setDatePlaceHolder(datePlaceHolderString);
      }
      let tag = params.tag;
      if (params.tag === "author") {
        tag = `${params.tag}_${params.search}`;
      }
      const { dateParam, dateParam2 } = dateParamHelper(dateSelection);
      const numericFilter = `created_at_i>${dateParam},created_at_i<${dateParam2}`;

      const data = await fetchCustomDateRange(
        `http://hn.algolia.com/api/v1/${params.searchBy}?query=${params.search}&tags=${tag}&page=${params.page}&numericFilters=${numericFilter}`
      );
      setList(data.hits);
      const paginationList = paginationHelper(data.page, data.nbPages);
      setPagination({
        totalPages: data.nbPages,
        listOfPages: paginationList,
      });
    },
    [datePlaceHolder, params]
  );

  // Function that helps change page of results when a page number is clicked in the pagination container
  const handleNextPage = (page) => {
    setParams({
      ...params,
      page: page,
    });
  };

  // Fetches list of hits on component load with the initial params state, then updates when params change
  useEffect(() => {
    console.log("effect");

    const fetchData = async (url) => {
      const data = await fetchCustomDateRange(url);
      setList(data.hits);
      const paginationList = paginationHelper(data.page, data.nbPages);
      setPagination({
        totalPages: data.nbPages,
        listOfPages: paginationList,
      });
    };

    if (params.time === "closed" && datePlaceHolder) {
      customRangeHandler(searchDate);
      return;
    }
    if (params.time === "customRange") {
      setDatePlaceHolder("");
      return;
    }
    let tag = params.tag;
    if (params.tag === "author") {
      tag = `${params.tag}_${params.search}`;
    }
    if (params.time !== "all") {
      const dateParam = Math.floor(modifyDateParam(params.time) / 1000);
      const numericFilter = `created_at_i>${dateParam}`;
      fetchData(
        `http://hn.algolia.com/api/v1/${params.searchBy}?query=${params.search}&tags=${tag}&page=${params.page}&numericFilters=${numericFilter}`
      );
    } else {
      fetchData(
        `http://hn.algolia.com/api/v1/${params.searchBy}?query=${params.search}&tags=${tag}&page=${params.page}`
      );
    }
  }, [params, customRangeHandler, datePlaceHolder, searchDate]);

  // Effect for monitoring values in the dependency array
  useEffect(() => {
    console.log(params);
    // console.log(searchDate);
  }, [params, searchDate, pagination]);

  return (
    <div className="App">
      <Header params={params} changeParams={changeParams} />
      <main className="main">
        <SearchParams
          params={params}
          changeParams={changeParams}
          datePlaceHolder={datePlaceHolder}
          customRangeHandler={customRangeHandler}
        />
        {params.tag === "author" && !list.length && (
          <div>Please Type any Authors Name in the Search Bar</div>
        )}
        <List list={list} />
        <Pagination
          pagination={pagination}
          handleNextPage={handleNextPage}
          currentPage={params.page}
        />
      </main>
    </div>
  );
}

export default App;