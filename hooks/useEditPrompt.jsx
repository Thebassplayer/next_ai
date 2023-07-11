import { useRouter } from "next/navigation";

const useEditPrompt = post => {
  const router = useRouter();
  router.push(`/update-prompt?id=${post._id}`);
};

export default useEditPrompt;
