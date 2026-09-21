export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-violet/30 blur-md" />
        <svg
          viewBox="0 0 40 40"
          className="relative h-8 w-8"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="orb" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="55%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#5b21b6" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="12" fill="url(#orb)" />
          <ellipse
            cx="20"
            cy="20"
            rx="18"
            ry="6.5"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="1.5"
            opacity="0.7"
            transform="rotate(-25 20 20)"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight">Halva</span>
    </a>
  );
}
