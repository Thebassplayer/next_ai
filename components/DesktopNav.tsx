// Components
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
// Next Auth
import { signIn, useSession } from "next-auth/react";

const DesktopNav = ({ providers, handleSignOut }) => {
  const { data: session, status: authStatus } = useSession();
  const { google } = providers;

  const renderOption = () => {
    switch (authStatus) {
      case "authenticated":
        return session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/user/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/user/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer ease-in-out delay-150 duration-300 hover:scale-110"
                alt="profile"
              />
            </Link>
          </div>
        ) : null;
      case "unauthenticated":
        return (
          <button
            type="button"
            key={google?.name}
            onClick={() => signIn(google?.id)}
            className="black_btn"
          >
            Sign In with {google?.name}
          </button>
        );
      case "loading":
        return (
          <button
            className="h-[37px] w-[37px] rounded-full bg-black flex justify-center items-center"
            disabled
          >
            <CircularProgress
              size={20}
              sx={{
                color: "#fff",
              }}
            />
          </button>
        );
      default:
        return <CircularProgress />;
    }
  };

  return <div className="sm:flex hidden">{renderOption()}</div>;
};

export default DesktopNav;
