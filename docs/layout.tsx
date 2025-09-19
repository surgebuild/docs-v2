import React, { useEffect, useState } from "react";
import LockScreen from "./components/LockScreen";
import { authConfig } from "./config";

import "./styles.css";

type LayoutProps = {
  children: React.ReactNode;
  frontmatter?: any;
  path?: string;
};

export default function Layout({ children }: LayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Check if lock screen is enabled from config
  const lockScreenEnabled = authConfig.lockScreenEnabled;

  useEffect(() => {
    if (!lockScreenEnabled) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    // Check authentication status
    const authStatus = localStorage.getItem("surge-docs-authenticated-v2");
    const authTimestamp = localStorage.getItem("surge-docs-auth-timestamp-v2");

    if (authStatus === "true" && authTimestamp) {
      // Check if authentication is still valid (24 hours)
      const now = Date.now();
      const authTime = parseInt(authTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - authTime < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        // Clear expired authentication
        localStorage.removeItem("surge-docs-authenticated-v2");
        localStorage.removeItem("surge-docs-auth-timestamp-v2");
      }
    }

    setIsLoading(false);
  }, [lockScreenEnabled]);

  // Inject valid passwords into a meta tag for public auth script
  useEffect(() => {
    const raw = authConfig.validPasswords.join(",");

    if (!raw) return;

    let meta = document.querySelector(
      'meta[name="surge-valid-passwords"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "surge-valid-passwords");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", raw);
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#0d1111] dark:via-[#1a1a1a] dark:to-[#0d1111]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#f4431b] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (lockScreenEnabled && !isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return <div className="surge-app-shell">{children}</div>;
}
