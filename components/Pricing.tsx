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
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Priced like infrastructure"
          subtitle="Metered per token, billed at the blended Halva rate. No subscriptions, no seat fees, no markup."
        />

        <div className="surface mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl">
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs uppercase tracking-wider text-ink-faint">
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
                      className="border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.02]"
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
                        <span className="rounded-full bg-violet/12 px-2 py-0.5 text-xs font-medium text-violet-soft">
                          −{save.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          $ per 1M output tokens. Illustrative rates — live pricing tracks the
          market and your volume band.
        </p>
      </div>
    </section>
  );
}
