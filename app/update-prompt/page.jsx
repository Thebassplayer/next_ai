"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Post";

const EditPrompt = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log("promptId: ", promptId);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    sharde: false,
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data?.prompt,
        tag: data?.tag,
        favourite: data?.favourite || false,
        sharde: data?.sharde || false,
      });
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async e => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: data?.prompt,
          tag: data?.tag,
          sharde: data?.sharde,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
