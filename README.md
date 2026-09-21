# Orbio — AI Credits at a Discount

A fully functional AI credit marketplace built with **Next.js (App Router)**,
**TypeScript**, and **Tailwind CSS**, modeled on
[orbio.so](https://www.orbio.so/).

Orbio is an AI credit marketplace: buy **CREDIT** (1 CREDIT = $1 of AI usage)
at a discount and spend it across 400+ models — up to 90% off list — through a
single OpenAI-compatible key. Sellers and `$ORBIO` stakers list unused credit
on an onchain order book at a discount they choose.

> This is an educational demo project. All prices, models, wallets, and
> transactions shown are illustrative.

## Features

Every interactive element actually works:

- **Live credit calculator** (`components/BuyCredits.tsx`) — enter or drag an
  amount and see credits, savings, and effective discount update in real time.
  It calls a real backend endpoint (`POST /api/quote`) and falls back to an
  instant local estimate.
- **Deepest-discount-first order filling** (`lib/data.ts` → `fillOrder`) —
  orders fill against the onchain order book starting from the biggest
  discount, spilling into the next tier when one is exhausted.
- **Live liquidity feed** (`components/LiquidityBook.tsx`) — a simulated
  "Recent buys" ticker that ages and prepends transactions.
- **Copy-to-clipboard API snippet** (`components/ApiDemo.tsx`) with syntax
  highlighting.
- **Accordion FAQ**, **animated provider marquee**, **sticky responsive
  navbar** with a mobile menu, and an **analytics dashboard** with CSS-drawn
  charts.
- Fully **responsive** (mobile → desktop), dark-themed, and respects
  `prefers-reduced-motion`.

## API

A real route handler powers the calculator:

```bash
# Get the current liquidity tiers
curl http://localhost:3000/api/quote

# Request a live quote for a $1000 order
curl -X POST http://localhost:3000/api/quote \
  -H 'Content-Type: application/json' \
  -d '{"amount":1000}'
```

Returns credits received, amount spent, savings, effective discount, and the
per-tier breakdown.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx          # Root layout + metadata
  page.tsx            # Assembles all sections
  globals.css         # Tailwind + theme tokens
  api/quote/route.ts  # Live pricing endpoint
components/           # Navbar, Hero, BuyCredits, Trust, ApiDemo,
                      # Pricing, LiquidityBook, Analytics, Migration,
                      # Faq, CtaFooter, Logo, Section
lib/
  data.ts             # Tiers, prices, FAQs, and the fillOrder logic
```

## Tech

- Next.js 16 (App Router, Route Handlers)
- React 19
- TypeScript (strict)
- Tailwind CSS 3
- Zero runtime dependencies beyond the framework — passes `npm audit` clean.
