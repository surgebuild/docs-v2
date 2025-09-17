import React, { useEffect } from "react";

export default function AuthScript() {
  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      // Prefer v2 keys; fallback to v1 if present to force prompt
      const authStatus = localStorage.getItem("surge-docs-authenticated-v2") || localStorage.getItem("surge-docs-authenticated");
      const authTimestamp = localStorage.getItem("surge-docs-auth-timestamp-v2") || localStorage.getItem("surge-docs-auth-timestamp");

      if (authStatus !== "true" || !authTimestamp) {
        // Show lock screen
        showLockScreen();
        return;
      }

      // Check if authentication is still valid (24 hours)
      const now = Date.now();
      const authTime = parseInt(authTimestamp);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - authTime >= twentyFourHours) {
        // Clear expired authentication
        localStorage.removeItem("surge-docs-authenticated");
        localStorage.removeItem("surge-docs-auth-timestamp");
        localStorage.removeItem("surge-docs-authenticated-v2");
        localStorage.removeItem("surge-docs-auth-timestamp-v2");
        showLockScreen();
      }
    };

    const showLockScreen = () => {
      // Create lock screen overlay
      const overlay = document.createElement("div");
      overlay.id = "surge-lock-screen";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0d1111 0%, #1a1a1a 50%, #0d1111 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
      `;

      // Create lock screen content
      const content = document.createElement("div");
      content.style.cssText = `
        background: white;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid #e5e7eb;
        padding: 32px;
        max-width: 400px;
        width: 90%;
        text-align: center;
      `;

      // Add dark mode support
      if (document.documentElement.classList.contains("dark")) {
        content.style.background = "#1a1a1a";
        content.style.borderColor = "#374151";
      }

      content.innerHTML = `
        <div style="margin-bottom: 32px;">
          <div style="display: flex; justify-content: center; margin-bottom: 16px;">
            <img src="/logo/surge-icon-rec-light.svg" alt="Surge Logo" style="height: 64px; width: auto;" class="dark:hidden">
            <img src="/logo/surge-icon-rec-dark.svg" alt="Surge Logo" style="height: 64px; width: auto;" class="hidden dark:block">
          </div>
          <h1 style="font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 8px; margin: 0;">Surge Documentation</h1>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Unlocking Bitcoin's Lending Future</p>
        </div>
        
        <form id="auth-form" style="margin-bottom: 32px;">
          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px; text-align: left;">
              Enter Password to Continue
            </label>
            <input 
              type="password" 
              id="password-input" 
              placeholder="Enter access password"
              style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px; box-sizing: border-box;"
              required
            />
          </div>
          
          <div id="error-message" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
            <p style="color: #dc2626; font-size: 14px; margin: 0;"></p>
          </div>
          
          <button 
            type="submit" 
            id="submit-btn"
            style="width: 100%; background: linear-gradient(90deg, #f4431b 0%, #8e2710 100%); color: white; font-weight: 600; padding: 12px 16px; border-radius: 8px; border: none; font-size: 16px; cursor: pointer; transition: all 0.2s;"
            onmouseover="this.style.transform='scale(1.02)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            Access Documentation
          </button>
        </form>
        
        <div style="text-align: center;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            Secure access to Surge's technical documentation
          </p>
        </div>
      `;

      overlay.appendChild(content);
      document.body.appendChild(overlay);

      // Handle form submission
      const form = document.getElementById("auth-form");
      const passwordInput = document.getElementById("password-input") as HTMLInputElement;
      const errorMessage = document.getElementById("error-message");
      const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

      // Build-time configured passwords via env (comma-separated). Falls back to defaults.
      const envPasswordsRaw = (process.env.VALID_PASSWORDS || "").toString();
      const envPasswords = envPasswordsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const defaultPasswords = ["moveyourbitcoin", "putyourbitcoin2work", "btcstablerails", "surge2025", "surgenewera"];

      const validPasswords = (envPasswords.length ? envPasswords : defaultPasswords).map((p) => p.toLowerCase());

      form?.addEventListener("submit", async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div style="display: flex; align-items: center; justify-content: center;"><div style="width: 20px; height: 20px; border: 2px solid white; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></div>Verifying...</div>';

        // Add spin animation
        const style = document.createElement("style");
        style.textContent = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
        document.head.appendChild(style);

        // Simulate loading
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (validPasswords.includes(passwordInput.value.toLowerCase())) {
          // Save to localStorage
          localStorage.setItem("surge-docs-authenticated-v2", "true");
          localStorage.setItem("surge-docs-auth-timestamp-v2", Date.now().toString());

          // Remove lock screen
          overlay.remove();
        } else {
          // Show error
          const errorP = errorMessage?.querySelector("p");
          if (errorP) {
            errorP.textContent = "Invalid password. Please try again.";
            errorMessage!.style.display = "block";
          }

          submitBtn.disabled = false;
          submitBtn.innerHTML = "Access Documentation";
        }
      });

      // Focus password input
      setTimeout(() => passwordInput?.focus(), 100);
    };

    // Check auth on page load
    checkAuth();

    // Also check when localStorage changes (for multi-tab support)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return null; // This component doesn't render anything
}
