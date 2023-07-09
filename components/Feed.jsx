"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
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
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (!searchText) return;
    const filteredPosts = posts.filter(
      post => post.tag === searchText || post.prompt.includes(searchText)
    );
    setPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for  tag or a username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
