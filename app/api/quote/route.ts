import { NextResponse } from "next/server";
import { fillOrder, tiers } from "@/lib/data";

// POST /api/quote  { amount: number }
// Returns a live fill against the liquidity book — the same logic the
// on-page calculator uses, exposed as a real endpoint.
export async function POST(request: Request) {
  let amount = 0;
  try {
    const body = await request.json();
    amount = Number(body?.amount);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { amount: number }." },
      { status: 400 },
    );
  }

  if (!Number.isFinite(amount) || amount < 0) {
    return NextResponse.json(
      { error: "amount must be a non-negative number." },
      { status: 400 },
    );
  }

  const clamped = Math.min(amount, 1_000_000);
  const quote = fillOrder(clamped);

  return NextResponse.json({
    input: clamped,
    ...quote,
    tiers,
    currency: "USD",
    generatedAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    message: "POST { amount } to receive a live credit quote.",
    tiers,
  });
}
