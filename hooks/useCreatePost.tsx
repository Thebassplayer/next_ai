"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [status, setStatus] = useState({
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: null,
  });

  const createPost = async () => {
    setStatus({
      ...status,
      isLoading: true,
      isError: false,
      error: null,
    });

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
        setPost({ prompt: "", tag: "" });
        setStatus({
          isSuccess: true,
          isLoading: false,
          isError: false,
          error: null,
        });
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        isSuccess: false,
        isLoading: false,
        isError: true,
        error: error.message,
      });
    } finally {
      setStatus({
        ...status,
        isLoading: false,
      });
    }
  };

  return { post, setPost, submitting: status.isLoading, createPost, ...status };
};

export default useCreatePost;
