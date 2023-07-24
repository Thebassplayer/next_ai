import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useUpdatePost = (redirectRoutePath: string) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    sharde: false,
  });

  const updatePrompt = async e => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
          sharde: post?.sharde,
        }),
      });
      if (response.ok) {
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
