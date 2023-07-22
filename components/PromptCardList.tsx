// Components
import { type } from "os";
import PromptCard from "./PostCard";
// Types
import { Post } from "mongodb";

type PromptCardListProps = {
  data?: Post[];
  handleTagClick?: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
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

export default PromptCardList;
