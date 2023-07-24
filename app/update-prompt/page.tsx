"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useUpdatePost from "@hooks/useUpdatePost";
import useGetPostDetails from "@hooks/useGetPostDetails";

import Post from "@components/Post";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    sharde: false,
  });
  useGetPostDetails({ postId, setPost });

  const { updatePrompt, submitting } = useUpdatePost({
    postId,
    post,
    setPost,
    redirectRoutePath: "/",
  });

  return (
    <Post
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
