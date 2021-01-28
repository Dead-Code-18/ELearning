import React, { useState } from "react";
import { connect } from "react-redux";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form noValidate onSubmit={(e) => onSubmit(e)}>
      <div className="form-row">
        <div className="col-12 col-md-9 mb-2 mb-md-0">
          <input
            className="form-control form-control-lg"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            id="search"
            placeholder="Search Courses"
          />
        </div>
        <div className="col-12 col-md-3">
          <button className="btn btn-primary btn-block btn-lg" type="submit">
            GO
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
