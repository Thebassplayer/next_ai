"use client";

import useFavoritePosts from "@hooks/useFavouritePosts";
import PostCard from "./PostCard";
import Loading from "./Loading";
import { fetchFavorites } from "fetchData/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const Favorites = () => {
  const { data: session } = useSession();
  const userId = useMemo(() => session?.user?.id, [session]);

  const {
    data: favoritePosts,
    isLoading,
    isSuccess,
    isFetched,
  } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavorites(userId),
  });
  console.log(isLoading);
  console.log(isSuccess);
  console.log(isFetched);
  console.log(favoritePosts);

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
