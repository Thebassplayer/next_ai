"use client";
import React from "react";

const SearchBar = ({ searchText, handleSearchChange, handleClearInput }) => {
  return (
    <form
      className="relative w-full flex-center"
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search for content, tag or a username"
        className="search_input peer"
        value={searchText}
        onChange={handleSearchChange}
      />
      {searchText ? (
        <button
          className={`black_btn_clear h-full absolute right-0 ${
            searchText ? "opacity-100" : "opacity-0"
          }
          `}
          onClick={handleClearInput}
        >
          Clear
        </button>
      ) : null}
    </form>
  );
};

export default SearchBar;
