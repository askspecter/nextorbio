// Static data that powers the Orbio landing page.
// Numbers are illustrative of the product's marketplace mechanics.

export type Tier = {
  label: string;
  discount: number; // percentage off, e.g. 10 => 10%
  available: number; // credits available at this tier, in USD (1 CREDIT = $1)
};

// The "liquidity book" — discounted CREDIT inventory listed by sellers and
// $ORBIO stakers. Buyers fill against the deepest discount first.
export const tiers: Tier[] = [
  { label: "Tier A", discount: 90, available: 900 },
  { label: "Tier B", discount: 60, available: 6400 },
  { label: "Tier C", discount: 30, available: 24000 },
  { label: "Tier D", discount: 10, available: 999999 },
];

export type ModelPrice = {
  model: string;
  vendor: "Anthropic" | "OpenAI" | "Google" | "xAI";
  list: number; // $ per 1M output tokens
  orbio: number; // $ per 1M output tokens paid through Orbio credit
};

export const modelPrices: ModelPrice[] = [
  { model: "Claude Fable 5.1", vendor: "Anthropic", list: 50, orbio: 5 },
  { model: "Claude Opus 5", vendor: "Anthropic", list: 75, orbio: 22.5 },
  { model: "GPT Astra", vendor: "OpenAI", list: 40, orbio: 6 },
  { model: "GPT-5 mini", vendor: "OpenAI", list: 8, orbio: 2.4 },
  { model: "Gemini 3 Pro", vendor: "Google", list: 30, orbio: 6 },
  { model: "Grok 4", vendor: "xAI", list: 25, orbio: 7.5 },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is a CREDIT?",
    a: "1 CREDIT = $1 of AI usage. Buy CREDIT once, then spend it across 400+ models through a single Orbio key. Purchased credit becomes your API balance, drawn down as you make requests.",
  },
  {
    q: "Where does the discount come from?",
    a: "Sellers list their unused AI credit — or the credit they earn by holding $ORBIO — on an onchain order book at a discount they choose. When you buy, your order fills against the deepest discount first, so you always get the best live price. Popular models routinely land up to 90% below list.",
  },
  {
    q: "How do I get CREDIT?",
    a: "Four ways: claim it, buy it on the onchain order book, swap it on Uniswap, or earn it by staking $ORBIO. However you get it, activate it to power your AI through your Orbio key.",
  },
  {
    q: "Do you store my prompts?",
    a: "No. Requests relay directly to the named provider. We retain only billing metadata — model, token counts, and timestamps — never prompt or completion content.",
  },
  {
    q: "How do I switch from OpenRouter or the OpenAI SDK?",
    a: "Change two variables: point base_url at https://api.orbio.so/v1 and swap in your Orbio key. Everything else — request shape, streaming, tool calls — stays identical.",
  },
  {
    q: "Can I sell credit I'm not using?",
    a: "Yes. List an OpenRouter key at a discount you choose and get paid for what buyers actually use, or sell the CREDIT you earned by holding $ORBIO. Sellers manage listings at sellers.orbio.so.",
  },
];

export type Buy = {
  wallet: string;
  amount: number;
  discount: number;
  secondsAgo: number;
};

export const recentBuys: Buy[] = [
  { wallet: "0x7a3f…c21e", amount: 250, discount: 90, secondsAgo: 12 },
  { wallet: "0x91b0…8d4a", amount: 1200, discount: 60, secondsAgo: 47 },
  { wallet: "0x2ce8…4f90", amount: 80, discount: 60, secondsAgo: 96 },
  { wallet: "0xd14a…7b33", amount: 500, discount: 30, secondsAgo: 184 },
  { wallet: "0x6f22…a0c7", amount: 3000, discount: 30, secondsAgo: 240 },
];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Buy", href: "#buy" },
  { label: "Sell", href: "#liquidity" },
  { label: "Pricing", href: "#pricing" },
  { label: "Protocol", href: "#migrate" },
  { label: "FAQ", href: "#faq" },
];

// Fill an order of `amount` USD against the liquidity book, deepest discount first.
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
