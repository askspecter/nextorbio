"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "./Section";
import { recentBuys, tiers, type Buy } from "@/lib/data";

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function randomWallet() {
  const hex = () =>
    Math.floor(Math.random() * 16 ** 4)
      .toString(16)
      .padStart(4, "0");
  return `0x${hex()}…${hex()}`;
}

function ago(seconds: number) {
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  return `${m}m ago`;
}

export function LiquidityBook() {
  const [buys, setBuys] = useState<Buy[]>(recentBuys);

  // Simulate a live transaction feed: age existing rows, occasionally prepend.
  useEffect(() => {
    const tick = setInterval(() => {
      setBuys((prev) => {
        const aged = prev.map((b) => ({ ...b, secondsAgo: b.secondsAgo + 3 }));
        if (Math.random() > 0.55) {
          const discount = [90, 60, 30][Math.floor(Math.random() * 3)];
          const amount = [40, 120, 250, 500, 900, 2000][
            Math.floor(Math.random() * 6)
          ];
          const next: Buy = {
            wallet: randomWallet(),
            amount,
            discount,
            secondsAgo: 1,
          };
          return [next, ...aged].slice(0, 6);
        }
        return aged.slice(0, 6);
      });
    }, 3000);
    return () => clearInterval(tick);
  }, []);

  const totalAvailable = tiers
    .filter((t) => t.discount > 0)
    .reduce((sum, t) => sum + t.available, 0);

  return (
    <section id="liquidity" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sell · onchain order book"
          title="Sell the credit you're not using"
          subtitle="Sellers and $ORBIO stakers list CREDIT at a discount they choose; buyers fill against them. Here's the live book."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Tiers */}
          <div className="card-gradient rounded-3xl hairline p-6 sm:p-8">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm text-ink-muted">Available at a discount</h3>
              <span className="text-lg font-semibold text-ink">
                {usd(totalAvailable)}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {tiers.map((t) => {
                const pct =
                  t.discount === 0
                    ? 100
                    : Math.min(100, (t.available / totalAvailable) * 100);
                return (
                  <div key={t.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink">
                        {t.discount > 0 ? `${t.discount}% off` : "List price"}
                      </span>
                      <span className="text-ink-muted">
                        {t.discount > 0 ? usd(t.available) : "Unlimited"}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-deep to-violet-soft"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-ink-faint">
              Orders fill cheapest-tier-first, so you always take the best
              available price automatically.
            </p>
          </div>

          {/* Recent buys */}
          <div className="card-gradient rounded-3xl hairline p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-ink-muted">Recent buys</h3>
              <span className="flex items-center gap-2 text-xs text-ink-faint">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-soft" />
                Live
              </span>
            </div>
            <ul className="mt-4 divide-y divide-white/5">
              {buys.map((b, i) => (
                <li
                  key={`${b.wallet}-${i}`}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-mono text-ink-muted">{b.wallet}</span>
                  <span className="text-ink">{usd(b.amount)}</span>
                  <span className="rounded-full bg-violet/10 px-2 py-0.5 text-xs text-violet-soft">
                    {b.discount}% off
                  </span>
                  <span className="w-16 text-right text-xs text-ink-faint">
                    {ago(b.secondsAgo)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
