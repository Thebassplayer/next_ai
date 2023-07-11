import Link from "next/link";
// Components
import Form from "@components/Form";

const Post = ({ type, post, setPost, submitting, handleSubmit }) => {
  const promptHandler = e => {
    setPost({ ...post, prompt: e.target.value });
  };
  const tagHandler = e => {
    setPost({ ...post, tag: e.target.value });
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left my-2 sm:mb-10">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <div className="w-full flex justify-center" id="prompt_form_container">
        <Form
          post={post}
          handleSubmit={handleSubmit}
          submitting={submitting}
          type={type}
          promptHandler={promptHandler}
          tagHandler={tagHandler}
        />
      </div>
    </section>
  );
};

export default Post;
