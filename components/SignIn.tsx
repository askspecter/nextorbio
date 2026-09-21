"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

type Variant = "desktop" | "mobile";

function shortLabel(user: ReturnType<typeof usePrivy>["user"]): string {
  if (!user) return "Account";
  const email = user.email?.address ?? user.google?.email;
  if (email) return email.length > 22 ? email.slice(0, 20) + "…" : email;
  const addr = user.wallet?.address;
  if (addr) return addr.slice(0, 6) + "…" + addr.slice(-4);
  return "Account";
}

function baseClass(variant: Variant, primary = false) {
  if (variant === "mobile") {
    return primary
      ? "mt-2 w-full rounded-full bg-white px-4 py-2.5 text-center text-sm font-medium text-black"
      : "w-full rounded-lg px-3 py-2.5 text-left text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink";
  }
  return "text-sm text-ink-muted transition-colors hover:text-ink";
}

// Real Privy-powered control (only rendered when an app id is configured).
function PrivySignIn({ variant }: { variant: Variant }) {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <span className={`${baseClass(variant)} opacity-60`} aria-hidden="true">
        Sign in
      </span>
    );
  }

  if (authenticated) {
    return (
      <button
        type="button"
        onClick={() => logout()}
        title="Sign out"
        className={
          variant === "mobile"
            ? "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink transition-colors hover:bg-white/5"
            : "flex items-center gap-2 rounded-full hairline bg-white/[0.04] px-3 py-1.5 text-sm text-ink transition-colors hover:bg-white/[0.08]"
        }
      >
        <span className="max-w-[160px] truncate">{shortLabel(user)}</span>
        <span className="text-xs text-ink-faint">Sign out</span>
      </button>
    );
  }

  return (
    <button type="button" onClick={() => login()} className={baseClass(variant)}>
      Sign in
    </button>
  );
}

// Fallback shown until NEXT_PUBLIC_PRIVY_APP_ID is set.
function FallbackSignIn({ variant }: { variant: Variant }) {
  const [note, setNote] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setNote(true);
          setTimeout(() => setNote(false), 2600);
        }}
        className={baseClass(variant)}
      >
        Sign in
      </button>
      {note && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-[60] mx-auto w-fit max-w-[90vw] rounded-full border border-white/10 bg-black/80 px-4 py-2 text-center text-sm text-ink-muted backdrop-blur-xl"
        >
          Sign-in is being set up. Wallet, Google, and email are coming shortly.
        </div>
      )}
    </>
  );
}

export function SignIn({ variant = "desktop" }: { variant?: Variant }) {
  return appId ? (
    <PrivySignIn variant={variant} />
  ) : (
    <FallbackSignIn variant={variant} />
  );
}
