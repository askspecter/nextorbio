import { providers } from "@/lib/data";

export function Providers() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
          One endpoint in front of every major lab
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="drift flex w-max items-center gap-14 pr-14">
            {[...providers, ...providers].map((p, i) => (
              <li
                key={i}
                className="whitespace-nowrap text-lg font-medium text-ink-faint sm:text-xl"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
