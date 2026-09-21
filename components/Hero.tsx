const stats = [
  { value: "400+", label: "models, one key" },
  { value: "up to 90%", label: "off list price" },
  { value: "1 CREDIT", label: "= $1 of AI usage" },
];

const vendors = ["Anthropic", "OpenAI", "Google", "Meta", "Mistral", "xAI"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="orb-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#buy"
            className="inline-flex items-center gap-2 rounded-full hairline bg-white/5 px-3 py-1 text-xs text-ink-muted transition-colors hover:text-ink"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet animate-pulse-soft" />
            Introducing CREDIT by Orbio
            <span aria-hidden="true">→</span>
          </a>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="gradient-text">Get AI credits,</span>
            <br />
            at a discount
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-muted">
            400+ models, one key, up to 90% off. Buy CREDIT once and spend it
            across every major model — 1 CREDIT = $1 of AI usage.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#buy"
              className="w-full rounded-full bg-violet px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet/25 transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Get credits
            </a>
            <a
              href="#migrate"
              className="w-full rounded-full hairline bg-white/5 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/10 sm:w-auto"
            >
              Read the protocol
            </a>
          </div>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card-gradient rounded-2xl hairline px-6 py-5 text-center"
            >
              <dt className="text-2xl font-semibold text-ink">{s.value}</dt>
              <dd className="mt-1 text-sm text-ink-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 overflow-hidden">
          <p className="text-center text-xs uppercase tracking-widest text-ink-faint">
            Route to every major provider
          </p>
          <div className="relative mt-5 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
            <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
              {[...vendors, ...vendors].map((v, i) => (
                <li
                  key={i}
                  className="whitespace-nowrap text-lg font-medium text-ink-faint"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
