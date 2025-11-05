import React from "react";

interface GlobalAuthWrapperProps {
  children: React.ReactNode;
}

export default function GlobalAuthWrapper({ children }: GlobalAuthWrapperProps) {
  // Password protection is disabled, so just render children
  return <>{children}</>;
}

