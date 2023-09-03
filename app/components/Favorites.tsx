import useFavoritePosts from "@hooks/useFavouritePosts";
import PostCard from "./PostCard";
import Loading from "./Loading";

const Favorites = () => {
  const { favoritePosts, isLoading, isSuccess } = useFavoritePosts();

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
