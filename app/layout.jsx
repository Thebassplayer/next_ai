import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "A place to find prompts for your next project",
};

const RootLayout = ({ children }) => {
  return (
    <lang lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </lang>
  );
};

export default RootLayout;
