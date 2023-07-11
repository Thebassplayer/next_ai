import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
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
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Yout AI Prompt
            </span>
            <textarea
              value={post.prompt}
              onChange={promptHandler}
              placeholder="Write your prompt here..."
              required
              className="form_textarea"
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag {` `}
              <span className="fony-norml">(#idea)</span>
            </span>
            <input
              value={post.tag}
              onChange={tagHandler}
              placeholder="#tag"
              required
              className="form_input"
            />
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}...` : `${type}`}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
