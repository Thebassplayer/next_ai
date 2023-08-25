"use client";
import { useState } from "react";
// Custom Hooks
import useSetUpProviders from "@hooks/useSetUpProviders";
// Next Auth
import { signOut } from "next-auth/react";
// Components
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  const { providers } = useSetUpProviders();

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
      <DesktopNav providers={providers} handleSignOut={handleSignOut} />
      {/* Mobile Nav */}
      <MobileNav
        toggleDropdown={toggleDropdown}
        setToggleDropdown={setToggleDropdown}
        handleSignOut={handleSignOut}
        providers={providers}
      />
    </nav>
  );
};

export default Nav;
