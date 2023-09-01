import { useState, useEffect } from "react";
import useFavoritePosts from "@hooks/useFavouritePosts";
import PostCard from "./PostCard";
import Loading from "./Loading";

const Favorites = () => {
  const { favoritePosts, isLoading, isSuccess } = useFavoritePosts();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      setPosts(favoritePosts);
    }
  }, [favoritePosts, isSuccess]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Favorites</span>
      </h1>

      {isLoading ? <Loading /> : null}
      {isSuccess && (
        <div className="mt-10 prompt_layout w-full">
          {posts.map((favoritePost: any, index: number) => {
            const post = favoritePost.postId;
            return <PostCard key={`${post.id}-${index}`} post={post} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Favorites;
