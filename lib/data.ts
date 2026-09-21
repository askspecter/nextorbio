// Static data behind the Halva marketing site.
// Halva is a unified AI gateway: one API, many models, wholesale pricing.
// Numbers are illustrative of the product mechanics.

export type Band = {
  label: string;
  discount: number; // % below list at this volume band
  available: number; // monthly USD of usage priced at this band
};

// Volume pricing bands. The blended rate improves as usage grows — the router
// prices each request across bands, best rate first.
export const bands: Band[] = [
  { label: "Scale", discount: 45, available: 2000 },
  { label: "Growth", discount: 30, available: 8000 },
  { label: "Team", discount: 18, available: 30000 },
  { label: "Base", discount: 8, available: 999999 },
];

export type ModelPrice = {
  model: string;
  vendor: "Anthropic" | "OpenAI" | "Google" | "xAI";
  list: number; // $ per 1M output tokens (list)
  halva: number; // $ per 1M output tokens (blended Halva rate)
};

export const modelPrices: ModelPrice[] = [
  { model: "Claude Sonnet 5", vendor: "Anthropic", list: 15, halva: 9.6 },
  { model: "Claude Opus 5", vendor: "Anthropic", list: 75, halva: 48 },
  { model: "GPT-5.1", vendor: "OpenAI", list: 40, halva: 26 },
  { model: "GPT-5 mini", vendor: "OpenAI", list: 8, halva: 5.1 },
  { model: "Gemini 3 Pro", vendor: "Google", list: 30, halva: 19.5 },
  { model: "Grok 4", vendor: "xAI", list: 25, halva: 16.25 },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is Halva?",
    a: "Halva is a single API gateway to 400+ AI models. One key, one endpoint, wholesale pricing, and full visibility into every token you spend — so you can build against any model without wiring up a new provider each time.",
  },
  {
    q: "How is it cheaper than going direct?",
    a: "Halva aggregates demand and routes across providers, passing near-cost rates back to you. You pay per token at a blended market rate that improves with volume — no monthly minimum, no seat fees, no markup on top.",
  },
  {
    q: "Is it really drop-in?",
    a: "Yes. Halva speaks the OpenAI API. Point your base URL at api.halva.so, swap in your key, and keep your existing SDK, streaming, and tool calls exactly as they are.",
  },
  {
    q: "Do you train on or store my data?",
    a: "Never. Requests relay straight through to the provider you named. We keep only billing metadata — model, token counts, and timestamps — and nothing of your prompt or completion content is written to disk.",
  },
  {
    q: "What happens if a provider has an outage?",
    a: "The router fails over to a healthy provider serving the same model family, so your app keeps responding instead of returning errors while one upstream is degraded.",
  },
  {
    q: "Can I cap and track spend?",
    a: "Yes. Set per-key budgets and alerts, then watch every request, token, and dollar update live in the dashboard. Spend is broken down by model, key, and day.",
  },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#api" },
  { label: "Usage", href: "#usage" },
  { label: "FAQ", href: "#faq" },
];

export const providers = [
  "Anthropic",
  "OpenAI",
  "Google",
  "Meta",
  "Mistral",
  "xAI",
  "Cohere",
  "DeepSeek",
];

// Price `amount` of monthly usage across the volume bands, best rate first.
export function fillOrder(amount: number): {
  spent: number;
  credits: number; // list value of usage covered
  saved: number;
  effectiveDiscount: number;
  breakdown: { discount: number; spent: number; credits: number }[];
} {
  let remaining = Math.max(0, amount);
  let credits = 0;
  let saved = 0;
  const breakdown: { discount: number; spent: number; credits: number }[] = [];

  for (const band of bands) {
    if (remaining <= 0) break;
    const factor = 1 - band.discount / 100;
    const maxSpendHere = band.available * factor;
    const spendHere = Math.min(remaining, maxSpendHere);
    if (spendHere <= 0) continue;
    const creditsHere = spendHere / factor;
    credits += creditsHere;
    saved += creditsHere - spendHere;
    remaining -= spendHere;
    breakdown.push({
      discount: band.discount,
      spent: spendHere,
      credits: creditsHere,
    });
  }

  const spent = amount - remaining;
  const effectiveDiscount = credits > 0 ? (saved / credits) * 100 : 0;
  return { spent, credits, saved, effectiveDiscount, breakdown };
}
