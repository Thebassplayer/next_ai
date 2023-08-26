// Components
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
// Next Auth
import { signIn, useSession } from "next-auth/react";

const MobileNav = ({
  providers,
  toggleDropdown,
  setToggleDropdown,
  handleSignOut,
}) => {
  const { data: session, status: authStatus } = useSession();
  const { google } = providers;

  const renderOption = () => {
    switch (authStatus) {
      case "authenticated":
        return session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full cursor-pointer ease-in-out delay-150 duration-300 hover:scale-110"
              alt="profile"
              onClick={() => setToggleDropdown(prevState => !prevState)}
              id="profile-sm"
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/user/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : null;
      case "unauthenticated":
        return (
          <>
            <button
              type="button"
              key={google?.name}
              onClick={() => {
                signIn(google?.id);
              }}
              className="black_btn"
            >
              Sign in with {google?.name}
            </button>
          </>
        );
      case "loading":
        return (
          <>
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
          </>
        );
      default:
        return <CircularProgress />;
    }
  };

  return (
    <div className="sm:hidden flex relative justify-center">
      {renderOption()}
    </div>
  );
};

export default MobileNav;
