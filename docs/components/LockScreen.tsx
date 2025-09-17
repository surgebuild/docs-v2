import React, { useState, useEffect } from "react";

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Valid passwords - in production, these would come from environment variables
  const validPasswords = ["surge2024", "bitcoin-scaling", "meta-layer-access"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate a brief loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (validPasswords.includes(password.toLowerCase())) {
      // Save to localStorage
      localStorage.setItem("surge-docs-authenticated-v2", "true");
      localStorage.setItem(
        "surge-docs-auth-timestamp-v2",
        Date.now().toString()
      );
      onUnlock();
    } else {
      setError("Invalid password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#0d1111] dark:via-[#1a1a1a] dark:to-[#0d1111]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#f4431b]/5 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img
                className="h-16 w-auto logo-light dark:hidden"
                src="/logo/surge-icon-rec-light.svg"
                alt="Surge Logo"
              />
              <img
                className="h-16 w-auto logo-dark hidden dark:block"
                src="/logo/surge-icon-rec-dark.svg"
                alt="Surge Logo"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Surge Documentation
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Unlocking Bitcoin's Lending Future
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Enter Password to Continue
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#f4431b] focus:border-transparent bg-white dark:bg-[#0d1111] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                placeholder="Enter access password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="auth-btn"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="shimmer-effect mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Access Documentation"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Secure access to Surge's technical documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
