/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VALID_PASSWORDS?: string;
  readonly VITE_LOCK_SCREEN_ENABLED?: string;
  readonly VITE_AUTH_TTL_HOURS?: string;
  readonly VITE_FORCE_LOCK_PROMPT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
