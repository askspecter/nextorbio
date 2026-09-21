import { SectionHeading } from "./Section";

const spend = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 44 },
  { day: "Thu", value: 71 },
  { day: "Fri", value: 63 },
  { day: "Sat", value: 29 },
  { day: "Sun", value: 34 },
];

const byModel = [
  { model: "claude-sonnet-5", pct: 44 },
  { model: "gpt-5.1", pct: 29 },
  { model: "gemini-3-pro", pct: 19 },
  { model: "others", pct: 8 },
];

const kpis = [
  { label: "Requests (7d)", value: "1.24M" },
  { label: "Tokens (7d)", value: "890M" },
  { label: "Routing overhead", value: "39 ms" },
  { label: "Kept vs list", value: "$3,180" },
];

export function Analytics() {
  const max = Math.max(...spend.map((s) => s.value));

  return (
    <section id="usage" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="Usage"
          title="Every token, accounted for"
          subtitle="Spend by day and model, request volume, and overhead. One dashboard, updated live."
        />

        <div className="surface mt-14 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="surface-quiet rounded-2xl p-4">
                <p className="text-xs text-ink-faint">{k.label}</p>
                <p className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                  {k.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Spend by day */}
            <div>
              <p className="text-sm text-ink-muted">Spend by day</p>
              <div className="mt-5 flex h-44 items-end gap-2 sm:gap-3">
                {spend.map((s) => (
                  <div
                    key={s.day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-violet-deep/70 to-violet-soft"
                        style={{ height: `${(s.value / max) * 100}%` }}
                        title={`$${s.value}`}
                      />
                    </div>
                    <span className="text-xs text-ink-faint">{s.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By model */}
            <div>
              <p className="text-sm text-ink-muted">Spend by model</p>
              <div className="mt-5 space-y-4">
                {byModel.map((m) => (
                  <div key={m.model}>
                    <div className="flex justify-between text-sm">
                      <span className="font-mono text-ink-muted">
                        {m.model}
                      </span>
                      <span className="text-ink">{m.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-violet-soft"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
