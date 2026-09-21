import { SectionHeading } from "./Section";
import { modelPrices } from "@/lib/data";

const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Same models, lower price"
          subtitle="List price versus Halva price per 1M output tokens. No markup, no minimums."
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl hairline card-gradient">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-ink-faint">
                <th className="px-5 py-4 font-medium">Model</th>
                <th className="px-5 py-4 font-medium">Provider</th>
                <th className="px-5 py-4 text-right font-medium">List</th>
                <th className="px-5 py-4 text-right font-medium">Halva</th>
                <th className="px-5 py-4 text-right font-medium">Save</th>
              </tr>
            </thead>
            <tbody>
              {modelPrices.map((m) => {
                const save = ((m.list - m.halva) / m.list) * 100;
                return (
                  <tr
                    key={m.model}
                    className="border-b border-white/5 last:border-0 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4 font-medium text-ink">
                      {m.model}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{m.vendor}</td>
                    <td className="px-5 py-4 text-right text-ink-faint line-through">
                      {usd(m.list)}
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-ink">
                      {usd(m.halva)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="rounded-full bg-violet/10 px-2 py-0.5 text-xs font-medium text-violet-soft">
                        −{save.toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          Prices shown are illustrative. Live rates depend on current liquidity.
        </p>
      </div>
    </section>
  );
}
