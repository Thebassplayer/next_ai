"use client";
import useCreatePost from "@hooks/useCreatePost";

import Post from "@components/Post";

const CreatePrompt = () => {
  const { post, setPost, submitting, createPrompt } = useCreatePost();
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
