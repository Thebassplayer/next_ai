"use client";
// Components
import SearchBar from "./SearchBar";
import PromptCardList from "./PromptCardList";
// Next
import { useSession } from "next-auth/react";
// Custom Hooks
import useGetFeedPosts from "../hooks/useGetFeedPosts";
import useFilterPrompts from "@hooks/useFilterPrompts";

const Feed = (): JSX.Element => {
  const { data: session } = useSession();
  const { posts: allPosts } = useGetFeedPosts(session);
  const debounceDelay = 500;
  const {
    searchText,
    handleSearchChange,
    filteredPosts,
    handleClearInput,
    handleTagClick,
  } = useFilterPrompts(allPosts, debounceDelay);

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
