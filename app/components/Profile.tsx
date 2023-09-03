import PostCard from "./PostCard";
import { Post } from "mongodb";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
import Loading from "./Loading";
import { useSession } from "next-auth/react";

type ProfileProps = {
  name: string;
  description: string;

  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

const Profile = ({ name, handleEdit, handleDelete }: ProfileProps) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const { userPosts, isLoading, isSuccess } = useGetPostsByUserID(userId);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      {isLoading ? <Loading /> : null}
      {isSuccess && (
        <div className="mt-10 prompt_layout w-full">
          {userPosts.map((post: Post, index: number) => (
            <PostCard
              key={`${post.id}-${index}`}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
              favoriteButton={false}
              editAndDeleteButtons={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
