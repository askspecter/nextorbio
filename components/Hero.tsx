const stats = [
  { value: "400+", label: "models" },
  { value: "~40ms", label: "routing overhead" },
  { value: "99.99%", label: "uptime" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-44 sm:pt-56">
      {/* soft key light behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[440px] w-[720px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="rise inline-flex items-center gap-2 rounded-full hairline bg-white/[0.04] px-3.5 py-1.5 text-xs text-ink-muted"
            style={{ animationDelay: "60ms" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet" />
            The unified AI gateway · now in public beta
          </div>

          <h1
            className="rise mt-7 text-[2.6rem] font-semibold leading-[1.03] tracking-tightest sm:text-[4.25rem]"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-gradient">Every model.</span>
            <br />
            One clean API.
          </h1>

          <p
            className="rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
            style={{ animationDelay: "180ms" }}
          >
            Halva routes your requests to 400+ models through a single
            endpoint, at wholesale rates, with every token accounted for. No
            subscriptions, no lock-in.
          </p>

          <div
            className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#api"
              className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start building
            </a>
            <a
              href="#pricing"
              className="w-full rounded-full hairline bg-white/[0.04] px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/[0.08] sm:w-auto"
            >
              See pricing
            </a>
          </div>
        </div>

        <dl
          className="rise mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
          style={{ animationDelay: "320ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="surface rounded-2xl px-3 py-5 text-center sm:px-6"
            >
              <dt className="text-xl font-semibold text-ink sm:text-2xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-ink-muted sm:text-sm">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
