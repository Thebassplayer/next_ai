// Components
import Nav from "@components/nav";
import Provider from "@components/Provider";
// Styles
import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "A place to find prompts for your next project",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <Nav />
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
