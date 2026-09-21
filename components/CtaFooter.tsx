import { Logo } from "./Logo";
import { navLinks } from "@/lib/data";

export function CtaFooter() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="surface relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 rounded-full bg-violet/20 blur-[110px]"
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tightest sm:text-[2.75rem] sm:leading-[1.05]">
                Point your base URL at Halva
              </h2>
              <p className="mx-auto mt-5 max-w-md text-ink-muted">
                One key, every model, wholesale pricing. Your first request is
                two lines away.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-14">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                The unified AI gateway. One clean API in front of 400+ models —
                wholesale rates, full observability, zero lock-in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Product
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="text-ink-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Company
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a
                      href="#product"
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      Status
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@halva.so"
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Social
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <a
                      href="https://x.com/tylerbroqs"
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      @tylerbroqs
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-faint">
              © {new Date().getFullYear()} Halva. A demo project for educational
              purposes — model names and prices are illustrative.
            </p>
            <p className="text-xs text-ink-faint">Built for developers.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
