"use client";
import { useEffect, useState } from "react";
// Types
import { ProviderList } from "next-auth";
// Next auth
import { getProviders } from "next-auth/react";

const useSetUpProviders = () => {
  const [status, setStatus] = useState<{
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
  }>({
    isSuccess: false,
    isLoading: false,
    isError: false,
  });

  const [providers, setProviders] = useState<ProviderList | []>([]);

  useEffect(() => {
    try {
      setStatus({
        isSuccess: false,
        isLoading: true,
        isError: false,
      });
      const setUpProviders = async () => {
        try {
          const response = await getProviders();
          setStatus({
            isSuccess: true,
            isLoading: false,
            isError: false,
          });
          setProviders(response);
        } catch (error) {
          setStatus({
            isSuccess: false,
            isLoading: false,
            isError: true,
          });
          console.log("--Error:", error);
        }
      };
      setUpProviders();
    } catch (error) {
      setStatus({
        isSuccess: false,
        isLoading: false,
        isError: true,
      });
      console.log("--Error:", error);
    }
  }, []);

  return {
    providers,
    isLoading: status.isLoading,
    isError: status.isError,
    isSuccess: status.isSuccess,
  };
};

export default useSetUpProviders;
