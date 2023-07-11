"use client";
import { useState, useEffect } from "react";

const useFilterPrompts = (allPosts, debounceDelay) => {
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPrompts = searchText => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const debounce = (callback, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setFilteredPosts(searchResult);
  };

  const handleSearchDebounced = debounce(searchText => {
    const searchResult = filterPrompts(searchText);
    setFilteredPosts(searchResult);
  }, debounceDelay);

  useEffect(() => {
    handleSearchDebounced(searchText);
  }, [handleSearchDebounced, searchText]);

  const handleClearInput = () => {
    setSearchText("");
    setFilteredPosts([]);
  };

  return {
    searchText,
    handleSearchChange,
    filteredPosts,
    handleClearInput,
    handleTagClick,
  };
};

export default useFilterPrompts;
