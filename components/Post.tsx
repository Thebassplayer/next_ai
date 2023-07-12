// Components
import Form from "@components/Form";
import PostTitle from "@components/PostTitle";
import FavoriteButton from "@components/FavoriteButton";
import { Post } from "mongodb";

type PostProps = {
  type: string;
  post: Post;
  promptId: string;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Post = ({
  type,
  post,
  promptId,
  setPost,
  submitting,
  handleSubmit,
}): JSX.Element => {
  const promptHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setPost({ ...post, prompt: e.target.value });
  };
  const tagHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setPost({ ...post, tag: e.target.value });
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <PostTitle type={type} />
      <div className="w-full flex justify-center" id="prompt_form_container">
        <div
          className="mt-10 relative w-full max-w-2xl glassmorphism"
          role="container"
        >
          <div
            className="absolute top-0 right-0 p-4 flex-center gap-2"
            role="post_button_container"
          >
            <FavoriteButton />
          </div>
          <Form
            post={post}
            handleSubmit={handleSubmit}
            submitting={submitting}
            type={type}
            promptHandler={promptHandler}
            tagHandler={tagHandler}
          />
        </div>
      </div>
    </section>
  );
};

export default Post;
