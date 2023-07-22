"use client";
import { Post } from "mongodb";
import { useState, useEffect } from "react";

interface FilterPromptsArgs {
  allPosts: Post[];
  debounceDelay?: number;
}

const useFilterPosts = ({
  allPosts,
  debounceDelay = 500,
}: FilterPromptsArgs): {
  searchText: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredPosts: Post[];
  handleClearInput: () => void;
  handleTagClick: (tagName: string) => void;
} => {
  const [searchText, setSearchText] = useState<string>("");
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

  const debounce = (callback: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setFilteredPosts(searchResult);
  };

  const handleSearchDebounced = debounce((searchText: string) => {
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

export default useFilterPosts;
