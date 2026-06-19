import { cookies } from "next/headers";

import { AppProviders } from "@/app/providers";
import { SiteShell } from "@/components/layout/SiteShell";
import { isCurrencyCode } from "@/lib/currency";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kora Market",
  description:
    "Mobile-first headless commerce storefront demo for emerging markets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieCurrency = cookieStore.get("kora-currency")?.value;
  const envDefault = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  const initialCurrency = isCurrencyCode(cookieCurrency)
    ? cookieCurrency
    : isCurrencyCode(envDefault)
    ? envDefault
    : "NGN";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders initialCurrency={initialCurrency}>
          <SiteShell>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
