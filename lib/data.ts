// Static data that powers the Orbio landing page.
// Numbers are illustrative of the product's marketplace mechanics.

export type Tier = {
  label: string;
  discount: number; // percentage off, e.g. 10 => 10%
  available: number; // credits available at this tier, in USD
};

// The "liquidity book" — discounted credit inventory offered by token holders.
export const tiers: Tier[] = [
  { label: "Tier A", discount: 10, available: 4200 },
  { label: "Tier B", discount: 5, available: 18500 },
  { label: "Tier C", discount: 0, available: 999999 },
];

export type ModelPrice = {
  model: string;
  vendor: "Anthropic" | "OpenAI" | "Google";
  list: number; // $ per 1M output tokens
  orbio: number; // $ per 1M output tokens after discount
};

export const modelPrices: ModelPrice[] = [
  { model: "Claude Fable 5.1", vendor: "Anthropic", list: 50, orbio: 45 },
  { model: "Claude Opus 5", vendor: "Anthropic", list: 75, orbio: 67.5 },
  { model: "GPT-5.1", vendor: "OpenAI", list: 40, orbio: 36 },
  { model: "GPT-5 mini", vendor: "OpenAI", list: 8, orbio: 7.2 },
  { model: "Gemini 3 Pro", vendor: "Google", list: 30, orbio: 27 },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What exactly is an Orbio credit?",
    a: "A credit is a prepaid unit of LLM API access. You buy credits once, then spend them across 446 models through a single OpenAI-compatible key. Credits are a promotional grant of product access — not an investment return, and not redeemable for cash.",
  },
  {
    q: "Where does the discount come from?",
    a: "ORBIO token holders list unused credit allocations in the liquidity book at a discount. When you buy, your order fills against the cheapest available tier first, so you always get the best live price without haggling.",
  },
  {
    q: "Do you store my prompts?",
    a: "No. Requests relay directly to the named provider. We retain only billing metadata — model, token counts, and timestamps — never prompt or completion content.",
  },
  {
    q: "Is there a subscription or setup fee?",
    a: "None. There is $0 setup, no monthly minimum, and no per-seat pricing. You only spend the credits you buy, and unused credits never expire.",
  },
  {
    q: "How do I switch from OpenRouter or the OpenAI SDK?",
    a: "Change two variables: point base_url at https://api.orbio.so/v1 and swap in your Orbio key. Everything else — request shape, streaming, tool calls — stays identical.",
  },
  {
    q: "Can I get a refund?",
    a: "Unused credit balances can be refunded to your original payment method within 30 days of purchase. Credits already spent on API calls are non-refundable.",
  },
];

export type Buy = {
  wallet: string;
  amount: number;
  discount: number;
  secondsAgo: number;
};

export const recentBuys: Buy[] = [
  { wallet: "0x7a3f…c21e", amount: 250, discount: 10, secondsAgo: 12 },
  { wallet: "0x91b0…8d4a", amount: 1200, discount: 10, secondsAgo: 47 },
  { wallet: "0x2ce8…4f90", amount: 80, discount: 5, secondsAgo: 96 },
  { wallet: "0xd14a…7b33", amount: 500, discount: 5, secondsAgo: 184 },
  { wallet: "0x6f22…a0c7", amount: 3000, discount: 5, secondsAgo: 240 },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Buyers", href: "#buy" },
  { label: "Sellers", href: "#liquidity" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#migrate" },
  { label: "FAQ", href: "#faq" },
];

// Fill an order of `amount` USD against the liquidity book, cheapest tier first.
export function fillOrder(amount: number): {
  spent: number;
  credits: number;
  saved: number;
  effectiveDiscount: number;
  breakdown: { discount: number; spent: number; credits: number }[];
} {
  let remaining = Math.max(0, amount);
  let credits = 0;
  let saved = 0;
  const breakdown: { discount: number; spent: number; credits: number }[] = [];

  for (const tier of tiers) {
    if (remaining <= 0) break;
    const factor = 1 - tier.discount / 100;
    // Max USD spend that can be absorbed by this tier's available credit face value.
    const maxSpendHere = tier.available * factor;
    const spendHere = Math.min(remaining, maxSpendHere);
    if (spendHere <= 0) continue;
    const creditsHere = spendHere / factor;
    credits += creditsHere;
    saved += creditsHere - spendHere;
    remaining -= spendHere;
    breakdown.push({
      discount: tier.discount,
      spent: spendHere,
      credits: creditsHere,
    });
  }

  const spent = amount - remaining;
  const effectiveDiscount = credits > 0 ? (saved / credits) * 100 : 0;
  return { spent, credits, saved, effectiveDiscount, breakdown };
}
