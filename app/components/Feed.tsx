"use client";
// Components
import SearchBar from "./SearchBar";
import PostCardList from "./PostCardList";
// Next
import { useSession } from "next-auth/react";
// Custom Hooks
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import useFilterPosts from "@hooks/useFilterPosts";

const Feed = (): JSX.Element => {
  const { data: session } = useSession();
  const { posts: allPosts } = useGetFeedPosts(session);

  const {
    searchText,
    handleSearchChange,
    filteredPosts,
    handleClearInput,
    handleTagClick,
  } = useFilterPosts({ allPosts });

  return (
    <section className="feed">
      <SearchBar
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleClearInput={handleClearInput}
      />
      {searchText ? (
        <PostCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PostCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
