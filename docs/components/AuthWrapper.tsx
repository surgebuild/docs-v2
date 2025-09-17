import React from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
}

// Deprecated: Global auth is now handled via root-level layout.tsx.
export default function AuthWrapper({ children }: AuthWrapperProps) {
  return <>{children}</>;
}
