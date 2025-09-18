// Configuration loader for auth settings
export interface AuthConfig {
  lockScreenEnabled: boolean;
  validPasswords: string[];
}

// Try to load from environment variables first, then fall back to defaults
function loadConfig(): AuthConfig {
  // Check if we're in the browser and can access import.meta.env
  const isClient = typeof window !== "undefined";

  if (isClient) {
    console.log("Loading config");
  }

  // Try to get from environment variables
  const envPasswords = import.meta.env?.VITE_VALID_PASSWORDS;
  const envLockEnabled = import.meta.env?.VITE_LOCK_SCREEN_ENABLED;

  // Parse passwords from env or use defaults
  let validPasswords = ["surge2024", "bitcoin-lending", "btc-stable"];
  if (envPasswords && typeof envPasswords === "string") {
    validPasswords = envPasswords
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
  }

  // Parse lock screen setting - default to true since env vars aren't loading
  const lockScreenEnabled =
    envLockEnabled === "true" || envLockEnabled === undefined;

  return {
    lockScreenEnabled,
    validPasswords,
  };
}

export const authConfig = loadConfig();
