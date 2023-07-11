"use client";
import { useState, useEffect } from "react";
// Components
import PromptCard from "./PromptCard";
import SearchBar from "./SearchBar";
// Next
import { useSession } from "next-auth/react";
// Custom Hooks
import useGetFeedPosts from "../hooks/useGetFeedPosts";

const PromptCardList = ({ data, handleTagClick }) => {
  console.log("PromptCardList data: ", data);
  return (
    <div className="mt-16 prompt_layout">
      {data?.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const { posts: allPosts } = useGetFeedPosts(session);

  // Search State
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterPrompts = searchtext => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      item =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = e => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setFilteredPosts(searchResult);
      }, 500)
    );
  };

  const handleTagClick = tagName => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setFilteredPosts(searchResult);
  };

  const handleClearInput = () => {
    setSearchText("");
    setFilteredPosts([]);
  };

  return (
    <section className="feed">
      <SearchBar
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleClearInput={handleClearInput}
      />
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
