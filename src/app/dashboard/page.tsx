"use client";

import "@/styles/globals.css";
import * as React from "react";
import SideMenu from "@/app/_components/side-menu";
import Header from "@/app/_components/header";
import { SwapTranction } from "@/app/_components/swap-transaction-table";
import { useAccount } from "wagmi";
import { pancakeswapChains, uniswapChains } from "@/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "../_components/loader";

const Dashboard = () => {
  const { data: session } = useSession();
  const { address } = useAccount();
  const [selectedOption, setSelectedOption] = React.useState("All");
  const [showSideMenu, setShowSideMenu] = React.useState(false);
  const router = useRouter();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const renderDashboardView = React.useCallback(() => {
    switch (selectedOption) {
      case "All":
        return (
          <>
            <SwapTranction
              initialRows={10}
              subgraphURL={
                "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
              }
              filterOptions={uniswapChains}
              transactionTableType="All"
            />
          </>
        );
      case "Uniswap":
        return (
          <>
            <SwapTranction
              subgraphURL={
                "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"
              }
              initialRows={10}
              filterOptions={uniswapChains}
              transactionTableType="Uniswap"
            />
          </>
        );
      case "Pancakeswap":
        return (
          <>
            <SwapTranction
              subgraphURL={
                "https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-eth"
              }
              initialRows={10}
              filterOptions={pancakeswapChains}
              transactionTableType="Pancakeswap"
            />
          </>
        );
      default:
        return null;
    }
  }, [selectedOption]);

  React.useEffect(() => {
    if (!session) {
      router.push("/auth/signin");
    }
  });

  return (
    <>
      {session ? (
        <div className="flex min-h-screen min-w-full bg-gray-800 text-white">
          {/* Side Menu */}
          <div className="sideMenuRoot w-64 bg-gray-800">
            <SideMenu
              showSideMenu={showSideMenu}
              toggleSideMenu={() => setShowSideMenu(!showSideMenu)}
            />
          </div>

          {/* Main Content */}
          <div
            className={`flex w-full flex-1 flex-col ${showSideMenu ?? "pl-64"}`}
          >
            <Header
              onOptionSelect={handleOptionSelect}
              selectedOption={selectedOption}
              toggleSideMenu={() => setShowSideMenu(!showSideMenu)}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
              {address ? (
                <>
                  <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
                    <h1 className="lg:[5rem] text-5xl font-extrabold tracking-tight sm:text-[2rem] md:text-[4rem]">
                      <span className="text-[hsl(280,100%,70%)]">
                        {selectedOption}
                      </span>{" "}
                      Transactions
                    </h1>
                  </div>
                  {renderDashboardView()}
                </>
              ) : (
                <>
                  <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                      Connect your{" "}
                      <span className="text-[hsl(280,100%,70%)]">Wallet</span>
                    </h1>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
