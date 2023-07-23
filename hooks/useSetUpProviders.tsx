import { useEffect, useState } from "react";
// Types
import { ProviderList } from "next-auth";
// Next auth
import { getProviders } from "next-auth/react";

const useSetUpProviders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [providers, setProviders] = useState<ProviderList | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      const setUpProviders = async () => {
        const response = await getProviders();
        setIsLoading(false);
        setIsError(false);
        setProviders(response);
      };
      setUpProviders();
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log("--Error:", error);
    }
  }, []);
  return { providers, isLoading, isError };
};

export default useSetUpProviders;
