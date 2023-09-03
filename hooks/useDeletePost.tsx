"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "mongodb";

interface DeletePostStatus {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const useDeletePost = ({
  refresh,
  redirectRoutePath,
}: {
  refresh: boolean;
  redirectRoutePath?: string;
}) => {
  const [status, setStatus] = useState<DeletePostStatus>({
    isLoading: false,
    isError: false,
    error: null,
  });
  const router = useRouter();

  const handleDelete = async (post: Post) => {
    setStatus({
      ...status,
      isLoading: true,
      isError: false,
      error: null,
    });

    const ClientHasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (ClientHasConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setStatus({
            isLoading: false,
            isError: false,
            error: null,
          });

          if (refresh) {
            router.refresh();
          }
          if (redirectRoutePath) {
            router.push(redirectRoutePath);
          }
        } else {
          throw new Error("Failed to delete post");
        }
      } catch (error) {
        console.error("Error:", error);
        setStatus({
          isLoading: false,
          isError: true,
          error: error.message,
        });
      }
    } else {
      setStatus({
        ...status,
        isLoading: false,
      });
    }
  };

  return {
    handleDelete,
    isLoading: status.isLoading,
    isError: status.isError,
    error: status.error,
  };
};

export default useDeletePost;
