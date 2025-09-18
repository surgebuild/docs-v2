// Surge Documentation Authentication Script
(function () {
  "use strict";

  // Valid passwords - get from environment variables or use fallback
  function getValidPasswords() {
    // Try to get passwords from meta tag (set by layout.tsx)
    const meta = document.querySelector('meta[name="surge-valid-passwords"]');
    if (meta && meta.content) {
      const envPasswords = meta.content
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (envPasswords.length > 0) {
        return envPasswords.map((p) => p.toLowerCase());
      }
    }

    // Fallback passwords
  }

  const validPasswords = getValidPasswords();

  // Check authentication status
  function checkAuth() {
    // Don't run if lock screen is already showing
    if (
      document.getElementById("surge-lock-screen") ||
      document.getElementById("surge-simple-loader")
    ) {
      return;
    }

    // Debug log
    console.log(
      "Surge Auth: Checking authentication on",
      window.location.pathname
    );

    const authStatus = localStorage.getItem("surge-docs-authenticated-v2");
    const authTimestamp = localStorage.getItem("surge-docs-auth-timestamp-v2");

    if (authStatus !== "true" || !authTimestamp) {
      console.log(
        "Surge Auth: No valid authentication found, showing lock screen"
      );
      showLockScreen();
      return;
    }

    // Check if authentication is still valid (24 hours)
    const now = Date.now();
    const authTime = parseInt(authTimestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - authTime >= twentyFourHours) {
      // Clear expired authentication
      console.log(
        "Surge Auth: Authentication expired, clearing and showing lock screen"
      );
      localStorage.removeItem("surge-docs-authenticated-v2");
      localStorage.removeItem("surge-docs-auth-timestamp-v2");
      showLockScreen();
    } else {
      // User is already authenticated, show simple loader briefly
      console.log("Surge Auth: User is authenticated, showing brief loader");
      showSimpleLoader();
    }
  }

  function showSimpleLoader() {
    // Show simple loader for authenticated users
    const loader = document.createElement("div");
    loader.id = "surge-simple-loader";
    loader.style.cssText = `
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
    `;

    loader.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 32px; height: 32px; border: 2px solid #f4431b; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      </div>
    `;

    // Add spin animation
    const style = document.createElement("style");
    style.textContent =
      "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
    document.head.appendChild(style);

    document.body.appendChild(loader);

    // Remove loader after brief delay
    setTimeout(() => {
      loader.remove();
    }, 300);
  }

  function showLockScreen() {
    // Don't show if already exists
    if (document.getElementById("surge-lock-screen")) {
      return;
    }

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
    function updateTheme() {
      if (document.documentElement.classList.contains("dark")) {
        content.style.background = "#1a1a1a";
        content.style.borderColor = "#374151";
        content.style.color = "#ffffff";
      } else {
        content.style.background = "white";
        content.style.borderColor = "#e5e7eb";
        content.style.color = "#111827";
      }
    }

    updateTheme();

    content.innerHTML = `
      <div style="margin-bottom: 32px;">
        <div style="display: flex; justify-content: center; margin-bottom: 16px;">
          <img src="/logo/surge-icon-rec-light.svg" alt="Surge Logo" style="height: 64px; width: auto;" class="logo-light">
          <img src="/logo/surge-icon-rec-dark.svg" alt="Surge Logo" style="height: 64px; width: auto; display: none;" class="logo-dark">
        </div>
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; margin: 0;">Surge Documentation</h1>
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
            style="width: 100%; padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 16px; box-sizing: border-box; background: white; color: #111827;"
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

    // Update theme when dark mode changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Handle form submission
    const form = document.getElementById("auth-form");
    const passwordInput = document.getElementById("password-input");
    const errorMessage = document.getElementById("error-message");
    const submitBtn = document.getElementById("submit-btn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<div style="display: flex; align-items: center; justify-content: center;"><div class="shimmer-effect" style="width: 20px; height: 20px; margin-right: 8px;"></div>Verifying...</div>';

      // Add shimmer animation styles
      const style = document.createElement("style");
      style.textContent = `
              .shimmer-effect {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 4px;
              }
              .dark .shimmer-effect {
                background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
                background-size: 200% 100%;
              }
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `;
      document.head.appendChild(style);

      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (validPasswords.includes(passwordInput.value.toLowerCase())) {
        // Save to localStorage
        localStorage.setItem("surge-docs-authenticated-v2", "true");
        localStorage.setItem(
          "surge-docs-auth-timestamp-v2",
          Date.now().toString()
        );

        // Remove lock screen
        overlay.remove();
        observer.disconnect();
      } else {
        // Show error
        const errorP = errorMessage.querySelector("p");
        errorP.textContent = "Invalid password. Please try again.";
        errorMessage.style.display = "block";

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Access Documentation";
      }
    });

    // Focus password input
    setTimeout(() => passwordInput.focus(), 100);
  }

  // Check auth on page load
  function initAuth() {
    // Small delay to ensure page is fully loaded
    setTimeout(checkAuth, 100);
  }

  // Multiple ways to ensure the script runs
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAuth);
  } else {
    initAuth();
  }

  // Run immediately
  checkAuth();

  // Run after multiple delays to catch different loading states
  setTimeout(checkAuth, 50);
  setTimeout(checkAuth, 100);
  setTimeout(checkAuth, 200);
  setTimeout(checkAuth, 500);
  setTimeout(checkAuth, 1000);
  setTimeout(checkAuth, 2000);

  // Check on page navigation (for SPA behavior)
  window.addEventListener("popstate", initAuth);

  // Check on hash change
  window.addEventListener("hashchange", initAuth);

  // Check on any navigation
  window.addEventListener("beforeunload", checkAuth);

  // Check periodically (fallback) - more frequent
  setInterval(checkAuth, 1000);

  // Also check when localStorage changes (for multi-tab support)
  window.addEventListener("storage", checkAuth);

  // Use MutationObserver to detect page changes
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        // Page content changed, check auth
        setTimeout(checkAuth, 100);
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Additional check for route changes in SPAs
  let currentPath = window.location.pathname;
  setInterval(function () {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      console.log("Surge Auth: Route changed to", currentPath);
      setTimeout(checkAuth, 100);
    }
  }, 100);

  // Check when page becomes visible (user switches tabs back)
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      console.log("Surge Auth: Page became visible, checking auth");
      setTimeout(checkAuth, 100);
    }
  });

  // Check on focus (user clicks back to tab)
  window.addEventListener("focus", function () {
    console.log("Surge Auth: Window focused, checking auth");
    setTimeout(checkAuth, 100);
  });
})();
