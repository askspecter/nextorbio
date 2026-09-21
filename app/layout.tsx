import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://halva.so"),
  title: "Halva · The unified AI gateway",
  description:
    "One clean API for 400+ models. Halva routes every request through a single endpoint at wholesale rates, with every token accounted for. No subscriptions, no lock-in.",
  keywords: [
    "AI gateway",
    "LLM API",
    "unified API",
    "model router",
    "OpenAI compatible",
    "wholesale AI pricing",
    "Claude",
    "GPT",
    "Gemini",
  ],
  openGraph: {
    title: "Halva · The unified AI gateway",
    description:
      "One clean API for 400+ models. Wholesale rates, full observability, zero lock-in.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain font-sans antialiased">
        <div className="site-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
