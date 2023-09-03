"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdatePostProps } from "hooks";

const useUpdatePost = ({
  postId,
  post,
  setPost,
  refresh,
  redirectRoutePath,
}: useUpdatePostProps) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const updatePrompt = async e => {
    e.preventDefault();
    setSubmitting(true);
    if (!postId) return alert("Post ID not found");

    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
          sharde: post?.sharde,
        }),
      });
      if (response.ok) {
        if (refresh) {
          router.refresh();
        }
        router.push(redirectRoutePath);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    updatePrompt,
    submitting,
    post,
    setPost,
  };
};

export default useUpdatePost;
