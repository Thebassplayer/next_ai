// Components
import { type } from "os";
import PromptCard from "./PostCard";
// Types
import { Post, UserFavorite } from "mongodb";

type PostCardListProps = {
  data?: Post[];
  handleTagClick?: (tag: string) => void;
};

const PostCardList = ({ data, handleTagClick }: PostCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post, index) => (
        <PromptCard
          key={`${post?.id}-${index}`}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PostCardList;
