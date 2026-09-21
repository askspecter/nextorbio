"use client";

import { useState } from "react";

const snippet = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.halva.so/v1",   // point here
  apiKey: process.env.HALVA_API_KEY,    // your Halva key
});

const res = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ role: "user", content: "Ship it." }],
});

console.log(res.choices[0].message.content);`;

function highlight(line: string) {
  return line
    .replace(/(\/\/.*)$/g, '<span class="text-ink-faint">$1</span>')
    .replace(/("[^"]*")/g, '<span class="text-emerald-300/80">$1</span>')
    .replace(
      /\b(import|const|await|from)\b/g,
      '<span class="text-violet-soft">$1</span>',
    );
}

export function ApiDemo() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="api" className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-soft">
              Drop-in
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tightest sm:text-[2.75rem] sm:leading-[1.05]">
              Two lines to switch.
              <br />
              Nothing else changes.
            </h2>
            <p className="mt-5 text-ink-muted">
              Halva speaks the OpenAI API. Keep your SDK, request shape,
              streaming, and tool calls exactly as they are. Just point the
              base URL and drop in your key.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-ink-muted">
              {[
                "Works with the OpenAI SDK in any language",
                "Address 400+ models as provider/model",
                "Streaming, JSON mode, and tools pass straight through",
                "Automatic failover if an upstream degrades",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="surface-quiet mt-8 rounded-2xl p-4 font-mono text-[13px] leading-relaxed">
              <p className="text-red-300/60">
                - baseURL:{" "}
                <span className="text-emerald-300/70">
                  "https://openrouter.ai/api/v1"
                </span>
              </p>
              <p className="mt-1 text-green-300/80">
                + baseURL:{" "}
                <span className="text-emerald-300/80">
                  "https://api.halva.so/v1"
                </span>
              </p>
            </div>
          </div>

          <div className="surface overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="ml-3 text-xs text-ink-faint">quickstart.ts</span>
              </div>
              <button
                type="button"
                onClick={copy}
                className="rounded-md px-2.5 py-1 text-xs text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <pre className="thin-scroll overflow-x-auto p-4 text-[13px] leading-relaxed">
              <code className="font-mono">
                {snippet.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-7 shrink-0 select-none text-right text-ink-faint/50">
                      {i + 1}
                    </span>
                    <span
                      className="pl-4 text-ink"
                      dangerouslySetInnerHTML={{
                        __html: highlight(line) || "&nbsp;",
                      }}
                    />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
