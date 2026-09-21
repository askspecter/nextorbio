import { Tilt } from "./Tilt";
import { SectionHeading } from "./Section";

const features = [
  {
    title: "One key, every provider",
    body: "Anthropic, OpenAI, Google, Meta, Mistral, and xAI behind a single OpenAI-compatible endpoint. Address any model as provider/model and switch freely — no new integration each time.",
    icon: (
      <>
        <rect
          x="4"
          y="9"
          width="16"
          height="11"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 9V6.5a4 4 0 1 1 8 0V9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Wholesale rates, live",
    body: "A router prices every request at the best available rate for the model you asked for. Blended pricing improves with volume — no markup, no minimums, no seat fees.",
    icon: (
      <>
        <path
          d="M4 15l5-5 4 4 7-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 4h4v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Total observability",
    body: "Every request, token, and dollar in one dashboard, broken down by model, key, and day. Set per-key budgets and alerts. Prompts are never stored.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 8v4l2.5 2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export function Product() {
  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="Product"
          title="Infrastructure, not a middleman"
          subtitle="A thin, fast layer between your code and every model — built to disappear."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <Tilt key={f.title}>
              <div className="surface flex h-full flex-col rounded-3xl p-7">
                <div className="tilt-layer inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/12 text-violet-soft">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    {f.icon}
                  </svg>
                </div>
                <h3 className="tilt-layer mt-6 text-lg font-medium text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {f.body}
                </p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
