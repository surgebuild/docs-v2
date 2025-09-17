import React from "react";
import GlobalAuthWrapper from "./docs/components/GlobalAuthWrapper";

type LayoutProps = {
  children: React.ReactNode;
  // Vocs passes these, but we don't need them here.
  frontmatter?: any;
  path?: string;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <GlobalAuthWrapper>
      <div className="surge-app-shell">{children}</div>
    </GlobalAuthWrapper>
  );
}
