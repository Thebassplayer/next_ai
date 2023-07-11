"use client";
import useCreatePrompt from "@hooks/useCreatePrompt";

import Form from "@components/Post";

const CreatePrompt = () => {
  const { post, setPost, submitting, createPrompt } = useCreatePrompt();
  const handleSubmit = e => {
    e.preventDefault();
    createPrompt();
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;
