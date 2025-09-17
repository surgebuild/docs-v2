import React, { useState, useEffect } from "react";
import LockScreen from "./LockScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("surge-docs-authenticated");
        const authTimestamp = localStorage.getItem("surge-docs-auth-timestamp");

        if (authStatus === "true" && authTimestamp) {
          // Check if authentication is still valid (24 hours)
          const now = Date.now();
          const authTime = parseInt(authTimestamp);
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (now - authTime < twentyFourHours) {
            // User is already authenticated, skip password prompt entirely
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          } else {
            // Clear expired authentication
            localStorage.removeItem("surge-docs-authenticated");
            localStorage.removeItem("surge-docs-auth-timestamp");
          }
        }

        // User not authenticated
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    // Show simple loader while checking authentication
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#0d1111] dark:via-[#1a1a1a] dark:to-[#0d1111]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f4431b] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
}
