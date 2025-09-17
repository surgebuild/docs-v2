import React, { useEffect } from "react";
import GlobalAuthWrapper from "./components/GlobalAuthWrapper";
import AuthScript from "./components/AuthScript";
import "./styles.css";

type LayoutProps = {
  children: React.ReactNode;
  frontmatter?: any;
  path?: string;
};

export default function Layout({ children }: LayoutProps) {
  // Inject valid passwords into a meta tag for public auth script
  useEffect(() => {
    const raw = ((process.env.VALID_PASSWORDS || process.env.NEXT_PUBLIC_VALID_PASSWORDS || "") as string).toString();
    if (!raw) return;

    let meta = document.querySelector('meta[name="surge-valid-passwords"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "surge-valid-passwords");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", raw);
  }, []);

  return (
    <GlobalAuthWrapper>
      <AuthScript />
      <div className="surge-app-shell">{children}</div>
    </GlobalAuthWrapper>
  );
}
