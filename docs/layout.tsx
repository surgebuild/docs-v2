import React from "react";
import GlobalAuthWrapper from "./components/GlobalAuthWrapper";
import AuthScript from "./components/AuthScript";

type LayoutProps = {
  children: React.ReactNode;
  frontmatter?: any;
  path?: string;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <GlobalAuthWrapper>
      <AuthScript />
      <div className="surge-app-shell">{children}</div>
    </GlobalAuthWrapper>
  );
}
