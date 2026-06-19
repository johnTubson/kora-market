import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { CURRENCY_COOKIE, isCurrencyCode } from "@/lib/currency";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const existing = request.cookies.get(CURRENCY_COOKIE)?.value;

  if (!isCurrencyCode(existing)) {
    const defaultCurrency = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
    const currency = isCurrencyCode(defaultCurrency) ? defaultCurrency : "NGN";

    response.cookies.set(CURRENCY_COOKIE, currency, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
