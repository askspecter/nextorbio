export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-violet/30 blur-lg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/halva-logo.png"
          alt="Halva"
          width={36}
          height={36}
          className="relative h-9 w-9 select-none object-contain"
          draggable={false}
        />
      </span>
      <span className="text-lg font-semibold tracking-tight">Halva</span>
    </a>
  );
}
