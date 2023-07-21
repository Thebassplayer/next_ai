"use client";
import { useState, useEffect } from "react";
// Next Auth
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// Components
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Types
import { ProviderList } from "next-auth";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProviderList | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("--Provider:", response);
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full m-4 sm:mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="PromptHub Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">PromptHub</p>
      </Link>

      {/* Desktop Nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer ease-in-out delay-150 duration-300 hover:scale-110"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
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
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
