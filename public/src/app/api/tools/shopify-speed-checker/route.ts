import { NextRequest, NextResponse } from "next/server";
import { analyzeShopifyStore } from "@/lib/shopify-checker/analyze";
import { isRateLimited } from "@/lib/shopify-checker/rateLimit";

export const runtime = "nodejs";

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: NextRequest) {
  if (isRateLimited(clientKey(req))) {
    return NextResponse.json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many checks from this connection. Please wait a few minutes and try again.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_url", message: "Please provide a store URL." },
      { status: 400 }
    );
  }

  const url = typeof body === "object" && body !== null && "url" in body ? (body as { url: unknown }).url : null;

  if (typeof url !== "string" || url.length === 0) {
    return NextResponse.json(
      { ok: false, code: "invalid_url", message: "Please provide a store URL." },
      { status: 400 }
    );
  }

  if (url.length > 2048) {
    return NextResponse.json(
      { ok: false, code: "invalid_url", message: "That URL is too long." },
      { status: 400 }
    );
  }

  try {
    const result = await analyzeShopifyStore(url);
    return NextResponse.json(result, { status: result.ok ? 200 : 422 });
  } catch (err) {
    console.error("Shopify speed checker: unexpected analysis error.", err);
    return NextResponse.json(
      {
        ok: false,
        code: "server_error",
        message: "Something went wrong while analyzing that store. Please try again.",
      },
      { status: 500 }
    );
  }
}
