import { Logo } from "./Logo";
import { navLinks } from "@/lib/data";

export function CtaFooter() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-violet/30 bg-violet/[0.06] px-6 py-14 text-center sm:px-12">
            <div className="orb-glow pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Start spending less on every token
              </h2>
              <p className="mx-auto mt-4 max-w-md text-ink-muted">
                400+ models, one key, up to 90% off. Get your first CREDIT in
                under a minute.
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo />
              <p className="mt-4 text-sm text-ink-muted">
                AI credits at a discount. 400+ models through one
                OpenAI-compatible key. 1 CREDIT = $1 of AI usage.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
                  Product
                </p>
                <ul className="mt-4 space-y-2 text-sm">
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
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="#faq"
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      Affiliates
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
                <ul className="mt-4 space-y-2 text-sm">
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

          <div className="mt-10 border-t border-white/5 pt-6">
            <p className="text-xs leading-relaxed text-ink-faint">
              CREDIT is a unit of prepaid product access, not an investment
              return, and not redeemable for cash. Model names, prices, and
              on-chain figures shown are illustrative.
            </p>
            <p className="mt-4 text-xs text-ink-faint">
              © {new Date().getFullYear()} Halva. A demo project for
              educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
