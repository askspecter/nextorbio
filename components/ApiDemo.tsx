"use client";

import { useState } from "react";
import { SectionHeading } from "./Section";

const snippet = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.halva.so/v1",   // ← 1. point here
  apiKey: process.env.HALVA_API_KEY,    // ← 2. your Halva key
});

const res = await client.chat.completions.create({
  model: "anthropic/claude-fable-5.1",
  messages: [{ role: "user", content: "Hello, Halva!" }],
});

console.log(res.choices[0].message.content);`;

function highlight(line: string) {
  // lightweight token coloring for the demo block
  return line
    .replace(/(\/\/.*)$/g, '<span class="text-ink-faint">$1</span>')
    .replace(
      /("[^"]*")/g,
      '<span class="text-emerald-300/80">$1</span>',
    )
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
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-violet-soft">
              Drop-in API
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              OpenAI-compatible. Change two lines.
            </h2>
            <p className="mt-4 text-ink-muted">
              Keep your existing SDK, request shape, streaming, and tool calls.
              Point the base URL at Halva, drop in your key, and every model is
              available through one endpoint.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-muted">
              {[
                "Works with the OpenAI SDK in any language",
                "446 models addressed as vendor/model",
                "Streaming, JSON mode, and tools pass straight through",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl hairline bg-[#0b0913]">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
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
                      dangerouslySetInnerHTML={{ __html: highlight(line) || "&nbsp;" }}
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
