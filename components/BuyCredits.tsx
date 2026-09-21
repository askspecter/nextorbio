"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeading } from "./Section";
import { fillOrder, bands } from "@/lib/data";

const presets = [200, 1000, 5000, 20000];
const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function BuyCredits() {
  const [amount, setAmount] = useState(1000);
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
    <section id="estimate" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="Estimate"
          title="See what you'd pay"
          subtitle="Your monthly usage is priced across volume bands automatically — the blended rate improves as you scale. Drag to preview it."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Calculator */}
          <div className="surface rounded-3xl p-6 sm:p-8">
            <label className="text-sm text-ink-muted" htmlFor="amount">
              Monthly usage at list price
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
                  setAmount(
                    Math.max(0, Math.min(1000000, Number(e.target.value) || 0)),
                  )
                }
                className="w-full bg-transparent text-4xl font-semibold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <input
              type="range"
              min={0}
              max={20000}
              step={100}
              value={Math.min(amount, 20000)}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-5 w-full accent-violet"
              aria-label="Monthly usage"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    amount === p
                      ? "bg-white text-black"
                      : "hairline bg-white/[0.04] text-ink-muted hover:text-ink"
                  }`}
                >
                  {usd(p)}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-6 text-sm">
              {quote.breakdown.length === 0 && (
                <p className="text-ink-faint">
                  Enter an amount to see your blended rate.
                </p>
              )}
              {quote.breakdown.map((b, i) => (
                <div key={i} className="flex justify-between text-ink-muted">
                  <span>
                    {b.discount}% band
                    <span className="text-ink-faint"> · {usd(b.credits)} usage</span>
                  </span>
                  <span className="font-mono text-ink">{usd(b.spent)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="surface flex flex-col justify-between rounded-3xl p-6 sm:p-8">
            <div>
              <p className="text-sm text-ink-muted">You'd pay Halva</p>
              <p className="mt-1 text-4xl font-semibold text-ink">
                {usd(quote.spent)}
              </p>
              <p className="mt-1 text-sm text-ink-faint">
                for {usd(quote.credits)} of usage at list
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">You keep</dt>
                  <dd className="font-medium text-violet-soft">
                    {usd(quote.saved)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Blended discount</dt>
                  <dd className="text-ink">
                    {quote.effectiveDiscount.toFixed(1)}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Monthly minimum</dt>
                  <dd className="text-ink">None</dd>
                </div>
              </dl>
            </div>

            <a
              href="#api"
              className="mt-8 w-full rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Start building
            </a>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Live estimate across {bands.length} volume bands · updates as you type
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
