// Components
import Form from "app/components/Form";
import PostTitle from "app/components/PostTitle";
import FavoriteButton from "app/components/FavoriteButton";
import { Post } from "mongodb";

type PostProps = {
  type: string;
  post: Post;
  postId?: string;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Post = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: PostProps): JSX.Element => {
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
            <FavoriteButton post={post} />
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
