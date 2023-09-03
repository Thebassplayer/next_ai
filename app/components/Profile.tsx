import PostCard from "./PostCard";
import { Post } from "mongodb";
import useGetPostsByUserID from "@hooks/useGetPostsByUserID";
import Loading from "./Loading";

type ProfileProps = {
  name: string;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
  userId: string;
  editAndDeleteButtons?: boolean;
};

const Profile = ({
  name,
  handleEdit,
  handleDelete,
  userId,
  editAndDeleteButtons,
}: ProfileProps) => {
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
              editAndDeleteButtons={editAndDeleteButtons}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
