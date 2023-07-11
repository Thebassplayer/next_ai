"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCreatePrompt from "@hooks/useCreatePrompt";

import Form from "@components/Post";

const CreatePrompt = () => {
  // const router = useRouter();
  // const { data: session } = useSession();

  // const [submitting, setSubmitting] = useState(false);
  // const [post, setPost] = useState({
  //   prompt: "",
  //   tag: "",
  // });

  // const createPrompt = async e => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   try {
  //     const response = await fetch("/api/prompt/new", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         prompt: post.prompt,
  //         userId: session?.user.id,
  //         tag: post.tag,
  //       }),
  //     });
  //     if (response.ok) {
  //       router.push("/");
  //       setPost({ prompt: "", tag: "" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
