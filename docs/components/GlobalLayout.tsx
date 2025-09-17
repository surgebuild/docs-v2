import React, { useState, useEffect } from "react";
import LockScreen from "./LockScreen";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("surge-docs-authenticated-v2");
        const authTimestamp = localStorage.getItem(
          "surge-docs-auth-timestamp-v2"
        );

        if (authStatus === "true" && authTimestamp) {
          // Check if authentication is still valid (24 hours)
          const now = Date.now();
          const authTime = parseInt(authTimestamp);
          const twentyFourHours = 24 * 60 * 60 * 1000;

          if (now - authTime < twentyFourHours) {
            // User is already authenticated, show simple loader briefly
            setTimeout(() => {
              setIsAuthenticated(true);
              setIsLoading(false);
            }, 300); // Brief delay for smooth transition
            return;
          } else {
            // Clear expired authentication
            localStorage.removeItem("surge-docs-authenticated-v2");
            localStorage.removeItem("surge-docs-auth-timestamp-v2");
          }
        }

        // User not authenticated, show shimmer
        setShowShimmer(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    // Small delay to ensure page is fully loaded
    setTimeout(checkAuth, 100);
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    // Show different loading screens based on authentication status
    if (showShimmer) {
      // Show shimmer for new users
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="relative z-10 w-full max-w-md mx-4">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
              {/* Shimmer for logo area */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="shimmer-effect shimmer-logo"></div>
                </div>
                <div className="shimmer-effect shimmer-title mb-2"></div>
                <div className="shimmer-effect shimmer-subtitle"></div>
              </div>

              {/* Shimmer for form area */}
              <div className="space-y-6">
                <div>
                  <div className="shimmer-effect shimmer-label mb-2"></div>
                  <div className="shimmer-effect shimmer-input"></div>
                </div>
                <div className="shimmer-effect shimmer-button"></div>
              </div>

              {/* Shimmer for footer */}
              <div className="mt-8 text-center">
                <div className="shimmer-effect shimmer-footer"></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Show simple loader for authenticated users
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f4431b] mx-auto"></div>
          </div>
        </div>
      );
    }
  }

  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
}
