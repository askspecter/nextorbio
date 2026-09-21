import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://halva.example"),
  title: "Halva — Get LLM credits, at a discount",
  description:
    "One key, every model, no subscriptions. Buy discounted LLM API credits across 446 models with under 50ms added latency and $0 setup fees.",
  keywords: [
    "LLM credits",
    "AI API",
    "OpenRouter alternative",
    "discounted API",
    "Claude",
    "OpenAI",
    "Gemini",
  ],
  openGraph: {
    title: "Halva — Get LLM credits, at a discount",
    description:
      "One key, every model, no subscriptions. Halva gives you discounted access to 446 LLMs.",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
