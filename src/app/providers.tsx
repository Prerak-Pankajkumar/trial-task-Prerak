"use client";

import * as React from "react";

import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
  midnightTheme
} from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from "wagmi/chains";
import { env } from "@/env";
import { TRPCReactProvider } from "@/trpc/react";
const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "dex-screener",
  projectId: env.NEXT_PUBLIC_CLOUD_WALLET_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({
  children,
  serverSession,
}: {
  children: React.ReactNode;
  serverSession: Session | null;
}) {
  return (
    <TRPCReactProvider>
      <WagmiProvider config={config}>
        <SessionProvider refetchInterval={0} session={serverSession}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider>
              <RainbowKitProvider theme={midnightTheme()} coolMode>{children}</RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </WagmiProvider>
    </TRPCReactProvider>
  );
}
