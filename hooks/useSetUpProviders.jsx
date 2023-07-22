import { useEffect, useState } from "react";
// Types
import { ProviderList } from "next-auth";
// Next auth
// import { getProviders } from "next-auth/react";

const useSetUpProviders = (getProviders) => {
  const [providers, setProviders] = useState<ProviderList | null>(null);

  useEffect(() => {
    try {
      const setUpProviders = async () => {
        const response = await getProviders();
        console.log("--Provider:", response);
        setProviders(response);
      };
      setUpProviders();

    } catch (error) {
console.log("--Error:", error);
    }
  }, [providers]);
  return { providers };
};

export default useSetUpProviders;
