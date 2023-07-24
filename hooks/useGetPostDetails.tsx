import { useState, useEffect } from "react";

const useGetPostDetails = ({ postId, setPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/prompt/${postId}`);
      const data = await response.json();
      setPost({
        prompt: data?.prompt,
        tag: data?.tag,
        sharde: data?.sharde || false,
      });
    };
    try {
      if (postId) {
        setIsLoading(true);
        getPostDetails();
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [postId]);

  return { isLoading, isError };
};

export default useGetPostDetails;
