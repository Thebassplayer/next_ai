// Components
import Nav from "@components/Nav";
import Provider from "@components/Provider";
// Styles
import "@styles/globals.css";

export const metadata = {
  title: "PromptHub",
  description: "A place to find prompts for your next project",
};

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
