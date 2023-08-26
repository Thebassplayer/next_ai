import React, { useState, useEffect } from "react";
import useFavoritePosts from "@hooks/useFavouritePosts";
import PostCard from "./PostCard";

const Favorites = () => {
  const { favoritePosts } = useFavoritePosts();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (favoritePosts) {
      setPosts(favoritePosts);
    }
  }, [favoritePosts]);

  return (
    <div>
      <h1>Favorites</h1>
      {posts.map((favoritePost: any, index: number) => {
        const post = favoritePost.postId;
        return (
          <PostCard key={`${post.id}-${index}`} post={post} favorite={true} />
        );
      })}
    </div>
  );
};

export default Favorites;
