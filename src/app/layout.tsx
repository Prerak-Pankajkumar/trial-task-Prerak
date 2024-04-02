import "@/styles/globals.css";
import { getServerAuthSession } from "@/server/auth";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Suspense } from "react";
import Loader from "./_components/loader";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dex Screener",
  description:
    "Dapp where users can view swap transactions from pancakeswap and uniswap",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans", fontSans.variable)}>
        <Suspense fallback={<Loader />}>
          <Providers serverSession={serverSession}>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
