import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { enUS } from "date-fns/locale";
// Custom Classes for React Date Range library
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const SearchParams = ({
  params,
  changeParams,
  datePlaceHolder,
  customRangeHandler,
}) => {
  const [dateSelection, setDateSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  return (
    <div className="search-params-parent">
      <div className="search-params-container">
        <label htmlFor="tag">
          Search
          <select
            name="tag"
            id="tag"
            value={params.tag}
            onChange={changeParams}
          >
            <option value="">All</option>
            <option value="story">Stories</option>
            <option value="author">Author</option>
            <option value="comment">Comments</option>
            <option value="ask_hn">Ask HN</option>
            <option value="show_hn">Show HN</option>
            <option value="launch_hn">Launch HN</option>
            <option value="job">Jobs</option>
            <option value="poll">Polls</option>
          </select>
        </label>

        <label htmlFor="searchBy">
          By
          <select
            name="searchBy"
            id="searchBy"
            value={params.searchBy}
            onChange={changeParams}
          >
            {params.tag === "job" || params.tag === "comment" ? (
              <option value="search_by_date">Date</option>
            ) : (
              <>
                <option value="search">Popularity</option>
                <option value="search_by_date">Date</option>
              </>
            )}
          </select>
        </label>

        <label htmlFor="time">
          For
          <select
            name="time"
            id="time"
            value={params.time}
            onChange={changeParams}
          >
            <option value="all">All Time</option>
            <option value="last24">Last 24</option>
            <option value="pastWeek">Past Week</option>
            <option value="pastMonth">Past Month</option>
            <option value="pastYear">Past Year</option>
            <option value="customRange">Custom Range</option>
            <option hidden value="closed">
              {datePlaceHolder ? datePlaceHolder : "Custom Range"}
            </option>
            <option hidden value={params.time}>
              {params.time}
            </option>
          </select>
        </label>
      </div>
      {params.time === "customRange" && (
        <div className="calendar-container-parent">
          <div className="calendar-container">
            <DateRange
              locale={enUS}
              ranges={[dateSelection]}
              maxDate={new Date()}
              onChange={({ selection }) => {
                setDateSelection(selection);
              }}
              className="calendar"
              rangeColors={["orange"]}
              color="#ff0000"
            />
            <div className="calendar-button-container">
              <button
                type="button"
                onClick={() => customRangeHandler(dateSelection)}
              >
                Apply
              </button>
              <button
                type="button"
                name="time"
                value="closed"
                onClick={changeParams}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchParams;
