import React from "react";
import Nav from "@components/Nav";
import AuthProviderContext from "../context/auth.context";
import "@styles/globals.css";

export const metadata = {
  title: "PromptHub",
  description: "A place to find prompts for your next project",
};

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <AuthProviderContext>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </AuthProviderContext>
      </body>
    </html>
  );
};

export default RootLayout;
