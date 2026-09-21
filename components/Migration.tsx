import { SectionHeading } from "./Section";

const steps = [
  {
    n: "01",
    title: "Swap the base URL",
    body: "Replace https://openrouter.ai/api/v1 with https://api.halva.so/v1.",
  },
  {
    n: "02",
    title: "Swap the key",
    body: "Use your Halva API key in place of your existing provider key.",
  },
  {
    n: "03",
    title: "Ship",
    body: "Model IDs, streaming, and tool calls are unchanged. Nothing else to do.",
  },
];

export function Migration() {
  return (
    <section id="migrate" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Migrate"
          title="Coming from OpenRouter?"
          subtitle="Migration takes about a minute. Change two variables and keep everything else."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="card-gradient rounded-2xl hairline p-6"
            >
              <span className="font-mono text-sm text-violet-soft">{s.n}</span>
              <h3 className="mt-3 text-lg font-medium text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl hairline bg-[#0b0913] p-5 font-mono text-[13px] leading-relaxed">
          <p className="text-ink-faint"># before</p>
          <p className="text-red-300/70">
            - baseURL: <span className="text-emerald-300/80">"https://openrouter.ai/api/v1"</span>
          </p>
          <p className="mt-2 text-ink-faint"># after</p>
          <p className="text-green-300/80">
            + baseURL: <span className="text-emerald-300/80">"https://api.halva.so/v1"</span>
          </p>
        </div>
      </div>
    </section>
  );
}
