import { SectionHeading } from "./Section";

const promises = [
  {
    title: "No silent substitution",
    body: "Requests relay directly to the model you name. We never swap in a cheaper backend or a quantized variant behind your back.",
    icon: (
      <path
        d="M4 12l5 5L20 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Verifiable responses",
    body: "Every response carries the provider's model name and request ID, so you can independently confirm exactly what served your call.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 20l-3.5-3.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Prompts are never stored",
    body: "We keep billing metadata only — model, token counts, timestamps. Your prompt and completion content is never written to disk.",
    icon: (
      <>
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 10V7a4 4 0 018 0v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

export function Trust() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Trust"
          title="A relay you can audit"
          subtitle="Discounted doesn't mean opaque. Three guarantees hold on every request."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {promises.map((p) => (
            <div
              key={p.title}
              className="card-gradient rounded-2xl hairline p-6"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 text-violet-soft">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {p.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
