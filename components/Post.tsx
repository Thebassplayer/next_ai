// Components
import Form from "@components/Form";
import PostTitle from "@components/PostTitle";
import FavoriteButton from "@components/FavoriteButton";

const Post = ({ type, post, promptId, setPost, submitting, handleSubmit }) => {
  const promptHandler = e => {
    setPost({ ...post, prompt: e.target.value });
  };
  const tagHandler = e => {
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
            <FavoriteButton
              promptId={promptId}
              post={post}
              handleFavorite={handleSubmit}
            />
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
