"use client";
import useCreatePrompt from "@hooks/useCreatePrompt";

import Post from "@components/Post";

const CreatePrompt = () => {
  const { post, setPost, submitting, createPrompt } = useCreatePrompt();
  const handleSubmit = e => {
    e.preventDefault();
    createPrompt();
  };

  return (
    <Post
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;
