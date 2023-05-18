import "@styles/globals.css";
import React, { ReactNode } from "react"
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </head>
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
