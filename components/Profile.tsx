import PromptCard from "./PromptCard";
import { Post } from "mongodb";

type ProfileProps = {
  name: string;
  desc: string;
  data: any;
  handleEdit?: (post: Post) => void;
  handleDelete?: (post: Post) => void;
};

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post: Post, index: number) => (
          <PromptCard
            key={`${post.id}-${index}`}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
