import { NextResponse } from "next/server";
import { fillOrder, bands } from "@/lib/data";

// POST /api/quote  { amount: number }
// Prices a month of usage across Halva's volume bands, the same logic the
// on-page estimator uses, exposed as a real endpoint.
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
    bands,
    currency: "USD",
    generatedAt: new Date().toISOString(),
  });
}

export async function GET() {
  return NextResponse.json({
    message: "POST { amount } to price a month of usage across Halva's bands.",
    bands,
  });
}
