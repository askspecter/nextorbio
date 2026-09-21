"use client";

import type { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

// Set NEXT_PUBLIC_PRIVY_APP_ID (from dashboard.privy.io) in your env / Vercel
// project. Until it is set, the app renders normally and the Sign in button
// falls back to a "coming soon" state instead of crashing.
const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

export function Providers({ children }: { children: ReactNode }) {
  if (!appId) return <>{children}</>;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Wallet, Google, and email — in that order — in the login modal.
        loginMethods: ["wallet", "google", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#8b5cf6",
          logo: "/halva-logo.png",
        },
        embeddedWallets: {
          ethereum: { createOnLogin: "users-without-wallets" },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
