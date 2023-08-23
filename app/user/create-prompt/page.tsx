"use client";
import useCreatePost from "@hooks/useCreatePost";

import Post from "@components/Post";

const CreatePrompt = () => {
  const { post, setPost, submitting, createPost } = useCreatePost();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
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
