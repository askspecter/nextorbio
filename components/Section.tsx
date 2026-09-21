export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-soft">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-3xl font-semibold tracking-tightest sm:text-[2.75rem] sm:leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
