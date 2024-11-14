import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

const Header = ({ params, changeParams }) => {
  return (
    <header>
      <div className="logo-container">
        <div className="logo">H</div>
        <h2>
          Search <br />
          Hacker News
        </h2>
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
      <div className="settings">
        <CiSettings className="settings-icon" />
      </div>
    </header>
  );
};

export default Header;
