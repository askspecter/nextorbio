"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "./Section";
import { fillOrder, tiers } from "@/lib/data";

const presets = [50, 250, 1000, 5000];
const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function BuyCredits() {
  const [amount, setAmount] = useState(250);
  const [live, setLive] = useState<ReturnType<typeof fillOrder> | null>(null);

  // Instant local estimate so the UI never blocks…
  const local = useMemo(() => fillOrder(amount), [amount]);

  // …backed by the real /api/quote endpoint (debounced).
  useEffect(() => {
    const ctrl = new AbortController();
    const id = setTimeout(() => {
      fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => data && setLive(data))
        .catch(() => {
          /* fall back to local estimate */
        });
    }, 220);
    return () => {
      clearTimeout(id);
      ctrl.abort();
    };
  }, [amount]);

  const quote = live ?? local;

  return (
    <section id="buy" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Buy credits"
          title="Pay less than list price"
          subtitle="Your order fills against the liquidity book cheapest-tier-first. Move the slider to see your live savings."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Calculator */}
          <div className="card-gradient rounded-3xl hairline p-6 sm:p-8">
            <label className="text-sm text-ink-muted" htmlFor="amount">
              I want to spend
            </label>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-3xl font-semibold text-ink-faint">$</span>
              <input
                id="amount"
                type="number"
                min={0}
                max={1000000}
                value={amount}
                onChange={(e) =>
                  setAmount(Math.max(0, Math.min(1000000, Number(e.target.value) || 0)))
                }
                className="w-full bg-transparent text-4xl font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <input
              type="range"
              min={0}
              max={5000}
              step={10}
              value={Math.min(amount, 5000)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-5 w-full accent-violet"
              aria-label="Spend amount"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    amount === p
                      ? "bg-violet text-white"
                      : "hairline bg-white/5 text-ink-muted hover:text-ink"
                  }`}
                >
                  {usd(p)}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-white/5 pt-6 text-sm">
              {quote.breakdown.length === 0 && (
                <p className="text-ink-faint">Enter an amount to see your fill.</p>
              )}
              {quote.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-ink-muted">
                  <span>
                    {b.discount}% off tier
                    <span className="text-ink-faint"> · {usd(b.spent)}</span>
                  </span>
                  <span className="font-mono text-ink">
                    {usd(b.credits)} credits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between rounded-3xl border border-violet/30 bg-violet/[0.06] p-6 sm:p-8">
            <div>
              <p className="text-sm text-ink-muted">You receive</p>
              <p className="mt-1 text-4xl font-semibold text-ink">
                {usd(quote.credits)}
              </p>
              <p className="mt-1 text-sm text-ink-faint">in API credits</p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">You pay</dt>
                  <dd className="text-ink">{usd(quote.spent)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">You save</dt>
                  <dd className="font-medium text-violet-soft">
                    {usd(quote.saved)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Effective discount</dt>
                  <dd className="text-ink">
                    {quote.effectiveDiscount.toFixed(1)}%
                  </dd>
                </div>
              </dl>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-full bg-violet px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.02]"
            >
              Buy {usd(quote.credits)} in credits
            </button>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Live pricing from {tiers.length} tiers · updates as you type
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
