import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

const Header = ({ params, changeParams }) => {
  return (
    <header>
      <div className="logo-container">
        <a href="https://news.ycombinator.com/">
          <div className="logo">H</div>
        </a>
        <a href="/">
          <h2>
            Search <br />
            Hacker News
          </h2>
        </a>
      </div>
      <div className="search-bar" htmlFor="search">
        <label htmlFor="search">
          <IoSearchOutline className="search-icon" htmlFor="search" />
        </label>
        <input
          type="text"
          id="search"
          name="search"
          value={params.search}
          onChange={changeParams}
          placeholder="Search stories by title, url or author"
        />
      </div>
      <a className="settings" href="https://hn.algolia.com/settings">
        <CiSettings className="settings-icon" />
      </a>
    </header>
  );
};

export default Header;
