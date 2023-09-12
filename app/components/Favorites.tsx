"use client";

import useFavoritePosts from "@hooks/useFavouritePosts";
import PostCard from "./PostCard";
import Loading from "./Loading";
import { fetchFavoritePosts } from "fetchData/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Favorites = () => {
  // const { favoritePosts, isLoading, isSuccess } = useFavoritePosts();

  const session = useSession();

  const userId = session?.data?.user?.id;

  const {
    data: favoritePosts,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["favoritePosts"],
    queryFn: () => fetchFavoritePosts(userId),
  });

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Favorites</span>
      </h1>

      {isLoading ? <Loading /> : null}
      {isSuccess && (
        <div className="mt-10 prompt_layout w-full">
          {favoritePosts.map((favoritePost: any, index: number) => {
            const post = favoritePost.postId;
            return <PostCard key={`${post?.id}-${index}`} post={post} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Favorites;
