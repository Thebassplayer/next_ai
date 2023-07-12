import Link from "next/link";

const Form = ({
  post,
  handleSubmit,
  submitting,
  type,
  promptHandler,
  tagHandler,
}): JSX.Element => {
  const { prompt, tag } = post;
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-7">
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Yout AI Prompt
        </span>
        <textarea
          value={prompt}
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
          value={tag}
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
  );
};

export default Form;
