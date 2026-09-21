import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://orbio.so"),
  title: "Orbio · AI credits at a discount",
  description:
    "Get AI credits at a discount. 400+ models, one key, up to 90% off. Buy CREDIT once and spend it across every major model through a single Orbio key.",
  keywords: [
    "AI credits",
    "CREDIT token",
    "ORBIO",
    "LLM API",
    "OpenRouter alternative",
    "discounted API",
    "Claude Fable",
    "GPT Astra",
    "Gemini",
  ],
  openGraph: {
    title: "Orbio · AI credits at a discount",
    description:
      "400+ models, one key, up to 90% off. 1 CREDIT = $1 of AI usage.",
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
