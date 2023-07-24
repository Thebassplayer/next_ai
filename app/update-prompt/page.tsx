"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useUpdatePost from "@hooks/useUpdatePost";

import Post from "@components/Post";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data?.prompt,
        tag: data?.tag,
        sharde: data?.sharde || false,
      });
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const { updatePrompt, submitting, post, setPost } = useUpdatePost("/");

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
